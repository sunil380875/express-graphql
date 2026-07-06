export const CategoryTypeDef = `
    scalar Date

    type Category {
        id: ID
        name: String!
        created_at: Date
        updated_at: Date
    }

    type CategoryGetResponse {
        success: Boolean!
        message: String!
        statusCode: Int!
        data: [Category!]!
    }
    type CategoryUpdateResponse {
        success: Boolean!
        message: String!
        statusCode: Int!
        data: Category!
    }

    type Query {
        getAllCategory: CategoryGetResponse
    }

    type Mutation {
        saveCategory(name: String!): Category!,
        updateCategory(id:Int!, name:String!):CategoryUpdateResponse,
        deleteCategory(id:Int!):CategoryUpdateResponse,
    }
`;