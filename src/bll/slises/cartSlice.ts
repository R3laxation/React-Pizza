import {createSlice, PayloadAction} from '@reduxjs/toolkit'


const cartSlice = createSlice({
    name: 'card',
    initialState: {
        totalPrice: 0,
        items: [],

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

            state.totalPrice = state.items.reduce((sum, obj) => sum + (obj.price * obj.count), 0)

        },
        removeItem(state, action: PayloadAction<{ id: number }>) {
            state.items = state.items.filter(obj => obj.id !== action.payload.id)
        },
        clearItems(state) {
            state.items = []
            state.totalPrice = 0;
        },
        plusItem(state, action: PayloadAction<{id: number}>){
            const findItem = state.items.find(obj => obj.id === action.payload.id)
            if(findItem){
                findItem.count++
            }
        },
        minusItem(state, action: PayloadAction<{id: number}>){
            const findItem = state.items.find(obj => obj.id === action.payload.id)
            if(findItem && findItem.count > 0){
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

export type CartStateType = {
    totalPrice: number
    items: CartItemType[]
}

export type CartItemType = {
    id: number,
    imageUrl: string,
    title: string,
    price: number,
    type: string,
    size: number
    count: number
}