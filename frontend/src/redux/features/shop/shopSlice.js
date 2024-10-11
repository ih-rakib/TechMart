import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
  products: [],
  checked: [],
  radio: [],
  brandCheckBoxes: {},
  selectedBrand: [],
};

const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setChecked: (state, action) => {
      state.checked = action.payload;
    },
    setRadio: (state, action) => {
      state.radio = action.payload;
    },
    setSelectedBrand: (state, action) => {
      state.selectedBrand = action.payload;
    },
    resetFilters: (state) => {
      state.checked = [];
      state.radio = [];
      state.selectedBrand = [];
      state.brandCheckBoxes = {};
    },
  },
});

export const {
  setCategories,
  setChecked,
  setProducts,
  setRadio,
  setSelectedBrand,
  resetFilters,
} = shopSlice.actions;

export default shopSlice.reducer;
