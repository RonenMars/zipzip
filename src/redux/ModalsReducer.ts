import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface modalAction {
  name: string;
}

export interface ModalsInitialState {
  modalsState: Record<string, boolean>;
}
const initialState: ModalsInitialState = {
  modalsState: {},
};

export const loaderSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<modalAction>) => {
      const { name } = action.payload;

      state.modalsState[name] = true;
    },
    closeModal: (state, action: PayloadAction<modalAction>) => {
      const { name } = action.payload;

      delete state.modalsState[name];
    },
  },
});

export const { openModal, closeModal } = loaderSlice.actions;
export default loaderSlice.reducer;
