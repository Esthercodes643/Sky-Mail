import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
    name: "app",
    initialState: {
        open: false,
        selectedMail: null,
        searchText: "",
        emails: null,
        authUser: null,
        sidebarOpen: false, 
    },
    reducers: {
        setOpen: (state, action) => {
            state.open = action.payload;
        },
        setSelectedMail: (state, action) => {
            state.selectedMail = action.payload;
        },
        setSearchText: (state, action) => {
            state.searchText = action.payload;
        },
        setEmails: (state, action) => {
            state.emails = action.payload;
        },
        setAuthUser: (state, action) => {
            state.authUser = action.payload;
        },
        setSidebarOpen: (state, action) => { 
            state.sidebarOpen = action.payload;
        },
    }
});

export const {
    setOpen,
    setSelectedMail,
    setSearchText,
    setEmails,
    setAuthUser,
    setSidebarOpen, 
} = appSlice.actions;

export default appSlice.reducer;
