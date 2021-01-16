<!--- -------------------------------------------- -->

# Sublimate

### Installation instructions:

#### Development:

```bash
npm install -g pnpm
pnpm add -g pnpm
pnpm install
```

1. Run `docker-compose up -d`
2. Open new terminal from the root directory of this repo and run: `pnpm common` (keep this terminal running)
3. Open new terminal from the root directory of this repo and run:
   ```bash
    pnpm common:build
    pnpm contracts
    cd subgraph
    pnpm local:setup
    pnpm local:redeploy
    cd ..
    pnpm web
   ```
