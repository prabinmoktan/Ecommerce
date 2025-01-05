import { baseApiSlice } from "../../axios/baseApiConfig";
import { ApiResponse, ProductsTypes } from "../../interface";

const productsApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<ApiResponse, void>({
      query: () => ({
        url: "/products",
        method: "GET",
      }),
    }),
    createProducts: builder.mutation<ApiResponse, ProductsTypes>({
      query: (data)=> ({
        url:"/products",
        method: "POST",
        body: data
      })
    }),
    deleteProducts: builder.mutation<ApiResponse, string>({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      })
    }),
    updateProductById: builder.mutation<ProductsTypes, { _id: string, data: FormData }>({
      query: ({ _id, data }) => ({
        url: `/products/${_id}`,
        method: 'PATCH',
        body: data,
      })
    })
  }),
});
export const { useGetProductsQuery, useCreateProductsMutation, useDeleteProductsMutation, useUpdateProductByIdMutation } = productsApiSlice;

