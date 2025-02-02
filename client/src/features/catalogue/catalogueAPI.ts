import { createApi } from "@reduxjs/toolkit/query/react";
import { Product } from "../../app/models/product";
import { baseQueryWithErrorHandling } from "../../app/api/baseAPI";

export const catalogueApi = createApi({
  reducerPath: "catalogueApi",
  baseQuery: baseQueryWithErrorHandling,
  endpoints: (builder) => ({
    fetchAllProducts: builder.query<Product[], void>({
      query: () => "Products",
    }),
    fetchProduct: builder.query<Product, number>({
      query: (id) => `Products/${id}`,
    }),
  }),
});

export const { useFetchAllProductsQuery, useFetchProductQuery } = catalogueApi;
