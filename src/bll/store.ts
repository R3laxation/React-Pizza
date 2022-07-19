import {combineReducers, configureStore, ThunkDispatch} from '@reduxjs/toolkit'
import filterReducer from './slises/filterSlice'
import cartReducer from "./slises/cartSlice";
import {TypedUseSelectorHook, useSelector, useDispatch} from "react-redux";
import pizzaReducer from "./slises/pizzaSlice";

const rootReducer = combineReducers({
    filter: filterReducer,
    cart: cartReducer,
    pizza: pizzaReducer
})


export const store = configureStore({
    reducer: rootReducer,

})
export type AppRootActionsType = Parameters<typeof rootReducer>[1]

export type AppRootStateType = ReturnType<typeof store.getState>
// export type AppDispatchType = typeof store.dispatch;
export type AppDispatchType = ThunkDispatch<AppRootStateType, unknown, AppRootActionsType>

export const useAppDispatch: () => AppDispatchType = useDispatch


export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector