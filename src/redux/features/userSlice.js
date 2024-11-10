import { createSlice } from "@reduxjs/toolkit";
import { counterSlice } from "./counterSlice";

const userSlice = createSlice({
    name: 'user',
    initialState:null,
    reducers:{
        login:(state, action) =>{
            state = action.payload;
            return state;
        },

        logout: () => {
            return null;
        },
    },
})

export const {login, logout} = userSlice.actions;
export default userSlice.reducer