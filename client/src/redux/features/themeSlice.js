import { createSlice } from "@reduxjs/toolkit";

// global state
const initialState = {
    mode: "dark"
};

export const themeSlice = createSlice({
    name: "theme",

    initialState,

    // modifying global state
    reducers: {
        setMode: state => {

            state.mode = state.mode === "light" ? "dark" : "light";
        }
    },
});

export const { setMode } = themeSlice.actions;

export default themeSlice.reducer;