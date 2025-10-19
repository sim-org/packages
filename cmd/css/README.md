# css

Process and bundle CSS files with css.process() transformation and optional minification.

## Description

This command processes CSS files, concatenates them into a single bundle, and optionally minifies the output using esbuild.

## Prerequisites

**esbuild is required** for minification. Install it with:

```bash
brew install esbuild
```

Or

```bash
npm install -g esbuild
```


Note: The command will work without esbuild if you don't use the `-m` flag.

## Installation

```bash
sim install github.com/sim-org/packages/cmd/css
```

## Usage

```bash
sim css <input-dir> <output-file> [options]
```

### Arguments

- `input-dir` - Directory containing CSS files to process (required)
- `output-file` - Output file path for bundled CSS (required)

### Options

- `-m` - Minify output using esbuild
- `-v` - Verbose output (show processed files and summary)
- `-r` - Recursive directory scan (default: true, use `-r=false` to disable)

## Examples

### Basic usage

```bash
# Process and bundle all CSS files from a directory
sim css ./src/styles ./dist/bundle.css
```

### With minification

```bash
# Process, bundle, and minify CSS files
sim css ./src/styles ./dist/bundle.css -m
```

### With verbose output

```bash
# Show each processed file and summary
sim css ./src/styles ./dist/bundle.css -v
sim css ./src/styles ./dist/bundle.css -m -v
```

### Non-recursive

```bash
# Only process CSS files in the top-level directory (no subdirectories)
sim css ./styles ./output.css -r=false
```

## How It Works

1. **Scans directory** for `.css` files (recursively by default)
2. **Processes each file** through `css.process()` transformation
3. **Concatenates** all processed CSS into a single output file
4. **Minifies** (optional) using esbuild if `-m` flag is provided

## Processing Pipeline

```
Input Directory
    ├── file1.css ──┐
    ├── file2.css ──┤
    └── file3.css ──┤
                    │
                    ├─> css.process()
                    │
                    ├─> Concatenate
                    │
                    ├─> Write to output
                    │
                    └─> esbuild minify (if -m)
                        │
                        └─> Final output file
```

## Output

The command outputs a single bundled CSS file containing all processed CSS from the input directory.

**Without verbose mode:**
```
CSS: ./dist/bundle.css
```

**With verbose mode (-v):**
```
Processed: ./src/styles/main.css
Processed: ./src/styles/components/button.css
Processed: ./src/styles/components/card.css
CSS bundled: ./dist/bundle.css (3 files)
```
