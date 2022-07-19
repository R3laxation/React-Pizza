import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import axios from "axios";

export const fetchPizzas = createAsyncThunk(
    'pizza/fetchPizzas',
    async (params: { category: string | boolean, search: string, sortBy: string, order: string, currentPage: number }, {dispatch}) => {
        const {category, search, sortBy, order, currentPage} = params;
        const {data} = await axios.get(`https://62ce8097486b6ce826465b70.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}&search=${search}`)
        return data
    }
)


const pizzaSlice = createSlice({
    name: 'pizza',
    initialState: {
        items: [],
        status: 'entity'
    } as PizzaStateType,
    reducers: {
        // setItems(state, action: PayloadAction<{ items: ItemsType[] }>) {
        //     state.items = action.payload.items
        // }
    },
    extraReducers:
        builder => {
            builder.addCase(fetchPizzas.pending, (state) => {
                state.status = 'loading'
                state.items = []
            })
                .addCase(fetchPizzas.fulfilled, (state, action) => {
                    state.status = 'success'
                    state.items = action.payload
                })
                .addCase(fetchPizzas.rejected, (state) => {
                    state.status = 'error'
                    state.items = []
                })
        },


})

// export const {setItems} = pizzaSlice.actions;

export default pizzaSlice.reducer

type PizzaStateType = {
    items: ItemsType[]
    status: 'entity' | 'loading' | 'success' | 'error'
}

export type ItemsType = {
    id: number,
    imageUrl: string,
    title: string,
    types: number[],
    sizes: number[],
    price: number,
    category: number,
    rating: number
}