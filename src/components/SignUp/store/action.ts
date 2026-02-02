import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const api = "http://192.168.68.106:7070/api";

interface SignUpData {
  username: string;
  email: string;
  password: string;
}

interface SignInData {
  email: string;
  password: string;
}

export const signUp = createAsyncThunk(
  "signUp",

  async (data: SignUpData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${api}/register/`,
        data
      );
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const signIn = createAsyncThunk(
  "signIn",
  async (data: SignInData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
         `${api}/api/login/`,
        data
      );
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "resetPassword",
  async (email: string, { rejectWithValue }) => {
    try {
      const response = await axios.post(
         `${api}/password_reset/request/`,
        { email }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue({
          message: error.message,
          code: error.code,
          status: error.response?.status,
        });
      }
      return rejectWithValue({ message: "Unexpected error" });
    }
  }
);

export const verifyResetCode = createAsyncThunk(
  "verifyResetCode",
  async (
    { token, code }: { token: string; code: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
         `${api}/password_reset/verify/`,
        { token, code }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue({
          message: error.message,
          code: error.code,
          status: error.response?.status,
        });
      }
      return rejectWithValue({ message: "Unexpected error" });
    }
  }
);

export const resetNewPassword = createAsyncThunk(
  "resetNewPassword",
  async (
    data: { new_password: string; confirm_password: string; passToken: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
         `${api}/password_reset/confirm/`,
        data,
        {
          headers: {
            Authorization: `Bearer ${data.passToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue({
          message: error.message,
          code: error.code,
          status: error.response?.status,
          data: error.response?.data,
        });
      }
      return rejectWithValue({ message: "Unexpected error" });
    }
  }
);
