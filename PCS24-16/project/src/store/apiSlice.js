// import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseURI='http://localhost:8080';

export const apiSlice=createApi({
    baseQuery:fetchBaseQuery({baseUrl:baseURI}),
    endpoints:builder=>({
        getCategories:builder.query({
            //get:http://localhost:8080/api/categories
            query:()=>'/api/categories',
            providesTags:['categories']
        }),
        //get labels
        getLabels:builder.query({
            query:()=>'/api/labels',
            providesTags:['feedback']
        }),
        //add new feedback
        addFeedback:builder.mutation({
            query:(initialTransaction)=>({
                //post:http://localhost:8080/api/transaction
                url:'/api/transaction',
                method:'POST',
                body:initialTransaction,
            }),
            invalidatesTags:['feedback']
        }),

        //if delete write here
    })
})

export default apiSlice;