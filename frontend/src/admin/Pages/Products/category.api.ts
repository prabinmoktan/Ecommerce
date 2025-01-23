import { baseApiSlice } from "../../../axios/baseApiConfig";

const CategoryApiSlice = baseApiSlice.injectEndpoints({
    endpoints:(builder)=> ({
        createCategory: builder.mutation({
            query:(category)=> ({
                url: '/category', 
                method: 'POST',
                body: category,
            })
        }),
        getCategory: builder.query({
            query: ()=> ({
                url: '/category',
                method: 'GET'
            })
        })
    }),
    
})
export const {useCreateCategoryMutation, useGetCategoryQuery} = CategoryApiSlice