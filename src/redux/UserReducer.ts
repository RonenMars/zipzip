import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserInitialState {
  name?: string;
  email?: string;
  phone?: string;
}
const initialState: UserInitialState = {};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserInitialState>) => {
      const { name, email, phone } = action.payload;

      state.name = name;
      state.email = email;
      state.phone = phone;
    },
  },
});

// Part 4
export const { setUser } = userSlice.actions;
export default userSlice.reducer;
