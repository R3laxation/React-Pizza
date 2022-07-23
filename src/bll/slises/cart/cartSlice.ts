import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {getCartFromLS} from "../../../utils/getCartFromLocalstorage";
import {calcTotalPrice} from "../../../utils/calcTotalPrice";
import {CartItemType, CartStateType} from "./types";

const {items, totalPrice} = getCartFromLS();

const cartSlice = createSlice({
    name: 'card',
    initialState: {
        totalPrice: totalPrice,
        items: items,

    } as CartStateType,
    reducers: {
        // addItem(state, action: PayloadAction<CartItemType>) {
        //     state.items.push(action.payload)
        //     state.totalPrice = state.items.reduce((sum, obj) => sum + obj.price, 0)
        // },
        addItem(state, action: PayloadAction<CartItemType>) {
            const findItem = state.items.find(obj => obj.id === action.payload.id)
            if (findItem) {
                findItem.count && findItem.count++
            } else {
                state.items.push({...action.payload})
            }

            state.totalPrice = calcTotalPrice(state.items)

        },
        removeItem(state, action: PayloadAction<{ id: number }>) {
            state.items = state.items.filter(obj => obj.id !== action.payload.id)
        },
        clearItems(state) {
            state.items = []
            state.totalPrice = 0;
        },
        plusItem(state, action: PayloadAction<{ id: number }>) {
            const findItem = state.items.find(obj => obj.id === action.payload.id)
            if (findItem) {
                findItem.count++
            }
        },
        minusItem(state, action: PayloadAction<{ id: number }>) {
            const findItem = state.items.find(obj => obj.id === action.payload.id)
            if (findItem) {
                findItem.count--
            }
            // else if(findItem && findItem.count <= 0) {
            //     state.items = state.items.filter(obj => obj.id !== action.payload.id)
            //     state.totalPrice = 0;
            // }
        }
    },
})



export const {addItem, removeItem, clearItems, plusItem, minusItem} = cartSlice.actions;

export default cartSlice.reducer

