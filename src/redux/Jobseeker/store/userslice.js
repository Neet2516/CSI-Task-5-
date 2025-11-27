import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,   // full object store hoga
    loggedIn: false,
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;  // full user object
      state.loggedIn = true;
    },
    logout(state) {
      state.user = null;
      state.loggedIn = false;
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;

