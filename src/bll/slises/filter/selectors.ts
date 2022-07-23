import {AppRootStateType} from "../../store";

export const selectFilter = (state: AppRootStateType) => state.filter
export const selectSort = (state: AppRootStateType) => state.filter.sort