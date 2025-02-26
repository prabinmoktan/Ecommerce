import { baseApiSlice } from "../../../axios/baseApiConfig";

const productApi = baseApiSlice.injectEndpoints({
    endpoints:(builder)=> ({
        getProducts: builder.query({
            query: ({limit, page})=> ({
                url: '/products',
                method: 'GET',
                params: ({limit, page})
            })
        }),
        getProductById: builder.query({
            query:(id)=> ({
                url: `/products/${id}`,
                method: 'GET'
            })
        })
    })

})

export const { useGetProductsQuery, useGetProductByIdQuery } = productApi;