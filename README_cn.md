[English](README.md)
# NestJS 模板项目

这个项目是一个 NestJS 模板，旨在提供一个强大的起点来构建可扩展和可维护的应用程序。以下是项目结构的概述以及每个文件和目录的用途。

## 目录

- [NestJS 模板项目](#nestjs-模板项目)
  - [目录](#目录)
  - [安装](#安装)
  - [运行应用](#运行应用)
  - [环境变量](#环境变量)
  - [项目结构](#项目结构)
    - [配置文件](#配置文件)
    - [源文件](#源文件)
    - [通用目录](#通用目录)
    - [配置目录](#配置目录)
    - [入口文件](#入口文件)
    - [测试](#测试)
  - [数据库](#数据库)
    - [迁移](#迁移)
  - [贡献](#贡献)
  - [许可证](#许可证)

## 安装

使用以下命令安装依赖项：

```bash
pnpm install
```

## 运行应用

在开发模式下启动应用程序：

```bash
pnpm start:dev
```

构建应用程序：

```bash
pnpm build
```

在生产模式下启动应用程序：

```bash
pnpm start:prod
```

## 环境变量

应用程序需要以下环境变量。在项目根目录中创建一个 `.env` 文件，内容如下：

```plaintext
PORT=3004
RPC_URL=https://rpc.sepolia.mantle.xyz
CHAIN_ENV=testnet
LOG_LEVELS=
DATABASE_URL="postgresql://postgres:123456@localhost:5432/test"
```

- `PORT`：应用程序运行的端口号。
- `RPC_URL`：区块链交互的 RPC URL。
- `CHAIN_ENV`：区块链环境（例如，`testnet`）。
- `LOG_LEVELS`：逗号分隔的日志级别列表（例如，`log,warn,error`）。
- `DATABASE_URL`：数据库连接字符串。

## 项目结构

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
│  │  ├─ database.config.ts
│  │  ├─ typeorm.config.ts
│  ├─ main.ts
├─ test
│  ├─ app.e2e-spec.ts
│  └─ jest-e2e.json
├─ tsconfig.build.json
├─ tsconfig.json
└─ webpack-hmr.config.js
```

### 配置文件

- **.env**：开发环境变量。
- **.env.production**：生产环境变量。
- **.eslintrc.js**：ESLint 配置。
- **.prettierrc**：Prettier 代码格式化配置。
- **nest-cli.json**：Nest CLI 配置。
- **package.json**：项目元数据和脚本。
- **pnpm-lock.yaml**：pnpm 包管理器的锁定文件。
- **tsconfig.build.json**：构建项目的 TypeScript 配置。
- **tsconfig.json**：TypeScript 配置。

### 源文件

- **src/app.controller.ts**：主应用控制器。
- **src/app.controller.spec.ts**：主应用控制器的单元测试。
- **src/app.module.ts**：应用程序的根模块。
- **src/app.service.ts**：主应用服务。

### 通用目录

包含可重用的模块和服务。

- **src/common/contract**：包含与合约相关的模块和服务。
- **src/common/guards**：包含应用程序的自定义守卫。
- **src/common/interceptors**：包含自定义拦截器。
- **src/common/logger.service.ts**：自定义日志服务。
- **src/common/metrics**：包含应用指标的模块和服务。
- **src/common/pipes**：包含自定义管道。
- **src/common/provider**：包含提供者模块。
- **src/common/utils**：包含实用函数和类。

### 配置目录

包含应用程序的配置文件。

- **src/config/database.config.ts**：数据库配置。
- **src/config/typeorm.config.ts**：TypeORM 配置。

### 入口文件

- **src/main.ts**：应用程序的主入口。

### 测试

- **test/app.e2e-spec.ts**：应用程序的端到端测试。
- **test/jest-e2e.json**：端到端测试的 Jest 配置。

## 数据库

### 迁移

生成新的迁移：

```bash
pnpm migration:create -n MigrationName
```

本地运行迁移：

```bash
pnpm migration:run:local
```

在服务器上运行迁移：

```bash
pnpm migration:run:server
```

还原上一次迁移：

```bash
pnpm migration:revert
```

## 贡献

有关如何为此项目做出贡献的指南，请参阅 [CONTRIBUTING.md](CONTRIBUTING.md) 文件。

## 许可证

此项目是 MIT 许可证许可的。有关详细信息，请参阅 [LICENSE](LICENSE) 文件。
