import {AppRootStateType} from "../../store";

export const selectCart = (state: AppRootStateType) => state.cart;

export const selectCartItemById = (id: number) => (state: AppRootStateType) => state.cart.items.find(obj => obj.id === id)