import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  dishes: {},
  status: "idle",
  error: null,
};

export const postDishes = createAsyncThunk(
  "disches/postDishes",
  async (initialData) => {
    const URI = "https://frosty-wood-6558.getsandbox.com:443/dishes";
    const response = await axios.post(URI, initialData);
    return response.data;
  }
);

const dishesSlice = createSlice({
  name: "dishes",
  initialState,
  reducers: {},
  extraReducers: {
    [postDishes.pending]: (state, action) => {
      state.status = "loading";
    },
    [postDishes.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [postDishes.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.dishes = action.payload;
    },
  },
});

export default dishesSlice.reducer;
