/**
 * ------------------------------------------------------------------
 * Native definitions.
 * ------------------------------------------------------------------
 */

// for the ts compiler
interface Number { }
interface Boolean { }
interface Function { }
interface IArguments { }
interface Object { }
interface byte { }

declare const Symbol: symbol





 
declare namespace Array {
    /**
     * Checks if the given value is an array.
     * @param v - The value to check.
     * @returns True if the value is an array.
     * @example
     * console.writeline(Array.isArray([1, 2, 3])) // true
     */
    export function isArray(v: any): boolean
}

interface Array<T> {
    [n: number]: T

    /**
     * Returns a portion of the array based on start and count.
     */
    slice(start?: number, count?: number): Array<T>

    /**
     * Returns a copy of part or all of the array.
     */
    clone(start?: number, count?: number): Array<T>

    /**
     * Returns a new array containing elements from start to end index.
     */
    range(start?: number, end?: number): Array<T>

    /**
     * Returns a new array with the given values appended.
     */
    append(v: T[]): T[]

    /**
     * Combines the array with other arrays and/or values.
     * @param items Arrays and/or values to concatenate.
     * @returns A new array containing all elements.
     */
    concat(...items: (T | T[])[]): T[]

    /**
     * Adds elements to the end of the array.
     */
    push(...v: T[]): void

    /**
     * Pushes all values from another array.
     */
    pushRange(v: T[]): void

    /**
     * Copies the values into the array at a specific index.
     */
    copyAt(i: number, v: T[]): void

    /**
     * The number of elements in the array.
     */
    length: number

    /**
     * Inserts a value at the specified index.
     */
    insertAt(i: number, v: T): void

    /**
     * Removes an element at the specified index.
     */
    removeAt(i: number): void

    /**
     * Removes a range of elements from index from to to.
     */
    removeAt(from: number, to: number): void

    /**
     * Removes elements where the function returns true. Returns removed items.
     */
    removeWhere(func: (t: T) => any): Array<T>

    /**
     * Returns the index of the given value, or -1 if not found.
     */
    indexOf(v: T): number

    /**
     * Returns the last index at which a given element can be found, or -1 if not found.
     * @param searchElement Element to locate in the array.
     * @param fromIndex The position in the array at which to start searching backwards.
     */
    lastIndexOf(searchElement: T, fromIndex?: number): number

    /**
     * Determines whether an array includes a certain element.
     * @param searchElement Element to search for.
     * @param fromIndex The position in the array at which to begin searching.
     */
    includes(searchElement: T, fromIndex?: number): boolean

    /**
     * Tests whether at least one element in the array passes the test implemented by the provided function.
     * @param callback A function that tests each element.
     * @returns true if the callback function returns a truthy value for at least one element; otherwise, false.
     */
    some(callback: (element: T, index: number, array: Array<T>) => any): boolean

    /**
     * Joins the array into a single string using a separator.
     */
    join(sep?: string): T

    /**
     * Sorts the array using a comparison function (non-stable).
     */
    sort(comprarer: (a: T, b: T) => boolean | number): void

    /**
     * Sorts the array using a comparison function (stable).
     */
    sortStable(comprarer: (a: T, b: T) => boolean | number): void

    /**
     * Checks if another array has the same values in the same order.
     */
    equals(other: Array<T>): boolean

    /**
     * Returns true if any element satisfies the condition.
     */
    any(func: (t: T) => any): boolean

    /**
     * Returns true if all elements satisfy the condition.
     */
    all(func: (t: T) => any): boolean

    /**
     * Returns true if the array contains the given value.
     */
    contains<T>(t: T): boolean

    /**
     * Removes the first occurrence of the value from the array.
     */
    remove<T>(t: T): void

    /**
     * Returns the first element, or the first that matches the condition.
     */
    first(): T
    first(func?: (t: T) => any): T

    /**
     * Returns the last element, or the last that matches the condition.
     */
    last(): T
    last(func?: (t: T) => any): T

    /**
     * Removes and returns the last element of the array.
     */
    pop(): T

    /**
     * Removes and returns the first element of the array.
     * @returns The first element, or undefined if the array is empty.
     */
    shift(): T | undefined

    /**
     * Adds one or more elements to the beginning of the array.
     * @param items Elements to add to the beginning of the array.
     * @returns The new length of the array.
     */
    unshift(...items: T[]): number

    /**
     * Clears all elements in the array.
     */
    clear(): void

    /**
     * Changes the contents of an array by removing or replacing existing elements and/or adding new elements in place.
     * @param start The index at which to start changing the array.
     * @param deleteCount The number of elements to remove.
     * @param items Elements to add to the array, beginning from start.
     * @returns An array containing the deleted elements.
     */
    splice(start: number, deleteCount?: number, ...items: T[]): T[]

    /**
     * Returns the index of the first element that matches the condition.
     */
    firstIndex(func: (t: T) => any): number

    /**
     * Maps each element using the given function.
     */
    select<K>(func: (t: T) => K): Array<K>

    /**
     * Maps and flattens the array by one level.
     */
    selectMany<K>(func: (t: T) => K): K

    /**
     * Removes duplicate values based on a key function.
     */
    distinct<K>(func?: (t: any) => K): Array<K>

    /**
     * Returns elements that match the condition.
     */
    where(func: (t: T) => any): Array<T>

    /**
     * Executes a provided function once for each array element.
     * @param callback Function to execute for each element, taking (element, index, array) as arguments.
     */
    forEach(callback: (element: T, index: number, array: Array<T>) => void): void

    /**
     * Groups elements using a key function.
     */
    groupBy(func: (t: T) => any): KeyIndexer<T[]>

    /**
     * Sums all values in the array, or results of a mapping function.
     */
    sum<K extends number>(): number
    sum<K extends number>(func: (t: T) => K): number

    /**
     * Returns the minimum value or mapped result.
     */
    min(func?: (t: T) => number): number

    /**
     * Returns the maximum value or mapped result.
     */
    max(func?: (t: T) => number): number

    /**
     * Counts elements that match the condition.
     */
    count(func: (t: T) => any): number

	reduce<U>(func: (total: U, item: T) => U, initialValue: U): U;
}

declare namespace array {
    /**
     * Creates a new array with the specified size and optional capacity.
     * @param size - Number of elements.
     * @param capacity - Optional internal capacity.
     */
    export function make<T>(size: number, capacity?: number): Array<T>

    /**
     * Creates a new byte array of given size and optional capacity.
     * @param size - Number of bytes.
     * @param capacity - Optional internal capacity.
     */
    export function bytes(size: number, capacity?: number): byte[]
}




	



declare namespace assert {
	/**
	 * Ensures the string search is contained within value.
	 * Throws if not.
	 */
	export function contains(search: string, value: string, errorMessage?: string): void

	/**
	 * Ensures a and b are equal using deep equality.
	 * If not, throws an error with errorMessage if provided.
	 */
	export function equal(a: any, b: any, errorMessage?: string): void

	/**
	 * Ensures the value is strictly true.
	 * Throws if not.
	 */
	export function isTrue(a: boolean, errorMessage?: string): void

	/**
	 * Ensures the value is strictly false.
	 * Throws if not.
	 */
	export function isFalse(a: boolean, errorMessage?: string): void

	/**
	 * Ensures the value is null or undefined.
	 * Throws if not.
	 */
	export function isNull(a: any, errorMessage?: string): void

	/**
	 * Ensures the value is not null or undefined.
	 * Throws if it is.
	 */
	export function isNotNull(a: any, errorMessage?: string): void

	/**
	 * Runs the provided function and ensures it throws an error containing msg.
	 * If no error is thrown or the error does not contain the message, it fails.
	 */
	export function exception(msg: string, func: Function): void

	/**
	 * Converts the given value to an integer or throws with the provided error message.
	 */
	export function int(a: any, msg: string): number

	/**
	 * Converts the given value to a float or throws with the provided error message.
	 */
	export function float(a: any, msg: string): number

	/**
	 * Converts the given value to a string or throws with the provided error message.
	 */
	export function string(a: any, msg: string): string

	/**
	 * Converts the given value to a boolean or throws with the provided error message.
	 */
	export function bool(a: any, msg: string): boolean

	/**
	 * Ensures the value is an object (map).
	 * Throws with the provided error message if not.
	 */
	export function object(a: any, msg: string): Record<string, any>
}





/**
 * Asynchronously runs a function or closure in a separate execution context.
 * 
 * The function will be executed in a clone of the current virtual machine (VM),
 * ensuring isolation from the main thread. This allows for concurrent execution,
 * but the main thread will not wait for its completion.
 * 
 * Only functions, closures, or methods are accepted as input. Passing any other
 * value will throw a runtime error.
 * 
 * This function requires the async permission to be enabled in the runtime.
 * 
 * Example:
 * 
 *     go(function() {
 *         console.writeline("Running in parallel")
 *     })
 * 
 * @param f A function, closure, or method to execute asynchronously.
 */
declare function go(f: Function): void

	



/**
 * Atomic operations for thread-safe integer operations.
 * 
 * IMPORTANT: These functions use value semantics - you MUST assign the return 
 * values back to your variables or the changes will be lost.
 * 
 * @example
 * // WRONG - changes are lost:
 * let counter = 0;
 * atomic.addInt(counter, 1);     // counter is still 0!
 * 
 * // CORRECT - assign the return value:
 * counter = atomic.addInt(counter, 1);  // counter is now 1
 */
declare namespace atomic {
 
    /**
     * Atomically adds a value to an integer and returns the new result.
     * You MUST assign the return value back to your variable.
     * 
     * @param i - The current integer value
     * @param value - The value to add (can be positive or negative)
     * @returns The new computed value (i + value)
     * 
     * @example
     * let counter = 10;
     * counter = atomic.addInt(counter, 5);   // counter becomes 15
     * counter = atomic.addInt(counter, -3);  // counter becomes 12
     */
    export function addInt(i: number, value: number): number
    
    /**
     * Atomically stores a new value and returns it.
     * You MUST assign the return value back to your variable.
     * 
     * @param i - The current integer value (ignored, kept for API consistency)
     * @param value - The new value to store
     * @returns The stored value
     * 
     * @example
     * let counter = 10;
     * counter = atomic.storeInt(counter, 42);  // counter becomes 42
     */
    export function storeInt(i: number, value: number): number
    
    /**
     * Atomically loads and returns the current value of an integer.
     * 
     * @param i - The integer value to read
     * @returns The current value
     * 
     * @example
     * let counter = 42;
     * let value = atomic.loadInt(counter);  // value is 42
     */
    export function loadInt(i: number): number

}




	
/**
 * Provides base64 encoding and decoding functions.
 *
 * This namespace supports both padded and unpadded variants of standard and URL-safe base64.
 * The input can be a string or a byte array. Null or undefined inputs return null.
 */
declare namespace base64 {
    /**
     * Encodes the input using base64 without padding.
     *
     * @param s A string or byte array to encode.
     * @returns A base64-encoded string without padding.
     */
    export function encode(s: any): string

    /**
     * Encodes the input using base64 with standard padding.
     *
     * @param s A string or byte array to encode.
     * @returns A base64-encoded string with padding.
     */
    export function encodeWithPadding(s: any): string

    /**
     * Decodes a base64 string without padding.
     *
     * @param s A base64-encoded string.
     * @returns The decoded byte array.
     */
    export function decode(s: any): byte[]

    /**
     * Decodes a base64 string with standard padding.
     *
     * @param s A base64-encoded string with padding.
     * @returns The decoded byte array.
     */
    export function decodeWithPadding(s: any): byte[]

    /**
     * Encodes the input using URL-safe base64 with padding.
     *
     * @param s A string or byte array to encode.
     * @returns A URL-safe base64-encoded string with padding.
     */
    export function encodeURLWithPadding(s: any): string
}





	
declare namespace binary {
    export function putInt16LittleEndian(v: byte[], n: number): void
    export function putInt32LittleEndian(v: byte[], n: number): void
    export function putInt64LittleEndian(v: byte[], n: number): void

    export function putInt16BigEndian(v: byte[], n: number): void
    export function putInt32BigEndian(v: byte[], n: number): void
    export function putInt64BigEndian(v: byte[], n: number): void

    export function int16LittleEndian(v: byte[]): number
    export function int32LittleEndian(v: byte[]): number
    export function int64LittleEndian(v: byte[]): number

    export function int16BigEndian(v: byte[]): number
    export function int32BigEndian(v: byte[]): number
    export function int64BigEndian(v: byte[]): number
}
 



	
declare namespace bufio {
    export function newWriter(w: io.Writer): Writer
    export function newScanner(r: io.Reader): Scanner
    export function newReader(r: io.Reader): Reader

    export interface Writer {
        write(data: byte[]): number
        writeString(s: string): number
        writeByte(b: byte): void
        writeRune(s: string): number
        flush(): void
    }

    export interface Scanner {
        scan(): boolean 
        text(): string
    }

    export interface Reader {
        readString(delim: byte): string
        readBytes(delim: byte): byte[]
        readByte(): byte
        readRune(): number
    }
}





declare namespace ast {
	export interface Program {
		string(): string
	}
}
	
declare namespace bytecode {
    /**
     * 
     * @param path 
     * @param fileSystem 
     * @param scriptMode if statements outside of functions are allowed.
     */
	export function compile(path: string, fileSystem?: io.FileSystem): runtime.Program
	
	export function hash(path: string, fileSystem?: io.FileSystem): string

    export function compileStr(code: string): runtime.Program

    export function parseStr(code: string): ast.Program

    /**
     * Load a binary program from the file system
     * @param path the path to the main binary.
     * @param fs the file trusted. If empty it will use the current fs.
     */
    export function load(path: string, fs?: io.FileSystem): runtime.Program

    export function loadProgram(b: byte[]): runtime.Program
    export function readProgram(r: io.Reader): runtime.Program
    export function writeProgram(w: io.Writer, p: runtime.Program): void
}




declare namespace bytes {
	export function newReader(b: byte[]): io.Reader
	export function replace(s: byte[], old: byte[], newBytes: byte[], n: number): byte[]
	export function replaceAll(s: byte[], old: byte[], newBytes: byte[]): byte[]
}	



	
declare namespace caching {
 
    export function newCache(d?: time.Duration | number): Cache

    export interface Cache {
        get(key: string): any | null
        getWithExpiration(key: string): any | null
        save(key: string, v: any): void
        delete(key: string): void
        keys(): string[]
		values(): any[]
        items(): Map<any>
        clear(): void
    }
}





/**
 * The console namespace provides logging and debug utilities.
 * It includes support for standard logging, conditional debug output,
 * and optional stack trace line prefixes.
 */
declare namespace console {
    /**
     * Prints one or more values to standard output.
     *
     * Supports primitives, strings, and JSON-serializable objects.
     * Each value is separated by a space. Complex objects are pretty-printed.
     *
     * @param v Values to print.
     */
    export function log(...v: any[]): void

    /**
     * Enables printing of the source line (stack trace) before each log message.
     */
    export function enableTrace(): void

    /**
     * Disables printing of the source line before each log message.
     */
    export function disableTrace(): void

    /**
     * Prints debug messages if debug mode is enabled.
     *
     * If debug is not enabled via enableDebug, this function does nothing.
     *
     * @param v Debug values to print.
     */
    export function debug(...v: any[]): void

    /**
     * Enables debug output for console.debug.
     */
    export function enableDebug(): void

    /**
     * Disables debug output for console.debug.
     */
    export function disableDebug(): void
}





/**
 * Parses a string and returns an integer.
 * 
 * Parses a string argument and returns an integer of the specified radix (base).
 * - Ignores leading whitespace
 * - Stops parsing when it encounters a non-digit character
 * - Returns NaN if the first non-whitespace character cannot be converted to a number
 * - If no radix is specified, base 10 is assumed (except for strings starting with "0x" which are treated as hex)
 * - Radix must be between 2 and 36, otherwise returns NaN
 * 
 * @param string - The string to parse
 * @param radix - An integer between 2 and 36 that represents the radix (base) of the string. If undefined or 0, base 10 is assumed unless the string starts with "0x" (hex)
 * @returns The parsed integer, or NaN if parsing fails
 * 
 * @example
 * parseInt("123") // 123
 * parseInt("123.45") // 123 (stops at decimal point)
 * parseInt("123abc") // 123 (stops at first non-digit)
 * parseInt("abc123") // NaN (first character is not a digit)
 * parseInt("   456") // 456 (ignores leading whitespace)
 * parseInt("FF", 16) // 255 (hexadecimal)
 * parseInt("1010", 2) // 10 (binary)
 * parseInt("0x1F") // 31 (auto-detects hex)
 * parseInt("") // NaN
 */
function parseInt(string: string, radix?: number): number;

/**
 * Parses a string and returns a floating point number.
 * 
 * Parses a string argument and returns a floating point number.
 * - Ignores leading whitespace
 * - Stops parsing when it encounters a character that is not part of a number
 * - Returns NaN if the first non-whitespace character cannot be converted to a number
 * - Supports decimal numbers and scientific notation (e.g., "1.23e10")
 * 
 * @param string - The string to parse
 * @returns The parsed floating point number, or NaN if parsing fails
 * 
 * @example
 * parseFloat("123") // 123
 * parseFloat("123.45") // 123.45
 * parseFloat("123.45abc") // 123.45 (stops at first non-numeric)
 * parseFloat("abc123.45") // NaN (first character is not a digit)
 * parseFloat("   3.14") // 3.14 (ignores leading whitespace)
 * parseFloat("3.14e2") // 314 (scientific notation)
 * parseFloat("") // NaN
 * parseFloat("Infinity") // Infinity
 * parseFloat("-Infinity") // -Infinity
 */
function parseFloat(string: string): number;

/**
 * The convert namespace provides utility functions to convert between different types.
 */
declare namespace convert {
    /**
     * Converts a string, number, rune, or function info to an integer.
     *
     * @param v A string (parsed as base-10 or base-prefixed), number, or runtime function info.
     * @returns The parsed or converted integer.
     * @throws If the value cannot be converted.
     */
    export function toInt(v: string | number | runtime.FunctionInfo): number

    /**
     * Converts a string or number to a floating-point number.
     *
     * @param v A string or number.
     * @returns The resulting float.
     * @throws If the value cannot be parsed as a float.
     */
    export function toFloat(v: string | number): number

    /**
     * Converts any value to its string representation.
     *
     * @param v Any value.
     * @returns A string representing the value.
     */
    export function toString(v: any): string

    /**
     * Converts a string of length 1 or a number (0–255) to a rune (1-character string).
     *
     * @param v A string or number.
     * @returns A single-character string.
     * @throws If the value is not convertible to a rune.
     */
    export function toRune(v: any): string

    /**
     * Converts strings like 'true', 'false', '1', '0' or numbers 0/1 to a boolean.
     *
     * @param v A string, number, or boolean.
     * @returns The resulting boolean.
     * @throws If the value cannot be interpreted as a boolean.
     */
    export function toBool(v: string | number | boolean): boolean

    /**
     * Converts a string or byte array to a byte array.
     *
     * @param v A string or byte array.
     * @returns A byte array.
     * @throws If the value is not a string or byte array.
     */
    export function toBytes(v: string | byte[]): byte[]

    /**
     * Converts a value into a "safe" string. For byte arrays, returns a base64 string.
     * Null or undefined become an empty string. Other values are converted normally.
     *
     * @param v Any value.
     * @returns A string that safely represents the input.
     */
    export function toSafeString(v: any): string
}






declare namespace crypto {
    export function signSHA1_RSA_PCKS1(privateKey: string, value: string): byte[]

    export function signTempSHA1(value: string): string
    export function checkTempSignSHA1(value: string, hash: string): boolean

    export function signSHA1(value: string): string
    export function checkSignSHA1(value: string, hash: string): boolean

	// Uses an internal salt
    export function signSHA1Salted(value: string): string
	
	// Uses an internal salt
    export function checkSignSHA1Salted(value: string, hash: string): boolean

    export function setGlobalPassword(pwd: string): void
    export function encrypt(value: byte[], pwd?: byte[]): byte[]
    export function decrypt(value: byte[], pwd?: byte[]): byte[]
    export function encryptTripleDES(value: byte[] | string, pwd?: byte[] | string): byte[]
    export function decryptTripleDES(value: byte[] | string, pwd?: byte[] | string): byte[]
    export function encryptString(value: string, pwd?: string): string
    export function decryptString(value: string, pwd?: string): string
    export function hashSHA(value: string): string
    export function hashSHA256(value: string): string
    export function hashSHA512(value: string): string
    export function hmacSHA256(value: byte[] | string, pwd?: byte[] | string): byte[]
    export function hmacSHA512(value: byte[] | string, pwd?: byte[] | string): byte[]
    export function hashPassword(pwd: string): string
    export function compareHashAndPassword(hash: string, pwd: string): boolean
	export function rand(n: number): number
    export function random(len: number): byte[]
    export function randomAlphanumeric(len: number): string
}






declare namespace csv {
    export function newReader(r: io.Reader): Reader
    export interface Reader {
		comma: string
		lazyQuotes: boolean
        read(): string[]
    }

    export function newWriter(r: io.Writer): Writer
    export interface Writer {
        comma: string
        write(v: (string | number)[]): void
        flush(): void
    }
}



	
declare namespace encoding {
    export interface Decoder {
        reader(r: io.Reader): io.Reader
    }
    export interface Encoder {
		writer(r: io.Writer): io.Writer
		string(s: string): string
    }

    export function newDecoderISO8859_1(): Decoder
    export function newEncoderISO8859_1(): Encoder
    export function newDecoderWindows1252(): Decoder
    export function newEncoderWindows1252(): Encoder
    export function newDecoderUTF16_LE(): Decoder
    export function newEncoderUTF16_LE(): Encoder
    export function newDecoderCP850(): Decoder
    export function newEncoderCP850(): Encoder
}





declare namespace errors {
	/**
	 * Creates a new error with a message and optional formatting arguments.
	 * @param msg - The error message.
	 * @param args - Optional values to format the message.
	 * @returns A new Error object.
	 * @example
	 * const err = errors.newError("Failed to load user: %s", userId)
	 */
	export function newError(msg: string, ...args: any[]): Error

	/**
	 * Creates a new error with a numeric code, a message, and optional arguments.
	 * @param code - A custom numeric error code.
	 * @param msg - Optional message format.
	 * @param args - Values to format the message.
	 * @returns A new Error object with the specified code.
	 */
	export function newCode(code: number, msg?: string, ...args: any[]): Error

	/**
	 * Wraps an existing error with a new message.
	 * @param msg - Additional message context.
	 * @param err - The original error.
	 * @returns A wrapped Error.
	 */
	export function wrap(msg: string, err: Error): Error

	/**
	 * Wraps an existing error with a code and a new message.
	 * @param code - Custom error code.
	 * @param msg - Context message.
	 * @param err - The original error.
	 * @returns A wrapped Error with a code.
	 */
	export function wrapCode(code: number, msg: string, err: Error): Error

	/**
	 * Returns the error wrapped inside another error, if any.
	 * @param err - A wrapped error.
	 * @returns The original inner error or null.
	 */
	export function unwrap(err: Error): Error

	/**
	 * Checks whether an error matches a specific kind.
	 * @param err - The error to check.
	 * @param type - The error kind to match.
	 * @returns True if the kind matches.
	 * @example
	 * if (errors.is(err, "NotFound")) { ... }
	 */
	export function is(err: Error, type: string): boolean

	/**
	 * Modifies an error to include more details and marks it as rethrown.
	 * @param err - The error to rethrow.
	 * @param details - Optional message with format placeholders.
	 * @param args - Optional values for formatting.
	 */
	export function rethrow(err: Error, details?: string, ...args: any[]): void

	/**
	 * Creates a 404 "Not Found" error.
	 * @param msg - Optional message format.
	 * @param args - Format values.
	 */
	export function notFound(msg?: string, ...args: any[]): Error

	/**
	 * Creates a 400 "Bad Request" error.
	 * @param msg - Optional message format.
	 * @param args - Format values.
	 */
	export function badRequest(msg?: string, ...args: any[]): Error

	/**
	 * Creates a 401 "Unauthorized" error.
	 * @param msg - Optional message format.
	 * @param args - Format values.
	 */
	export function unauthorized(msg?: string, ...args: any[]): Error

	/**
	 * Creates a 500 "Internal Server Error".
	 * @param msg - Optional message format.
	 * @param args - Format values.
	 */
	export function internalError(msg?: string, ...args: any[]): Error

	/**
	 * Creates an actionable error with UI metadata for user feedback.
	 * @param args - An object containing metadata to describe the error and user actions.
	 * @returns A wrapped Error.
	 * @example
	 * const err = errors.action({ error: "Quota exceeded", url: "/upgrade", urlLabel: "Upgrade now" })
	 */
	export function action(args: ActionError): Error

	export interface ActionError {
		error?: string
		code?: number

		/** Optional URL to show in the UI */
		url?: string
		urlLabel?: string

		/** Show as a modal dialog instead of a toast */
		modal?: boolean
		title?: string
		destructive?: boolean
		okLabel?: string

		/** Allow user to force the action */
		allowForce?: boolean

		/** Internal: callback if user confirms force */
		forceFunc?: Function

		forceKey?: string

		/** Custom UI renderer function name and args */
		renderFunc?: string
		renderFuncArgs?: any

		/** List of fields that caused the error */
		fields?: Map<string>
	}

	export interface Error {
		/** Error code associated with this error. */
		readonly code: number

		/** Kind or type of the error (e.g., NotFound, InternalError). */
		readonly kind: string

		/** Main error message. */
		readonly message: string

		/** Additional details about the error. */
		details: string

		/** Program counter address where error occurred. */
		readonly pc: number

		/** String containing the call stack. */
		readonly stackTrace: string

		/**
		 * Converts the error to a string.
		 * @returns A string representation.
		 */
		string(): string

		/**
		 * Checks if the error matches a given kind.
		 * @param error - Error kind name.
		 * @returns True if matched.
		 */
		is(error: string): boolean
	}
}






declare namespace filepath {
    /**
     * Cleans the path, removing redundant separators and up-level references.
     * The path must be absolute (starting with a slash).
     * @param path - The input path string.
     * @returns A normalized path string.
     * @example
     * const p = filepath.clean("/a/b/../c") // "/a/c"
     */
    export function clean(path: string): string

    /**
     * Returns the file extension of the given path, including the dot.
     * If the path has no extension, returns an empty string.
     * @param path - The file path.
     * @returns The extension, e.g., ".txt"
     * @example
     * const ext = filepath.ext("/files/report.pdf") // ".pdf"
     */
    export function ext(path: string): string

    /**
     * Resolves a relative path to an absolute path, using the virtual file system.
     * @param path - The path to resolve.
     * @returns The absolute path.
     * @example
     * const abs = filepath.abs("docs/readme.md")
     */
    export function abs(path: string): string

    /**
     * Returns the last element of the path (e.g., the file or directory name).
     * If the path is empty, returns ".".
     * If the path consists only of separators, returns a single separator.
     * @param path - The full path.
     * @returns The base name.
     * @example
     * const name = filepath.base("/foo/bar.txt") // "bar.txt"
     */
    export function base(path: string): string

    /**
     * Returns the file name without directory and extension.
     * @param path - The full file path.
     * @returns The file name without extension.
     * @example
     * const name = filepath.baseWithoutExt("/foo/bar.txt") // "bar"
     */
    export function baseWithoutExt(path: string): string

    /**
     * Replaces the extension of a file path.
     * If the file has no extension, appends the new one.
     * @param path - The original path.
     * @param ext - The new extension, including the dot (e.g., ".md").
     * @returns The updated path.
     * @example
     * const updated = filepath.replaceExt("/foo/file.txt", ".md") // "/foo/file.md"
     */
    export function replaceExt(path: string, ext: string): string

    /**
     * Returns the directory portion of the given path.
     * @param path - The full file path.
     * @returns The directory name.
     * @example
     * const d = filepath.dir("/foo/bar.txt") // "/foo"
     */
    export function dir(path: string): string

    /**
     * Joins multiple path parts into a single path.
     * Ignores nil or empty parts. Does not reset on absolute paths.
     * @param parts - One or more path fragments.
     * @returns A combined path.
     * @example
     * const path = filepath.join("foo", "bar", "baz.txt") // "foo/bar/baz.txt"
     */
    export function join(...parts: string[]): string

    /**
     * Joins path segments while respecting absolute path overrides.
     * If any part is absolute, it resets the base path.
     * @param parts - One or more path segments.
     * @returns A path that respects absolute overrides.
     * @example
     * const path = filepath.joinAbs("base", "/override", "final") // "/override/final"
     */
    export function joinAbs(...parts: string[]): string
}






declare namespace fileutil { 
    export function copyFile(src: string, dst: string, fs?: io.FileSystem): byte[]
	export function isDirEmpty(path: string, fs?: io.FileSystem): boolean
}




declare namespace fmt {
    export function print(...n: any[]): void
    export function println(...n: any[]): void
    export function printf(format: string, ...params: any[]): void
    export function sprintf(format: string, ...params: any[]): string
	export function fprintf(w: io.Writer, format: string, ...params: any[]): void
	
    export function errorf(format: string, ...params: any[]): errors.Error
    export function codeErrorf(code: number, format: string, ...params: any[]): errors.Error
}	
	



declare namespace fsnotify {
    export function newWatcher(onEvent: EventHandler): Watcher

    export type EventHandler = (e: Event) => void

	export interface Watcher {
		add(path: string, recursive?: boolean): void
		close(): void
	}
 
	export interface Event {
		name: string
		operation: number
	}

	// const (
	// 	Create Op = 1 << iota
	// 	Write
	// 	Remove
	// 	Rename
	// 	Chmod
	// )
}





declare namespace gzip {
    export function newWriter(w: io.Writer): io.WriterCloser
    export function newReader(r: io.Reader): io.ReaderCloser
}






declare namespace hash {
    export function newMD5(): Hash
    export function newSHA256(): Hash

    export interface Hash {
        write(b: byte[]): number
        sum(): byte[]
    }
}






declare namespace hex {
    export function encodeToString(b: byte[]): number
}






declare namespace html {
    export function encode(s: any): string
    export function decode(s: any): string
}








	declare namespace http {

	// =======================
	// Constants
	// =======================

	/**
	 * HTTP status code for a successful response (200 OK).
	 *
	 * Example:
	 * console.writeline(http.OK) // 200
	 */
	export const OK: number;

	/**
	 * HTTP status code for a permanent redirect (301 Moved Permanently).
	 */
	export const PERMANENT_REDIRECT: number;

	/**
	 * HTTP status code for a temporary redirect (302 Found).
	 */
	export const REDIRECT: number;

	/**
	 * HTTP status code for a bad request (400).
	 */
	export const BAD_REQUEST: number;

	/**
	 * HTTP status code for an unauthorized request (401).
	 */
	export const UNAUTHORIZED: number;

	/**
	 * HTTP status code for a resource not found (404).
	 */
	export const NOT_FOUND: number;

	/**
	 * HTTP status code for a request timeout (408).
	 */
	export const TIMEOUT: number;

	/**
	 * HTTP status code for a server internal error (500).
	 */
	export const INTERNAL_ERROR: number;

	/**
	 * HTTP status code for service unavailable (503).
	 */
	export const UNAVAILABLE: number;

	/**
	 * HTTP status code used to represent form-related errors (usually 400).
	 */
	export const FORM_ERROR: number;

	// =======================
	// Cookie SameSite modes
	// =======================

	/**
	 * SameSite policy enumeration for cookies.
	 */
	export type SameSite = number;

	/**
	 * Default SameSite mode.
	 */
	export const SameSiteDefaultMode: SameSite;

	/**
	 * Lax SameSite mode.
	 */
	export const SameSiteLaxMode: SameSite;

	/**
	 * Strict SameSite mode.
	 */
	export const SameSiteStrictMode: SameSite;

	/**
	 * None SameSite mode (used for cross-site cookies).
	 */
	export const SameSiteNoneMode: SameSite;


	// =======================
	// Core Functions
	// =======================

	/**
	 * Sends an HTTP GET request to the specified URL.
	 *
	 * @param url - The URL to request.
	 * @param timeout - Optional timeout in milliseconds or a time.Duration object.
	 * @param config - Optional TLS configuration.
	 * @returns The response body as a string.
	 *
	 * Example:
	 * const data = http.get("https://example.com")
	 * console.writeline(data)
	 */
	export function get(url: string, timeout?: time.Duration | number, config?: tls.Config): string

	/**
	 * Sends an HTTP POST request to the specified URL with optional form data.
	 *
	 * @param url - The target URL.
	 * @param data - Optional key-value map to send as form data.
	 * @param timeout - Optional timeout in milliseconds or a time.Duration object.
	 * @param config - Optional TLS configuration.
	 * @returns The response body as a string.
	 *
	 * Example:
	 * const result = http.post("https://api.example.com", { name: "John" })
	 * console.writeline(result)
	 */
	export function post(url: string, data?: any, timeout?: time.Duration | number, config?: tls.Config): string

	/**
	 * Uploads a file using HTTP POST with basic authentication.
	 *
	 * @param url - The target URL.
	 * @param user - Username for basic auth.
	 * @param password - Password for basic auth.
	 * @param paramName - The form field name for the file.
	 * @param fileName - Name of the file being uploaded.
	 * @param data - File content as a byte array.
	 * @returns The response body as a byte array.
	 */
	export function sendFile(url: string, user: string, password: string, paramName: string, fileName: string, data: byte[]): byte[]

	/**
	 * Sends a GET request and parses the response as JSON.
	 *
	 * @param url - The URL to fetch.
	 * @returns The parsed JSON object.
	 *
	 * Example:
	 * const user = http.getJSON("https://api.example.com/user")
	 * console.writeline(user.name)
	 */
	export function getJSON(url: string): any

	/**
	 * Returns the current cache breaker value.
	 *
	 * @returns A random string used to break HTTP cache.
	 */
	export function cacheBreaker(): string

	/**
	 * Resets the cache breaker value and updates lastModifiedDate.
	 *
	 * @returns The new cache breaker value.
	 */
	export function resetCacheBreaker(): string

	/**
	 * Encodes a URI component by escaping characters.
	 *
	 * @param url - The string to encode.
	 * @returns The encoded URI component.
	 */
	export function encodeURIComponent(url: string): string

	/**
	 * Decodes a previously encoded URI component.
	 *
	 * @param url - The encoded string.
	 * @returns The decoded string.
	 */
	export function decodeURIComponent(url: string): string

	/**
	 * Parses a URL string and returns a URL object.
	 *
	 * @param url - Optional string to parse. If omitted, returns an empty URL object.
	 * @returns A parsed URL object.
	 */
	export function parseURL(url?: string): URL

	/**
	 * Escapes a query string using percent-encoding.
	 *
	 * @param url - The query string to escape.
	 * @returns The escaped string.
	 */
	export function escapeQuery(url?: string): string

	/**
	 * Unescapes a percent-encoded query string.
	 *
	 * @param url - The encoded string.
	 * @returns The unescaped string.
	 */
	export function unescapeQuery(url?: string): string

	/**
	 * Creates a new HTTP server instance.
	 * Use the .handler property to assign a request handler.
	 *
	 * @returns A new Server object.
	 *
	 * Example:
	 * const srv = http.newServer()
	 * srv.address = ":8080"
	 * srv.handler = (w, r) => w.write("Hello!")
	 * srv.start()
	 */
	export function newServer(): Server

	/**
	 * Creates a new HTTP client.
	 *
	 * @returns A new Client object.
	 *
	 * Example:
	 * const client = http.newClient()
	 */
	export function newClient(): Client

	/**
	 * Creates a new Cookie object.
	 *
	 * @returns A new Cookie instance.
	 */
	export function newCookie(): Cookie

	/**
	 * Creates a new ResponseWriter that captures the output of a simulated request.
	 *
	 * @param r - The request to simulate a response for.
	 * @returns A new ResponseWriter for testing.
	 */
	export function newResponseRecorder(r: Request): ResponseWriter

	/**
	 * Creates a new HTTP request.
	 * 
	 * If the method is POST and the data is a string, the request is sent as JSON.
	 * If the data is an object, it's sent as application/x-www-form-urlencoded.
	 *
	 * @param method - The HTTP method to use.
	 * @param url - The target URL.
	 * @param data - Optional data to send (string or object).
	 * @returns A new Request object.
	 *
	 * Examples:
	 * // Send JSON data
	 * const req = http.newRequest("POST", "https://api.example.com/data")
	 * req.setContentType("application/json")
	 * req.setBody({ key: "value" })
	 * const res = req.execute()
	 * 
	 * // Send form data (default)
	 * const req2 = http.newRequest("POST", "https://api.example.com/form")
	 * req2.setBody({ username: "user", password: "pass" })
	 * const res2 = req2.execute()
	 * 
	 * // Send plain text
	 * const req3 = http.newRequest("POST", "https://api.example.com/text")
	 * req3.setBody("Hello, World!", "text/plain")
	 * const res3 = req3.execute()
	 * 
	 * // Legacy compatibility - still works
	 * const req4 = http.newRequest("POST", "https://api", { key: "value" })
	 * const res4 = req4.execute()
	 */
	export function newRequest(method: METHOD, url: string, data?: any): Request

	// Interfaces will follow after this




	// =======================
	// Types and Interfaces
	// =======================

	/**
	 * Supported HTTP methods.
	 */
	export type METHOD = "GET" | "POST" | "HEAD" | "PUT" | "PATCH" | "DELETE" | "OPTIONS"

	/**
	 * A request handler function used in HTTP servers.
	 * 
	 * @param w - The response writer to send output.
	 * @param r - The HTTP request object.
	 * @param routeData - Optional data extracted from the route.
	 */
	export type Handler = (w: ResponseWriter, r: Request, routeData?: any) => void

	// ... definitions for Request, Response, Server, etc. will follow




	/**
	 * Represents an HTTP request, including method, headers, body, and query data.
	 */
	export interface Request {
		tls: boolean
		close: boolean
		method: METHOD
		host: string
		url: URL
		referer: string
		userAgent: string
		body: io.ReaderCloser
		remoteAddr: string
		remoteIP: string
		extension: string

		value(key: string): string
		json(key: string): any
		int(key: string): number
		float(key: string): number
		bool(key: string): boolean
		date(key: string): time.DateTime

		routeInt(segment: number): number
		routeString(segment: number): string

		headers(): string[]
		header(key: string): string
		setHeader(key: string, value: string): void
		setContentType(contentType: string): void
		setBody(body: any, contentType?: string): void

		file(name: string): File

		values(): any
		setValues(values: any): void
		formValues(): StringMap
		originalValues(): any

		cookies(): Cookie[]
		cookie(key: string): Cookie | null
		addCookie(c: Cookie): void

		setBasicAuth(user: string, password: string): void
		basicAuth(): { user: string, password: string }

		setDefaultContentType(): void

		execute(timeout?: number | time.Duration, tlsconf?: tls.Config): Response
		executeString(timeout?: number | time.Duration, tlsconf?: tls.Config): string
		executeJSON(timeout?: number | time.Duration, tlsconf?: tls.Config): any

		setWriteDeadline(t: time.DateTime): void
		setReadDeadline(t: time.DateTime): void
	}

	/**
	 * Represents an HTTP response from a server or simulated execution.
	 */
	export interface Response {
		status: number
		handled: boolean
		proto: string
		body: io.ReaderCloser

		string(): string
		json(): any
		bytes(): byte[]
		cookies(): Cookie[]
		headers(): string[]
		header(name: string): string[]
	}




	/**
	 * Writes responses to an HTTP client, with support for headers, files, and redirection.
	 */
	export interface ResponseWriter {
		readonly status: number
		handled: boolean
		body: io.Buffer
		buffered: bool
		counter: bool
		bytesWritten: number

		toBuffered(): void
		toByteCounter(): void
		flush(): void

		string(): string
		json(): any
		bytes(): byte[]

		cookie(name: string): Cookie
		cookies(): Cookie[]
		addCookie(c: Cookie): void

		headers(): string[]
		header(name: string): string[]

		write(v: any): number
		writeGziped(v: any): number
		writeJSON(v: any, skipCacheHeader?: boolean): void
		writeJSONStatus(status: number, v: any, skipCacheHeader?: boolean): void
		writeFile(name: string, data: byte[] | string | io.File | io.FileSystem, lastModified?: time.DateTime): void
		setStatus(status: number): void
		setContentType(type: string): void
		setHeader(name: string, value: string): void
		writeError(status: number, msg?: string): void
		redirect(url: string, status?: number): void
	}

	/**
	 * Represents a file uploaded in a form request.
	 */
	export interface File {
		name: string
		contentType: string
		size: number
		read(b: byte[]): number
		ReadAt(p: byte[], off: number): number
		close(): void
	}

	/**
	 * Represents an HTTP client capable of executing requests.
	 */
	export interface Client {
		tlsConfig: tls.Config
		do(r: Request): Response
	}

	/**
	 * Represents a cookie object sent or received in HTTP headers.
	 */
	export interface Cookie {
		domain: string
		path: string
		expires: time.DateTime
		name: string
		value: string
		secure: boolean
		httpOnly: boolean
		sameSite: SameSite
	}

	/**
	 * Represents a parsed URL object.
	 */
	export interface URL {
		scheme: string
		host: string
		port: string
		hostName: string
		subdomain: string
		path: string
		query: string
		pathAndQuery: string
		string(): string
	}

	/**
	 * Represents an HTTP server with configuration and lifecycle controls.
	 */
	export interface Server {
		address: string
		addressTLS: string
		tlsConfig: tls.Config
		handler: Handler
		readHeaderTimeout: time.Duration | number
		writeTimeout: time.Duration | number
		readTimeout: time.Duration | number
		idleTimeout: time.Duration | number
		maxAllocations: number
		maxFrames: number
		maxSteps: number
		start(): void
		close(): void
		shutdown(duration?: time.Duration | number): void
	}

}







declare namespace httputil {
	export function newSingleHostReverseProxy(target: http.URL): ReverseProxy
	
	export interface ReverseProxy {
		serveHTTP(w: http.ResponseWriter, r: http.Request): void
	}
}





/**
 * Translates a string based on the current VM language setting.
 * 
 * @param text - The text to translate. Can use special prefixes:
 *   - "Hello" - Direct translation
 *   - "::Hello" - Scannable by build tools for extraction
 *   - "::Monday::M" - With context: "Monday" explains meaning, "M" is the actual value
 * 
 * @param params - Optional parameters for string formatting (sprintf style)
 * 
 * @returns The translated text in the current VM language, or the original text if no translation found
 * 
 * @example
 * // Basic usage
 * T("Hello") // -> "Hola" (if language is "es")
 * 
 * // Scannable strings for constants
 * const STATUS = "::Pending"
 * T(STATUS) // -> "Pendiente"
 * 
 * // With context for translators
 * const DAYS = ["::Monday::M", "::Tuesday::T"]
 * T(DAYS[0]) // -> "L" in Spanish, "M" in English
 * 
 * // With parameters
 * T("::Hello {}", "World") // -> "Hola World"
 */
declare function T(text: string, ...params: any[]): string

declare namespace i18n {
	/**
	 * Translation store that manages translations with parent-child inheritance.
	 * Each store has its own translations and an optional parent store for fallback lookups.
	 */
	class TranslationStore {
		/**
		 * Translates text using the current VM language with context stripping support.
		 * Same logic as the built-in T() function but for this specific store.
		 * 
		 * @param text - The text to translate (supports :: prefix and ::context:: syntax)
		 * @param params - Optional parameters for string formatting (sprintf style)
		 * @returns Translated text or original text if no translation found
		 * 
		 * @example
		 * store.translate("::Hello") // -> "Hola" (if VM language is "es")
		 * store.translate("::Monday::M") // -> "L" (with context stripping)
		 * store.translate("::Hello {}", "World") // -> "Hola World"
		 */
		translate(text: string, ...params: any[]): string

		/**
		 * Translates text to a specific language with context stripping support.
		 * 
		 * @param lang - Target language code (e.g., "en", "es")
		 * @param text - The text to translate (supports :: prefix and ::context:: syntax)
		 * @param params - Optional parameters for string formatting (sprintf style)
		 * @returns Translated text or original text if no translation found
		 * 
		 * @example
		 * store.translateTo("es", "::Hello") // -> "Hola"
		 * store.translateTo("en", "::Monday::M") // -> "M"
		 * store.translateTo("es", "::Hello {}", "World") // -> "Hola World"
		 */
		translateTo(lang: string, text: string, ...params: any[]): string

		/**
		 * Sets a single translation for a specific language and key.
		 * 
		 * @param lang - The language code (e.g., "es", "en")
		 * @param key - The translation key
		 * @param value - The translated text
		 */
		set(lang: string, key: string, value: string): void

		/**
		 * Sets multiple translations for a language at once.
		 * 
		 * @param lang - The language code (e.g., "es", "en")
		 * @param translations - Object with key-value pairs of translations
		 */
		setBatch(lang: string, translations: { [key: string]: string }): void

		/**
		 * Gets a translation for a specific language and key from this store or its parent chain.
		 * @param lang - The language code (e.g., "es", "en")
		 * @param key - The translation key
		 * @returns The translated text or empty string if not found
		 */
		get(lang: string, key: string): string

		/**
		 * Clears all local translations (parent remains unchanged).
		 */
		clear(): void

		/**
		 * Returns a list of available languages from this store and its parent chain.
		 * @returns Array of language codes
		 */
		languages(): string[]

		/**
		 * Checks if a language has translations loaded in this store or its parent chain.
		 * @param lang - The language code to check
		 * @returns True if the language exists
		 */
		hasLanguage(lang: string): boolean

		/**
		 * Gets all translations for a language by merging local data with parent chain.
		 * Local translations override parent translations.
		 * @param lang - The language code
		 * @returns Object with all key-value pairs for the language, or null if not found
		 */
		getLanguageData(lang: string): { [key: string]: string } | null

		/**
		 * Returns the depth in the inheritance chain (1 for store without parent, 2+ for extended stores).
		 * @readonly
		 */
		readonly layerCount: number

		/**
		 * Creates an extended TranslationStore with this store as its parent.
		 * The new store inherits all translations from this store but can add/override locally.
		 * Changes to the parent store are automatically visible to the child.
		 * 
		 * @returns A new TranslationStore that extends the original
		 * 
		 * @example
		 * let globalStore = i18n.createStore()
		 * globalStore.setBatch("en", globalTranslations)
		 * 
		 * let tenantStore = globalStore.extend()  // Inherits from global
		 * tenantStore.setBatch("en", tenantOverrides)   // Add tenant-specific overrides
		 * 
		 * // tenantStore has global + tenant translations
		 * // Changes to globalStore are visible in tenantStore
		 */
		extend(): i18n.TranslationStore
	}

	/**
	 * Creates a new independent TranslationStore.
	 * 
	 * @returns A new TranslationStore instance
	 * 
	 * @example
	 * // Create independent stores
	 * let globalStore = i18n.createStore()
	 * let tenantStore = i18n.createStore()
	 * 
	 * // Configure stores
	 * globalStore.setBatch("en", globalTranslations)
	 * tenantStore.setBatch("en", tenantOverrides)
	 */
	function createStore(): i18n.TranslationStore

	/**
	 * Sets the current translation store for this VM.
	 * This store will be used by T() function calls.
	 * 
	 * @param store - The TranslationStore to use, or null to clear
	 */
	function setCurrentStore(store: i18n.TranslationStore | null): void

	/**
	 * Gets the current translation store for this VM.
	 * 
	 * @returns The current TranslationStore or null if not set
	 */
	function getCurrentStore(): i18n.TranslationStore | null

	/**
	 * Sets a single translation for a specific language and key.
	 * Creates the current store if it doesn't exist.
	 * 
	 * @param lang - The language code (e.g., "es", "en")
	 * @param key - The translation key
	 * @param value - The translated text
	 */
	function set(lang: string, key: string, value: string): void

	/**
	 * Sets multiple translations for a language at once.
	 * Creates the current store if it doesn't exist.
	 * 
	 * @param lang - The language code (e.g., "es", "en")
	 * @param translations - Object with key-value pairs of translations
	 */
	function setBatch(lang: string, translations: { [key: string]: string }): void

	/**
	 * Gets a translation for a specific language and key from the current store.
	 * @param lang - The language code (e.g., "es", "en")
	 * @param key - The translation key
	 * @returns The translated text or empty string if not found
	 */
	function get(lang: string, key: string): string

	/**
	 * Clears all translations from the current store.
	 */
	function clear(): void

	/**
	 * Returns a list of available languages from the current store.
	 * @returns Array of language codes
	 */
	function languages(): string[]

	/**
	 * Checks if a language has translations loaded in the current store.
	 * @param lang - The language code to check
	 * @returns True if the language exists
	 */
	function hasLanguage(lang: string): boolean

	/**
	 * Gets all translations for a language from the current store.
	 * @param lang - The language code
	 * @returns Object with all key-value pairs for the language, or null if not found
	 */
	function getLanguageData(lang: string): { [key: string]: string } | null
}





declare namespace image {

    export function config(buf: byte[] | io.Reader): Config
    export function decode(buf: byte[] | io.Reader): Image

    export interface Image { }

    export interface Config {
		width: number
		height: number
		format: string
	}
}






declare namespace io {

    export function readAll(r: io.Reader): byte[]

    export interface Reader {
        read(b: byte[]): number
    }

    export interface ReaderAt extends Reader {
		ReadAt(p: byte[], off: number): number
    }
	
    export interface ReaderCloser extends Reader {
        close(): void
    }

    export interface Writer {
        write(v: string | byte[]): number | void
    }

    export interface WriterCloser extends Writer {
        close(): void
    }

    export function copy(dst: Writer, src: Reader): number

    /** 
     * Sets the default data file system that will be returned by io.dataFS()
     */
    export function setDataFS(fs: FileSystem): void

    export function newBuffer(): Buffer

    export interface Buffer {
        length: number
        cap: number
        read(b: byte[]): number
        write(v: any): void
        writeLine(v: string): void
        string(): string
        toBytes(): byte[]
	}

    export interface FileSystem {
		getWd(): string
        abs(path: string): string
        open(path: string): File
        openIfExists(path: string): File
        openForWrite(path: string): File
        openForAppend(path: string): File
        chdir(dir: string): void
        exists(path: string): boolean
        rename(source: string, dest: string): void
        removeAll(path: string): void
        readAll(path: string): byte[]
        readAllIfExists(path: string): byte[]
        readString(path: string): string
        readStringIfExists(path: string): string
        write(path: string, data: string | io.Reader | byte[]): void
        append(path: string, data: string | byte[]): void
        mkdir(path: string): void
        stat(path: string): FileInfo
        readDir(path?: string): FileInfo[]
        readNames(path: string, recursive?: boolean): string[]
	}
	
    export function newVirtualFS(): FileSystem

    export function newRootedFS(root: string, baseFS: FileSystem): FileSystem

    export function newReadOnlyFS(baseFS: FileSystem): FileSystem

    export function newRestrictedFS(baseFS: FileSystem): RestrictedFS

	export interface RestrictedFS extends FileSystem {
		addToAllowed(path: string): void
		addToForbidden(path: string): void
	}

    export interface File {
        read(b: byte[]): number
        write(v: string | byte[] | io.Reader): number
        writeAt(v: string | byte[] | io.Reader, offset: number): number
		/**
		   Seek sets the offset for the next Read or Write on file to offset, interpreted 
		   according to whence: 0 means relative to the origin of the file, 1 means relative 
		   to the current offset, and 2 means relative to the end. It returns the new offset and
		   an error, if any. The behavior of Seek on a file opened with O_APPEND is not specified.
		 */ 
		seek(offset: number, whence: number): number
        close(): void
    }

    export interface FileInfo {
        name: string
        modTime: time.DateTime
        isDir: boolean
        size: number
    }
}




declare namespace json {
    export function marshal(v: any, indent?: boolean, escapeHTML?: boolean): string
    export function unmarshal(str: string | byte[]): any

}




declare namespace jwt {
	export function verify(token: string, key: rsa.PublicKey): boolean
	export function newWithClaims(signingMethod: "HS256" | "RS256", claims: any): Token
	
	export interface Token {
		signedString(signingKey: string): string
	}
}





declare namespace locale {

	export const defaultLocalizer: Localizer
	export function setDefaultLocalizer(c: Localizer): void
	export function setCurrentLocalizer(c: Localizer): void
	
	export const currentLocalizer: Localizer
	export const currentLanguage: string
	export function setCurrentLanguage(language: string): void

	export function format(format: string, v: any): string
	export function parseNumber(v: string): number
	export function parseDate(v: string, format?: string): time.DateTime

	export function newCulture(name: string): Culture

	export interface Culture {
		name: string
		code: string
		language: string
		locked: boolean
		numberOfDecimals: number
		decimalSeparator: string
		thousandSeparator: string
		currencySymbol: string
        currencyName: string
		leftSymbol?: boolean
		dateMonthTimePattern: string
		dateTimePattern: string
		shortDatePattern: string
		monthDayPattern: string
		longDatePattern: string
		dateMonthPattern: string
		shortTimePattern: string
		longDateTimePattern: string
		firstDayOfWeek: number
		clone(): Culture
	}

	export function newLocalizer(): Localizer

	export interface Localizer {
		culture: Culture
		format(format: string, v: any, language?: string): string
		parseNumber(v: string): number
		parseDate(value: string, format?: string): time.DateTime
	}
}




declare namespace markdown {

    export function toHTML(n: string | byte[]): string
    export function toHTMLFull(n: string | byte[]): string
}





declare namespace math {
    /**
     * returns, as an int, a non-negative pseudo-random number in (0,n)
     */
    export function rand(n: number): number

    export function abs(n: number): number

    export function pow(n: number, exp: number): number

    export function min(...nums: number[]): number

    export function max(...nums: number[]): number

	export function floor(n: number): number
	
    export function ceil(n: number): number

    export function round(n: number, decimals?: number): number

    export function trunc(n: number, decimals?: number): number

    export function median(...nums: number[]): number

    export function standardDev(...nums: number[]): number
}




	
declare namespace multipart {
    export function newWriter(w: io.Writer): Writer
	
    export interface Writer {
        writeField(key: string, value: string): void
        createFormFile(fieldName: string, fileName: string): io.Writer
		formDataContentType(): string
		close(): void
    }
}

	



declare namespace net {
	export function inCIDR(cidr: string, ip: string): boolean;

    export function getIPAddress(): string

    export function getMacAddress(): string

    export type dialNetwork = "tcp" | "tcp4" | "tcp6" | "udp" | "udp4" | "udp6" | "ip" | "ip4" | "ip6" | "unix" | "unixgram" | "unixpacket"

	export type listenNetwork = "tcp" | "tcp4" | "tcp6" | "unix" | "unixpacket"
	
	export interface IP {
		string(): string
	}

    export interface Connection {
		localAddr: TCPAddr | Addr
		remoteAddr: TCPAddr | Addr
        read(b: byte[]): number
        write(b: byte[]): number
        setDeadline(t: time.DateTime): void
        setWriteDeadline(t: time.DateTime): void
        setReadDeadline(t: time.DateTime): void
        close(): void
    }

    export interface Listener {
        accept(): Connection
        close(): void
    }

    export function dial(network: dialNetwork, address: string): Connection
    export function dialTimeout(network: dialNetwork, address: string, d: time.Duration | number): Connection
    export function listen(network: listenNetwork, address: string): Listener

    export interface TCPListener {
        accept(): TCPConnection
        close(): void
	}
	
    export function dialTCP(network: dialNetwork, localAddr: TCPAddr, remoteAddr: TCPAddr): TCPConnection
	export function listenTCP(network: listenNetwork, address: TCPAddr): TCPListener

    export interface TCPConnection {
		localAddr: TCPAddr | Addr
		remoteAddr: TCPAddr | Addr
        read(b: byte[]): number
        write(b: byte[]): number
        setDeadline(t: time.DateTime): void
        setWriteDeadline(t: time.DateTime): void
        setReadDeadline(t: time.DateTime): void
        close(): void
	}
	
	export function resolveTCPAddr(network: dialNetwork, address: string): TCPAddr
	
    export interface TCPAddr {
		IP: IP
		port: number
		IPAddress(): string
        string(): string
    }

    export interface Addr {
		IPAddress(): string
        string(): string
    }
}







/**
* Converts a value to a number.
* 
* When called as a function (not as a constructor), Number() converts the given value to a number primitive.
* - If the value is null, returns 0
* - If the value is undefined, returns NaN
* - If the value is a boolean, returns 1 for true or 0 for false
* - If the value is a string, attempts to parse it as a number (returns NaN if invalid)
* - If the value is an object, calls valueOf() then toString() and attempts conversion
* - Empty string "" returns 0
* - Whitespace-only strings return 0
* 
* @param v - The value to convert to a number
* @returns The numeric representation of the input value, or NaN if conversion fails
* 
* @example
* Number("123") // 123
* Number("123.45") // 123.45
* Number("") // 0
* Number(" ") // 0
* Number("abc") // NaN
* Number(true) // 1
* Number(false) // 0
* Number(null) // 0
* Number(undefined) // NaN
* Number([]) // 0
* Number([1]) // 1
* Number([1, 2]) // NaN
*/
declare function Number(v: any): number

/**
* Determines whether a value is NaN (Not a Number).
* 
* This function performs a more strict type conversion than the global isNaN() function.
* Returns true only if the value is exactly NaN, without performing type coercion.
* 
* @param {any} v - The value to be evaluated
* @returns {boolean} true if the value is NaN, false otherwise
* 
* @example
* // Cases that return true
* IsNaN(NaN);          // true
* IsNaN(0/0);          // true
* IsNaN(Number.NaN);   // true
* 
* @example
* // Cases that return false
* IsNaN(123);          // false
* IsNaN("123");        // false
* IsNaN("hello");      // false
* IsNaN(undefined);    // false
* IsNaN(null);         // false
* IsNaN(true);         // false
* 
* @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isNaN Number.isNaN}
* @since 1.0.0
*/
declare function IsNaN(v: any): boolean;

	
declare global {

    /**
     * Interfaz para el tipo primitivo number
     */
    interface Number {
        /**
         * Convierte un número a string con decimales fijos
         * @param fractionDigits Número de dígitos después del punto decimal (0-100)
         * @returns String representando el número con decimales fijos
         */
        toFixed(fractionDigits?: number): string;
        
        /**
         * Convierte un número a string
         * @param radix Base numérica (2-36). Por defecto 10
         * @returns String representando el número
         */
        toString(radix?: number): string;
        
        /**
         * Convierte un número a string con notación exponencial
         * @param fractionDigits Número de dígitos después del punto decimal (0-100)
         * @returns String en notación exponencial
         */
        toExponential(fractionDigits?: number): string;
        
        /**
         * Convierte un número a string con precisión especificada
         * @param precision Número de dígitos significativos (1-100)
         * @returns String con la precisión especificada
         */
        toPrecision(precision?: number): string;
        
        /**
         * Retorna el valor primitivo del objeto Number
         * @returns El valor numérico primitivo
         */
        valueOf(): number;

		format(v: string): string;
    }

    /**
     * Constructor de Number
     */
    interface NumberConstructor {
        new(value?: any): Number;
        (value?: any): number;
        readonly prototype: Number;
        
        /** Valor máximo representable */
        readonly MAX_VALUE: number;
        /** Valor mínimo representable */
        readonly MIN_VALUE: number;
        /** Representa "Not a Number" */
        readonly NaN: number;
        /** Infinito negativo */
        readonly NEGATIVE_INFINITY: number;
        /** Infinito positivo */
        readonly POSITIVE_INFINITY: number;
    }

    declare var Number: NumberConstructor;
}
	
	
	
	

	
declare interface StringMap {
    [key: string]: string
}

declare interface KeyIndexer<T> {
    [key: string]: T
}

declare type Map<T> = KeyIndexer<T>
 
declare namespace Object {
    export function len(v: any): number
    export function keys(v: any): string[]
    export function values<T>(v: Map<T>): T[]
    export function values<T>(v: any): T[]
    export function clear(v: any): void
    export function deleteKey(v: any, key: string | number): void
    export function deleteKeys(v: any): void
    export function hasKey(v: any, key: any): boolean
	export function freeze(v: Map<T> | T[]): void
	export function deepFreeze(v: Map<T> | T[]): void
	export function isFrozen(v: Map<T> | T[]): boolean
	/**
	 * Copy the values to a new object without cloning them
	*/
    export function clone<T>(v: T): T
	/**
	 * Clone all the structure
	*/
    export function deepClone<T>(v: T, maxNestLevel?: number): T
}
	



declare namespace os {
	export const ErrNotExist: string

    export const stdin: io.Reader
    export const stdout: io.Writer
    export const stderr: io.Writer
    export const fileSystem: io.FileSystem
	export const DevNull: string

	export const sharedCache: any

    export function readLine(): string

    export function exec(name: string, ...params: string[]): string

    /**
     * Reads an environment variable.
     */
    export function getEnv(key: string): string
    /**
     * Sets an environment variable.
     */
    export function setEnv(key: string, value: string): void

    export function exit(code?: number): void

    export const userHomeDir: string
	export const pathSeparator: string
	
    export function hostName(): string
	 
    export function mapPath(path: string): string

    export function newCommand(name: string, ...params: any[]): Command

    export interface Command {
        dir: string
        env: string[]
        stdin: io.Reader
        stdout: io.Writer
        stderr: io.Writer

        run(): void
        start(): void
        output(): string
        combinedOutput(): string
	}
	
	export function newFile(fd: number, name: string): io.File

	export function getWd(): string
	export function open(path: string): io.File
	export function openIfExists(path: string): io.File
	export function openForWrite(path: string): io.File
	export function openForAppend(path: string): io.File
	export function chdir(dir: string): void
	export function exists(path: string): boolean
	export function rename(source: string, dest: string): void
	export function removeAll(path: string): void
	export function readAll(path: string): byte[]
	export function readAllIfExists(path: string): byte[]
	export function readString(path: string): string
	export function readStringIfExists(path: string): string
	export function write(path: string, data: string | io.Reader | byte[]): void
	export function append(path: string, data: string | byte[]): void
	export function mkdir(path: string): void
	export function stat(path: string): io.FileInfo
	export function readDir(path: string): io.FileInfo[]
	export function readNames(path: string, recursive?: boolean): string[]


}





declare namespace pdf {

	export interface Doc {
		x: number
		y: number
		transparency: number
		textColor: Color
		fillColor: Color
		strokeColor: Color
		fontSize: number
		fontFamily: string
		lineWidth: number
		lineHeight: number
		readonly width: number
		readonly height: number
		start(config?: Config): void
		readFont(family: string, r: io.Reader): void
		setTextColor(r: number, g: number, b: number): void
		setStrokeColor(r: number, g: number, b: number): void
		setFillColor(r: number, g: number, b: number): void
		addPage(): void
		br(n?: number): void
		cell(width: number, height:number, text: string, option?: CellOption): void
		multiCell(width: number, height:number, text: string, option?: CellOption): void
		image(r: io.Reader | byte[], x: number, y: number, rect?: Rect): void
		setLineWidth(v: number): void
		setLineType(v: string): void
		line(x: number, y: number, x2: number, y2: number): void
		rotate(angle: number, x: number, y: number): void
		resetRotate(): void
		measureTextWidth(text: string): number
		write(w: io.Writer): void
		/**
		 *  Rectangle : draw rectangle, and add radius input to make a round corner, it helps to calculate the round corner coordinates and use Polygon functions to draw rectangle
		 *    - style: Style of Rectangle (draw and/or fill: D, F, DF, FD)
		 *      D or empty string: draw. This is the default value.
		 *      F: fill
		 *      DF or FD: draw and fill
		 * 
		 *  Usage:
		 * 
		 * 	 pdf.SetStrokeColor(255, 0, 0)
		 * 		pdf.SetLineWidth(2)
		 * 		pdf.SetFillColor(0, 255, 0)
		 * 		pdf.Rectangle(196.6, 336.8, 398.3, 379.3, "DF", 3, 10)
		 */
		rectangle(x: number, y: number, x2: number, y2: number, style: string, radius: number): void
	}

	export interface Config {
		pageSize: Rect
	}

	export interface Rect {
		width: number
		height: number
	}

	export interface Color {
		r: number
		g: number
		b: number
	}

	export interface CellOption {
		align: number
		border: number
		float: number
		transparency: number
		coefUnderlinePosition: number
		coefLineHeight: number
		coefUnderlineThickness: number
	}
		
	export function newConfig(): Config
	export function newPDF(conf?: Config): Doc
	export function newCellOption(): CellOption
	export function newRect(width: number, height: number): Rect
	
	/**
	 * Generates a PDF document from XML string and writes it to an io.Writer.
	 * 
	 * Simple function for direct XML to PDF conversion without template processing.
	 * 
	 * @param w - io.Writer to write the PDF content to
	 * @param xmlStr - XML string defining the PDF structure
	 * 
	 * @throws Error if XML is malformed or layout calculation fails
	 * 
	 * @example
	 * let xmlStr = "<document><page><div fontSize='18'>Hello World!</div></page></document>"
	 * let buffer = new bytes.Buffer()
	 * pdf.write(buffer, xmlStr)
	 */
	export function write(w: io.Writer, xmlStr: string): void
	
	/**
	 * Generates a PDF document from XML string and saves it directly to a file.
	 * 
	 * Simple function for direct XML to PDF conversion without template processing.
	 * 
	 * @param filePath - File path where the PDF will be saved
	 * @param xmlStr - XML string defining the PDF structure
	 * 
	 * @throws Error if XML is malformed, layout calculation fails, or file cannot be written
	 * 
	 * @example
	 * let xmlStr = "<document><page><div fontSize='16'>Direct PDF</div></page></document>"
	 * pdf.writeFile("/tmp/report.pdf", xmlStr)
	 */
	export function writeFile(filePath: string, xmlStr: string): void
	
	/**
	 * Generates a PDF document from a template and writes it to an io.Writer.
	 * 
	 * This function renders the template with optional data using templates.renderXML,
	 * then converts the resulting XML to PDF and writes to the provided writer.
	 * 
	 * @param w - io.Writer to write the PDF content to
	 * @param template - XML template string with template syntax (e.g., <%= data.field %>)
	 * @param data - Optional data object for template interpolation
	 * 
	 * @throws Error if template rendering fails, XML is malformed, or layout calculation fails
	 * 
	 * @example
	 * let template = "<document><page><div fontSize='18'>Hello <%= data.name %>!</div></page></document>"
	 * let buffer = new bytes.Buffer()
	 * pdf.render(buffer, template, {name: "World"})
	 */
	export function render(w: io.Writer, template: string, data?: any): void
	
	/**
	 * Generates a PDF document from a template and saves it directly to a file.
	 * 
	 * This function renders the template with optional data using templates.renderXML,
	 * then converts the resulting XML to PDF and writes directly to the file.
	 * 
	 * @param filePath - File path where the PDF will be saved
	 * @param template - XML template string with template syntax (e.g., <%= data.field %>)
	 * @param data - Optional data object for template interpolation
	 * 
	 * @throws Error if template rendering fails, XML is malformed, layout calculation fails, or file cannot be written
	 * 
	 * @example
	 * let template = "<document><page><div fontSize='16'>Report for <%= data.date %></div></page></document>"
	 * pdf.renderFile("/tmp/report.pdf", template, {date: "2023-12-01"})
	 */
	export function renderFile(filePath: string, template: string, data?: any): void
}





declare namespace png {

    export function encode(w: io.Writer, img: image.Image): void

    export function decode(buf: byte[] | io.Reader): image.Image
}






declare namespace printing {
    export function listPrinters(): string[]

	export function newPrinter(name: string, cups?: boolean): Printer
    
	export interface Printer {
		open(): void
		close(): void
		write(data: string | byte[]): void
	}
}






declare namespace qrcode {

	type RecoveryLevel = "low" | "medium" | "high" | "highest"
	
	/**
	 * Returns a png
	 */
	export function encode(value: string, level: RecoveryLevel, size: number): byte[]

	/**
	 * Returns a png
	 */
	export function encodeVersion(value: string, level: RecoveryLevel, size: number, version: number): byte[]
}





declare namespace reflect {
	export interface Native {
		name: string
		permissions: string[]
	}

    export function nativeFunctions(): Native[]
    export function nativeProperties(): Native[]

    export function is<T>(v: any, name: string): v is T

    export function typeOf(v: any): string

    export function isValue(v: any): boolean
    export function isNativeObject(v: any): boolean
    export function isArray(v: any): boolean
    export function isMap(v: any): boolean

    export function getFunction(name: string): Function
    export function findFunction(name: string): Function
    export function getFunctionInfo(fn: Function): runtime.FunctionInfo

    export function call(name: string, ...params: any[]): any

    export function runFunc(name: string, ...params: any[]): any

	export function createInstance(className: string, ...params: any[]): any
}






declare namespace regex {
    export function match(pattern: string, value: string): boolean
    export function split(pattern: string, value: string): string[]
    export function findAllString(pattern: string, value: string, count?: number): string[]
    export function findAllStringSubmatch(pattern: string, value: string, count?: number): string[][]
    export function findAllStringSubmatchIndex(pattern: string, value: string, count?: number): number[][]
    export function replaceAllString(pattern: string, source: string, replace: string): string
}





declare namespace jsregex {
    // Standalone functions compatible with JavaScript
    export function match(text: string, regex: string): string[] | null
    export function matchAll(text: string, regex: string): string[][] | null
    export function replace(text: string, regex: string, replacement: string): string
    export function replaceAll(text: string, regex: string, replacement: string): string
    export function search(text: string, regex: string): number
    export function split(text: string, regex: string, limit?: number): string[]
    
    // JSRegExp class for stateful regex operations
    export function newRegExp(pattern: string): JSRegExp
    
    export interface JSRegExp {
        readonly source: string
        readonly flags: string
        readonly global: boolean
        lastIndex: number
        
        test(text: string): boolean
        exec(text: string): string[] | null
    }
    
    // JSString wrapper for natural JavaScript-like syntax
    export function newJSString(text: string): JSString
    
    export interface JSString {
        readonly value: string
        
        match(regex: string): string[] | null
        matchAll(regex: string): string[][] | null
        replace(regex: string, replacement: string): string
        replaceAll(regex: string, replacement: string): string
        search(regex: string): number
        split(regex: string, limit?: number): string[]
    }
}




	
declare namespace routing {
	interface Any {
		[prop: string]: any
	}

	export function newRouter(): Router

	export interface Router {
		reset(): void
		add(url: string, route: any): void
		match(url: string): RouteMatch | null
		print(): void
		routes(): any[]
	}

	export interface RouteMatch {
		route: any
		url: string
		values: any
		int(name: string): number
		string(name: string): string
	}	
}

	



declare namespace rsa {
    export function generateKey(size?: number): PrivateKey
    export function decodePEMKey(key: string | byte[]): PrivateKey
    export function decodePublicPEMKey(key: string | byte[]): PublicKey
    export function signPKCS1v15(key: PrivateKey, mesage: string | byte[]): byte[]
    export function verifyPKCS1v15(key: PublicKey, mesage: string | byte[], signature: string | byte[]): boolean

    interface PrivateKey {
        publicKey: PublicKey
        encodePEMKey(): byte[]
        encodePublicPEMKey(): byte[]
    }

    interface PublicKey {

    }
}




/**
 * Immediately stops execution and throws an unrecoverable error.
 *
 * @param message - The panic message to display
 * @example
 * panic("Unexpected error")
 */
declare function panic(message: string): void

/**
 * Defers the execution of a function until the current scope ends.
 *
 * @param f - The function to defer
 * @example
 * defer(() => {
 *   console.writeline("This runs at the end")
 * })
 */
declare function defer(f: () => void): void

declare namespace runtime {
  /** Current runtime version string */
  export const version: string

  /** Error message used when a function does not exist */
  export const ErrFunctionNotExist: string

  /**
   * Interface for objects that can be finalized (i.e. have a close method).
   */
  export interface Finalizable {
    close(): void
  }

  /**
   * Returns the system-wide type definitions used by the runtime.
   *
   * @returns A string containing all type definitions
   */
  export function typeDefs(): string

  export function numGoroutine(): numnber

  export function memStats(): MemStats

  export function freeDiskSpace(): number

  export function getUsedCPUPercent(): number

  export function usedMemoryPercent(): number

  export function getSystemNetworkBytes(): { rx: number, tx: number }

  export interface MemStats {
	heapInuse: number
	numGC: number
	pauseTotalNs: number
	alloc: number
	frees: number
  }


  /**
   * Sets the virtual machine's file system.
   *
   * @param fs - An object implementing the io.FileSystem interface
   */
  export function setFileSystem(fs: io.FileSystem): void

  /**
   * Sets a finalizer object that will be called when the VM exits scope.
   *
   * @param v - An object implementing the Finalizable interface
   */
  export function setFinalizer(v: runtime.Finalizable): void

  /**
   * Creates a new Finalizable wrapper from a function or native function.
   *
   * @param f - A function to be executed when finalized
   * @returns A Finalizable object
   */
  export function newFinalizable(f: () => void): Finalizable

  /**
   * Stops execution and throws an unrecoverable error.
   *
   * @param message - The panic message
   */
  export function panic(message: string): void

  /**
   * Returns the value of a program attribute by key.
   *
   * @param name - The attribute name
   * @returns The attribute value, or undefined if not found
   */
  export function attribute(name: string): string

  /**
   * Checks whether a program has a given attribute.
   *
   * @param name - The attribute name
   * @returns True if the attribute exists
   */
  export function hasAttribute(name: string): boolean

  /** Supported operating system names */
  export type OSName = "linux" | "windows" | "darwin"

  /** Name of the operating system where the VM is running */
  export const OS: OSName

  /** Path to the current program executable */
  export const executable: string

  /** Path to the native host executable */
  export const nativeExecutable: string

  /** Current runtime context (read-only) */
  export const context: any

  /**
   * Sets the current runtime context.
   *
   * @param c - Any value representing the context
   */
  export function setContext(c: any): void

  /** Current virtual machine instance (read-only) */
  export const vm: VirtualMachine

  /**
   * Runs a function by name or reference within the current VM.
   *
   * @param func - A function name (string) or function reference
   * @param args - Arguments to pass to the function
   * @returns The result of the function
   * @example
   * runtime.runFunc("main", 123, "abc")
   */
  export function runFunc(func: string | Function, ...args: any[]): any

  /** Whether the current program has embedded resources */
  export const hasResources: boolean

  /**
   * Returns a list of resource names embedded in the program.
   *
   * @returns Array of string resource keys
   */
  export function resources(): string[]

  /**
   * Returns a specific resource by name.
   *
   * @param name - Resource name
   * @returns A byte array with the resource contents
   */
  export function resource(name: string): byte[]

  /**
   * Returns the current VM stack trace as a string.
   */
  export function stackTrace(): string
  

  /**
   * Creates a new VM from a given program and optional global values.
   *
   * @param p - A runtime.Program instance
   * @param globals - Optional array of initial global values
   * @returns A new VirtualMachine
   */
  export function newVM(p: Program, globals?: any[]): VirtualMachine

  /**
   * Forces garbage collection in the current VM.
   */
  export function gc(): void

  /**
   * Interface representing a compiled program with embedded data and metadata.
   */
  export interface Program {
    readonly constants: any[]

    functions(): FunctionInfo[]
    findFunction(name: string): FunctionInfo
    functionInfo(name: string): FunctionInfo

    resources(): string[]
    resource(key: string): byte[]
    hasResource(key: string): boolean
    setResource(key: string, value: byte[]): void

    attributes(): string[]
    attribute(name: string): string
    hasAttribute(name: string): boolean
    setAttribute(name: string, value: string): string

    permissions(): string[]
    hasPermission(name: string): boolean
    addPermission(name: string): void

    hash(): string

	availableBreakpoints(): string[]

    /**
     * Removes non-exported functions and source info from the program.
     */
    strip(): void

    /**
     * Returns a stringified representation of the program.
     */
    string(): string

    /**
     * Serializes the program to an output stream.
     *
     * @param w - An io.Writer instance
     */
    write(w: io.Writer): void
  }

  /**
   * Metadata and information about a specific function in a program.
   */
  export interface FunctionInfo {
    name: string
    module: string
    index: number
    arguments: number
    optionalArguments: number
    exported: boolean
    func: Function

    attributes(): string[]
    attribute(name: string): string
    hasAttribute(name: string): boolean

    /**
     * Returns a string representation of the function.
     */
    string(): string
  }

  /**
   * Represents an isolated virtual machine instance.
   */
  export interface VirtualMachine {
	readonly id: number
    maxAllocations: number
    maxFrames: number
    maxSteps: number
    fileSystem: io.FileSystem
    stdout: io.Writer
    localizer: locale.Localizer
    readonly steps: number
    readonly allocations: number
    readonly frames: number
    readonly program: Program
    context: any
    lib: any
	profiler: Profiler

	statsEnabled: boolean

    language: string
    location: time.Location
    now: time.DateTime
    error: errors.Error

    /**
     * Initializes the VM and returns global variables.
     */
    initialize(): any[]

    /**
     * Runs the program's entry point or a provided argument list.
     *
     * @param args - Arguments for execution
     * @returns The result of the run
     */
    run(...args: any[]): any

    /**
     * Runs a function by name or index.
     *
     * @param name - Function name or reference
     * @param args - Arguments to pass
     */
    runFunc(name: string | Function, ...args: any[]): any

    /**
     * Returns the value of a named register.
     *
     * @param name - Register name
     */
    getRegister(name: string): any

    /**
     * Sets a global register value.
     *
     * @param name - Register name
     * @param v - Value to store
     */
    setGlobalRegister(name: string, v: any): void

    /**
     * Returns an array with the current global values.
     */
    getGlobals(): any[]

    /**
     * Returns the VM stack trace as a string.
     */
    stackTrace(): string

    /**
     * Creates a deep copy of the VM.
     */
    clone(): VirtualMachine

    /**
     * Translation store for this VM. Can be get/set.
     * @returns The translation store or null if not set
     */
    translations: i18n.TranslationStore | null

    /**
     * Resets the internal step counter.
     */
    resetSteps(): void
  }

	interface TraceLine {
		file: string		
		line: number // in base 1
	}

	interface Breakpoint {
		file: string
		line: number
	}

  	export function startProfiler(): void
  	export function stopProfiler(): void
  	export function resetProfiler(): void
  	export function printProfilerLines(maxItems?: number): void
  	export function printProfilerFunctions(maxItems?: number): void

  	export function newProfiler(): Profiler

	interface Profiler {
		isEnabled: boolean
		start(): void
		stop(): void
		reset(): void
		reportLines(maxItems?: number): ProfilerStat[]
		reportFuctions(maxItems?: number): ProfilerStat[]
		printLines(maxItems?: number): void
		printFuctions(maxItems?: number): void
	}

	interface ProfilerStat {
		func: string
		line: string
		count: number
		duration: time.Duration
	}


}





declare namespace secure {
    /**
     * 
     * @param read true if anyone can read it. false if only trusted code can read it.
     * @param write true if anyone can write it. false if only trusted code can write it.
     */
	export function newObject(read: boolean, write: boolean, values?: any): any 
}



 

declare namespace sftp {
	/**
	 * Creates a new SFTP client connection over SSH.
	 * @param url - The SSH server address in format "hostname:port" (e.g., "server.com:22")
	 * @param config - SSH configuration with authentication settings (from ssh.newConfig())
	 * @returns An SFTP client instance for file operations
	 * @throws Error if SSH connection fails or SFTP subsystem cannot be started
	 */
	export function newClient(url: string, config: ssh.Config): Client
	
	/**
	 * SFTP client for secure file transfer operations over SSH.
	 * Provides methods to upload, download, list and manage files on remote servers.
	 */
	export interface Client {
		/**
		 * List contents of a remote directory.
		 * @param path - Remote directory path to list
		 * @returns Array of file information objects containing file metadata
		 * @throws Error if directory doesn't exist or access is denied
		 */
		readDir(path: string): io.FileInfo[]
		
		/**
		 * Read the complete contents of a remote file.
		 * @param path - Remote file path to read
		 * @returns File contents as byte array
		 * @throws Error if file doesn't exist, access is denied, or read fails
		 */
		open(path: string): byte[]
		
		/**
		 * Delete a file or empty directory on the remote server.
		 * @param path - Remote path to file or directory to remove
		 * @throws Error if path doesn't exist, access is denied, or removal fails
		 */
		remove(path: string): void
		
		/**
		 * Write data to a remote file, creating or overwriting as needed.
		 * @param path - Remote file path to write to
		 * @param data - Byte data to write to the file
		 * @returns Number of bytes written
		 * @throws Error if write fails or access is denied
		 */
		write(path: string, data: byte[]): void
		
		/**
		 * Close the SFTP connection and cleanup all resources.
		 * Also closes the underlying SSH connection.
		 * @throws Error if connection cleanup fails
		 */
		close(): void
	}
}





declare namespace smtp {
    /**
     * Creates a new SMTP message instance
     */
    export function newMessage(): Message

    /**
     * Sends an email message via SMTP
     * @param msg - The message to send
     * @param user - SMTP username for authentication
     * @param password - SMTP password for authentication
     * @param host - SMTP server hostname
     * @param port - SMTP server port (usually 587 for STARTTLS, 465 for SSL, 25 for plain)
     * @param insecureSkipVerify - Skip TLS certificate verification (default: false)
     * @param timeout - Connection and operation timeout in seconds (default: 30)
     */
    export function send(
        msg: Message,
        user: string,
        password: string,
        host: string,
        port: number,
        insecureSkipVerify?: boolean,
        timeout?: number): void

    /**
     * Represents an SMTP email message
     */
    export interface Message {
        /** Sender email address */
        from: string
        /** Sender display name */
        fromName: string
        /** Array of recipient email addresses */
        to: string[]
        /** Array of CC (Carbon Copy) email addresses */
        cc: string[]
        /** Array of BCC (Blind Carbon Copy) email addresses */
        bcc: string[]
        /** Reply-To email address */
        replyTo: string
        /** Email subject line */
        subject: string
        /** Email body content */
        body: string
        /** Whether the body is HTML format (true) or plain text (false) */
        html: boolean
        /** Array of file attachments */
        attachments: Attachment[]
        
        /** Returns the raw email message as a string */
        string(): string
        
        /**
         * Attaches a file to the email
         * @param fileName - Name of the file attachment
         * @param data - File data as bytes
         * @param inline - Whether the attachment should be inline (true) or as attachment (false)
         */
        attach(fileName: string, data: byte[], inline: boolean): void
    }

    /**
     * Represents an email attachment
     */
    export interface Attachment {
        /** File data as bytes */
        data: byte[]
        /** Original filename */
        fileName: string
        /** Whether the attachment is inline (embedded) or regular attachment */
        inline: boolean
    }
}






declare namespace sql {
    export type DriverType = "mysql" | "sqlite3"

    /**
     * Opens a database connection.
     * If a database name is provided, table names in queries will be prefixed automatically.
     *
     * Example:
     *   const db = sql.open("mysql", "user:pass@/dbname", "mydb")
     *   const rows = db.query("SELECT * FROM users")
     *   console.writeline(rows.length)
     */
    export function open(driver: DriverType, connString: string, databaseName?: string): DB

    /**
     * Restricts the list of SQL functions allowed in queries.
     *
     * Example:
     *   sql.setWhitelistFuncs(["NOW", "COUNT"])
     */
    export function setWhitelistFuncs(funcs: string[]): void

    /**
     * A handle to an open SQL database connection.
     */
    export interface DB {
        database: string
        prefix: string
        namespace: string
        readonly: boolean
        locked: boolean
        driver: DriverType
        ignoreTransactions: boolean
        nestTransactions: boolean
        hasTransaction: boolean
        clock: time.Clock
        customData: any
        txNestIndex: number

		logQueries: boolean
		logRowsLevel: boolean

		startLogging(rowsLevel?: number): void
		stopLogging(): void

		resetLogCount(): void

        initMultiDB(): void

		lock(): void
		unlock(): void


        setMaxOpenConns(v: number): void
        setMaxIdleConns(v: number): void
        setConnMaxLifetime(d: time.Duration | number): void

		resetCache(): void

        /**
         * Opens a database by name, optionally in a different namespace.
         */
        open(name: string, namespace?: string): DB

        /**
         * Creates a copy of the current DB handle.
         */
        clone(): DB

        /**
         * Closes the connection, rolling back any open transaction.
         */
        close(): void

        disableForeignKeys(): void
        enableForeignKeys(): void

        /**
         * Executes a query and returns a streaming reader.
         */
        reader(query: string | SelectQuery, ...params: any[]): Reader

        /**
         * Executes a query and returns all result rows.
         */
        query(query: string | SelectQuery, ...params: any[]): any[]

        /**
         * Same as query, but skips parsing parameters and identifiers.
         */
        queryRaw(query: string | SelectQuery, ...params: any[]): any[]

        /**
         * Returns the first row of the query result.
         */
        queryFirst(query: string | SelectQuery, ...params: any[]): any

        /**
         * Same as queryFirst but skips parsing parameters and identifiers.
         */
        queryFirstRaw(query: string | SelectQuery, ...params: any[]): any

        /**
         * Returns a list of values from the first column.
         */
        queryValues(query: string | SelectQuery, ...params: any[]): any[]

        queryValuesRaw(query: string | SelectQuery, ...params: any[]): any[]

        /**
         * Returns a single value from the first column of the first row.
         */
        queryValue(query: string | SelectQuery, ...params: any[]): any

        queryValueRaw(query: string | SelectQuery, ...params: any[]): any

        /**
         * Loads the result of a query into a Table object.
         */
        loadTable(query: string | SelectQuery, ...params: any[]): Table

        loadTableRaw(query: string | SelectQuery, ...params: any[]): Table

        /**
         * Executes a statement (INSERT, UPDATE, DELETE, etc.).
         */
        exec(query: string | Query, ...params: any[]): Result

        execRaw(query: string, ...params: any[]): Result

        beginTransaction(): void
        commit(): void
        rollback(): void
        resetTransaction(): void

        hasDatabase(name: string): boolean
        hasTable(name: string): boolean
        databases(): string[]
        tables(): string[]
        columns(table: string): SchemaColumn[]

    	startProfiler(): void
    	stopProfiler(): void
    	resetProfiler(): void
    	closeProfiler(): void
		reportProfilerStats(maxLines?: number): ProfilerStat[]
    	printProfilerReport(maxLines?: number): void

		stats(): DBStats
    }

	export interface DBStats {
		readonly maxIdleClosed: number
		readonly maxIdleTimeClosed: number
		readonly maxLifetimeClosed: number
		readonly waitCount: number
		readonly idle: number
		readonly inUse: number
		readonly maxOpenConnections: number
		readonly openConnections: number
		readonly waitDuration: number
	}

    export interface SchemaColumn {
        name: string
        type: string
        size: number
        decimals: number
        nullable: boolean
        unsigned: boolean
    }

    export interface Reader {
        columns(): ReaderColumn[]

        /**
         * Advances to the next row. Returns false if there are no more rows.
         */
        next(): boolean

        /**
         * Returns a new object mapping column names to values.
         */
        read(): any

        /**
         * Returns an array of values reusing the same backing array.
         */
        readValues(): any[]

        close(): void
    }

    export interface ReaderColumn {
        name: string
        type: string
        scanType: string
    }

    export interface Result {
        lastInsertId: number
        rowsAffected: number
    }

    /**
     * Parses a raw SQL query into a Query object.
     */
    export function parse(query: string, ...params: any[]): Query

    export function select(query: string, ...params: any[]): SelectQuery

    export interface ValidateOptions {
        tables: Map<string[]>
    }

    export interface QueryTable {
        name: string
        alias: string
        database: string
    }

    /**
     * Extracts all subqueries within a compound query.
     */
    export function getQueries(q: Query): Query[]

    /**
     * Returns the main table used in a query.
     */
    export function getMainTable(q: Query): QueryTable

    /**
     * Checks whether a query contains a filter on the given column.
     */
    export function hasFilterColumn(q: Query, column: string): boolean

    /**
     * Validates that a SelectQuery uses only allowed tables and columns.
     */
    export function validateSelect(q: SelectQuery, options: ValidateOptions): void

    /**
     * Creates a new empty SelectQuery.
     */
    export function newSelect(): SelectQuery

    /**
     * Creates a SelectQuery with a WHERE clause.
     */
    export function where(filter: string, ...params: any[]): SelectQuery

    /**
     * Creates a SelectQuery with an ORDER BY clause.
     */
    export function orderBy(s: string): SelectQuery

    export interface Query {
        parameters: any[]
        toSQL(format?: boolean, driver?: DriverType, escapeIdents?: boolean): string
	}


    export interface InsertQuery extends Query {
        parameters: any[]
        addColumn(s: string, value: any): void
    }

    export interface UpdateQuery extends Query {
        hasLimit: boolean
        hasWhere: boolean
        parameters: any[]
        addColumns(s: string, ...params: any[]): UpdateQuery
        setColumns(s: string, ...params: any[]): UpdateQuery
        where(s: string, ...params: any[]): UpdateQuery
        and(s: string, ...params: any[]): UpdateQuery
        and(filter: UpdateQuery): UpdateQuery
        or(s: string, ...params: any[]): UpdateQuery
        limit(rowCount: number): UpdateQuery
        limit(rowCount: number, offset: number): UpdateQuery
    }

    export interface DeleteQuery extends Query {
        hasLimit: boolean
        hasWhere: boolean
        parameters: any[]
        where(s: string, ...params: any[]): DeleteQuery
        and(s: string, ...params: any[]): DeleteQuery
        and(filter: DeleteQuery): DeleteQuery
        or(s: string, ...params: any[]): DeleteQuery
        or(filter: SelectQuery): SelectQuery
        limit(rowCount: number): DeleteQuery
        limit(rowCount: number, offset: number): DeleteQuery
    }

    export interface Table {
        columns: Column[]
        rows: Row[]
    }

    export interface Row extends Array<any> {
        [index: number]: any
        [key: string]: any
        length: number
        columns: Array<Column>
    }

    export type ColumnType = "string" | "int" | "decimal" | "bool" | "datetime"

    export interface Column {
        name: string
        type: ColumnType
    }
}






declare namespace sql {
    /**
     * Parses SQL and parameters into a query object.
     */
    export function parse(query: string, ...params: any[]): Query

    export function select(query: string, ...params: any[]): SelectQuery

    /**
     * Represents a table in a query.
     */
    export interface QueryTable {
        database?: string
        name: string
        alias?: string
    }

    /**
     * Gets all queries from a compound query (e.g., UNION).
     */
    export function getQueries(q: Query): Query[]

    /**
     * Gets the main table from a query.
     */
    export function getMainTable(q: Query): QueryTable

    /**
     * Checks if a column is used in the filter.
     */
    export function hasFilterColumn(q: Query, column: string): boolean

    /**
     * Validates a SELECT query against schema.
     */
    export function validateSelect(q: SelectQuery, options: ValidateOptions): void

    /**
     * Creates a new SELECT query builder.
     */
    export function newSelect(): SelectQuery

    /**
     * Creates a new SELECT query with a WHERE clause.
     */
    export function where(filter: string, ...params: any[]): SelectQuery

    /**
     * Creates a new SELECT query with an ORDER BY clause.
     */
    export function orderBy(s: string): SelectQuery

    export interface Query {
        toSQL(format?: boolean, driver?: string, escapeIdents?: boolean): string
    }

    export interface CRUDQuery extends Query {
        hasLimit: boolean
        hasWhere: boolean
        parameters: any[]
        where(s: string, ...params: any[]): SelectQuery
        and(s: string, ...params: any[]): SelectQuery
        and(filter: SelectQuery): SelectQuery
        or(s: string, ...params: any[]): SelectQuery
        limit(rowCount: number): SelectQuery
        limit(rowCount: number, offset: number): SelectQuery
        getJoins(): JoinInfo[]
    }

    export interface ValidateOptions {
        tables: ValidateTable[]
    }

    export interface ValidateTable {
        name: string
        columns: string[]
    }

    export interface SelectQuery extends Query {
        columnsLength: number
        hasLimit: boolean
        hasFrom: boolean
        hasWhere: boolean
        hasDistinct: boolean
        hasOrderBy: boolean
        hasUnion: boolean
        hasGroupBy: boolean
        hasHaving: boolean
        parameters: any[]
        addColumns(s: string): SelectQuery
        setColumns(s: string): SelectQuery
        from(s: string, ...params: any[]): SelectQuery
        fromExpr(q: SelectQuery, alias: string): SelectQuery
        limit(rowCount: number): SelectQuery
        limit(rowCount: number, offset: number): SelectQuery
        groupBy(s: string): SelectQuery
        orderBy(s: string): SelectQuery
        where(s: string, ...params: any[]): SelectQuery
        having(s: string, ...params: any[]): SelectQuery
        and(s: string, ...params: any[]): SelectQuery
        and(filter: SelectQuery): SelectQuery
        or(s: string, ...params: any[]): SelectQuery
        or(filter: SelectQuery): SelectQuery
        join(s: string, ...params: any[]): SelectQuery
        getJoins(): JoinInfo[]
        findJoinByTable(tableName: string): JoinInfo | null
    }

    export interface JoinInfo {
        fromIndex: number
        joinIndex: number
        tableName: string
        alias: string
        joinType: string
        hasCondition(condition: string): boolean
        and(condition: string): void
        getTableName(): string
        getTableAlias(): string
        getTableIdentifier(): string
        hasFilterColumn(column: string): boolean
        isTable(): boolean
    }

    export interface InsertQuery extends Query {
        database?: string
        table: string
    }

    export interface UpdateQuery extends Query {
        database?: string
        table: string
        set?: string[]
        where?: string
        orderBy?: string[]
        limit?: number
    }

    export interface DeleteQuery extends Query {
        database?: string
        table: string
        where?: string
        orderBy?: string[]
        limit?: number
    }

    export interface AddFKQuery extends Query {
        name: string
        column: string
        refTable: string
        refColumn: string
        deleteCascade: boolean
        deleteSetNull: boolean
        updateCascade: boolean
        updateSetNull: boolean
    }

    export function newAddFKQuery(): AddFKQuery
}




 

declare namespace ssh {
	/**
	 * Creates a new SSH client configuration with default settings.
	 * Default timeout is 30 seconds and uses insecure host key verification.
	 * @returns A new SSH configuration object
	 */
	export function newConfig(): Config

	/**
	 * Creates a new SSH client connection.
	 * @param url - The SSH server address in format "hostname:port" (e.g., "server.com:22")
	 * @param config - SSH configuration with authentication and connection settings
	 * @returns An SSH client instance for executing commands and file operations
	 * @throws Error if connection fails or authentication is rejected
	 */
	export function newClient(url: string, config: Config): Client
	
	/**
	 * SSH client configuration options for authentication and connection settings.
	 */
	export interface Config {
		/** SSH username for authentication */
		user?: string
		/** Password for password-based authentication */
		password?: string
		/** Private key content (PEM format) for key-based authentication */
		privateKey?: string
		/** Connection timeout in seconds (default: 30) */
		timeout?: number
		/** Host key verification mode: "insecure" (ignore) or "strict" (verify) */
		hostKeyCallback?: string
		/** Path to known_hosts file for host key verification */
		knownHostsFile?: string
	}

	/**
	 * SSH client for executing commands and file operations on remote servers.
	 */
	export interface Client {
		/**
		 * Execute a single command on the remote server and wait for completion.
		 * @param command - Shell command to execute
		 * @returns Command execution result with output and exit code
		 * @throws Error if command execution fails or session cannot be created
		 */
		exec(command: string): ExecResult
		
		/**
		 * Start an interactive command session with real-time input/output streaming.
		 * @param command - Shell command to start (e.g., "bash", "python3")
		 * @returns A stream object for interactive communication
		 * @throws Error if session cannot be created or command fails to start
		 */
		execStream(command: string): Stream
		
		/**
		 * Upload a local file to the remote server using SCP protocol.
		 * @param localPath - Path to local file to upload
		 * @param remotePath - Destination path on remote server
		 * @throws Error if file cannot be read locally or transfer fails
		 */
		scpUpload(localPath: string, remotePath: string): void
		
		/**
		 * Download a file from remote server to local machine using SCP protocol.
		 * @param remotePath - Path to file on remote server
		 * @param localPath - Local destination path for downloaded file
		 * @throws Error if remote file doesn't exist or transfer fails
		 */
		scpDownload(remotePath: string, localPath: string): void
		
		/**
		 * Create a local port forward tunnel through the SSH connection.
		 * Forwards local port traffic to a remote host/port via the SSH server.
		 * @param localPort - Local port to listen on
		 * @param remoteHost - Target hostname (as seen from SSH server)
		 * @param remotePort - Target port on remote host
		 * @throws Error if local port cannot be bound or forwarding fails
		 */
		localPortForward(localPort: number, remoteHost: string, remotePort: number): void
		
		/**
		 * Close the SSH connection and cleanup all resources.
		 * @throws Error if connection cleanup fails
		 */
		close(): void
	}

	/**
	 * Result of executing a command via ssh.exec().
	 */
	export interface ExecResult {
		/** Standard output from the command */
		stdout: string
		/** Standard error output from the command */
		stderr: string
		/** Command exit code (0 = success, non-zero = error) */
		exitCode: number
	}

	/**
	 * Interactive stream for real-time command communication via ssh.execStream().
	 */
	export interface Stream {
		/**
		 * Send data to the command's standard input.
		 * @param data - Text data to send to command
		 * @throws Error if stream is closed or write fails
		 */
		write(data: string): void
		
		/**
		 * Read available data from command's standard output.
		 * @returns Available output data (may be empty if no data ready)
		 * @throws Error if stream is closed or read fails
		 */
		read(): string
		
		/**
		 * Close the interactive stream and terminate the command.
		 * @throws Error if stream cleanup fails
		 */
		close(): void
	}
}





declare namespace strconv {
    export function formatInt(i: number, base: number): string
    export function parseInt(s: string, base: number, bitSize: number): number
    export function formatCustomBase34(i: number): string
    export function parseCustomBase34(s: string): number


    export function formatRef(i: number, length?: number): string
    export function parseRef(ref: string): number

}




	
declare namespace strings {
    export function newReader(a: string): io.Reader
}

interface StringConstructor {
    /**
     * Converts a value to a string.
     * 
     * When called as a function (not as a constructor), String() converts the given value to a string primitive.
     * - If the value is null, returns "null"
     * - If the value is undefined, returns "undefined" 
     * - If the value is a boolean, returns "true" or "false"
     * - If the value is a number, returns the string representation of the number
     * - If the value is an object, calls the object's toString() method
     * 
     * @param v - The value to convert to a string
     * @returns The string representation of the input value
     * 
     * @example
     * String(123) // "123"
     * String(true) // "true"
     * String(null) // "null"
     * String(undefined) // "undefined"
     * String([1, 2, 3]) // "1,2,3"
     */
    (v: any): string;

    /**
     * Returns a string created from the specified sequence of UTF-16 code units.
     * @param code A number that is a UTF-16 code unit
     * @returns A string created from the UTF-16 code unit
     * @example
     * String.fromCharCode(65) // "A" 
     * String.fromCharCode(72) // "H"
     */
    fromCharCode(code: number): string;
}

declare var String: StringConstructor;

interface String {
    [n: number]: string 

    /**
     * Gets the length of the string.
     */
    length: number

    /**
     * The number of bytes oposed to the number of runes returned by length.
     */
    runeCount: number

    runeAt(i: number): string

    toLowerCase(): string
    toUpperCase(): string
    toTitle(): string
    toUntitle(): string

    replace(oldValue: string | RegExp, newValue: string): string
    replaceAll(oldValue: string | RegExp, newValue: string): string

    startsWith(prefix: string): boolean
    endsWith(prefix: string): boolean

    /**
     * Returns a new string consisting of the single string repeated count times.
     */
    repeat(count: number): string

    trim(cutset?: string): string
    trimLeft(cutset?: string): string
    trimRight(cutset?: string): string
    trimPrefix(prefix: string): string
    trimSuffix(suffix: string): string

    rightPad(pad: string, total: number): string
    leftPad(pad: string, total: number): string

    take(to: number): string
    substring(from: number, to?: number): string
    runeSubstring(from: number, to?: number): string

    fields(): string[]
    split(separator: string | RegExp, limit?: number): string[]

	/**
	 * Like split but ommits empty values
	 */
    splitClean(s: string): string[]

    contains(s: string): boolean
    equalFold(s: string): boolean

	/**
	* Returns the index of the first occurrence of a substring.
	* @param s - The substring to search for
	* @param start - The position to start searching from (defaults to 0)
	* @returns The index of the first occurrence, or -1 if not found
	* @example
	* "hello world".indexOf("world") // returns 6
	* "hello world".indexOf("o", 5) // returns 7 (searches from position 5)
	*/
	indexOf(s: string, start?: number): number

	/**
	* Returns the relative index of the first occurrence of a substring from a starting position.
	* @param s - The substring to search for
	* @param start - The position to start searching from (defaults to 0)
	* @returns The relative distance from the start position to the first occurrence, or -1 if not found
	* @example
	* "hello world".indexOfRelative("world", 6) // returns 0 (found immediately at start position)
	* "hello world".indexOfRelative("o", 5) // returns 2 (found 2 positions after start)
	*/
	indexOfRelative(s: string, start?: number): number

    lastIndexOf(s: string, start?: number): number
    cut(s: string, start?: number): [string, string]

    // Nuevos métodos JavaScript estándar
    match(regexp: string | RegExp): string[] | null
    matchAll(regexp: string | RegExp): string[][] | null
    search(regexp: string | RegExp): number

    /**
     * Replace with regular expression.
     * The syntax is defined: https://golang.org/pkg/regexp/syntax
     */
    replaceRegex(expr: string, replace: string): string
 
    /**
     * Returns true if searchString appears as a substring of the result of converting this
     * object to a String, at one or more positions that are greater than or equal to position;
     * otherwise, returns false.
     */
    includes(searchString: string, position?: number): boolean

    /**
     * Returns a new string consisting of the single string repeated count times.
     */
    repeat(count: number): string

    /**
     * Returns the character at the specified index, or undefined if index is out of range.
     * Supports negative indices.
     */
    at(index: number): string | undefined

    /**
     * Returns the UTF-16 code unit value at the given index.
     */
    charCodeAt(index: number): number

    /**
     * Returns the Unicode code point value at the specified position.
     */
    codePointAt(index: number): number | undefined

    /**
     * Extracts a section of a string and returns it as a new string.
     */
    slice(start: number, end?: number): string

    /**
     * Combines the text of two or more strings and returns a new string.
     */
    concat(...strings: string[]): string

    /**
     * Removes whitespace from the beginning of a string.
     */
    trimStart(cutset?: string): string

    /**
     * Removes whitespace from the end of a string.
     */
    trimEnd(cutset?: string): string

    /**
     * Compares two strings in the current locale.
     */
    localeCompare(compareString: string, locales?: string | string[], options?: Intl.CollatorOptions): number
}

// Complete RegExp interface
interface RegExp {
    /**
     * Executes a search on a string using a regular expression pattern, and returns an array containing the results of that search.
     * @param string The String object or string literal on which to perform the search.
     */
    exec(string: string): RegExpExecArray | null;

    /**
     * Returns a Boolean value that indicates whether or not a pattern exists in a searched string.
     * @param string String on which to perform the search.
     */
    test(string: string): boolean;

    /** Returns a copy of the text of the regular expression pattern. Read-only. The regExp argument is a Regular expression object. It can be a variable name or a literal. */
    readonly source: string;

    /** Returns a Boolean value indicating the state of the global flag (g) used with a regular expression. Default is false. Read-only. */
    readonly global: boolean;

    /** Returns a Boolean value indicating the state of the ignoreCase flag (i) used with a regular expression. Default is false. Read-only. */
    readonly ignoreCase: boolean;

    /** Returns a Boolean value indicating the state of the multiline flag (m) used with a regular expression. Default is false. Read-only. */
    readonly multiline: boolean;

    /** Returns a Boolean value indicating the state of the dotAll flag (s) used with a regular expression. Default is false. Read-only. */
    readonly dotAll: boolean;

    /** Returns a Boolean value indicating the state of the unicode flag (u) used with a regular expression. Default is false. Read-only. */
    readonly unicode: boolean;

    /** Returns a Boolean value indicating the state of the sticky flag (y) used with a regular expression. Default is false. Read-only. */
    readonly sticky: boolean;

    /** Returns a string indicating the flags of the regular expression in alphabetical order, which may be "gimsuvy" or a subset of those characters. */
    readonly flags: string;

    /**
     * The index at which to start the next match. 
     * Used with global regexes to track position between exec() calls.
     */
    lastIndex: number;
}

interface RegExpExecArray extends Array<string> {
    /**
     * The index of the search at which the result was found.
     */
    index?: number;
    /**
     * A copy of the search string.
     */
    input?: string;
    /**
     * The first match. This will always be present.
     */
    0: string;
}

interface RegExpConstructor {
    new (pattern: RegExp | string): RegExp;
    new (pattern: string, flags?: string): RegExp;
    (pattern: RegExp | string): RegExp;
    (pattern: string, flags?: string): RegExp;
    readonly prototype: RegExp;
}

declare var RegExp: RegExpConstructor;


interface RegExpMatchArray extends Array<string> {
    /**
     * The index of the search at which the result was found.
     */
    index?: number;
    /**
     * A copy of the search string.
     */
    input?: string;
    /**
     * The first match. This will always be present.
     */
    0: string;
}


declare namespace strings {
    export function sanitize(a: string, dashes?: boolean): string
    export function equalFold(a: string, b: string): boolean
    export function isChar(value: string): boolean
    export function isDigit(value: string): boolean
    export function isIdent(value: string): boolean
    export function isAlphanumeric(value: string): boolean
    export function isAlphanumericIdent(value: string): boolean
    export function isNumeric(value: string): boolean
    export function isEmpty(value: string): boolean
	export function sort(a: string[]): void
	export function repeat(value: string, count: number): string
}
	  



	


	
declare namespace astro {

	export interface Result {
        rise: time.DateTime
        set: time.DateTime
    }

	// Calculates when the sun will rise and when it will set on the
	// given day at the specified location.
	// Returns time.DateTime{} if there sun does not rise or set
	export function sunRiseSet(lat: number, long: number, date: time.DateTime): Result
}

	




	declare namespace sync {
    /**
     * Creates and returns a new Mutex object.
     * A Mutex is used to ensure mutual exclusion — only one thread can hold the lock at a time.
     *
     * Example:
     * const m = sync.newMutex();
     * m.lock();
     * console.writeline("Critical section");
     * m.unlock();
     */
    export function newMutex(): Mutex;

    /**
     * Creates a new WaitGroup, optionally limited by concurrency.
     * You can launch multiple parallel tasks and wait for all of them to complete.
     *
     * @param concurrency Optional maximum number of concurrent tasks.
     *
     * Example:
     * const wg = sync.newWaitGroup();
     * wg.go(() => console.writeline("Task 1"));
     * wg.go(() => console.writeline("Task 2"));
     * wg.wait();
     */
    export function newWaitGroup(concurrency?: number): WaitGroup;

    /**
     * Executes a function with mutual exclusion based on a key.
     * Useful for avoiding race conditions when accessing shared resources by name.
     *
     * @param key A string key identifying the locked section.
     * @param func The function to execute exclusively.
     * @returns The return value of the executed function.
     *
     * Example:
     * sync.execLocked("myKey", () => {
     *   console.writeline("This runs with a lock");
     * });
     */
    export function execLocked(key: string, func: Function): any;

    export interface WaitGroup {
        /**
         * Launches a new function in parallel as part of the WaitGroup.
         * If concurrency was limited, it will be respected.
         *
         * @param f The function to run concurrently.
         */
        go(f: Function): void;

        /**
         * Blocks execution until all launched functions have completed.
         */
        wait(): void;
    }

    export interface Mutex {
        /**
         * Locks the mutex. If it is already locked, this call will block.
         */
        lock(): void;

        /**
         * Unlocks the mutex. Should only be called after lock().
         */
        unlock(): void;
    }

    /**
     * Creates a new channel for concurrent communication, optionally buffered.
     *
     * @param buffer Optional buffer size.
     *
     * Example:
     * const ch = sync.newChannel();
     * ch.send("hello");
     * console.writeline(ch.receive()); // prints "hello"
     */
    export function newChannel(buffer?: number): Channel;

    /**
     * Waits for one of several channels to receive a value.
     * Optionally supports a default case that fires if none are ready.
     *
     * @param channels Array of channels to select from.
     * @param defaultCase If true, returns immediately if no channel is ready.
     * @returns An object with:
     *   - index: the index of the selected channel
     *   - value: the received value
     *   - receivedOK: whether the channel was open and valid
     */
    export function select(channels: Channel[], defaultCase?: boolean): {
        index: number;
        value: any;
        receivedOK: boolean;
    };

    export interface Channel {
        /**
         * Sends a value to the channel. May block if no receiver or buffer is full.
         */
        send(v: any): void;

        /**
         * Receives a value from the channel. May block if the channel is empty.
         */
        receive(): any;

        /**
         * Closes the channel. No values can be sent after closing.
         */
        close(): void;
    }

    /**
     * Runs a function with a timeout (deadline).
     * The function receives a Deadline object that allows extending or cancelling the timeout.
     * If the deadline expires, an error is raised.
     *
     * @param d Duration in milliseconds or time.Duration
     * @param fn Function to execute with a deadline
     *
     * Example:
     * sync.withDeadline(1000, (dl) => {
     *   // Do something with a 1-second timeout
     * });
     */
    export function withDeadline(d: time.Duration | number, fn: (dl: Deadline) => void): void;

    export interface Deadline {
        /**
         * Extends the deadline by the given duration.
         */
        extend(d: time.Duration | number): void;

        /**
         * Cancels the deadline early.
         */
        cancel(): void;
    }
}



	



declare namespace templates {

	/*
		- Code must go into <% and %>
		- Data expressions can appear into {{ and }}
		- Expressions can appear into <%= and %>
		- Unescaped output can appear whith <%== and %>
		- Functions can be included with a header tag "<%@" at the beginning of the template
	*/


    export function render(text: string, data?: any, lib?: any, context?: any): string
    export function renderHTML(text: string, data?: any, lib?: any, context?: any): string
    export function renderXML(text: string, data?: any, lib?: any, context?: any): string
}





declare namespace terminal {
	export function init(): void
	export function close(): void
	export function sync(): void
	export function setInputMode(v: number): void
	export function setOutputMode(v: number): void
	export function size(): { width: number, height: number }
	export function flush(): void
	export function clear(fg?: number, bg?: number): void
	export function setCursor(x: number, y: number): void
	export function hideCursor(): void
	export function setCell(x: number, y: number, r: number | string, fg?: number, bg?: number): void
	export function pollEvent(): Event

	interface Event {
		type: number
		mod: number
		key: number
		ch: number
		chStr: string
		width: number
		height: number
		err: string
		mouseX: number
		mouseY: number
	}

	const ColorDefault = 0
	const ColorBlack = 1
	const ColorRed = 2
	const ColorGreen = 3
	const ColorYellow = 4
	const ColorBlue = 5
	const ColorMagenta = 6
	const ColorCyan = 7
	const ColorWhite = 8

	const EventKey = 0
	const EventResize = 1
	const EventMouse = 2
	const EventError = 3
	const EventInterrupt = 4
	const EventRaw = 5
	const EventNone = 6

	const InputCurrent = 0
	const InputEsc = 1
	const InputAlt = 2
	const InputMouse = 3

	const OutputCurrent = 0
	const OutputNormal = 1
	const Output256 = 2
	const Output216 = 3
	const OutputGrayscale = 4

	const AttrBold = 512
	const AttrUnderline = 1024
	const AttrReverse = 2048

	const ModAlt = 1
	const ModMotion = 2

	const KeyCtrlTilde = 0x00
	const KeyCtrl2 = 0x00
	const KeyCtrlSpace = 0x00
	const KeyCtrlA = 0x01
	const KeyCtrlB = 0x02
	const KeyCtrlC = 0x03
	const KeyCtrlD = 0x04
	const KeyCtrlE = 0x05
	const KeyCtrlF = 0x06
	const KeyCtrlG = 0x07
	const KeyBackspace = 0x08
	const KeyCtrlH = 0x08
	const KeyTab = 0x09
	const KeyCtrlI = 0x09
	const KeyCtrlJ = 0x0A
	const KeyCtrlK = 0x0B
	const KeyCtrlL = 0x0C
	const KeyEnter = 0x0D
	const KeyCtrlM = 0x0D
	const KeyCtrlN = 0x0E
	const KeyCtrlO = 0x0F
	const KeyCtrlP = 0x10
	const KeyCtrlQ = 0x11
	const KeyCtrlR = 0x12
	const KeyCtrlS = 0x13
	const KeyCtrlT = 0x14
	const KeyCtrlU = 0x15
	const KeyCtrlV = 0x16
	const KeyCtrlW = 0x17
	const KeyCtrlX = 0x18
	const KeyCtrlY = 0x19
	const KeyCtrlZ = 0x1A
	const KeyEsc = 0x1B
	const KeyCtrlLsqBracket = 0x1B
	const KeyCtrl3 = 0x1B
	const KeyCtrl4 = 0x1C
	const KeyCtrlBackslash = 0x1C
	const KeyCtrl5 = 0x1D
	const KeyCtrlRsqBracket = 0x1D
	const KeyCtrl6 = 0x1E
	const KeyCtrl7 = 0x1F
	const KeyCtrlSlash = 0x1F
	const KeyCtrlUnderscore = 0x1F
	const KeySpace = 0x20
	const KeyBackspace2 = 0x7F
	const KeyCtrl8 = 0x7F


	const KeyF1 = 0
	const KeyF2 = 1
	const KeyF3 = 2
	const KeyF4 = 3
	const KeyF5 = 4
	const KeyF6 = 5
	const KeyF7 = 6
	const KeyF8 = 7
	const KeyF9 = 8
	const KeyF10 = 9
	const KeyF11 = 10
	const KeyF12 = 11
	const KeyInsert = 12
	const KeyDelete = 13
	const KeyHome = 14
	const KeyEnd = 15
	const KeyPgup = 16
	const KeyPgdn = 17
	const KeyArrowUp = 18
	const KeyArrowDown = 19
	const KeyArrowLeft = 20
	const KeyArrowRight = 21
	const MouseLeft = 22
	const MouseMiddle = 23
	const MouseRight = 24
	const MouseRelease = 25
	const MouseWheelUp = 26
	const MouseWheelDown = 27

}




declare namespace time {
    /**
     * The ISO time format.
     */
    export const RFC3339: string
    /**
     * The default date format.
     */
    export const DefaultDateFormat: string

    export const Nanosecond: number
    export const Microsecond: number
    export const Millisecond: number
    export const Second: number
    export const Minute: number
    export const Hour: number

    export const SecMillis: number
    export const MinMillis: number
    export const HourMillis: number
    export const DayMillis: number

    export function now(): DateTime
    export function nowUTC(): DateTime

	export function since(d: DateTime): Duration

    export const Monday: number
    export const Tuesday: number
    export const Wednesday: number
    export const Thursday: number
    export const Friday: number
    export const Saturday: number
    export const Sunday: number

    /**
     * The number of nanoseconds since the unix epoch.
     */
    export let unixNano: number

    export interface Location {
        name: string
    }

    export const utc: Location
    export const local: Location

    export function setLocation(name: string): void
    export function setDefaultLocation(name: string): void

	export interface Clock {
		readonly location: Location
		now(): DateTime
	}

    export function newClock(loc: Location): Clock

    /**
     * Sets a fixed value for now() for testing.
     */
    export function setFixedNow(t: DateTime): void

    /**
     * Remove a fixed value for now().
     */
    export function unsetFixedNow(): void
    export function loadLocation(name: string): Location

	export function formatMinutes(v: number): string

    /**
     * 
     * @param seconds from unix epoch
     */
    export function unix(seconds: number): DateTime

    export function date(year?: number, month?: number, day?: number, hour?: number, min?: number, sec?: number, loc?: Location): DateTime

	export function parseDaysOfWeek(s: string): number[]
	export function parseDuration(s: string | number | Duration): Duration
	export function parseTime(s: string | number | Duration): Duration
	
    export function durationNS(nanoseconds: number | Duration): Duration
    export function toDuration(hour: number, minute?: number, second?: number): Duration
    export function toMilliseconds(hour: number, minute?: number, second?: number): number

    export interface DateTime {
        unix(): number
        second: number
        nanosecond: number
        minute: number
        hour: number
        day: number
        /**
         * sunday = 0, monday = 1, ...
         */
        dayOfWeek: number
        month: number
        year: number
        yearDay: number
		daysInMonth: number
        location: Location

		/**
		 * Returns the time part rounded to seconds.
		 */
        time(): Duration

		/**
		 * Returns the date without the hour
		 */
		date()
		
        /**
         * Return the date discarding the time part in local time.
         */
        startOfDay(): DateTime
        /**
         * Returns the las moment of the day in local time
         */
        endOfDay(): DateTime
		eraDay(): number
		daysFrom(d2: DateTime)

        utc(): DateTime
        local(): DateTime
        sub(t: DateTime): Duration
        subtract(d: Duration | number): DateTime
        add(t: Duration | number): DateTime
        addYears(t: number): DateTime
        addMonths(t: number): DateTime
        addDays(t: number): DateTime
        addHours(t: number): DateTime
        addMinutes(t: number): DateTime
        addSeconds(t: number): DateTime
        addMilliseconds(t: number): DateTime

		round(d: Duration | number): DateTime
		trimSeconds(): DateTime

        setDate(year?: number, month?: number, day?: number): DateTime
        addDate(year: number, month: number, day: number): DateTime
        setTime(hour?: number, minute?: number, second?: number, millisecond?: number): DateTime
        setTimeMillis(millis: number): DateTime
        setDurationAsTime(d: number | Duration): DateTime

        format(f: string): string
		formatIn(f: string, loc: Location): string
		toString(): string
		
		in(loc: Location): DateTime

		/**
		 * Returns the timezone offset in seconds east of UTC.
		 */
		zoneOffset(): number

        /**
         * setLocation returns the same time with the location. No conversions
         * are made. 9:00 UTC becomes 9:00 Europe/Madrid
         */
        setLocation(loc: Location): DateTime
        equal(t: DateTime): boolean
        different(t: DateTime): boolean
        after(t: DateTime): boolean
        afterOrEqual(t: DateTime): boolean
        before(t: DateTime): boolean
        beforeOrEqual(t: DateTime): boolean
        between(t1: DateTime, t2: DateTime): boolean
        sameDay(t: DateTime): boolean
		yearsFrom(t: DateTime): number
    }

    export interface Duration {
        hours: number
        minutes: number
        seconds: number
        milliseconds: number
        nanoseconds: number
        equal(other: number | Duration): boolean
        different(other: number | Duration): boolean
        greater(other: number | Duration): boolean
        greaterOrEqual(other: number | Duration): boolean
        lesser(other: number | Duration): boolean
        lesserOrEqual(other: number | Duration): boolean
        add(other: number | Duration): Duration
        sub(other: number | Duration): Duration
        multiply(other: number | Duration): Duration
		format(v: "t" | "T"): string
    }

    export interface Period {
        start?: DateTime
        end?: DateTime
    }

    export function after(d: number | Duration, value?: any): sync.Channel
    export function sleep(millis: number): void
    export function sleep(d: Duration): void
    export function parse(value: any, format?: string): DateTime
    export function parseInLocation(value: any, format: string, location: Location): DateTime
	
	
    export function newTimer(duration: number, func: Function): Timer
	export interface Timer {
		stop(): void
		reset(): void
	}

	export function newTicker(duration: number | Duration, func: Function): Ticker
    export interface Ticker {
        stop(): void
    }

}







declare namespace tls {
    export function newConfig(insecureSkipVerify?: boolean): Config

    export interface Config {
		insecureSkipVerify: boolean
		certManager: autocert.CertManager
        loadCertificate(certPath: string, keyPath: string): void
        loadCertificateData(cert: byte[] | string, key: byte[] | string): void
	}

	export interface Certificate {
		cert: byte[]
		key: byte[]
	}
	
	export function generateCert(): Certificate 
}

declare namespace autocert {
	export interface CertManager {

	}

	export function newCertManager(dirCache: string, domains: string[], cache?: Cache): CertManager
	export function newCertManager(dirCache: string, hostPolicy: (host: string) => void, cache?: Cache): CertManager

	export interface Cache {
	}
	export function newFileSystemCache(fs: io.FileSystem): Cache
}




	
declare namespace uuid {
    export function newID(): string
    export function newRandomID(n?: number): string
}

	



declare namespace websocket {
	export function newUpgrader(): Upgrader

	export function isCloseError(err: errors.Error): boolean

	export interface Upgrader {
		handshakeTimeout: time.Duration | number
		readBufferSize: number
		writeBufferSize: number
		upgrade(r: http.Request): Connection
	}

    export interface Connection {
		setReadDeadline(t: time.DateTime): void
		setWriteDeadline(t: time.DateTime): void
        write(v: any): number | void
        writeJSON(v: any): void
        writeText(text: string | byte[]): void
        readMessage(): WebSocketMessage
        close(): void
    }

    export interface WebSocketMessage {
        type: WebsocketType
        message: string
    }

    export enum WebsocketType {
        text = 1,
        binary = 2,
        close = 8,
        ping = 9,
        pong = 10
    }
	
	export function dial(url: string): Connection
}





declare namespace x509 {
    export function parsePEM(key: string | byte[]): Cert

    interface Cert {
        encodePublicPEMKey(): byte[]
    }
}





declare namespace xlsx {
    export function newFile(): XLSXFile
    export function openFile(path: string): XLSXFile
    export function openFile(file: io.File): XLSXFile
    export function openReaderAt(r: io.ReaderAt, size: number): XLSXFile
    export function openBinary(data: bytes[]): XLSXFile
    export function newStyle(): Style

    export interface XLSXFile {
        sheets: XLSXSheet[]
        addSheet(name: string): XLSXSheet
        save(path?: string): void
        write(w: io.Writer): void
    }

    export interface XLSXSheet {
        rows: XLSXRow[]
        col(i: number): Col
        addRow(): XLSXRow
    }

    export interface Col {
        width: number
    }

    export interface XLSXRow {
        cells: XLSXCell[]
        height: number
        addCell(v?: any): XLSXCell
    }

    export interface XLSXCell {
        value: any
        numberFormat: string
        style: Style
        getDate(): time.DateTime
        merge(hCells: number, vCells: number): void
    }

    export interface Style {
        alignment: Alignment
        applyAlignment: boolean
        font: Font
        applyFont: boolean
    }

    export interface Alignment {
        horizontal: string
        vertical: string
    }

    export interface Font {
        bold: boolean
        size: number
    }
}





declare namespace xml {
/**
	* Escapes XML reserved characters for safe XML output.
	* 
	* Escapes the 5 XML-reserved characters using a pre-compiled strings.Replacer
	* for optimal performance. Converts any input type to string and replaces:
	* - & → &amp; (processed first to avoid double-escaping)
	* - < → &lt;
	* - > → &gt;
	* - " → &quot;
	* - ' → &apos;
    export function encode(value: string): string

    /**
     * Creates a new XML document.
     * @param addHeader - Whether to include a default XML header.
     * @param header - A custom XML header string.
     * @returns A new Document instance.
     * @example
     * const doc = xml.newDocument(true)
     */
    export function newDocument(addHeader?: boolean, header?: string): Document

    /**
     * Creates a new XML element with the specified tag name.
     * @param tag - The tag name of the element.
     * @returns A new Element instance.
     * @example
     * const el = xml.newElement("book")
     */
    export function newElement(tag: string): Element

    /**
     * Creates a new character data token.
     * @param name - The character data content.
     * @returns A CharData token.
     * @example
     * const data = xml.newCharData("Hello")
     */
    export function newCharData(name: string): CharData // Changed Token to CharData for specificity

    /**
     * Parses an XML document from a byte array.
     * @param b - The XML content as bytes.
     * @returns A parsed Document.
     */
    export function read(b: byte[]): Document

    /**
     * Parses an XML document from a string.
     * @param s - The XML content as a string.
     * @returns A parsed Document.
     * @example
     * const doc = xml.readString("<book><title>Example</title></book>")
     */
    export function readString(s: string): Document

    export interface Document {
        /** Indicates if the document is frozen (read-only). */
        readonly frozen: boolean; 

        /** Indicates if the document has child nodes. */
        hasChildren: boolean

        /**
         * Returns the root element of the document.
         * @returns The root Element.
         */
        root(): Element

        /**
         * Sets the root element of the document.
         * @param e - The element to set as root.
         */
        setRoot(e: Element): void

        /**
         * Inserts a child token at a given index.
         * @param i - Index position.
         * @param e - The token to insert.
         */
        insertChildAt(i: number, e: Token): void

        /**
         * Appends a child token to the document.
         * @param e - The token to add.
         */
        addChild(e: Token): void

        /**
         * Creates a character data token.
         * @param name - The data content.
         * @returns A CharData token.
         */
        createCharData(name: string): CharData // Changed Token to CharData for specificity

        /**
         * Creates a new element with a given name.
         * @param name - The tag name.
         * @returns A new Element.
         */
        createElement(name: string): Element

        /**
         * Creates an attribute and assigns it to the root.
         * @param name - Attribute key.
         * @param value - Attribute value.
         */
        createAttribute(name: string, value: string): Attribute

        /** Returns all direct child tokens. */
        child(): Token[]

        /** Returns all child elements. */
        children(): Element[]

        /** Returns all attributes defined at the root. */
        attributes(): Attribute[]

        /**
         * Removes a specific child token.
         * @param e - The token to remove.
         * @returns True if removed.
         */
        removeChild(e: Token): boolean

        /**
         * Removes a child token at a given index.
         * @param i - Index position.
         * @returns True if removed.
         */
        removeChildAt(i: number): boolean

        /**
         * Removes an attribute by key.
         * @param key - Attribute name.
         */
        removeAttribute(key: string): void

        /**
         * Sets the indentation level for serialization.
         * @param v - Indentation spaces.
         */
        indent(v: number): void

        /**
         * Finds the first element matching a path.
         * @param path - XPath-like query string.
         * @returns The matched Element or null.
         */
        findElement(path: string): Element

        /**
         * Finds all elements matching a path.
         * @param path - XPath-like query string.
         * @returns An array of matching Elements.
         */
        findElements(path: string): Element[]

        /**
         * Serializes the document to a string.
         * @param indent - Optional indentation level.
         * @returns The XML string.
         */
        string(indent?: number): string

        /**
         * Recursively freezes the document and all its children, making them read-only.
         */
        freeze(): void; 
    }

    export interface Token {
        /** Indicates if the token is frozen (read-only). */
        readonly frozen: boolean; 
        /**
         * Recursively freezes the token and all its children (if any), making them read-only.
         */
        freeze(): void; 
    }

    export interface CharData extends Token {
        /** Text content of the character data. */
        data: string
        // frozen and freeze inherited from Token
    }

    export interface Attribute {
        /** Namespace prefix, if any. */
        namespace: string
        /** Local key name. */
        key: string
        /** Full key including namespace. */
        fullKey: string
        /** Value of the attribute. */
        value: string
    }

    export interface Element extends Token {
        /** Tag name of the element. */
        tag: string
        /** Position index among siblings. */
        index: number
        /** Parent element reference. */
        parent: Element
        /** Whether the element has children. */
        hasChildren: boolean
        // frozen and freeze inherited from Token

        /** Removes all child tokens. */
        clearChild(): void

        /** Removes all attributes. */
        clearAttributes(): void

        /** Returns a deep copy of this element. */
        copy(): Element

        /**
         * Returns elements with the specified name.
         * @param name - Tag name to filter.
         */
        selectElements(name: string): Element[]

        /**
         * Returns the first child with the specified name.
         * @param name - Tag name to find.
         */
        selectElement(name: string): Element

        /**
         * Creates a character data node.
         * @param name - Data content.
         */
        createCharData(name: string): CharData // Changed Token to CharData for specificity

        /**
         * Creates a new child element.
         * @param name - Tag name.
         */
        createElement(name: string): Element

        /**
         * Creates and attaches an attribute.
         * @param name - Attribute key.
         * @param value - Attribute value.
         */
        createAttribute(name: string, value: string): Attribute

        /**
         * Inserts an attribute at a specific index.
         * @param i - Index position.
         * @param name - Attribute key.
         * @param value - Attribute value.
         */
        insertAttributeAt(i: number, name: string, value: string): Attribute

        /**
         * Retrieves an attribute's value.
         * @param name - Attribute name.
         * @returns Value or null.
         */
        getAttributeValue(name: string): string

        /**
         * Checks if the attribute exists.
         * @param name - Attribute name.
         */
        hasAttribute(name: string): boolean

        /**
         * Sets the text content of the element.
         * @param value - Text string.
         */
        setText(value: string): void

        /**
         * Sets the element content to a stringified value.
         * @param value - Accepts string, number, or boolean.
         */
        setValue(value: string | number | boolean): void

        /**
         * Gets the textual value of the element.
         * @returns The text content.
         */
        getValue(): string

        /** Returns inner text of the element. */
        text(): string

        /**
         * Removes the element from its parent.
         * @returns True if removed.
         */
        remove(): boolean

        /** Returns all direct children (tokens). */
        child(): Token[]

        /** Returns all direct child elements. */
        children(): Element[]

        /** Returns all attributes. */
        attributes(): Attribute[]

        /**
         * Adds a child token to the element.
         * @param e - Token to add.
         */
        addChild(e: Token): void

        /**
         * Inserts a child token at a specific index.
         * @param i - Index.
         * @param e - Token to insert.
         */
        insertChildAt(i: number, e: Token): void

        /**
         * Removes a specific child token.
         * @param e - Token to remove.
         * @returns True if removed.
         */
        removeChild(e: Token): boolean

        /**
         * Removes a child at a specific index.
         * @param i - Index.
         * @returns True if removed.
         */
        removeChildAt(i: number): boolean

        /**
         * Removes an attribute by key.
         * @param key - Attribute name.
         */
        removeAttribute(key: string): void

        /**
         * Finds the first element by path.
         * @param path - XPath-like query string.
         */
        findElement(path: string): Element

        /**
         * Finds all elements matching a path.
         * @param path - XPath-like query string.
         */
        findElements(path: string): Element[]

        /**
         * Serializes the element to an XML string.
         * @param indent - Optional indentation.
         * @returns XML string.
         */
        string(indent?: number): string

        /**
         * Serializes the inner XML of this element.
         * @param indent - Optional indentation.
         * @returns Inner XML string.
         */
        innerXML(indent?: number): string
    }
}






declare namespace zip {
    export function newWriter(w: io.Writer): Writer
    export function newReader(r: io.Reader, size: number): io.ReaderCloser
    export function open(path: string, fs?: io.FileSystem): Reader

    export interface Writer {
        create(name: string): io.Writer
        flush(): void
        close(): void
    }

    export interface Reader {
        files(): File[]
        close(): void
    }

    export interface File {
        name: string
        compressedSize: number
        uncompressedSize: number
        open(): io.ReaderCloser
    }
}


