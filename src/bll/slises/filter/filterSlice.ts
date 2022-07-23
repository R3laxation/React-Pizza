import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {ParamsType} from "../../../pages/Home";
import {AppRootStateType} from "../../store";
import {FilterStateType, SortType} from './types';

const filterSlice = createSlice({
    name: 'filters',
    initialState: {
        searchValue: '',
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
        setSort(state, action: PayloadAction<{ sort: SortType }>) {
            state.sort = action.payload.sort
        },
        setFilters(state, action: PayloadAction<ParamsType>) {
            state.currentPage = +action.payload.currentPage
            state.sort = action.payload.sort
            state.categoryId = +action.payload.categoryId
        },
        setCurrentPage(state, action: PayloadAction<{ currentPage: number }>) {
            state.currentPage = action.payload.currentPage
        },
        setSearchValue(state, action: PayloadAction<{ searchValue: string }>) {
            state.searchValue = action.payload.searchValue
        },
    },
})


// Action creators are generated for each case reducer function
export const {setCategoryId, setSort, setCurrentPage, setFilters, setSearchValue} = filterSlice.actions;

// types


export default filterSlice.reducer