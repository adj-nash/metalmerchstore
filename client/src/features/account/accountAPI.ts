import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithErrorHandling } from "../../app/api/baseAPI";
import { User } from "../../app/models/user";
import { LoginSchema } from "../../lib/schemas/loginSchema";
import { router } from "../../app/routes/Routes";
import { RegisterSchema } from "../../lib/schemas/registerSchema";


export const accountApi = createApi({
    reducerPath: "accountApi",
    baseQuery: baseQueryWithErrorHandling,
    tagTypes: ["UserInfo"],
    endpoints: (builder) => ({
        login: builder.mutation<void, LoginSchema>({
            query: (credentials) => {
                return {
                    url: "login?useCookies=true",
                    method: "POST",
                    body: credentials
                }
            },
            onQueryStarted: async (_, {dispatch, queryFulfilled}) => {
                try {
                    await queryFulfilled;
                    dispatch(accountApi.util.invalidateTags(["UserInfo"]))
                } catch (error) {
                    console.log(error)
                }
            }
        }),
        registerUser: builder.mutation<void, RegisterSchema>({
            query: (credentials) => {
                return {
                    url: "account/register",
                    method: "POST",
                    body: credentials
                }
            },
            onQueryStarted: async (_, {queryFulfilled}) => {
                try {
                    await queryFulfilled;
                    router.navigate("/regitrationsuccess");
                } catch (error) {
                    console.log(error);
                }
            }
            
        }),
        userInfo: builder.query<User, void>({
            query: () => "account/user-info",
            providesTags: ["UserInfo"]
        }),
        logout: builder.mutation({
            query: () => ({
                url: "account/logout",
                method: "POST"
            
            }),
            onQueryStarted: async (_, {dispatch, queryFulfilled}) => {
                    await queryFulfilled;
                    dispatch(accountApi.util.invalidateTags(["UserInfo"]));
                    router.navigate("/");
                },
            
        })
    })
});

export const {useLoginMutation, useRegisterUserMutation, useLogoutMutation, useUserInfoQuery, useLazyUserInfoQuery} = accountApi;