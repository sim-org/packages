/**
 * ------------------------------------------------------------------
 * Generate random strings
 * ------------------------------------------------------------------
 */

export function main(len?: string) {
    let n = convert.toInt(len || "15")
    let v = crypto.randomAlphanumeric(n)
    fmt.println(v)
}