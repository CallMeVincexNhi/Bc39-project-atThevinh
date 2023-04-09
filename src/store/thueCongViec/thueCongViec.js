import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";

const initialState = {
  listHiredWork: [],
  isFetching: false,
  error: undefined,
  listServicesSearch: [],
};

export const { reducer: thueCongViecReducer, actions: thueCongViecActions } =
  createSlice({
    name: "thueCongViec",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        //getListHiredWork
        .addCase(getListHiredWork.pending, (state, action) => {
          state.isFetching = true;
        })
        .addCase(getListHiredWork.fulfilled, (state, action) => {
          state.isFetching = false;
          state.listHiredWork = action.payload;
        })
        .addCase(getListHiredWork.rejected, (state, action) => {
          state.isFetching = false;
          state.error = action.payload;
        })
        //delHiredWork
        .addCase(delHiredWork.pending, (state, action) => {
          state.isFetching = true;
        })
        .addCase(delHiredWork.fulfilled, (state, action) => {
          state.isFetching = false;
          console.log(" action.payload: ", action.payload);
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        })
        .addCase(delHiredWork.rejected, (state, action) => {
          state.isFetching = false;
          state.error = action.payload;
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            footer: '<a href="">Why do I have this issue?</a>',
          });
        })
        //getListServicesSearch
        .addCase(getServicesSearch.pending, (state, action) => {
          state.isFetching = true;
        })
        .addCase(getServicesSearch.fulfilled, (state, action) => {
          state.isFetching = false;
          state.listServicesSearch = action.payload;
        })
        .addCase(getServicesSearch.rejected, (state, action) => {
          state.isFetching = false;
          state.error = action.payload;
        })
        //putHireWork
        .addCase(putHireWork.pending, (state, action) => {
          state.isFetching = true;
        })
        .addCase(putHireWork.fulfilled, (state, action) => {
          state.isFetching = false;
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500,
          });
        })
        .addCase(putHireWork.rejected, (state, action) => {
          state.isFetching = false;
          state.error = action.payload;
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            footer: '<a href="">Why do I have this issue?</a>',
          });
        })
        //postHireWork
        .addCase(postHireWork.pending, (state, action) => {
          state.isFetching = true;
        })
        .addCase(postHireWork.fulfilled, (state, action) => {
          state.isFetching = false;
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500,
          });
        })
        .addCase(postHireWork.rejected, (state, action) => {
          state.isFetching = false;
          state.error = action.payload;
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            footer: '<a href="">Why do I have this issue?</a>',
          });
        })
        //checkDoneWork
        .addCase(checkDoneWork.pending, (state, action) => {
          state.isFetching = true;
        })
        .addCase(checkDoneWork.fulfilled, (state, action) => {
          state.isFetching = false;
          Swal.fire("Finish!", "Your job is done.", "success");
        })
        .addCase(checkDoneWork.rejected, (state, action) => {
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

export const getListHiredWork = createAsyncThunk(
  "thueCongViec/getHiredWork",
  async (data, { rejectWithValue }) => {
    try {
      const result = await axios({
        url: "https://fiverrnew.cybersoft.edu.vn/api/thue-cong-viec/lay-danh-sach-da-thue",
        method: "GET",
        headers: {
          token: localStorage.getItem("TOKEN"),
          TokenCyberSoft:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzOSIsIkhldEhhblN0cmluZyI6IjI0LzA3LzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY5MDE1NjgwMDAwMCIsIm5iZiI6MTY2MTcwNjAwMCwiZXhwIjoxNjkwMzA0NDAwfQ.v3QBEWqiclIwpSJXtVil8Lu30xYH1J5FT82rQrUyv1c",
        },
      });
      console.log("result.data.content: ", result.data.content);
      return result.data.content;
    } catch (err) {
      console.log("error", err.response.data);
      return rejectWithValue(err.response.data);
    }
  }
);

export const delHiredWork = createAsyncThunk(
  "thueCongViec/delHiredWork",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const result = await axios({
        url: `https://fiverrnew.cybersoft.edu.vn/api/thue-cong-viec/${id}`,
        method: "DELETE",
        headers: {
          token: localStorage.getItem("TOKEN"),
          TokenCyberSoft:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzOSIsIkhldEhhblN0cmluZyI6IjI0LzA3LzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY5MDE1NjgwMDAwMCIsIm5iZiI6MTY2MTcwNjAwMCwiZXhwIjoxNjkwMzA0NDAwfQ.v3QBEWqiclIwpSJXtVil8Lu30xYH1J5FT82rQrUyv1c",
        },
      });
      console.log("result.data.content: ", result.data.content);
      dispatch(getListHiredWork());
      dispatch(getServicesSearch());
      return result.data.content;
    } catch (err) {
      console.log("error", err.response.data);
      return rejectWithValue(err.response.data);
    }
  }
);

export const getServicesSearch = createAsyncThunk(
  "thueCongViec/getServicesSearch",
  async (data, { rejectWithValue }) => {
    try {
      const result = await axios({
        url: "https://fiverrnew.cybersoft.edu.vn/api/thue-cong-viec/phan-trang-tim-kiem?pageIndex=1&pageSize=2000",
        method: "GET",
        headers: {
          TokenCyberSoft:
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

export const putHireWork = createAsyncThunk(
  "thueCongViec/putHireWork",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const result = await axios({
        url: `https://fiverrnew.cybersoft.edu.vn/api/thue-cong-viec/${data.id}`,
        method: "PUT",
        headers: {
          token: localStorage.getItem("TOKEN"),
          TokenCyberSoft:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzOSIsIkhldEhhblN0cmluZyI6IjI0LzA3LzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY5MDE1NjgwMDAwMCIsIm5iZiI6MTY2MTcwNjAwMCwiZXhwIjoxNjkwMzA0NDAwfQ.v3QBEWqiclIwpSJXtVil8Lu30xYH1J5FT82rQrUyv1c",
        },
        data,
      });
      dispatch(getServicesSearch());
      return result.data.content;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const checkDoneWork = createAsyncThunk(
  "thueCongViec/checkDoneWork",
  async (workId, { dispatch, rejectWithValue }) => {
    try {
      const result = await axios({
        url: `https://fiverrnew.cybersoft.edu.vn/api/thue-cong-viec/hoan-thanh-cong-viec/${workId}`,
        method: "POST",
        headers: {
          token: localStorage.getItem("TOKEN"),
          TokenCyberSoft:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzOSIsIkhldEhhblN0cmluZyI6IjI0LzA3LzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY5MDE1NjgwMDAwMCIsIm5iZiI6MTY2MTcwNjAwMCwiZXhwIjoxNjkwMzA0NDAwfQ.v3QBEWqiclIwpSJXtVil8Lu30xYH1J5FT82rQrUyv1c",
        },
      });
      dispatch(getServicesSearch());
      return result.data.content;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const postHireWork = createAsyncThunk(
  "thueCongViec/postHireWork",
  async (data, { rejectWithValue }) => {
    try {
      const result = await axios({
        url: "https://fiverrnew.cybersoft.edu.vn/api/thue-cong-viec",
        method: "POST",
        headers: {
          token: localStorage.getItem("TOKEN"),
          TokenCyberSoft:
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
