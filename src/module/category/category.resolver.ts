import categoryController from "./category.controller.js"
import type { SaveCategoryArgs } from "./category.js"

export const CategoryResolver = {
    Query: {
        getAllCategory: async () => {
            const data = await categoryController.getAllCategory();

            return {
                success: true,
                message: "Successfully save categories",
                statusCode: 200,
                data
            }
        }
    },

    Mutation: {
        saveCategory: async (_: unknown, { name }: SaveCategoryArgs) => categoryController.saveCategory({ name }),
        updateCategory: async (_: unknown, { id, name }: { id: number, name: string }) => {
            const data = await categoryController.updatecategory(id, name);
            return {
                success: true,
                message: "Successfully update categories",
                statusCode: 201,
                data
            }
        },

        deleteCategory: async (_: unknown, { id }: { id: number }) => {
            const data = await categoryController.deleteCategory(id);
            return {
                success: true,
                message: "Successfully delete categories",
                statusCode: 200,
                data
            }
        }


    }
}