import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { counterSlice } from "./CounterReducer";
import { catalogueApi } from "../../features/catalogue/catalogueAPI";
import { uiSlice } from "../layout/uiSlice";
import { errorApi } from "../../features/about/errorAPI";

export const store = configureStore({
  reducer: {
    [catalogueApi.reducerPath]: catalogueApi.reducer,
    [errorApi.reducerPath]: errorApi.reducer,
    counter: counterSlice.reducer,
    ui: uiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(catalogueApi.middleware, errorApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
