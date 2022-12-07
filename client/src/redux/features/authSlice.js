import { createSlice } from "@reduxjs/toolkit";

// global state 
const initialState = {
    user: null,
    token: null,
};

const authSlice = createSlice({
    name: "auth",

    initialState,

    // modifying global state
    reducers: {
        setLogin: (state, { payload }) => {
            state.user = payload.user;
            state.token = payload.token;
        },

        setLogout: state => {
            state.user = null;
            state.token = null;
        },

        setFriends: (state, { payload }) => {
            state.user
                ? state.user.friends = payload.friends
                : console.error("user friends non-existent :(");
        }

    },
});

export const { setLogin, setLogout, setFriends } = authSlice.actions;
export default authSlice.reducer;