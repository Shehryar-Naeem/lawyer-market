import { createSlice } from "@reduxjs/toolkit";


export const  conversationReducer = createSlice({
    name: 'conversation',
    initialState: {
        conversations: [],
        conversation: null,
        messages: [],
        isFetching: false,
        error: null,
    },
    reducers: {
        setConversations: (state, action) => {
            state.conversations = action.payload;
        },
        setConversation: (state, action) => {
            state.conversation = action.payload;
        },
        setMessages: (state, action) => {
            state.messages = action.payload;
        },
        setIsFetching: (state, action) => {
            state.isFetching = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
});

export const { setConversations, setConversation, setMessages, setIsFetching, setError } = conversationReducer.actions;

