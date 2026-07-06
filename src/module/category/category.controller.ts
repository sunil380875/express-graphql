import pool from "../../db/db.js";
import type { SaveCategoryArgs } from "./category.js";

class CategoryController {
    async saveCategory({ name }: SaveCategoryArgs) {
        try {
            const isExist = await pool.query(
                `SELECT name FROM categories WHERE name=$1`, [name]
            );
            if (isExist.rows.length > 0) {
                throw new Error("Category already exists");
            };
            const { rows } = await pool.query(
                `
                INSERT INTO categories(name) VALUES($1) RETURNING *
                `, [name]
            )
            return rows[0]
        } catch (err) {
            throw err;
        }
    }

    async getAllCategory() {
        const { rows } = await pool.query(
            `SELECT * FROM categories
            `
        )
        return rows
    }

    async deleteCategory(id: number) {
        try {
            const { rows } = await pool.query(
                `
                DELETE FROM categories WHERE id=$1 RETURNING *
                `, [id]
            )
            return rows[0]
        } catch (err) {
            throw err
        }
    }

    async updatecategory(id: number, name: string) {
        console.log(typeof id,"wjnj")
        try {
            const { rows } = await pool.query(
                `
                UPDATE  categories SET name= $1 WHERE id = $2 RETURNING *
                `, [name,id]
            )
            return rows[0]
        } catch (err) {
            throw err
        }
    }
}

export default new CategoryController();