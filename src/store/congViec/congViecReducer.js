import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";

const initialState = {
  allWork: [],
  isFetching: false,
  workDetail: undefined,
};

export const { reducer: congViecReducer, actions: congViecActions } =
  createSlice({
    name: "congViec",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        //getWork
        .addCase(getAllWork.pending, (state, action) => {
          state.isFetching = false;
        })
        .addCase(getAllWork.fulfilled, (state, action) => {
          state.isFetching = true;
          state.allWork = action.payload;
        })
        .addCase(getAllWork.rejected, (state, action) => {
          state.isFetching = true;
          state.error = action.payload;
        })
        //deleteWork
        .addCase(deleteWork.pending, (state, action) => {
          state.isFetching = false;
        })
        .addCase(deleteWork.fulfilled, (state, action) => {
          state.isFetching = true;
          console.log(action.payload);
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        })
        .addCase(deleteWork.rejected, (state, action) => {
          state.isFetching = true;
          state.error = action.payload;
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            footer: '<a href="">Why do I have this issue?</a>',
          });
        })
        //putWorkDetail
        .addCase(putWorkDetail.pending, (state, action) => {
          state.isFetching = true;
        })
        .addCase(putWorkDetail.fulfilled, (state, action) => {
          state.isFetching = false;
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500,
          });
        })
        .addCase(putWorkDetail.rejected, (state, action) => {
          state.isFetching = false;
          state.error = action.payload;
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            footer: '<a href="">Why do I have this issue?</a>',
          });
        })
        //postNewWork
        .addCase(postNewWork.pending, (state, action) => {
          state.isFetching = false;
        })
        .addCase(postNewWork.fulfilled, (state, action) => {
          state.isFetching = true;
          state.workDetail = action.payload;
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500,
          });
        })
        .addCase(postNewWork.rejected, (state, action) => {
          state.isFetching = false;
          state.error = action.payload;
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            footer: '<a href="">Why do I have this issue?</a>',
          });
        });
    },
  });

export const getAllWork = createAsyncThunk(
  "congViec/getAllWork",
  async (data, { rejectWithValue }) => {
    try {
      const result = await axios({
        url: "https://fiverrnew.cybersoft.edu.vn/api/cong-viec/phan-trang-tim-kiem?pageIndex=1&pageSize=200",
        method: "GET",
        headers: {
          TokenCybersoft:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzOSIsIkhldEhhblN0cmluZyI6IjI0LzA3LzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY5MDE1NjgwMDAwMCIsIm5iZiI6MTY2MTcwNjAwMCwiZXhwIjoxNjkwMzA0NDAwfQ.v3QBEWqiclIwpSJXtVil8Lu30xYH1J5FT82rQrUyv1c",
        },
      });
      return result.data.content.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteWork = createAsyncThunk(
  "congViec/deleteWork",
  async (workId, { dispatch, rejectWithValue }) => {
    try {
      const result = await axios({
        url: `https://fiverrnew.cybersoft.edu.vn/api/cong-viec/${workId}`,
        method: "DELETE",
        headers: {
          token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE2NDgiLCJlbWFpbCI6ImhoMkBnbWFpbC5jb20iLCJyb2xlIjoiQURNSU4iLCJuYmYiOjE2Njk4MjEwMTAsImV4cCI6MTY3MDQyNTgxMH0.YF_cgP-JssGMxEgnV-OyUmtj9LByTQG9yuI1mbRrWcE",
          TokenCybersoft:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzOSIsIkhldEhhblN0cmluZyI6IjI0LzA3LzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY5MDE1NjgwMDAwMCIsIm5iZiI6MTY2MTcwNjAwMCwiZXhwIjoxNjkwMzA0NDAwfQ.v3QBEWqiclIwpSJXtVil8Lu30xYH1J5FT82rQrUyv1c",
        },
      });
      dispatch(getAllWork());
      return result.data.content;
    } catch (err) {
      console.log("err.response.data): ", err.response.data);
      rejectWithValue(err.response.data);
    }
  }
);

export const putWorkDetail = createAsyncThunk(
  "congViec/putWorkDetail",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const result = await axios({
        url: `https://fiverrnew.cybersoft.edu.vn/api/cong-viec/${data.id}`,
        method: "PUT",
        headers: {
          token: localStorage.getItem("TOKEN"),
          TokenCybersoft:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzOSIsIkhldEhhblN0cmluZyI6IjI0LzA3LzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY5MDE1NjgwMDAwMCIsIm5iZiI6MTY2MTcwNjAwMCwiZXhwIjoxNjkwMzA0NDAwfQ.v3QBEWqiclIwpSJXtVil8Lu30xYH1J5FT82rQrUyv1c",
        },
        data,
      });
      dispatch(getAllWork());
      return result.data.content;
    } catch (err) {
      console.log("rejectWithValue(err.response.data): ", err.response.data);
      return rejectWithValue(err.response.data);
    }
  }
);

export const postNewWork = createAsyncThunk(
  "congViec/postNewWork",
  async (data, { rejectWithValue }) => {
    try {
      const result = await axios({
        url: "https://fiverrnew.cybersoft.edu.vn/api/cong-viec",
        method: "POST",
        headers: {
          token: localStorage.getItem("TOKEN"),
          TokenCybersoft:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzOSIsIkhldEhhblN0cmluZyI6IjI0LzA3LzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY5MDE1NjgwMDAwMCIsIm5iZiI6MTY2MTcwNjAwMCwiZXhwIjoxNjkwMzA0NDAwfQ.v3QBEWqiclIwpSJXtVil8Lu30xYH1J5FT82rQrUyv1c",
        },
        data,
      });
      return result.data.content;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
