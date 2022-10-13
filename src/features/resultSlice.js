import { createSlice } from "@reduxjs/toolkit";

import { createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    searchInput: '',
    content: [],
    status: 'idle'
};


export const getResult = createAsyncThunk('result/getResult', async (searchInput) => {

    const { text, page } = searchInput;

    return fetch(`https://api.github.com/search/repositories?q=${text}&page=${page}&per_page=10`).then((res) => res.json());
});


const resultSlice = createSlice({
    name: 'result',
    initialState,
    reducers: {
        resultAdded: {
            reducer(state, action) {
                state.searchInput = action.payload;
            }
        }
    },
    extraReducers(builder) {
        builder
            .addCase(getResult.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(getResult.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.content = action.payload.items;
                if (state.content == null) {
                    state.content = [];
                }
            })
            .addCase(getResult.rejected, (state, action) => {
                state.status = 'failed';
            })
    }
});


export const selectRepoById = (state, repoId) =>
    state.result.content.find(repo => repo.id === repoId);

export const { resultAdded } = resultSlice.actions;

export default resultSlice.reducer;