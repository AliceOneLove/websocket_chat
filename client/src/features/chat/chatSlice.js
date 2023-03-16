import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: '',
    chatHistory: [],
    message: '',
}

export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        addMessageToHistory: (state, action) => {
            state.chatHistory.push(action.payload);
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setMessage: (state, action) => {
            state.message = action.payload;
        },
    },
});

export const { addMessageToHistory, setUser, setMessage} = chatSlice.actions;

export default chatSlice.reducer;