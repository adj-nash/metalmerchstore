import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { counterSlice } from "./CounterReducer";
import { catalogueApi } from "../../features/catalogue/catalogueAPI";
import { uiSlice } from "../layout/uiSlice";
import { errorApi } from "../../features/about/errorAPI";
import { basketApi } from "../../features/basket/basketApi";
import { catalogueSlice } from "../../features/catalogue/catalogueSlice";
import { accountApi } from "../../features/account/accountAPI";
import { checkoutApi } from "../../features/checkout/checkoutApi";
import { orderApi } from "../../features/orders/orderApi";
import { adminApi } from "../../features/admin/adminApi";

export const store = configureStore({
  reducer: {
    [catalogueApi.reducerPath]: catalogueApi.reducer,
    [errorApi.reducerPath]: errorApi.reducer,
    [basketApi.reducerPath]: basketApi.reducer,
    [accountApi.reducerPath]: accountApi.reducer,
    [checkoutApi.reducerPath]: checkoutApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer,
    counter: counterSlice.reducer,
    ui: uiSlice.reducer,
    catalogue: catalogueSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      adminApi.middleware,
      checkoutApi.middleware,
      basketApi.middleware,
      catalogueApi.middleware,
      errorApi.middleware,
      accountApi.middleware,
      orderApi.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
