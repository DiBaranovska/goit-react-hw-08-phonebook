import {
  registerThunk,
  loginThunk,
  logOutThunk,
  refreshThunk,
} from './user/thunk';
const { createSlice, isAnyOf } = require('@reduxjs/toolkit');

const initialStateUser = {
  user: {
    name: '',
    email: '',
  },
  token: '',
  isLoading: false,
  isLoggedIn: false,
  error: '',
};

const handlePending = state => {
  state.isLoading = true;
};

const handleFulfilledLogin = (state, { payload }) => {
  state.user = payload.user;
  state.isLoading = false;
  state.isLoggedIn = true;
  state.token = payload.token;
  state.error = '';
};

const handleFulfilledlogOut = state => {
  state.user = {
    name: '',
    email: '',
  };
  state.token = '';
  state.isLoading = false;
  state.isLoggedIn = false;
  state.error = '';
};

const handleFulfilledRefresh = (state, { payload }) => {
  state.user = payload;
  state.isLoading = false;
  state.isLoggedIn = true;
  state.error = '';
};

const handleRejected = (state, { error }) => {
  state.isLoading = false;
  state.error = error.message;
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialStateUser,
  extraReducers: builder => {
    builder
      .addCase(logOutThunk.fulfilled, handleFulfilledlogOut)
      .addCase(refreshThunk.fulfilled, handleFulfilledRefresh)
      .addMatcher(
        isAnyOf(
          registerThunk.pending,
          loginThunk.pending,
          logOutThunk.pending,
          refreshThunk.pending
        ),
        handlePending
      )
      .addMatcher(
        isAnyOf(
          registerThunk.fulfilled,
          loginThunk.fulfilled,
        ),
        handleFulfilledLogin
      )
      .addMatcher(
        isAnyOf(
          registerThunk.rejected,
          loginThunk.rejected,
          logOutThunk.rejected,
          refreshThunk.rejected
        ),
        handleRejected
      );
  },
});

export const userReducer = userSlice.reducer;
