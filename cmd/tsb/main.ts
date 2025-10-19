import * as getargs from "github.com/sim-org/packages/pkg/getargs"

/**
 * TypeScript Bundle - Compile and bundle TypeScript files
 *
 * Combines TypeScript files and compiles them with esbuild into a single output file.
 * Supports minification, sourcemaps, recursive directory scanning, and verbose output.
 *
 * Usage:
 *   sim tsb [input-dir] [output-file] [options]
 *
 * Arguments:
 *   input-dir           Directory containing TypeScript files to process (default: current directory)
 *   output-file         Output file path for bundled JavaScript (optional if using -p)
 *
 * Options:
 *   -m                  Minify output with esbuild
 *   -v                  Verbose output
 *   -r                  Recursive (default: true, use -r=false to disable)
 *   -p                  Print output to stdout instead of file
 *
 * Examples:
 *   sim tsb -p
 *   sim tsb -p -m
 *   sim tsb ./src ./dist/bundle.js
 *   sim tsb ./src ./dist/bundle.js -m
 *   sim tsb ./src ./dist/bundle.js -m -v
 *   sim tsb ./lib ./output.js -r=false
 */

export function main(...args: any[]) {
    let p = new getargs.Parser(args)

    p.addOption("m", "minify output")
    p.addOption("v", "verbose output")
    p.addOption("p", "print to stdout")
    p.addFlag("r", "true", "recursive")

    let dir: string = p.arg(0)
    if (!dir) {
        dir = "."
    }

    let out: string = p.arg(1)
    let printToStdout: boolean = p.option("p")

    if (!printToStdout && !out) {
        fmt.println("Error: output file is required when not using -p option")
        fmt.println("")
        fmt.println("Usage: sim tsb [input-dir] [output-file] [options]")
        fmt.println("")
        fmt.println("Options:")
        fmt.println("  -m      minify output with esbuild")
        fmt.println("  -v      verbose output")
        fmt.println("  -r      recursive (default: true, use -r=false to disable)")
        fmt.println("  -p      print output to stdout instead of file")
        fmt.println("")
        fmt.println("Examples:")
        fmt.println("  sim tsb -p")
        fmt.println("  sim tsb -p -m")
        fmt.println("  sim tsb ./src ./dist/bundle.js")
        fmt.println("  sim tsb ./src ./dist/bundle.js -m")
        return
    }

    let fi = os.stat(dir)
    if (!fi) {
        fmt.println(fmt.sprintf("Error: directory does not exist: %s", dir))
        return
    }

    if (!fi.isDir) {
        fmt.println(fmt.sprintf("Error: path is not a directory: %s", dir))
        return
    }

    let minify: boolean = p.option("m")
    let verbose: boolean = p.option("v")
    let recursiveFlag: string = p.flag("r")
    let recursive: boolean = recursiveFlag === "true"

    let files: string[] = os.readNames(dir, recursive)
        .where(t => t.endsWith(".ts") && !t.endsWith(".d.ts"))

    if (files.length === 0) {
        fmt.println("No TypeScript files found")
        return
    }

    files.sort((a, b) => a.toLowerCase() < b.toLowerCase())

    let contents: string[] = []
    for (let file of files) {
        let src: string = os.readString(file)
        if (src.trim() === "") {
            continue
        }
        contents.push(src)
        if (verbose) {
            fmt.println(fmt.sprintf("Processed: %s", file))
        }
    }

    if (contents.length === 0) {
        fmt.println("No TypeScript files with content found")
        return
    }

    let combined: string = contents.join("\n\n")
    let bundleFile: string = ".tsb-tmp-" + crypto.randomAlphanumeric(10) + ".ts"

    try {
        os.write(bundleFile, combined)

        const banner: string = `"use strict";`

        let esbuildArgs: string[] = [
            "--target=esnext",
            bundleFile,
            "--banner:js=" + banner
        ]

        if (printToStdout) {
            let tmpOut: string = ".tsb-out-" + crypto.randomAlphanumeric(10) + ".js"
            esbuildArgs.push("--outfile=" + tmpOut)

            if (minify) {
                esbuildArgs.push("--minify")
            } else {
                esbuildArgs.push("--sourcemap=inline")
            }

            esbuildArgs.push("--log-level=silent")

            try {
                os.exec("esbuild", ...esbuildArgs)
                let finalOutput: string = os.readString(tmpOut)
                os.removeAll(tmpOut)
                os.removeAll(bundleFile)
                fmt.print(finalOutput)
            } catch (error) {
                os.removeAll(tmpOut)
                os.removeAll(bundleFile)
                fmt.println(fmt.sprintf("Error compiling TypeScript: %v", error))
                throw error
            }
        } else {
            os.mkdir(filepath.dir(out))
            esbuildArgs.push("--outfile=" + out)

            if (minify) {
                esbuildArgs.push("--minify")
            } else {
                esbuildArgs.push("--sourcemap")
                esbuildArgs.push("--sourcemap=inline")
            }

            if (!verbose) {
                esbuildArgs.push("--log-level=silent")
            }

            try {
                os.exec("esbuild", ...esbuildArgs)
                os.removeAll(bundleFile)
            } catch (error) {
                os.removeAll(bundleFile)
                fmt.println(fmt.sprintf("Error compiling TypeScript: %v", error))
                throw error
            }

            if (verbose) {
                fmt.println(fmt.sprintf("TypeScript bundled: %s (%d files)", out, contents.length))
            } else {
                fmt.println(fmt.sprintf("TSB: %s", out))
            }
        }
    } catch (error) {
        os.removeAll(bundleFile)
        throw error
    }
}
