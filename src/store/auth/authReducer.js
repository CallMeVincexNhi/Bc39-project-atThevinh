import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";

let user = undefined;
if (localStorage.getItem("USER_LOGIN")) {
  user = JSON.parse(localStorage.getItem("USER_LOGIN"));
}

const initialState = {
  isFetching: false,
  userLogIn: user,
  userSignUp: undefined,
  error: undefined,
};

export const { reducer: authReducer, actions: authActions } = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: (state) => {
      localStorage.removeItem("TOKEN");
      localStorage.removeItem("USER_LOGIN");
      state.userLogIn = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      //đăng nhập
      .addCase(signIn.pending, (state, action) => {
        state.isFetching = true;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        console.log(action.payload);
        state.userLogIn = action.payload;
        state.isFetching = false;
        localStorage.setItem("TOKEN", action.payload.token);
        localStorage.setItem("USER_LOGIN", JSON.stringify(action.payload));
      })
      .addCase(signIn.rejected, (state, action) => {
        state.error = action.payload;
        state.isFetching = false;
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Your Email or Passwork went wrong!",
          footer: '<a href="">Why do I have this issue?</a>',
        });
      })

      //đăng ký
      .addCase(signUp.pending, (state, action) => {
        console.log("hello");
        state.isFetching = true;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        console.log("action.payload: ", action.payload);
        state.userSignUp = action.payload;
        state.isFetching = false;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.error = action.payload;
        state.isFetching = false;
        console.log(state.error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: state.error.content,
          footer: '<a href="">Why do I have this issue?</a>',
        });
      });
  },
});

export const signIn = createAsyncThunk(
  "auth/signIn",
  async (data, { rejectWithValue }) => {
    try {
      const result = await axios({
        url: "https://fiverrnew.cybersoft.edu.vn/api/auth/signin",
        method: "POST",
        headers: {
          TokenCybersoft:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzOSIsIkhldEhhblN0cmluZyI6IjI0LzA3LzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY5MDE1NjgwMDAwMCIsIm5iZiI6MTY2MTcwNjAwMCwiZXhwIjoxNjkwMzA0NDAwfQ.v3QBEWqiclIwpSJXtVil8Lu30xYH1J5FT82rQrUyv1c",
        },
        data,
      });
      console.log("response", result.data.statusCode);
      return result.data.content;
    } catch (error) {
      console.log("error", error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const signUp = createAsyncThunk(
  "auth/signUp",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const result = await axios({
        url: "https://fiverrnew.cybersoft.edu.vn/api/auth/signup",
        method: "POST",
        headers: {
          TokenCybersoft:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzOSIsIkhldEhhblN0cmluZyI6IjI0LzA3LzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY5MDE1NjgwMDAwMCIsIm5iZiI6MTY2MTcwNjAwMCwiZXhwIjoxNjkwMzA0NDAwfQ.v3QBEWqiclIwpSJXtVil8Lu30xYH1J5FT82rQrUyv1c",
        },
        data,
      });
      console.log("message", result.data.statusCode);
      await dispatch(signIn(data));
      return result.data.message;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const { logOut } = authActions;
