import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsApi = createApi({
    reducerPath: "products",
    baseQuery: fetchBaseQuery({baseUrl:"https://dummyjson.com"}),
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => "/products",
        }),
    })
})
// `use${getProducts}Query`
export const { useGetProductsQuery } = productsApi;
