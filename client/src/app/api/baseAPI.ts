import {
  BaseQueryApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { startLoading, stopLoading } from "../layout/uiSlice";
import { toast } from "react-toastify";

const customBaseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  credentials: "include",
});

type ErrorResponse = | string | {title: string} | {errors: string[]};

const sleep = () => new Promise((resolve) => setTimeout(resolve, 1000));

export const baseQueryWithErrorHandling = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: object
) => {
  api.dispatch(startLoading());

  await sleep();
  const result = await customBaseQuery(args, api, extraOptions);

  api.dispatch(stopLoading());

  if (result.error) {
    console.log(result.error);
    
    const originalStatus = result.error.status === "PARSING_ERROR" && result.error.originalStatus
    ? result.error.originalStatus : result.error.status;

    const responseData = result.error.data as ErrorResponse;
    console.log(result);
    
    switch(originalStatus) {
      case 400: 
      if(typeof responseData === "string") toast.error(responseData);
      else if("errors" in responseData) {
        throw Object.values(responseData.errors).flat().join(", ");
      } else toast.error(responseData.title);
        break;
      case 401:
      if(typeof responseData === "object" && "title" in responseData)
        toast.error(responseData.title);
        break;
      case 404: 
      if(typeof responseData === "object" && "title" in responseData)
        toast.error(responseData.title);
        break;
      case 500:
        if(typeof responseData === "object" && "title" in responseData)
          toast.error(responseData.title + "Hello");
          break;
      default:
        break;
    }
  }

  return result;
};
