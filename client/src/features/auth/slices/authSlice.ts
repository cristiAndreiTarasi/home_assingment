import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AuthState } from "../authTypes";
import { registerThunk, loginThunk } from "./authThunks";

export const initialState: AuthState = {
    isLoggedIn: !!localStorage.getItem('auth_token'),
    token: localStorage.getItem('auth_token') || "",
    isLoading: false,
    error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        startAuth: state => { state.isLoading = true },
        endAuth: state => { state.isLoading = false },
        authSuccess: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
            state.isLoading = false;
            state.isLoggedIn = true;
        },
        authFailed: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
            localStorage.removeItem('auth_token');
        },
        logout: state => {
            state.isLoggedIn = false;
            state.isLoading = false;
            state.token = "";
            localStorage.removeItem('auth_token');
        },
    },
    extraReducers: builder => {
        builder
            .addCase(registerThunk.pending, (state) => {
                state.isLoading = true;
            })
            builder.addCase(registerThunk.fulfilled, (state, action) => {
                state.message = action.payload.message;
            })
            .addCase(registerThunk.rejected, (state, action) => {
                state.error = action.error.message ?? null;
            })

            .addCase(loginThunk.fulfilled, (state, action) => {
                state.token = action.payload.token;
                state.user = action.payload.user;
                state.isLoggedIn = true;
                state.message = "Logged in successfully"; 
                localStorage.setItem('auth_token', action.payload.token);
            })
            .addCase(loginThunk.rejected, (state, action) => {
                state.error = action.error.message ?? null;
            })
    }
});

export const { startAuth, endAuth, authSuccess, authFailed, logout } = authSlice.actions;
export default authSlice.reducer;