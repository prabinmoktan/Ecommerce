import { baseApiSlice } from "../../../axios/baseApiConfig";

const CategoryApiSlice = baseApiSlice.injectEndpoints({
    endpoints:(builder)=> ({
        createCategory: builder.mutation({
            query:(category)=> ({
                url: '/category', 
                method: 'POST',
                body: category,
            }),
            invalidatesTags: ['Category'], // Invalidates 'Category' tag after mutation
        }),
        getCategory: builder.query({
            query: ()=> ({
                url: '/category',
                method: 'GET'
            }),
            providesTags: ['Category'], // Invalidates 'Category' tag after mutation
        })
    }),
    
})
export const {useCreateCategoryMutation, useGetCategoryQuery} = CategoryApiSlice