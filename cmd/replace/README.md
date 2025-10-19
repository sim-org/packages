# replace

Search and replace in file names and file content with safety features.

## WARNING - DESTRUCTIVE COMMAND

**This command makes permanent changes to your files and directories.**

- **ALWAYS use `-i` flag first** to preview changes before executing
- **Use version control** - commit your work before running this command
- **Test on a copy** - try on a backup first if you're unsure
- **Review the plan carefully** - check every change before confirming
- By default, replaces in **BOTH file names AND content** - use `-nc` or `-nf` to limit scope

## Installation

```bash
sim install github.com/sim-org/packages/cmd/replace
```

## Usage

```bash
sim replace <search> <replace> [options]
```

**Default behavior:** Replaces in **BOTH** file/directory names AND file content.

### Arguments

- `search` - Search term (minimum 2 characters required)
- `replace` - Replacement term (required)

### Options

- `-i` - **Info mode - preview changes without executing (ALWAYS USE THIS FIRST)**
- `-nc` - Skip content replacement (only rename files/directories)
- `-nf` - Skip file/directory name replacement (only replace content)
- `-p <path>` - Path to search in (default: current directory)
- `-s <dirs>` - Skip directories (comma-separated, e.g., "dist,build")
- `-y` - Skip confirmation prompt (use with extreme caution!)

## Examples

### ALWAYS preview first (recommended workflow)

```bash
# 1. ALWAYS preview changes first with -i flag
sim replace foo bar -i

# 2. Review the output carefully

# 3. If everything looks correct, run without -i
sim replace foo bar
```

### Default behavior (replaces everywhere)

```bash
# Replaces "foo" with "bar" in:
# - File and directory names
# - Content inside files
sim replace foo bar
```

### Only rename files/directories (skip content)

```bash
# Only rename files and directories, don't touch content
sim replace foo bar -nc
```

### Only replace content (skip renaming)

```bash
# Only replace content inside files, don't rename anything
sim replace foo bar -nf
```

### Advanced usage

```bash
# Search only in specific directory
sim replace foo bar -p ./src

# Skip specific directories (e.g., build artifacts)
sim replace foo bar -s "dist,build,coverage"

# Only rename files, skip content
sim replace foo bar -nc

# Combine options: only content, skip dirs, specific path
sim replace foo bar -nf -s "dist,build" -p ./src

# For automation: skip confirmation (dangerous!)
sim replace foo bar -y

# Preview before executing (best practice)
sim replace oldName newName -i  # Review changes
sim replace oldName newName     # Execute after review
```

## Safety Features

### Protected Directories
The following directories are automatically protected and never renamed:
- `.git`
- `node_modules`

You can add custom directories to skip using the `-s` flag:
```bash
sim replace foo bar -s "dist,build,coverage"
```

The skip list is additive - custom directories are added to the default protected list.

### Conflict Detection
- Checks if destination file/directory already exists before renaming
- Skips renames that would cause conflicts
- Shows warnings for skipped operations

### Confirmation Required
- Shows complete change plan before execution
- Requires explicit user confirmation (y/N)
- Can be bypassed with `-y` flag for automation

### Minimum Search Length
- Requires at least 2 characters in search term
- Prevents accidental mass changes from single-character searches

### Dry Run Mode
- Use `-i` flag to preview all changes
- Shows exactly what would happen without making changes
- Recommended before running destructive operations

## Supported File Types for Content Search

When using `-c` flag, the following file types are scanned:
- `.go`
- `.ts`
- `.css`
- `.md`
- `.txt`
- `.csv`
- `.xml`
- `.json`

Binary files and other extensions are skipped for content replacement.

## Output Format

The command shows planned changes categorized by type:

```
Planned changes:
================
[RENAME] ./old-file.txt -> ./new-file.txt
[CONTENT] ./config.json
[MATCH] ./docs/readme.md

Files to rename: 1
Files to modify: 1
Matches found: 1

Proceed with these changes? (y/N):
```

## Best Practices

1. **ALWAYS preview first**: Use `-i` flag to see what will change - this is mandatory
2. **Commit first**: Ensure all changes are committed to version control before running
3. **Start small**: Test on a subdirectory with `-p` before running on entire project
4. **Review carefully**: Read the entire change plan before confirming
5. **Use specific terms**: Avoid generic search terms to prevent unintended matches
6. **Skip build artifacts**: Use `-s` to skip generated directories (dist, build, etc.)
7. **Limit scope**: Use `-nc` or `-nf` if you only want to change names or content, not both
8. **Test on a copy**: When in doubt, test on a backup of your project first

## Common Workflows

### Refactor a component name (names + content)

```bash
# 1. Preview ALL changes (names and content)
sim replace OldComponent NewComponent -i

# 2. Review the output carefully

# 3. Execute if everything looks correct
sim replace OldComponent NewComponent
```

### Only rename files (no content changes)

```bash
# 1. Preview file renames only
sim replace .spec.ts .test.ts -nc -i

# 2. Execute
sim replace .spec.ts .test.ts -nc
```

### Only update content (no file renames)

```bash
# 1. Preview content changes in config files
sim replace "api.staging.com" "api.production.com" -nf -p ./config -i

# 2. Execute
sim replace "api.staging.com" "api.production.com" -nf -p ./config
```

### Skip generated directories during refactor

```bash
# Refactor everything but skip build artifacts
sim replace OldAPI NewAPI -s "dist,build,.next,out" -i
sim replace OldAPI NewAPI -s "dist,build,.next,out"
```
