import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../../app/api";

export const signIn = createAsyncThunk(
  "auth/signIn",
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/auth/signin`, data);
      localStorage.setItem("token", response.data.token);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
