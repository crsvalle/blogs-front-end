import { createSlice } from '@reduxjs/toolkit'

const userAuthFromLocalStorage = () => {
  const isAuth = localStorage.getItem('isAuth');
  const id = localStorage.getItem('userId'); // Change 'userId' to the actual key
  const username = localStorage.getItem('username'); // Change 'username' to the actual key

  if (isAuth && JSON.parse(isAuth) === true) {
    return {
      isAuth: true,
      id,
      username,
    };
  }

  return {
    isAuth: false,
    id: null,
    username: null,
  };
}

const initialState = userAuthFromLocalStorage()

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      authenticateUser: (state) => {
        state.isAuth = true;
      },
      unauthenticateUser: (state) => {
        state.isAuth = false;
        state.id = null;
        state.username = null;
      },
      updateUserInfo: (state, action) => {
        const { id, username } = action.payload;
        state.id = id;
        state.username = username;
      },
    },
  });
  


export const { authenticateUser, unauthenticateUser, updateUserInfo } = authSlice.actions

export default authSlice.reducer