# Base image
FROM node:18-alpine as base

# Install pnpm globally
RUN npm i -g pnpm

FROM base as dependencies

# Create app directory
WORKDIR /app

# Copy package.json and pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# Install app dependencies
RUN pnpm i --frozen-lockfile

FROM base as build

WORKDIR /app

# Copy app source code
COPY . .

COPY --from=dependencies /app/node_modules ./node_modules

# Compile TypeScript files (including migrations)
RUN pnpm run build
RUN pnpm prune --prod

FROM node:18-alpine as deploy

# Install pnpm globally again in deploy stage
RUN npm i -g pnpm

WORKDIR /app

COPY package.json ./
COPY --from=build /app/dist/ ./dist/
COPY --from=build /app/node_modules ./node_modules

# Expose the port on which the app will run
EXPOSE 3004

# Start the server using the production build
CMD pnpm run migration:run:server && pnpm run start:prod
# CMD pnpm run start:prod