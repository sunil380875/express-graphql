import productController from "./product.controller.js"
import type { ProductCreate } from "./product.js";
import { pubsub } from "../../graphql/pubsub.js";
export const ProductResolver = {
    Query: {
        getAllProduct: async () => {
            const data = await productController.getAllProduct();

            return {
                success: true,
                message: "Successfully fetched all products",
                statusCode: 200,
                data,
            };
        },
    },

    Mutation: {
        createProduct: async (_: unknown, { name, category_id, description,inventory }: ProductCreate) => {
            const data = await productController.create({ name, category_id, description,inventory });

            pubsub.publish('PRODUCT_CREATED', { productCreated: data });

            return {
                success: true,
                message: "Successfully added new product",
                statusCode: 201,
                data: data
            }
        }
    },
    Subscription: {
        productCreated: {
            subscribe: () => pubsub.asyncIterableIterator(['PRODUCT_CREATED']),
        },
    }
}