export const ProductTypeDef = `
scalar Date

type Product {
    id: Int!
    name: String!
    image: String
    description: String
    created_at: Date
    inventory: Int!
    category_id:Int!
    category_name:String
}

type GetProductResponse {
    message: String
    statusCode: Int
    success: Boolean
    data: [Product!]!
}

type SaveProductResponse {
    message: String
    statusCode: Int
    success: Boolean
    data: Product!
}

type Query {
    getAllProduct: GetProductResponse
}

type Mutation {
    createProduct(
        name: String!
        category_id: Int!
        description: String
        inventory: Int!
    ): SaveProductResponse!
}

type Subscription {
    productCreated: Product!
}
`