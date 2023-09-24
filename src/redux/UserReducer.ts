import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserInitialState {
  name?: string;
  email?: string;
  phone?: string;
  isLoggedIn: boolean;
}
const initialState: UserInitialState = {
  isLoggedIn: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserInitialState>) => {
      const { name, email, phone } = action.payload;

      state.name = name;
      state.email = email;
      state.phone = phone;
      state.isLoggedIn = true;
    },
  },
});

// Part 4
export const { setUser } = userSlice.actions;
export default userSlice.reducer;
