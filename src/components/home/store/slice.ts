import { createSlice } from "@reduxjs/toolkit";
import { fetchCar } from "../../admin/cars/store/action";


const initialState = {
  cars: [],
  loading: false,
  error: null as string | null, 
};

const carsSlice = createSlice({
  name: "cars",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCar.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCar.fulfilled, (state, action) => {
      state.cars = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchCar.rejected, (state, action) => {
      state.error = action.payload as string | null;
      state.loading = false;
    });
  },
});

export default carsSlice.reducer;
