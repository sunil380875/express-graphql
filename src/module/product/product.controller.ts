import pool from "../../db/db.js";
import type { ProductCreate } from "./product.js";
class ProductController {
    async create({ name, category_id, description,inventory }: ProductCreate) {
        try {
            console.log({name, category_id, description })
            const { rows } = await pool.query(
                `
                INSERT INTO products(name,category_id,description,inventory) VALUES($1,$2,$3,$4) RETURNING *
                `, [name, category_id, description,inventory]
            );
            return rows[0];
        } catch (err) {
            throw err
        }
    }

    async getAllProduct() {
        try {
            const {rows} = await pool.query(
                `SELECT 
                    p.id,
                    p.name,
                    p.description,
                    p.image,
                    c.id AS category_id,
                    c.name AS category_name
                FROM products p JOIN categories c ON p.category_id=c.id `
            )
            return rows;
        } catch (err) {
            throw err
        }
    }

    async getProductDetails() {
        try {

        } catch (err) {
            throw err
        }
    }

    async update() {
        try {

        } catch (err) {
            throw err
        }
    }

    async delete() {
        try {

        } catch (err) {
            throw err
        }
    }
}

export default new ProductController();