# Sublimate

### Installing dependencies:

Install [node.js/`npm`](https://nodejs.org).

Install `pnpm`:
```bash
npm install -g pnpm
pnpm add -g pnpm
```

Navigate to the project root directory.

Use `pnpm` to install npm packages:
```bash
pnpm install
```

### Starting development environment:

Navigate to the project root directory.

1. Run Docker containers for The Graph, IPFS, Postgres, and Ganache:
   ```bash
   docker-compose up -d
   ```

2. Open a new terminal from the root directory.

   Run (keep this terminal running):
   ```bash
   pnpm common
   ```

3. Open a new terminal from the root directory.

   Compile common TypeScript utilities:
   ```bash
   pnpm common:build
   ```

   Run Hardhat locally (watches for changes):
   ```bash
   pnpm contracts
   ```

   Run The Graph locally (watches for changes):
   ```bash
   cd subgraph
   pnpm local:setup
   pnpm local:redeploy
   ```

   Run local web server (watches for changes):
   ```bash
   cd ..
   pnpm web
   ```
