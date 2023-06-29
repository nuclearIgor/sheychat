import {createSlice} from "@reduxjs/toolkit";

export const loaderSlice = createSlice({
    name: 'Loader',
    initialState: {
      loader: false
    },
    reducers: {
        ShowLoader: (state) => {
            state.loader = true
        },
        HideLoader: (state) => {
            state.loader = false
        },
    }
})

export const { ShowLoader, HideLoader} = loaderSlice.actions
export default loaderSlice.reducer