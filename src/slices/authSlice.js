import { createSlice } from '@reduxjs/toolkit';

const getInitialUser = () => {
  const storedUser = window.localStorage.getItem('user');
  return storedUser ? JSON.parse(storedUser) : null;
};

const initialUser = getInitialUser();

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: initialUser,
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      window.localStorage.setItem('user', JSON.stringify(action.payload));
    },
    removeUser(state) { 
      state.user = null;
      window.localStorage.removeItem('user');
    },
    updateUser(state, action) {
      state.user = {
        ...state.user,
        displayName: action.payload.displayName, 
        photoURL: action.payload.photoURL,
      };
      window.localStorage.setItem('user', JSON.stringify(state.user));
    }
  }
});

export const { setUser, removeUser, updateUser } = authSlice.actions;
export default authSlice.reducer;