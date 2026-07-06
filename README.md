# Node.js GraphQL API with Express and PostgreSQL

A scalable and modular GraphQL API built with Node.js, Express, Apollo Server, and PostgreSQL, written in TypeScript.

## Features

- **Apollo Server & Express:** Handles GraphQL queries and mutations alongside Express middleware.
- **PostgreSQL Database Integration:** Uses the `pg` library with connection pooling for robust and efficient database interactions.
- **Modular GraphQL Architecture:** Schemas and resolvers are organized by domain (Users, Categories, Products) for better maintainability and scalability.
- **TypeScript:** Fully typed codebase for improved developer experience and type safety.
- **Environment Configuration:** Uses `dotenv` for managing environment-specific configurations.

## Project Structure

```text
src/
├── db/             # Database connection and pooling setup (PostgreSQL)
├── graphql/        # Aggregated GraphQL TypeDefs and Resolvers
├── middleware/     # Custom Express middlewares
├── module/         # Domain-specific logic (Category, Product, User)
│   ├── category/   # Category TypeDefs and Resolvers
│   ├── product/    # Product TypeDefs and Resolvers
│   └── user/       # User TypeDefs and Resolvers
├── types/          # Global TypeScript interfaces and types
├── validation/     # Input validation logic (e.g., Zod schemas)
├── schema.ts       # Utility or aggregated schema definitions
└── server.ts       # Application entry point & Apollo Server setup
```

## Prerequisites

- Node.js (v18+ recommended)
- PostgreSQL Database
- npm or yarn

## Environment Variables

Create a `.env` file in the root of the project with the following PostgreSQL credentials:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=your_database_name
```

## Installation

1. Clone the repository and navigate to the project root.
2. Install the dependencies:
   ```bash
   npm install
   ```

## Available Scripts

- **Development:** Runs the application in development mode with live-reloading.
  ```bash
  npm run dev
  ```
- **Build:** Compiles TypeScript to JavaScript into a `dist/` directory.
  ```bash
  npm run build
  ```
- **Production Start:** Runs the compiled JavaScript build.
  ```bash
  npm run start
  ```
- **Schema Execution (Utility):** Run schema-specific tasks.
  ```bash
  npm run schema
  ```

## API Access

Once the server is running, the Apollo GraphQL Sandbox will be available at:

```
http://localhost:4000/graphql
```

You can use this playground to explore the GraphQL schema and run Queries & Mutations for Users, Categories, and Products.
