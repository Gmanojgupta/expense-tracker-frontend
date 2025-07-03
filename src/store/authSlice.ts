// src/store/authSlice.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import client from "../api/client";

interface AuthState {
  user: any | null;
  token: string | null;
}
const initialState: AuthState = {
  user: JSON.parse(sessionStorage.getItem("user") || "null"),
  token: sessionStorage.getItem("token"),
};

export const registerUser = createAsyncThunk(
  "auth/register",
  async (data: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    try {
      const res = await client.post("/auth/register", data);
      return res.data.data;
    } catch (error: any) {
        throw new Error(
            error.response.data.error || "Registration failed"
        );
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (data: { email: string; password: string }) => {
    try {
      const res = await client.post("/auth/login", data);
      return res.data.data;
    } catch (error: any) {
      throw new Error(
        error.response.data.error || "Login failed"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      sessionStorage.clear();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.user = payload.user;
        state.token = payload.token;
        sessionStorage.setItem("user", JSON.stringify(payload.user));
        sessionStorage.setItem("token", payload.token);
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.user = payload.user;
        state.token = payload.token;
        sessionStorage.setItem("user", JSON.stringify(payload.user));
        sessionStorage.setItem("token", payload.token);
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
