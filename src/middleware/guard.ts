const guard = (...checks) => {
    return (resolver) => {
        return async (parent, arg, context, info) => {
            for (const check of checks) {
                await check(parent, arg, context, info)
            }

            return resolver(parent, arg, context, info)
        }
    }
}


export default guard