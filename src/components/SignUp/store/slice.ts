import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { signUp, signIn, resetPassword, resetNewPassword, verifyResetCode } from "./action";

interface AuthState {
  data: any;
  loading: boolean;
  error: string | null;
  email: string | null;
  resetLoading: boolean;
  resetError: string | null;
}

const initialState: AuthState = {
  data: null,
  loading: false,
  error: null,
  email: localStorage.getItem("email") || null,
  resetLoading: false,
  resetError: null,
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
      localStorage.setItem("email", action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signUp.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signUp.fulfilled, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(signUp.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(signIn.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signIn.fulfilled, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(signIn.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(resetPassword.pending, (state) => {
      state.resetLoading = true;
    });
    builder.addCase(resetPassword.fulfilled, (state) => {
      state.resetLoading = false;
      state.resetError = null;
    });
    builder.addCase(
      resetPassword.rejected,
      (state, action: PayloadAction<any>) => {
        state.resetLoading = false;
        state.resetError = action.payload;
      }
    );

    builder.addCase(resetNewPassword.pending, (state) => {
      state.resetLoading = true;
    });
    builder.addCase(resetNewPassword.fulfilled, (state) => {
      state.resetLoading = false;
      state.resetError = null;
    });
    builder.addCase(
      resetNewPassword.rejected,
      (state, action: PayloadAction<any>) => {
        state.resetLoading = false;
        state.resetError = action.payload;
      }
    );

    builder.addCase(verifyResetCode.pending, (state) => {
      state.resetLoading = true;
    });
    builder.addCase(verifyResetCode.fulfilled, (state) => {
      state.resetLoading = false;
      state.resetError = null; // Reset error on success
    });
    builder.addCase(verifyResetCode.rejected, (state, action: PayloadAction<any>) => {
      state.resetLoading = false;
      state.resetError = action.payload; // Set error on failure
    });
  },
});

export const { setEmail } = AuthSlice.actions;
export default AuthSlice.reducer;
