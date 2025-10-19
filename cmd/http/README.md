A simple HTTP static file server

## Installation

```bash
sim install github.com/sim-org/packages/cmd/http
```

## Usage

```bash
# Run with default port (9090)
sim http

# Run with custom port
sim http -p 8080
```

## How it Works

The server:
1. Listens on the specified port (default: 9090)
2. Serves files from the current directory
3. Returns `index.html` when accessing the root path (`/`)
4. Returns 404 for non-existent files

