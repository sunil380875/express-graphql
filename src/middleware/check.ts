export const inAuthenticated = (_, __, context) => {
    if(context?.user?.role !== "admin"){
        throw new Error("You are not authorised.");
    }
}