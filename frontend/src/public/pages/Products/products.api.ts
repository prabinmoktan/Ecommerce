import { baseApiSlice } from "../../../axios/baseApiConfig";

const productApi = baseApiSlice.injectEndpoints({
    endpoints:(builder)=> ({
        getProducts: builder.query({
            query: ()=> ({
                url: '/products',
                method: 'GET'
            })
        })
    })

})

export const { useGetProductsQuery } = productApi;