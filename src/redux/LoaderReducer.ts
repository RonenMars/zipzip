import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface LoaderInitialState {
  loading: boolean;
}
const initialState: LoaderInitialState = {
  loading: false,
};

export const loaderSlice = createSlice({
  name: 'loader',
  initialState,
  reducers: {
    setLoader: (state, action: PayloadAction<LoaderInitialState>) => {
      const { loading } = action.payload;

      state.loading = loading;
    },
  },
});

// Part 4
export const { setLoader } = loaderSlice.actions;
export default loaderSlice.reducer;
