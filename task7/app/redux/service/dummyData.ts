'use client'
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { get } from "http";

export const productsApi = createApi({
    reducerPath: "products",
    baseQuery: fetchBaseQuery({baseUrl:"https://akil-backend.onrender.com/opportunities"}),
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => "/search",
        }),
        getProduct: builder.query({
            query: (id) => `/${id}`,
        })
    })
})
// `use${getProducts}Query`
export const { useGetProductsQuery,useGetProductQuery } = productsApi;
