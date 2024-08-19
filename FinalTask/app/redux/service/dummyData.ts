'use client'
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { verify } from "crypto";
import { get } from "http";

export const productsApi = createApi({
    reducerPath: "products",
    baseQuery: fetchBaseQuery({baseUrl:"https://akil-backend.onrender.com/"}),
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => "opportunities/search",
        }),
        getProduct: builder.query({
            query: (id) => `opportunities/${id}`,
        }),
        signUp: builder.mutation({
            query: (body) => ({
                url: "/signup",
                method: "POST",
                body,
            }),
        }),
        verifyEmail: builder.mutation({
            query: (body) => ({
                url: "/verify-email",
                method: "POST",
                body,
            }),
        }),
        login: builder.mutation({
            query: (body) => ({
                url: "/login",
                method: "POST",
                body,
            }),
        }),

    })
})
// `use${getProducts}Query`
export const { useGetProductsQuery,useGetProductQuery,useSignUpMutation,useVerifyEmailMutation, useLoginMutation } = productsApi;
