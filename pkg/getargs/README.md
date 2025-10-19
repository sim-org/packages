## Installation

```bash
sim get https://github.com/sim-org/packages/pkg/getargs
```

## Usage

```typescript
import * as getargs from "https://github.com/sim-org/packages/pkg/getargs"

export function main(...args: string[]) {
    const parser = new getargs.Parser(args)
    
    // Flags with values
    parser.addFlag("config", "./config.json", "Configuration file")
    parser.addFlag("output", undefined, "Output directory")
    
    // Boolean options
    parser.addOption("verbose", "Verbose output")
    parser.addOption("dry-run", "Dry run mode")
    
    // Positional arguments
    parser.addArg("input-file", true)   // Required
    parser.addArg("output-file", false) // Optional
    
    const config = parser.flag("config")
    const verbose = parser.option("verbose")
    const inputFile = parser.arg("input-file")
}
```
