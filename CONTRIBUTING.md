# Contributing to NestJS Template Project

Thank you for considering contributing to the NestJS Template Project! We welcome contributions of all kinds, from bug reports to feature enhancements. This document outlines the guidelines and processes for contributing to the project.

## Table of Contents

- [Contributing to NestJS Template Project](#contributing-to-nestjs-template-project)
  - [Table of Contents](#table-of-contents)
  - [How to Contribute](#how-to-contribute)
  - [Setting Up the Development Environment](#setting-up-the-development-environment)
  - [Coding Guidelines](#coding-guidelines)
  - [Commit Messages](#commit-messages)
  - [Pull Request Process](#pull-request-process)
  - [Running Tests](#running-tests)
  - [Database Migrations](#database-migrations)
    - [Generating a Migration](#generating-a-migration)
    - [Creating a New Migration](#creating-a-new-migration)
    - [Running Migrations](#running-migrations)
    - [Reverting a Migration](#reverting-a-migration)
  - [License](#license)

## How to Contribute

1. **Reporting Bugs**: If you find a bug, please create an issue in the repository with a detailed description of the problem and how to reproduce it.
2. **Proposing Features**: If you have an idea for a new feature, please discuss it by creating an issue before starting development.
3. **Fixing Bugs/Implementing Features**: Fork the repository, create a new branch, and submit a pull request (PR) when your changes are ready for review.

## Setting Up the Development Environment

1. Clone the repository:

   ```bash
   git clone https://github.com/mantle-xyz/nestjs-template.git
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Create a .env file in the root directory based on the provided .env.example and configure the necessary environment variables.
4. Start the development server:

   ``` bash
   pnpm start:dev
   ```

## Coding Guidelines

- **Code Style**: The project uses ESLint and Prettier for code formatting. Ensure your code adheres to these guidelines before submitting a pull request.
- **TypeScript**: Write all code in TypeScript and use strong typing wherever possible.
- **Documentation**: Ensure that your code is well-documented, especially for public APIs and complex functions.

## Commit Messages

- Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification.
- Use the command `pnpm commit` or `npx cz` to generate a commit message that adheres to the Conventional Commits format.
- Commit message types include:
  - `feat`: A new feature
  - `fix`: A bug fix
  - `docs`: Documentation only changes
  - `style`: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
  - `refactor`: A code change that neither fixes a bug nor adds a feature
  - `perf`: A code change that improves performance
  - `test`: Adding missing tests or correcting existing tests
  - `build`: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
  - `ci`: Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)
  - `chore`: Other changes that don't modify `src` or `test` files
  - `revert`: Reverts a previous commit

Example commit message:
   ```bash
   feat(auth): add JWT authentication
   fix(user): resolve issue with user profile loading
   ```

## Pull Request Process

1. Ensure that your code adheres to the coding guidelines.
2. Ensure that all tests pass before submitting a pull request.
3. Provide a clear and descriptive title for the pull request.
4. Link the pull request to the relevant issue, if applicable.
5. A project maintainer will review your pull request and provide feedback if necessary.

## Running Tests

Before submitting your changes, ensure that all tests pass:

   ```bash
   pnpm test
   ```

## Database Migrations

If your contribution involves changes to the database schema, please include the appropriate migration files.

### Generating a Migration

To generate a new migration file:

   ```bash
   npm migration:generate -- ./src/database/migrations/{migrationName}
   ```

### Creating a New Migration

To create a new migration file:

   ```bash
   npm migration:generate -- ./src/database/migrations/{migrationName}
   ```

### Running Migrations
To run the migrations:
   ```bash
   npm migration:run:local
   ```

### Reverting a Migration
To revert the last migration:
   ```bash
   npm migration:run:revert
   ```

## License

By contributing, you agree that your contributions will be licensed under the project's MIT License.