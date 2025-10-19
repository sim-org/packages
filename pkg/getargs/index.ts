


/**
 * Command-line argument parser for Sim VM applications
 * 
 * Provides comprehensive parsing of command-line arguments including
 * flags (with values), options (boolean switches), and positional arguments.
 * Supports both short (-v) and long (--verbose) argument formats with
 * automatic help generation and error handling.
 * 
 * @example Basic usage
 * ```typescript
 * const parser = new cli.Parser(process.argv.slice(2))
 * parser.addFlag("config", "./config.json", "Configuration file path")
 * parser.addOption("verbose", "Enable verbose logging")
 * parser.addArg("input-file", true)
 * 
 * const config = parser.flag("config")
 * const verbose = parser.option("verbose")
 * const inputFile = parser.arg("input-file")
 * ```
 */
export class Parser {
    /** Raw command-line arguments after preprocessing */
    private readonly _args: string[]

    /** Registered option definitions */
    private readonly _options: Option[]

    /** Registered flag definitions */
    private readonly _flags: Flag[]

    /** Expected positional argument definitions */
    private readonly expectedArgs: Argument[]

    /** Whether arguments have been parsed */
    private _parsed: boolean

    /** Parsed positional arguments */
    private readonly _arguments: string[]

    /** Custom usage text displayed in help */
    usageText: string

    /** Additional description lines for help text */
    descriptionLines: string[]

    /** Whether to throw errors instead of exiting */
    throwErrors: boolean

    /**
     * Creates a new command-line parser instance
     * 
     * @param args - Raw command-line arguments (typically from process.argv)
     * 
     * @example
     * ```typescript
     * const parser = new cli.Parser(["--verbose", "-f", "config.json", "input.txt"])
     * ```
     */
    constructor(args: string[]) {
        this._args = this.parseArgs(args)
        this._options = []
        this._flags = []
        this._arguments = []
        this.expectedArgs = []
        this._parsed = false
    }

    /**
     * Checks if no arguments, flags, or options were provided
     * 
     * @returns True if the command line was empty or contained no recognized arguments
     * 
     * @example
     * ```typescript
     * if (parser.empty()) {
     *     parser.usage("No arguments provided")
     *     return
     * }
     * ```
     */
    empty(): boolean {
        this.parse()
        return !this.anyFlag() && !this.anyOption() && !this.anyArgument()
    }

    /**
     * Checks if any flags were matched during parsing
     * 
     * @returns True if at least one flag was found in the arguments
     */
    anyFlag(): boolean {
        this.parse()
        return this._flags.any(t => t.matchCount > 0)
    }

    /**
     * Checks if any options were matched during parsing
     * 
     * @returns True if at least one option was found in the arguments
     */
    anyOption(): boolean {
        this.parse()
        return this._options.any(t => t.matchCount > 0)
    }

    /**
     * Checks if any positional arguments were provided
     * 
     * @returns True if at least one positional argument was found
     */
    anyArgument(): boolean {
        this.parse()
        return this._arguments.length > 0
    }

    /**
     * Gets the names of all registered options
     * 
     * @returns Array of option names that were registered with addOption()
     */
    options(): string[] {
        this.parse()
        return this._options.select(t => t.name)
    }

    /**
     * Gets the names of options that were matched in the command line
     * 
     * @returns Array of option names that were found in the parsed arguments
     */
    matchedOptions(): string[] {
        this.parse()
        return this._options.where(t => t.matchCount > 0).select(t => t.name)
    }

    /**
     * Gets the names of all registered flags
     * 
     * @returns Array of flag names that were registered with addFlag()
     */
    flags(): string[] {
        this.parse()
        return this._flags.select(t => t.name)
    }

    /**
     * Gets the names of flags that were matched in the command line
     * 
     * @returns Array of flag names that were found in the parsed arguments
     */
    matchedFlags(): string[] {
        this.parse()
        return this._flags.where(t => t.matchCount > 0).select(t => t.name)
    }

    /**
     * Registers a named positional argument
     * 
     * Defines expected positional arguments that can be accessed by name.
     * Required arguments must be defined before optional ones.
     * 
     * @param name - The name identifier for the argument
     * @param required - Whether this argument is required (default: false)
     * 
     * @throws Error if a required argument is added after an optional one
     * 
     * @example
     * ```typescript
     * parser.addArg("input-file", true)    // Required argument
     * parser.addArg("output-file", false)  // Optional argument
     * 
     * const input = parser.arg("input-file")
     * const output = parser.arg("output-file")
     * ```
     */
    addArg(name: string, required?: boolean): void {
        if (required) {
            const last = this.expectedArgs.last()
            if (last && !last.required) {
                this.onError("can't add a required arg after an optional one")
            }
        }
        this.expectedArgs.push({ name: name, required: required ?? false })
    }

    /**
     * Registers a boolean option (switch)
     * 
     * Options are boolean flags that don't take values. They can be
     * specified multiple times to get a count of occurrences.
     * 
     * @param name - The option name (used as -name or --name)
     * @param description - Help text describing the option's purpose
     * 
     * @example
     * ```typescript
     * parser.addOption("verbose", "Enable verbose output")
     * parser.addOption("v", "Enable verbose output")  // Short form
     * 
     * const isVerbose = parser.option("verbose")
     * const verboseCount = parser.optionCount("v")  // How many times -v was used
     * ```
     */
    addOption(name: string, description?: string): void {
        this._options.push({ name: name, description: description, matchCount: 0 })
        this._parsed = false
    }

    /**
     * Registers a flag that accepts a value
     * 
     * Flags are options that require a value to be provided.
     * They support default values and can be specified multiple times
     * to create arrays of values.
     * 
     * @param name - The flag name (used as -name or --name)
     * @param defaultValue - Default value if flag is not provided
     * @param description - Help text describing the flag's purpose
     * 
     * @example
     * ```typescript
     * parser.addFlag("config", "./config.json", "Configuration file path")
     * parser.addFlag("output", undefined, "Output directory")
     * 
     * const configPath = parser.flag("config")  // Returns "./config.json" if not specified
     * const outputDir = parser.flag("output")   // Returns undefined if not specified
     * ```
     */
    addFlag(name: string, defaultValue?: string, description?: string): void {
        this._flags.push({ name: name, defaultValue: defaultValue, description: description, matchCount: 0 })
        this._parsed = false
    }

    /**
     * Programmatically sets a flag value
     * 
     * Allows setting flag values directly in code, useful for
     * testing or programmatic argument construction.
     * 
     * @param name - The flag name to set
     * @param value - The value to assign to the flag
     * 
     * @throws Error if the flag name is not registered
     */
    setFlag(name: string, value: string): void {
        this.parse()
        const flag = this._flags.first(t => t.name == name)
        if (!flag) {
            this.onError("Invalid flag " + name)
        }
        flag.matchCount++
        flag.value = value
    }

    /**
     * Programmatically sets an option as matched
     * 
     * Allows setting option states directly in code, useful for
     * testing or programmatic argument construction.
     * 
     * @param name - The option name to set
     * 
     * @throws Error if the option name is not registered
     */
    setOption(name: string): void {
        this.parse()

        const option = this._options.first(t => t.name == name)
        if (!option) {
            this.onError("Invalid option " + name)
        }

        option.matchCount++
    }

    /**
     * Programmatically adds a positional argument
     * 
     * Allows adding positional arguments directly in code, useful for
     * testing or programmatic argument construction.
     * 
     * @param arg - The argument value to add
     */
    setArg(arg: string): void {
        this.parse()
        this._arguments.push(arg)
    }

    /**
     * Gets a flag value
     * 
     * Returns the value of a flag, or its default value if not provided.
     * If the flag was specified multiple times, returns an array.
     * 
     * @param name - The flag name to retrieve
     * @returns The flag value, default value, or undefined if not set
     * 
     * @throws Error if the flag name is not registered
     * 
     * @example
     * ```typescript
     * parser.addFlag("input", "stdin", "Input source")
     * const input = parser.flag("input")  // Returns provided value or "stdin"
     * ```
     */
    flag(name: string): string | undefined {
        this.parse()

        const flag = this._flags.first(t => t.name == name)
        if (!flag) {
            this.onError("Invalid flag " + name)
        }

        if (flag.matchCount) {
            return flag.value
        }

        if (flag.defaultValue) {
            return flag.defaultValue
        }

        return undefined
    }

    /**
     * Gets a flag value as an integer
     * 
     * Convenience method that retrieves a flag value and converts
     * it to an integer. Returns undefined if the flag has no value.
     * 
     * @param name - The flag name to retrieve
     * @returns The flag value as an integer, or undefined if not set
     * 
     * @throws Error if the flag name is not registered
     * 
     * @example
     * ```typescript
     * parser.addFlag("port", "8080", "Server port number")
     * const port = parser.flagInt("port")  // Returns 8080
     * ```
     */
    flagInt(name: string): number | undefined {
        const value = this.flag(name)
        if (value && typeof value === "string") {
            return convert.toInt(value)
        }
        return undefined
    }

    /**
     * Checks if an option was provided
     * 
     * Returns true if the option was found in the command-line arguments.
     * 
     * @param name - The option name to check
     * @returns True if the option was provided, false otherwise
     * 
     * @throws Error if the option name is not registered
     * 
     * @example
     * ```typescript
     * parser.addOption("verbose", "Enable verbose output")
     * if (parser.option("verbose")) {
     *     console.log("Verbose mode enabled")
     * }
     * ```
     */
    option(name: string): boolean {
        this.parse()

        const option = this._options.first(t => t.name == name)
        if (!option) {
            this.onError("Invalid option " + name)
        }

        return option.matchCount > 0
    }

    /**
     * Gets the number of times an option was specified
     * 
     * Returns the count of how many times an option appeared
     * in the command-line arguments. Useful for options like
     * -v -v -v for increasing verbosity levels.
     * 
     * @param name - The option name to count
     * @returns The number of times the option was specified
     * 
     * @throws Error if the option name is not registered
     * 
     * @example
     * ```typescript
     * parser.addOption("v", "Increase verbosity")
     * const verboseLevel = parser.optionCount("v")  // 0, 1, 2, 3...
     * ```
     */
    optionCount(name: string): number {
        this.parse()

        const option = this._options.first(t => t.name == name)
        if (!option) {
            this.onError("Invalid option " + name)
        }

        return option.matchCount
    }

    /**
     * Gets all positional arguments
     * 
     * Returns an array of all positional arguments found in the
     * command line. Validates that required arguments are present.
     * 
     * @returns Array of all positional argument values
     * 
     * @throws Error if required arguments are missing
     * 
     * @example
     * ```typescript
     * parser.addArg("input", true)
     * parser.addArg("output", false)
     * const allArgs = parser.args()  // ["input.txt", "output.txt"]
     * ```
     */
    args(): string[] {
        this.parse()

        if (this.expectedArgs.length > 0) {
            const requiredCount = this.expectedArgs.count(t => t.required)
            if (this._arguments.length < requiredCount) {
                this.onError(fmt.sprintf("expected %s arguments, got %s", requiredCount, this._arguments.length))
            }
        }

        return this._arguments
    }

    /**
     * Gets a positional argument by index or name
     * 
     * Retrieves a specific positional argument either by its numeric
     * index or by the name defined with addArg().
     * 
     * @param i - The argument index (0-based) or name identifier
     * @returns The argument value, or null if not found
     * 
     * @throws Error if a string name is provided but not registered
     * 
     * @example
     * ```typescript
     * parser.addArg("input-file")
     * parser.addArg("output-file")
     * 
     * const input1 = parser.arg(0)           // By index
     * const input2 = parser.arg("input-file") // By name
     * const output = parser.arg("output-file")
     * ```
     */
    arg(i?: number | string): string | null {
        if (typeof i === "string") {
            const index = this.expectedArgs.firstIndex(t => t.name == i)
            if (index == -1) {
                this.onError(fmt.sprintf("invalid argument %s", i))
            }
            i = index
        }

        this.parse()

        if (i == null) {
            i = 0
        }

        if (this._arguments.length <= i) {
            return null
        }

        return this._arguments[i]
    }

    /**
     * Displays usage information and help text
     * 
     * Prints formatted help information including error messages,
     * usage examples, descriptions, and all available options and flags.
     * 
     * @param errMessage - Optional error message to display before usage
     * 
     * @example
     * ```typescript
     * parser.usage("Invalid argument provided")
     * // Output:
     * // Invalid argument provided
     * //
     * // Usage:
     * //   program [options] <args>
     * //
     * //  -v, --verbose    Enable verbose output
     * //  -f, --file       Input file path [value]
     * ```
     */
    usage(errMessage?: string): void {
        if (errMessage) {
            fmt.println(errMessage)
            fmt.println()
        }

        fmt.println("Usage:")

        if (this.usageText) {
            fmt.println()
            fmt.println(this.usageText.replaceAll("$1", runtime.executable))
            fmt.println()
        }

        if (this.descriptionLines) {
            fmt.println(this.descriptionLines.join("\n"))
            fmt.println()
        }

        const allOptions = this._flags.append(this._options)
        allOptions.sort((a, b) => a.name.toLowerCase() < b.name.toLowerCase())

        const padding = allOptions.max(t => t.name.length) + 3

        for (const opt of allOptions) {
            const prefix = opt.name.length > 1 ? " --" : " -"
            const name = (prefix + opt.name).leftPad(" ", padding)

            if (opt.value) {
                fmt.println(name + " ", opt.description, "[value]")
            } else {
                fmt.println(name + " ", opt.description)
            }
        }
    }

    /**
     * Preprocesses command-line arguments for parsing
     * 
     * Expands combined short options (e.g., -abc becomes -a -b -c)
     * while preserving long options and regular arguments.
     * 
     * @param args - Raw command-line arguments
     * @returns Preprocessed arguments ready for parsing
     * 
     * @internal
     */
    private parseArgs(args: string[]): string[] {
        const parsed: string[] = []

        for (const arg of args) {
            if (arg.startsWith("--")) {
                parsed.push(arg)
                continue
            }

            if (arg.startsWith("-") && arg.length > 2) {
                for (const v of arg.substring(1).splitClean("")) {
                    parsed.push("-" + v)
                }
                continue
            }

            parsed.push(arg)
        }

        return parsed
    }

    /**
     * Parses the command-line arguments
     * 
     * Processes all arguments to identify flags, options, and positional
     * arguments. Handles automatic help (-h) and validates argument formats.
     * 
     * @internal
     */
    private parse(): void {
        if (this._parsed) {
            return
        }
        this._parsed = true
        const args = this._args

        for (let i = 0, l = args.length; i < l; i++) {
            const arg = args[i]

            if (arg.startsWith("-")) {
                const name = arg.trimLeft("-")
                const flag = this._flags.first(t => t.name == name)

                if (flag) {
                    flag.matchCount++
                    if (args.length <= i + 1) {
                        this.onError("Flag without argument: " + name)
                    }
                    const value = args[i + 1]

                    if (flag.value) {
                        if (reflect.typeOf(flag.value) == "string") {
                            flag.value = [flag.value]
                        }
                        flag.value.push(value)
                    } else {
                        flag.value = value
                    }
                    i++
                    continue
                }

                const option = this._options.first(t => t.name == name)
                if (option) {
                    option.matchCount++
                    continue
                }

                // Automatic help option
                if (arg == "-h") {
                    this.usage()
                    os.exit(0)
                }

                this.onError("Invalid flag " + arg)
            }

            this._arguments.push(arg)
        }
    }

    /**
     * Handles parsing errors
     * 
     * Either throws an error (if throwErrors is true) or prints
     * the error message, shows usage information, and exits.
     * 
     * @param err - The error message to display
     * 
     * @internal
     */
    private onError(err: string): void {
        if (this.throwErrors) {
            throw err
        }
        fmt.println(err)
        this.usage()
        os.exit(1)
    }
}


/**
 * Represents a named command-line argument definition
 */
interface Argument {
    /** The name identifier for the argument */
    name: string
    /** Whether this argument is required for successful parsing */
    required: boolean
}

/**
 * Represents a command-line option (boolean switch)
 */
interface Option {
    /** The option name (without dashes) */
    name: string
    /** Optional help text describing the option's purpose */
    description?: string
    /** Number of times this option was matched in arguments */
    matchCount: number
}

/**
 * Represents a command-line flag (option with value)
 * 
 * Extends Option to include value handling for flags
 * that require parameters.
 */
interface Flag extends Option {
    /** The current value(s) of the flag */
    value?: any
    /** Default value if the flag is not provided */
    defaultValue?: string
}