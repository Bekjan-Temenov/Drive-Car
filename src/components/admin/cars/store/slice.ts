import { createSlice  , PayloadAction } from "@reduxjs/toolkit";
import { createCar, deleteCar, fetchCar, fetchCarById, updateCar } from "./action";
import { Car } from "../../../../shared/types/types";

const favoriteCars = JSON.parse(localStorage.getItem("favoriteCars") || "[]") as Car[];

const initialState = {
  cars: [] as Car[],
  loading: false,   
  error: null as string | null,
  favoriteCars: favoriteCars,
  count : new Set(favoriteCars.map((car) => car.id)).size
};

const carsSlice = createSlice({
  name: "cars",
  initialState,
  reducers: {
    addFavoriteCar: (state, action: PayloadAction<Car>) => {
      const isAlreadyFavorite = state.favoriteCars.some((car) => car.id === action.payload.id);
      if (!isAlreadyFavorite) {
        state.favoriteCars.push(action.payload);
        localStorage.setItem("favoriteCars", JSON.stringify(state.favoriteCars));
      }
      state.count = new Set(state.favoriteCars.map((car) => car.id)).size;
    },
    removeFavoriteCar: (state, action: PayloadAction<string>) => {
      state.favoriteCars = state.favoriteCars.filter((car) => car.id !== Number(action.payload));
      localStorage.setItem("favoriteCars", JSON.stringify(state.favoriteCars));
      state.count = new Set(state.favoriteCars.map((car) => car.id)).size;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createCar.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createCar.fulfilled, (state, action :PayloadAction<Car>) => {
      state.cars.push(action.payload);
      state.loading = false;
    });
    builder.addCase(createCar.rejected, (state, action) => {
      state.error = action.payload as string | null;
      state.loading = false;
    });


    builder.addCase(updateCar.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateCar.fulfilled, (state, action :PayloadAction<Car>) => {
      state.cars = state.cars.map((car) => car.id === action.payload.id ? action.payload : car);
      state.loading = false;
    });
    builder.addCase(updateCar.rejected, (state, action) => {
      state.error = action.payload as string | null;
      state.loading = false;
    });
    
    builder.addCase(fetchCar.pending , (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCar.fulfilled , (state , action) => {
      state.cars = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchCar.rejected , (state , action) => {
      state.error = action.payload as string | null
      state.loading = false
    });

    builder.addCase(deleteCar.pending , (state ) => {
      state.loading = true
    });
    builder.addCase(deleteCar.fulfilled , (state , action) => {
      state.cars = state.cars.filter((car) => car.id !== action.payload);
      state.loading = false
    });
    builder.addCase(deleteCar.rejected , (state , action)=> {
      state.error = action.payload as string | null
      state.loading = false
    });

    builder.addCase(fetchCarById.pending , (state) => {
      state.loading = true
    });
    builder.addCase(fetchCarById.fulfilled , (state , action) => {
      state.cars = action.payload
      state.loading = false
    });
    builder.addCase(fetchCarById.rejected , (state , action) => {
      state.error = action.payload as string | null
      state.loading = false
    });
  },
}); 

export default carsSlice.reducer;
export const { addFavoriteCar, removeFavoriteCar } = carsSlice.actions;
