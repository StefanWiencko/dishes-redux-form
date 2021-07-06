import { configureStore } from "@reduxjs/toolkit";
import dishesSlice from "./dishesSlice";

export default configureStore({
  reducer: {
    dishes: dishesSlice,
  },
});
