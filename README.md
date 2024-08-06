[中文](README_cn.md)
# NestJS Template Project 

This project is a NestJS template designed to provide a robust starting point for building scalable and maintainable applications. Below is an overview of the project structure and the purpose of each file and directory.

## Table of Contents

- [Installation](#installation)
- [Running the App](#running-the-app)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [Database](#database)
- [Testing](#testing)

## Installation

To install the dependencies, use the following command:

```bash
pnpm install
```

## Running the App

To start the application in development mode:

```bash
pnpm start:dev
```

To build the application:

```bash
pnpm build
```

To start the application in production mode:

```bash
pnpm start:prod
```

## Environment Variables

The application requires the following environment variables. Create a .env file in the root directory of the project with the following content:

```plaintext
  PORT=3004
  RPC_URL=https://rpc.sepolia.mantle.xyz
  CHAIN_ENV=testnet
  LOG_LEVELS=
  DATABASE_URL="postgresql://postgres:123456@localhost:5432/test"
```
- PORT: The port number on which the application will run.
- RPC_URL: The RPC URL for blockchain interactions.
- CHAIN_ENV: The environment of the blockchain (e.g., testnet).
- LOG_LEVELS: Comma-separated list of log levels (e.g., log,warn,error).
- DATABASE_URL: The database connection string.
  
## Project Structure

```plaintext
nestjs-template
├─ .env
├─ .env.production
├─ .eslintrc.js
├─ .prettierrc
├─ README.md
├─ dist
├─ nest-cli.json
├─ package.json
├─ pnpm-lock.yaml
├─ src
│  ├─ app.controller.spec.ts
│  ├─ app.controller.ts
│  ├─ app.module.ts
│  ├─ app.service.ts
│  ├─ common
│  │  ├─ contract
│  │  │  ├─ contract.module.ts
│  │  │  └─ contract.service.ts
│  │  ├─ guards
│  │  │  ├─ api-key.guard.ts
│  │  │  └─ throttler-behind-proxy.guard.ts
│  │  ├─ interceptors
│  │  │  ├─ all-exceptions.filter.ts
│  │  │  ├─ response.interceptor.ts
│  │  │  └─ skip-response-interceptor.decorator.ts
│  │  ├─ logger.service.ts
│  │  ├─ metrics
│  │  │  ├─ metrics.controller.ts
│  │  │  ├─ metrics.module.ts
│  │  │  └─ metrics.service.ts
│  │  ├─ pipes
│  │  │  ├─ address-validation.pipe.ts
│  │  │  └─ verify-signature.pipe.ts
│  │  ├─ provider
│  │  │  └─ provider.module.ts
│  │  └─ utils
│  │     ├─ bigint.transformer.ts
│  │     ├─ concurrency.ts
│  │     └─ numeric.transformer.ts
│  ├─ config
│  │  ├─ run.ts
│  │  ├─ typeorm.config.ts
│  ├─ database
│  │  ├─ migrations
│  │  │  ├─ <migration-files>.ts
│  ├─ main.ts
├─ test
│  ├─ app.e2e-spec.ts
│  └─ jest-e2e.json
├─ tsconfig.build.json
├─ tsconfig.json
└─ webpack-hmr.config.js
```

### Configuration Files

- **.env**: Environment variables for development.
- **.env.production**: Environment variables for production.
- **.eslintrc.js**: ESLint configuration.
- **.prettierrc**: Prettier configuration for code formatting.
- **nest-cli.json**: Nest CLI configuration.
- **package.json**: Project metadata and scripts.
- **pnpm-lock.yaml**: Lock file for pnpm package manager.
- **tsconfig.build.json**: TypeScript configuration for building the project.
- **tsconfig.json**: TypeScript configuration.

### Source Files

- **src/app.controller.ts**: Main application controller.
- **src/app.controller.spec.ts**: Unit tests for the main application controller.
- **src/app.module.ts**: Root module of the application.
- **src/app.service.ts**: Main application service.

### Common Directory

Contains reusable modules and services.

- **src/common/contract**: Contains contract-related modules and services.
- **src/common/guards**: Contains custom guards for the application.
- **src/common/interceptors**: Contains custom interceptors.
- **src/common/logger.service.ts**: Custom logger service.
- **src/common/metrics**: Contains modules and services for application metrics.
- **src/common/pipes**: Contains custom pipes.
- **src/common/provider**: Contains provider module.
- **src/common/utils**: Contains utility functions and classes.

### Configuration Directory

Contains configuration files for the application.

- **src/config/database.config.ts**: Database configuration.
- **src/config/typeorm.config.ts**: TypeORM、DataSource configuration.

### Database Directory

Contains database-related files.

- **src/database/migrations**: Contains database migration files.

### Main Entry Point

- **src/main.ts**: The main entry point of the application.

### Testing

- **test/app.e2e-spec.ts**: End-to-end tests for the application.
- **test/jest-e2e.json**: Jest configuration for end-to-end tests.

## Database

### Migrations

To generate a new migration:

```bash
npm run migration:generate -- ./src/database/migrations/{migrationName}
```

To create a new migration:

```bash
npm run migration:create src/database/migrations/{migrationName}
```

To run migrations:

```bash
npm run migration:run:local
```

To revert the last migration:

```bash
npm run migration:revert
```

## Contributing

Please refer to the [CONTRIBUTING.md](CONTRIBUTING.md) file for guidelines on how to contribute to this project.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
