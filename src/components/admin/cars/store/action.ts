import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Car } from "../../../../shared/types/types";
import toast from "react-hot-toast";
import { API_URL } from "../../../../app/api";

export const createCar = createAsyncThunk(
  "cars/createCar",
  async (carData: Car) => {
    try {
      const response = await axios.post(`${API_URL}/cars`, carData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const updateCar = createAsyncThunk(
  "cars/updateCar",
  async ({CarData, id}: {CarData: Car, id: number}) => {
    try {
      const response = await axios.put(
        `${API_URL}/cars/${id}`,
        CarData
      );
      toast.success("Машина обновлена успешно");
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchCar = createAsyncThunk(
  'cars/getCars',
  async ({
    search,
    sortOption,
    minPrice,
    maxPrice,
  }: { search?: string; sortOption?: string; minPrice?: number; maxPrice?: number }) => {
    try {
      let query = '';

      if (search) {
        query += `search=${search}&`;
      }

      if (sortOption) {
        query += `sort=${sortOption}&`;
      }

      if (minPrice !== undefined) {
        query += `minPrice=${minPrice}&`;
      }

      if (maxPrice !== undefined) {
        query += `maxPrice=${maxPrice}&`;
      }

      if (query.endsWith('&')) {
        query = query.slice(0, -1);
      }

      const url = query ? `${API_URL}/cars?${query}` : `${API_URL}/cars`;

      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
);





export const deleteCar = createAsyncThunk(
  "cars/deleteCars",
  async (id: string) => {
    try {
      const res = await axios.delete(`${API_URL}/cars/${id}`);
      toast.error("Машина удалена успешно");
      return res.data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const fetchCarById = createAsyncThunk(
  "cars/fetchCarById",
  async (id: string) => {
    try {
      const response = await axios.get(`${API_URL}/cars/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
);
