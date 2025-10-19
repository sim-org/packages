# tsb - TypeScript Bundle

TypeScript Bundle command that combines and compiles TypeScript files into a single JavaScript bundle using esbuild.

## Features

- Combines multiple TypeScript files into a single bundle
- Compiles TypeScript to JavaScript with esbuild
- Excludes `.d.ts` declaration files
- Sorts files alphabetically before bundling
- Supports minification
- Generates inline sourcemaps (when not minifying)
- Adds `"use strict";` banner
- Recursive directory scanning by default
- Print to stdout or write to file
- Uses current directory as default input

## Usage

```bash
sim tsb [input-dir] [output-file] [options]
```

### Arguments

- `input-dir` - Directory containing TypeScript files (default: current directory)
- `output-file` - Output file path for bundled JavaScript (optional if using `-p`)

### Options

- `-m` - Minify output with esbuild
- `-v` - Verbose output (show processed files and compilation info)
- `-r` - Recursive directory scan (default: `true`, use `-r=false` to disable)
- `-p` - Print output to stdout instead of writing to file

## Examples

### Basic usage - print to stdout
```bash
# Process TypeScript files in current directory
sim tsb -p

# Process and minify TypeScript files in current directory
sim tsb -p -m
```

### Write to file
```bash
# Bundle TypeScript files to output file
sim tsb ./src ./dist/bundle.js

# Bundle and minify
sim tsb ./src ./dist/bundle.js -m

# Bundle with verbose output
sim tsb ./src ./dist/bundle.js -m -v

# Non-recursive scan
sim tsb ./lib ./output.js -r=false
```

### Advanced usage
```bash
# Bundle specific directory to stdout
sim tsb ./src -p

# Bundle current directory and minify to stdout
sim tsb -p -m

# Bundle with verbose output and sourcemaps
sim tsb ./src ./dist/app.js -v
```

## How it works

1. Scans for `.ts` files (excluding `.d.ts` files)
2. Sorts files alphabetically
3. Reads and combines file contents
4. Creates temporary bundle file
5. Compiles with esbuild using:
   - Target: `esnext`
   - Banner: `"use strict";`
   - Sourcemaps: inline (when not minifying)
6. Outputs to file or stdout
7. Cleans up temporary files

## Notes

- The command automatically excludes TypeScript declaration files (`.d.ts`)
- When not minifying, inline sourcemaps are automatically included
- Sourcemaps are not included when using `-p` with `-m` (print + minify)
- Empty files are automatically skipped
- Files are sorted case-insensitively before bundling to ensure consistent output
