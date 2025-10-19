import * as getargs from "github.com/sim-org/packages/pkg/getargs"

/**
 * CSS Compiler - Process and bundle CSS files
 *
 * Processes CSS files with css.process() and bundles them into a single output file.
 * Supports minification, recursive directory scanning, and verbose output.
 *
 * Usage:
 *   sim css [input-dir] [output-file] [options]
 *
 * Arguments:
 *   input-dir           Directory containing CSS files to process (default: current directory)
 *   output-file         Output file path for bundled CSS (optional if using -p)
 *
 * Options:
 *   -m                  Minify output with esbuild
 *   -v                  Verbose output
 *   -r                  Recursive (default: true, use -r=false to disable)
 *   -p                  Print output to stdout instead of file
 *
 * Examples:
 *   sim css -p
 *   sim css -p -m
 *   sim css ./src/styles ./dist/bundle.css
 *   sim css ./src/styles ./dist/bundle.css -m
 *   sim css ./src/styles ./dist/bundle.css -m -v
 *   sim css ./styles ./output.css -r=false
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
        fmt.println("Usage: sim css [input-dir] [output-file] [options]")
        fmt.println("")
        fmt.println("Options:")
        fmt.println("  -m      minify output with esbuild")
        fmt.println("  -v      verbose output")
        fmt.println("  -r      recursive (default: true, use -r=false to disable)")
        fmt.println("  -p      print output to stdout instead of file")
        fmt.println("")
        fmt.println("Examples:")
        fmt.println("  sim css -p")
        fmt.println("  sim css -p -m")
        fmt.println("  sim css ./src/styles ./dist/bundle.css")
        fmt.println("  sim css ./src/styles ./dist/bundle.css -m")
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

    let buf: string[] = []

    for (let file of os.readNames(dir, recursive)) {
        if (!file.endsWith(".css")) {
            continue
        }

        let src: string = os.readString(file)
        if (src.trim() === "") {
            continue
        }

        try {
            src = process(src)
            buf.push(src)
            if (verbose) {
                fmt.println(fmt.sprintf("Processed: %s", file))
            }
        } catch (error) {
            fmt.println(fmt.sprintf("Error processing %s: %v", file, error))
            throw error
        }
    }

    if (buf.length === 0) {
        fmt.println("No CSS files found")
        return
    }

    let finalOutput: string = buf.join("\n")

    if (printToStdout) {
        if (minify) {
            let tmpFile: string = ".css-tmp-" + crypto.randomAlphanumeric(10) + ".css"

            try {
                os.write(tmpFile, finalOutput)

                let args: string[] = [
                    tmpFile,
                    "--minify",
                    "--allow-overwrite",
                    "--outfile=" + tmpFile,
                    "--log-level=silent"
                ]

                os.exec("esbuild", ...args)
                finalOutput = os.readString(tmpFile)
                os.removeAll(tmpFile)
            } catch (error) {
                os.removeAll(tmpFile)
                fmt.println(fmt.sprintf("Error minifying CSS: %v", error))
                throw error
            }
        }

        fmt.print(finalOutput)
    } else {
        os.mkdir(filepath.dir(out))
        os.write(out, finalOutput)

        if (minify) {
            let args: string[] = [
                out,
                "--minify",
                "--allow-overwrite",
                "--outfile=" + out,
                "--log-level=silent"
            ]

            try {
                os.exec("esbuild", ...args)
            } catch (error) {
                fmt.println(fmt.sprintf("Error minifying CSS: %v", error))
                throw error
            }
        }

        if (verbose) {
            fmt.println(fmt.sprintf("CSS bundled: %s (%d files)", out, buf.length))
        } else {
            fmt.println(fmt.sprintf("CSS: %s", out))
        }
    }
}


export function process(code: string) {
    code = processPrefixes(code)
    return code
}


function processPrefixes(code: string) {
    let srcParts = []

    const PATTERN = "/\*\s*SCOPE\s+([^\s]+)\s*\*/"
    const CLOSE = "/\*\s+END\s+\*/"

    for (let i = 0, l = code.length; i < l; i++) {
        let m = regex.findAllStringSubmatchIndex(PATTERN, code.substring(i), 1)

        if (m.length == 0) {
            srcParts.push(code.substring(i))
            break
        }

        let openStart = m[0][0]
        if (openStart > i) {
            srcParts.push(code.substring(i, openStart))
        }

        let z = regex.findAllStringSubmatch(PATTERN, code.substring(i + openStart), 1)
        let openLength = z[0][0].length
        let prefix = z[0][1]

        let innerStart = i + openStart + openLength

        let e = regex.findAllStringSubmatchIndex(CLOSE, code.substring(innerStart))
        if (e.length == 0) {
            throw "unclosed block"
        }

        let blockCode = code.substring(innerStart, innerStart + e[0][0])

        srcParts.push(applyPrefix(blockCode, "." + prefix))

        i = innerStart + e[0][1]
    }

    return srcParts.join("\n")
}


function applyPrefix(code: string, prefixCode: string) {
    let buf = []
    let rules = parseRule(code, prefixCode)

    for (let r of rules) {
        buf.push(r.selectors.select(t => prefixSelector(prefixCode, t)).join(",\n"))
        buf.push(" ")
        buf.push(r.body)
        buf.push("\n\n")
    }

    return buf.join()
}

function prefixSelector(prefix: string, sel: string) {
    // don't prefix comments
    if (sel.startsWith("/*")) {
        return sel
    }

    // don't prefix media rules 
    if (sel.startsWith("@")) {
        return sel
    }

    // don't prefix root rules
    if (sel == "root") {
        return prefix
    }

    if (sel.startsWith("root.") || sel.startsWith("root:")) {
        return prefix + sel.trimPrefix("root")
    }

    if (sel.startsWith("root ")) {
        return prefix + sel.trimPrefix("root")
    }

    // common to the directory styles.
    if (sel.startsWith("directory")) {
        let parts = prefix.splitClean("-")
        parts.removeAt(parts.length - 1)
        prefix = parts.join("-")
        return prefix + sel.trimPrefix("directory")
    }

    return prefix + " " + sel
}

interface Rule {
    selectors: string[]
    body: string
}

function parseRule(code: string, prefixCode?: string) {
    let rules: Rule[] = []
    let buf = []
    let isBody: boolean = false
    let mediaRuleStart = -1
    let nestedBrackets = 0
    let selectors = []

    OUTER:
    for (let i = 0, j = code.runeCount; i < j; i++) {
        let c = code.runeAt(i)

        // Skip comments
        if (c == "/" && i + 3 < j) {
            if (code.runeAt(i + 1) == "*") {
                for (let k = i + 2; k < j; k++) {
                    if (code.runeAt(k) == "/" && code.runeAt(k - 1) == "*") {
                        i = k
                        continue OUTER
                    }
                }
            }
        }

        switch (c) {
            case ",":
                if (!isBody) {
                    selectors.push(buf.join().trim("\n \t"))
                    buf = []
                } else {
                    buf.push(c)
                }
                break

            case "{":
                if (isBody) {
                    buf.push(c)
                    nestedBrackets++
                    continue
                }

                let selector = buf.join().trim("\n \t")
                selectors.push(selector)
                buf = []
                buf.push(c)
                isBody = true

                // las reglas de media tienen que tener prefijo tambien en su contenido
                if (selector.startsWith("@media")) {
                    mediaRuleStart = buf.length
                }
                break

            case "}":
                if (nestedBrackets) {
                    buf.push(c)
                    nestedBrackets--
                    continue
                }

                if (mediaRuleStart >= 0) {
                    let mediaRules = buf.slice(mediaRuleStart).join()
                    mediaRules = applyPrefix(mediaRules, prefixCode)

                    // esto es para dejarlo lo más parecido posible al original
                    mediaRules = mediaRules.trimSuffix("\n")

                    buf = buf.slice(0, mediaRuleStart)

                    // esto es para dejarlo lo más parecido posible al original.
                    // mi vscode mete 4 espacios
                    buf.push("\n    ")

                    buf.push(mediaRules)
                    mediaRuleStart = -1
                }

                buf.push(c)
                rules.push({
                    selectors: selectors,
                    body: buf.join(),
                })
                isBody = false
                buf = []
                selectors = []
                break

            default:
                buf.push(c)
                break
        }
    }

    return rules
}
