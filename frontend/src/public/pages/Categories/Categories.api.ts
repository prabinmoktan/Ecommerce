import { baseApiSlice } from "../../../axios/baseApiConfig";

const categoriesApi = baseApiSlice.injectEndpoints({
    endpoints:(builder)=> ({
        getCategories: builder.query({
            query: ()=> ({
                url: '/category',
                method: 'GET'
            })
        })
    })

})

export const { useGetCategoriesQuery } = categoriesApi;