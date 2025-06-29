import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "sonner";

const API_URL = `${import.meta.env.VITE_BACKEND_URL}`;

export const fetchAllOrders = createAsyncThunk(
  "adminOrders/fetchAllOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/api/admin/orders`, {
        headers: {
          Authorization: `Bearer ${localStorage
            .getItem("userToken")
            .replace(/"/g, "")}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  "adminOrders/updateOrderStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${API_URL}/api/admin/orders/${id}`,
        status,
        {
          headers: {
            Authorization: `Bearer ${localStorage
              .getItem("userToken")
              .replace(/"/g, "")}`,
          },
        }
      );
      toast.success("Updated Order", {
        duration: 3000,
      });
      return response.data;
    } catch (error) {
      toast.error("Failed update order", {
        duration: 3000,
      });
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteOrder = createAsyncThunk(
  "adminOrders/deleteOrder",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/api/admin/orders/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage
            .getItem("userToken")
            .replace(/"/g, "")}`,
        },
      });
      toast.success("Deleted Order", {
        duration: 3000,
      });
      return id;
    } catch (error) {
      toast.error("Failed delete order", {
        duration: 3000,
      });
      return rejectWithValue(error.response.data);
    }
  }
);

const adminOrderSlice = createSlice({
  name: "adminOrders",
  initialState: {
    orders: [],
    totalOrders: 0,
    totalSales: 0,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
        state.totalOrders = action.payload.length;

        state.totalSales = action.payload.reduce((acc, order) => {
          return acc + order.totalPrice;
        }, 0);
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const updateOrder = action.payload;
        const orderIndex = state.orders.findIndex(
          (order) => order._id === updateOrder._id
        );
        if (orderIndex !== -1) {
          state.orders[orderIndex] = updateOrder;
        }
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.orders = state.orders.filter(
          (order) => order._id !== action.payload
        );
        state.totalOrders = state.orders.length;

        state.totalSales = state.orders.reduce((acc, order) => {
          return acc + order.totalPrice;
        }, 0);
      });
  },
});

export default adminOrderSlice.reducer;
