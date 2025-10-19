export function main(dir?: string) {
    if (!dir) {
        dir = "."
    }

    for (let path of os.readNames(".", true)) {
        if (path.endsWith("/.DS_Store")) {
            console.log("Delete", path)
            os.removeAll(path)
        }
    }
}