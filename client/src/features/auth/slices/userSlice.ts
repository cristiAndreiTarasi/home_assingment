import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserState } from "../authTypes";

const initialState: UserState = {
    fName: "",
    lName: "",
    email: "",
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserState>) => {
            state.fName = action.payload.fName;
            state.lName = action.payload.lName;
            state.email = action.payload.email;
        },
        clearUser: state => {
            state.fName = "";
            state.lName = "";
            state.email = "";
        }
    }
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;