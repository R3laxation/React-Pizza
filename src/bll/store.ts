import {combineReducers, configureStore} from '@reduxjs/toolkit'
import filterReducer from './slises/filter/filterSlice'
import cartReducer from "./slises/cart/cartSlice";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import pizzaReducer from "./slises/pizza/pizzaSlice";

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
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch


export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector