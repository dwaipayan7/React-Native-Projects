import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
    name: "profile",
    initialState: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        gender: ''
    },
    reducers: {
        setProfile: (state, action) => {
            return {...state, ...action.payload}
        }
    }
});


export const {setProfile} = profileSlice.actions;
export const profile = profileSlice.reducer;