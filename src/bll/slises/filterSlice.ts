import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {ParamsType} from "../../pages/Home";

 const filterSlice = createSlice({
    name: 'filters',
    initialState: {
        categoryId: 0,
        currentPage: 1,
        sort: {
            name: 'популярности', sortProperty: 'rating'
        }
    } as FilterStateType,
    reducers: {
        setCategoryId(state, action: PayloadAction<{ categoryId: number }>) {
            state.categoryId = action.payload.categoryId
        },
        setSort(state, action: PayloadAction<{sort: SortType }>) {
            state.sort = action.payload.sort
        },
        setFilters(state, action: PayloadAction<ParamsType>){
            state.currentPage = +action.payload.currentPage
            state.sort = action.payload.sort
            state.categoryId = +action.payload.categoryId
        },
        setCurrentPage(state, action: PayloadAction<{ currentPage: number }>){
            state.currentPage = action.payload.currentPage
        },
    },
})

// Action creators are generated for each case reducer function
export const {setCategoryId, setSort, setCurrentPage, setFilters} = filterSlice.actions;

// types
export type FilterStateType = {
    categoryId: number
    currentPage: number
    sort: SortType
}

export type SortType = {
    name: string
    sortProperty: string
}

export default filterSlice.reducer