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

1. Open a new terminal from the root directory.

   Run Docker containers for The Graph, IPFS, Postgres, and Ganache:
   ```bash
   npm run externals:up
   ```

2. Open a new terminal from the root directory.

   Watch and auto-compile common TypeScript files:
   ```bash
   npm run common:dev
   ```

3. Open a new terminal from the root directory.

   Watch and auto-deploy smart contracts with Hardhat:
   ```bash
   npm run contracts
   ```

   Watch and auto-deploy subgraph on The Graph:
   ```bash
   npm run subgraph
   ```

   Watch and auto-compile front end:
   ```bash
   npm run web
   ```
