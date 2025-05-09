import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithErrorHandling } from "../../app/api/baseAPI";
import { CreateOrder, Order } from "../../app/models/order";

export const orderApi = createApi({
    reducerPath: "orderApi",
    baseQuery: baseQueryWithErrorHandling,
    endpoints: (builder) => ({
        fetchOrders: builder.query<Order[], void>({
            query: () => "orders"
        }),
        fetchOrder: builder.query<Order, number>({
            query: (id) => ({
                url: `orders/${id}`
            })
        }),
        createOrder: builder.mutation<Order, CreateOrder>({
            query: (order) => ({
                url: "orders",
                method: "POST",
                body: order
            })
        })
    })

});

export const {useFetchOrdersQuery, useFetchOrderQuery, useCreateOrderMutation} = orderApi;