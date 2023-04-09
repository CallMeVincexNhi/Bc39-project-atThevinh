import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";

const initialState = {
  isFetching: false,
  listWorkType: [],
  error: undefined,
};

export const {
  reducer: chiTietLoaiCongViecReducer,
  actions: chiTietLoaiCongViecActions,
} = createSlice({
  name: "chiTietLoaiCongViec",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //getWorkType
      .addCase(getDetailWorkType.pending, (state, action) => {
        state.isFetching = true;
      })
      .addCase(getDetailWorkType.fulfilled, (state, action) => {
        state.isFetching = false;
        state.listWorkType = action.payload;
      })
      .addCase(getDetailWorkType.rejected, (state, action) => {
        state.isFetching = false;
        state.error = action.payload;
      })
      //deleteWorkType
      .addCase(deleteDetailWorkType.pending, (state, action) => {
        state.isFetching = true;
      })
      .addCase(deleteDetailWorkType.fulfilled, (state, action) => {
        state.isFetching = false;
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      })
      .addCase(deleteDetailWorkType.rejected, (state, action) => {
        state.isFetching = false;
        state.error = action.payload;
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          footer: '<a href="">Why do I have this issue?</a>',
        });
      })
      //putDetailWorkType
      .addCase(putDetailWorkType.pending, (state, action) => {
        state.isFetching = true;
      })
      .addCase(putDetailWorkType.fulfilled, (state, action) => {
        state.isFetching = false;
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .addCase(putDetailWorkType.rejected, (state, action) => {
        state.isFetching = false;
        state.error = action.payload;
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          footer: '<a href="">Why do I have this issue?</a>',
        });
      })
      //postNewDetailWorkType
      .addCase(postNewDetailWorkType.pending, (state, action) => {
        state.isFetching = true;
      })
      .addCase(postNewDetailWorkType.fulfilled, (state, action) => {
        state.isFetching = false;
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .addCase(postNewDetailWorkType.rejected, (state, action) => {
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

export const getDetailWorkType = createAsyncThunk(
  "chiTietLoaiCongViec/getDetailWorkType",
  async (data, { rejectWithValue }) => {
    try {
      const result = await axios({
        url: "https://fiverrnew.cybersoft.edu.vn/api/chi-tiet-loai-cong-viec/phan-trang-tim-kiem?pageIndex=1&pageSize=200",
        method: "GET",
        headers: {
          TokenCyberSoft:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzOSIsIkhldEhhblN0cmluZyI6IjI0LzA3LzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY5MDE1NjgwMDAwMCIsIm5iZiI6MTY2MTcwNjAwMCwiZXhwIjoxNjkwMzA0NDAwfQ.v3QBEWqiclIwpSJXtVil8Lu30xYH1J5FT82rQrUyv1c",
        },
      });
      return result.data.content.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteDetailWorkType = createAsyncThunk(
  "chiTietLoaiCongViec/deleteDetailWorkType",
  async (workId, { dispatch, rejectWithValue }) => {
    try {
      const result = await axios({
        url: `https://fiverrnew.cybersoft.edu.vn/api/chi-tiet-loai-cong-viec/${workId}`,
        method: "DELETE",
        headers: {
          token: localStorage.getItem("TOKEN"),
          TokenCyberSoft:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzOSIsIkhldEhhblN0cmluZyI6IjI0LzA3LzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY5MDE1NjgwMDAwMCIsIm5iZiI6MTY2MTcwNjAwMCwiZXhwIjoxNjkwMzA0NDAwfQ.v3QBEWqiclIwpSJXtVil8Lu30xYH1J5FT82rQrUyv1c",
        },
      });
      dispatch(getDetailWorkType());
      return result.data.content;
    } catch (err) {
      console.log(
        "rejectWithValue(err.response.data): ",
        rejectWithValue(err.response.data)
      );
      return rejectWithValue(err.response.data);
    }
  }
);

export const putDetailWorkType = createAsyncThunk(
  "chiTietLoaiCongViec/putDetailWorkType",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const result = await axios({
        url: `https://fiverrnew.cybersoft.edu.vn/api/chi-tiet-loai-cong-viec/sua-nhom-chi-tiet-loai/${data.id}`,
        method: "PUT",
        headers: {
          token: localStorage.getItem("TOKEN"),
          TokenCyberSoft:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzOSIsIkhldEhhblN0cmluZyI6IjI0LzA3LzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY5MDE1NjgwMDAwMCIsIm5iZiI6MTY2MTcwNjAwMCwiZXhwIjoxNjkwMzA0NDAwfQ.v3QBEWqiclIwpSJXtVil8Lu30xYH1J5FT82rQrUyv1c",
        },
        data,
      });
      dispatch(getDetailWorkType());
      return result.data.content.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const postNewDetailWorkType = createAsyncThunk(
  "chiTietLoaiCongViec/postNewDetailWorkType",
  async (data, { rejectWithValue }) => {
    try {
      const result = await axios({
        url: "https://fiverrnew.cybersoft.edu.vn/api/chi-tiet-loai-cong-viec/them-nhom-chi-tiet-loai",
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
