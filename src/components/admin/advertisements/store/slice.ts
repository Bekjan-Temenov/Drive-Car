import { createSlice } from "@reduxjs/toolkit";
import { fetchAds, createAd, updateAd, deleteAd } from "./action";
import { Advertisement } from "../../../../shared/types/types";

interface AdsState {
  ads: Advertisement[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  currentAd: any | null;
}
const initialState: AdsState = {
  ads: [],
  status: "idle",
  error: null,
  currentAd: null,
};

const adsSlice = createSlice({
  name: "ads",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAds.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchAds.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.ads = action.payload;
    });
    builder.addCase(fetchAds.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message || null;
    });

    builder.addCase(createAd.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(createAd.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.ads.push(action.payload);
    });

    builder.addCase(createAd.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message || null;
    });

    builder.addCase(updateAd.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(updateAd.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.ads = state.ads.map((ad) =>
        ad.id === action.payload.id ? action.payload : ad
      );
    });
    builder.addCase(updateAd.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message || null;
    });

    builder.addCase(deleteAd.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(deleteAd.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.ads = state.ads.filter((ad) => ad.id !== action.payload.id);
    });
    builder.addCase(deleteAd.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message || null;
    });
  },
});

export default adsSlice.reducer;
