import * as getargs from "github.com/sim-org/packages/pkg/getargs"

export function main(...args: string[]) {
    const parser = new getargs.Parser(args)
    parser.addFlag("p", "9090", "port")

    const port = parser.flagInt("p")

    let s = http.newServer()
    s.address = ":" + port

    s.handler = (w, r) => {
        let path = r.url.path.trimStart("/")
        let file = path || "index.html"

        if (!os.exists(file)) {
            w.writeError(http.NOT_FOUND)
            return
        }

        w.writeFile(file, os.fileSystem, time.now())
    }

    console.log(`Listening on http://localhost:${port}`)

    s.start()
}