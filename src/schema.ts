import pool from "./db/db.js";

async function UserTable() {
    await pool.query(
        `  
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(200) NOT NULL,
      email VARCHAR(250) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      profile_image TEXT,
      role VARCHAR(20) DEFAULT 'customer',
      is_verified BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
        `
    )
};

async function Category() {
    await pool.query(
        `
        CREATE TABLE IF NOT EXISTS categories (
            id SERIAL PRIMARY KEY,
            name VARCHAR(300) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
        `
    )
}

async function Product(){
    await pool.query(
        `
        CREATE TABLE IF NOT EXISTS products (
            id SERIAL PRIMARY KEY,
            name VARCHAR(300) NOT NULL,
            image TEXT,
            inventory INT NOT NULL,
            description VARCHAR(500),
            category_id INT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

            CONSTRAINT fk_categories_id 
            FOREIGN KEY(category_id)
            REFERENCES categories(id)
        )
        `
    )
}

await Promise.all([
    UserTable(),
    Category(),
    Product()
]);

