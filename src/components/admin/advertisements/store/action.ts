import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../../../app/api";
import { Advertisement } from "../../../../shared/types/types";
import toast from "react-hot-toast";

export const fetchAds = createAsyncThunk("ads/fetchAds", async () => {
  try {
    const response = await axios.get(`${API_URL}/ads`);
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const createAd = createAsyncThunk(
  "ads/createAd",
  async ({ data }: { data: Advertisement }) => {
    try {
      const response = await axios.post(`${API_URL}/ads`, data);
      location.reload();
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const updateAd = createAsyncThunk(
  "ads/updateAd",
  async ({ adData, id }: { adData: Advertisement; id: number }) => {
    try {
      const response = await axios.put(`${API_URL}/ads/${id}`, adData);

      toast.success("Объявление успешно обновлено");
      setTimeout(() => {
        location.reload();
      }, 1000);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const deleteAd = createAsyncThunk("ads/deleteAd", async (id: string) => {
  try {
    const response = await axios.delete(`${API_URL}/ads/${id}`);
    toast.error("Объявление успешно удалено");
    return response.data;
  } catch (error) {
    throw error;
  }
});
