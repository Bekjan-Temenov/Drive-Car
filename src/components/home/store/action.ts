import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../../app/api";

const postReview = createAsyncThunk(
  "reviews/postReview",
  async (form: { comment: string; rating: number; user_id: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/reviews`, form, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data; 
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const getReviews = createAsyncThunk(
  "reviews/getReviews",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/reviews`);      
      return response.data; 
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const deleteReview = createAsyncThunk(
  "reviews/deleteReview",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${API_URL}/reviews/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const updateReview = createAsyncThunk(
  "reviews/updateReview",
  async ({ form, formId }: { form: { comment: string; rating: number; user_id: string }; formId?: string },
    { rejectWithValue }) => {
    try { 
      const response = await axios.put(`${API_URL}/reviews/${formId}`, form, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);



export { postReview, getReviews, deleteReview , updateReview};
