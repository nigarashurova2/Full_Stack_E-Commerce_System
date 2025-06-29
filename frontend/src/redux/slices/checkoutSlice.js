import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createCheckout = createAsyncThunk(
  "checkout/createCheckout",
  async (checkoutData, { rejectWithValue }) => {
    try {
      console.log(checkoutData, "checdta");
      console.log(`Bearer ${localStorage.getItem("userToken")}`);

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/checkout`,
        checkoutData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken").replace(/"/g, "")}`,
          },
        }
      );
      console.log(response.data, "response.data");

      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const payCheckout = createAsyncThunk(
  "checkout/payCheckout",
  async ({ id, paymentStatus, paymentDetails }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${id}/pay`,
        {
          paymentStatus,
          paymentDetails,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  checkout: null,
  loading: false,
  error: null,
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createCheckout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCheckout.fulfilled, (state, action) => {
        state.loading = true;
        state.checkout = action.payload;
      })
      .addCase(createCheckout.rejected, (state, action) => {
        state.loading = true;
        state.error = action.payload.message;
      })
      .addCase(payCheckout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(payCheckout.fulfilled, (state, action) => {
        state.loading = true;
        state.checkout = action.payload;
      })
      .addCase(payCheckout.rejected, (state, action) => {
        state.loading = true;
        state.error = action.payload.message;
      });
  },
});

export default checkoutSlice.reducer;
