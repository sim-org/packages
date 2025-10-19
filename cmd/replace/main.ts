import * as getargs from "github.com/sim-org/packages/pkg/getargs"

/**
 * ⚠️ DESTRUCTIVE COMMAND - Search and replace in file names and content.
 *
 * WARNING: Makes permanent changes to files and directories.
 * ALWAYS use -i flag first to preview changes!
 *
 * Usage:
 *   sim replace <search> <replace> [options]
 *
 * Arguments:
 *   search              Search term (minimum 2 characters)
 *   replace             Replacement term (required)
 *
 * Default behavior:
 *   Replaces in BOTH file/directory names AND file content
 *
 * Options:
 *   -i                 Info mode - ALWAYS USE THIS FIRST (dry run)
 *   -nc                Skip content replacement (only rename files/dirs)
 *   -nf                Skip file/directory name replacement (only content)
 *   -p <path>          Path to search in (default: current directory)
 *   -s <dirs>          Skip directories (comma-separated, e.g., 'dist,build')
 *   -y                 Skip confirmation prompt (use with extreme caution!)
 *
 * Examples:
 *   sim replace foo bar -i                  # ALWAYS preview first
 *   sim replace foo bar                     # Replace in names AND content
 *   sim replace foo bar -nc                 # Only rename files/dirs
 *   sim replace foo bar -nf                 # Only replace content
 *   sim replace foo bar -p ./src            # Only search in ./src directory
 *   sim replace foo bar -s "dist,build"     # Skip dist and build directories
 *
 * Safety features:
 *   - Requires confirmation before applying changes (unless -y is used)
 *   - Protects system directories (.git, node_modules) + custom skip dirs
 *   - Checks for name conflicts before renaming
 *   - Shows complete change plan before execution
 *   - Minimum 2-character search term to prevent accidental mass changes
 */

interface Context {
    search: string
    replace: string
    info: boolean
    skipContent: boolean
    skipFileNames: boolean
    skipDirs: string[]
}

interface Change {
    type: string
    from: string
    to: string
}

const PROTECTED_DIRS: string[] = [".git", "node_modules"]

export function main(...args: any[]) {
    let p = new getargs.Parser(args)

    p.addFlag("p", ".", "path")
    p.addFlag("s", "", "skip directories (comma-separated)")
    p.addOption("i", "only print info")
    p.addOption("y", "skip confirmation")
    p.addOption("nc", "skip content replacement")
    p.addOption("nf", "skip file/directory name replacement")

    let search: string = p.arg(0)
    let replace: string = p.arg(1)

    if (!search || !replace) {
        fmt.println("Error: both search and replace terms are required")
        fmt.println("")
        fmt.println("WARNING: This is a DESTRUCTIVE command. Use with caution!")
        fmt.println("")
        fmt.println("Usage: sim replace <search> <replace> [options]")
        fmt.println("")
        fmt.println("By default, replaces in BOTH file names AND content.")
        fmt.println("")
        fmt.println("Options:")
        fmt.println("  -i     only print info (dry run) - ALWAYS USE THIS FIRST")
        fmt.println("  -y     skip confirmation")
        fmt.println("  -nc    skip content replacement (only rename files/dirs)")
        fmt.println("  -nf    skip file/directory name replacement (only content)")
        fmt.println("  -p     path (default: current directory)")
        fmt.println("  -s     skip directories (comma-separated, e.g., 'dist,build')")
        return
    }

    if (search.length < 2) {
        fmt.println("Error: search term must be at least 2 characters")
        return
    }

    let skipDirsFlag: string = p.flag("s")
    let skipDirs: string[] = PROTECTED_DIRS.slice()

    if (skipDirsFlag) {
        let userSkipDirs: string[] = skipDirsFlag.split(",")
        for (let dir of userSkipDirs) {
            let trimmed: string = dir.trim()
            if (trimmed) {
                skipDirs.push(trimmed)
            }
        }
    }

    let c: Context = {
        search: search,
        replace: replace,
        info: p.option("i"),
        skipContent: p.option("nc"),
        skipFileNames: p.option("nf"),
        skipDirs: skipDirs,
    }

    let path: string = p.flag("p")
    let changes: Change[] = []

    if (!c.skipFileNames) {
        collectFileNameChanges(c, path, changes)
    }

    if (!c.skipContent) {
        collectContentChanges(c, path, changes)
    }

    if (changes.length === 0) {
        fmt.println("No matches found")
        return
    }

    showChanges(changes)

    if (c.info) {
        return
    }

    if (!p.option("y")) {
        fmt.print("\nProceed with these changes? (y/N): ")
        let response: string = os.readLine()
        if (response.toLowerCase() !== "y") {
            fmt.println("Cancelled")
            return
        }
    }

    applyChanges(changes)
    fmt.println(fmt.sprintf("\nApplied %d changes", changes.length))
}

function isProtectedDir(name: string, skipDirs: string[]): boolean {
    for (let dir of skipDirs) {
        if (name === dir) {
            return true
        }
    }
    return false
}

function isTextFile(file: string): boolean {
    switch (filepath.ext(file)) {
        case ".go":
        case ".ts":
        case ".css":
        case ".md":
        case ".txt":
        case ".csv":
        case ".xml":
        case ".json":
            return true
        default:
            return false
    }
}

function collectContentChanges(c: Context, path: string, changes: Change[]) {
    for (let file of os.readNames(path, true)) {
        if (os.stat(file).isDir) {
            continue
        }

        if (!isTextFile(file)) {
            continue
        }

        let data: string = os.readString(file)

        if (data.contains(c.search)) {
            if (c.replace) {
                let newData: string = data.replaceAll(c.search, c.replace)
                changes.push({
                    type: "content",
                    from: file,
                    to: newData,
                })
            } else {
                changes.push({
                    type: "match",
                    from: file,
                    to: "",
                })
            }
        }
    }
}

function collectFileNameChanges(c: Context, path: string, changes: Change[]) {
    for (let fi of os.readDir(path)) {
        if (isProtectedDir(fi.name, c.skipDirs)) {
            continue
        }

        let src: string = filepath.join(path, fi.name)

        if (fi.name.contains(c.search)) {
            let newName: string = fi.name.replaceAll(c.search, c.replace)
            let dst: string = filepath.join(path, newName)

            if (os.exists(dst)) {
                fmt.println(fmt.sprintf("WARNING: Skipping rename - destination exists: %s", dst))
            } else {
                changes.push({
                    type: "rename",
                    from: src,
                    to: dst,
                })
            }
        }

        if (fi.isDir) {
            collectFileNameChanges(c, src, changes)
        }
    }
}

function showChanges(changes: Change[]) {
    let renameCount: number = 0
    let contentCount: number = 0
    let matchCount: number = 0

    fmt.println("\nPlanned changes:")
    fmt.println("================")

    for (let change of changes) {
        if (change.type === "rename") {
            fmt.println(fmt.sprintf("[RENAME] %s -> %s", change.from, change.to))
            renameCount++
        } else if (change.type === "content") {
            fmt.println(fmt.sprintf("[CONTENT] %s", change.from))
            contentCount++
        } else if (change.type === "match") {
            fmt.println(fmt.sprintf("[MATCH] %s", change.from))
            matchCount++
        }
    }

    fmt.println("")
    if (renameCount > 0) {
        fmt.println(fmt.sprintf("Files to rename: %d", renameCount))
    }
    if (contentCount > 0) {
        fmt.println(fmt.sprintf("Files to modify: %d", contentCount))
    }
    if (matchCount > 0) {
        fmt.println(fmt.sprintf("Matches found: %d", matchCount))
    }
}

function applyChanges(changes: Change[]) {
    for (let change of changes) {
        if (change.type === "content") {
            os.write(change.from, change.to)
        }
    }

    for (let change of changes) {
        if (change.type === "rename") {
            os.rename(change.from, change.to)
        }
    }
} 