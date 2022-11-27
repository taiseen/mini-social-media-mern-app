import { createSlice } from "@reduxjs/toolkit";

// global state
const initialState = {
    posts: [],
};

export const postSlice = createSlice({
    name: "posts",

    initialState,

    // modifying global state
    reducers: {

        setPosts: (state, { payload }) => {
            state.posts = payload.posts;
        },

        setPost: (state, { payload }) => {

            const updatedPosts = state.posts.map(post => {

                if (post._id === payload.post._id) return payload.post;

                return post;
            });

            state.posts = updatedPosts;
        },
    },
});

export const { setPosts, setPost } = postSlice.actions;
export default postSlice.reducer;