import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import getError from "../../services/getError";
import {
  removeToLocalStorage,
  setToLocalStorage,
} from "../../services/localStorage";

const baseURL = "http://localhost:5000/api/v1";

const initialState = {
  user: localStorage.getItem("shopUser")
    ? JSON.parse(localStorage.getItem("shopUser"))
    : null,
  token: localStorage.getItem("userToken")
    ? localStorage.getItem("userToken")
    : null,
  loading: false,
  error: "",
};

export const signupUser = createAsyncThunk(
  "user/signupUser",
  async (currentUser, thunkAPI) => {
    try {
      const { data } = await axios.post(`${baseURL}/users/signup`, currentUser);
      const { token } = data;
      const { user } = data.data;
      return { user, token };
    } catch (err) {
      return thunkAPI.rejectWithValue(getError(err));
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (currentUser, thunkAPI) => {
    try {
      const { data } = await axios.post(`${baseURL}/users/login`, currentUser);
      const { token } = data;
      const { user } = data.data;
      return { token, user };
    } catch (err) {
      return thunkAPI.rejectWithValue(getError(err));
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      state.token = null;
      removeToLocalStorage("shopUser");
      removeToLocalStorage("userToken");
    },
  },
  extraReducers: {
    [signupUser.pending]: (state) => {
      state.loading = true;
    },

    [signupUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.error = "";
      state.user = payload.user;
      state.token = payload.token;
      setToLocalStorage("shopUser", JSON.stringify(state.user));
      setToLocalStorage("userToken", state.token);
    },

    [signupUser.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [loginUser.pending]: (state) => {
      state.loading = true;
    },

    [loginUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.user = payload.user;
      state.token = payload.token;
      state.error = "";
      setToLocalStorage("shopUser", JSON.stringify(state.user));
      setToLocalStorage("userToken", state.token);
    },

    [loginUser.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      alert(payload);
    },
  },
});

export default userSlice.reducer;
export const { logoutUser } = userSlice.actions;
