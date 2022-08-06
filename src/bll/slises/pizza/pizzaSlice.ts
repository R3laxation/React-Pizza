import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from "axios";
import {ItemsType, PizzaStateType, Status} from "./types";

type FetchPizzasArgs = {
    category: string | boolean, search: string, sortBy: string, order: string, currentPage: number
}

export const fetchPizzas = createAsyncThunk(
    'pizza/fetchPizzas',
    async (params: FetchPizzasArgs) => {
        const {category, search, sortBy, order, currentPage} = params;
        // const {data} = await axios.get(`https://62ce8097486b6ce826465b70.mockapi.io/items`, {params})//?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}`)
        const {data} = await axios.get(`https://62ce8097486b6ce826465b70.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}`)
        return data as ItemsType[]
    }
)


const pizzaSlice = createSlice({
    name: 'pizza',
    initialState: {
        items: [],
        status: 'entity',
    } as PizzaStateType,
    reducers: {
        // setItems(state, action: PayloadAction<{ items: ItemsType[] }>) {
        //     state.items = action.payload.items
        // }
    },
    extraReducers:
        builder => {
            builder.addCase(fetchPizzas.pending, (state) => {
                state.status = Status.LOADING
                state.items = []
            })
                .addCase(fetchPizzas.fulfilled, (state, action) => {
                    state.status = Status.SUCCESS
                    state.items = action.payload
                })
                .addCase(fetchPizzas.rejected, (state) => {
                    state.status = Status.ERROR
                    state.items = []
                })
        },


})

// export const {setItems} = pizzaSlice.actions;



export default pizzaSlice.reducer

