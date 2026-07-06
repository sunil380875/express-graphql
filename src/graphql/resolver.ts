import { CategoryResolver } from "../module/category/category.resolver.js";
import { ProductResolver } from "../module/product/product.resolver.js";
import { UserResolver } from "../module/user/user.resolver.js";


export const resolver = {
    Query: {
        ...UserResolver.Query,
        ...CategoryResolver.Query,
        ...ProductResolver.Query
    },
    Mutation:{
        ...CategoryResolver.Mutation,
        ...ProductResolver.Mutation
    }
}