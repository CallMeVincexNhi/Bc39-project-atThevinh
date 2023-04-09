import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";

const initialState = {
  menuLoaiCongViec: [],
  dsCongViecTheoTen: [],
  dsChiTietLoaiCongViec: [],
  workDetail: [],
  isFetching: false,
};

export const {
  reducer: quanLyCongViecReducer,
  actions: quanLyCongViecActions,
} = createSlice({
  name: "quanLyCongViec",
  initialState,
  reducers: {},
  extraReducers: (buider) => {
    buider
      // layMenuLoaiCongViec
      .addCase(layMenuLoaiCongViec.pending, (state, action) => {
        state.isFetching = true;
      })
      .addCase(layMenuLoaiCongViec.fulfilled, (state, action) => {
        state.menuLoaiCongViec = action.payload;
        state.isFetching = false;
      })
      .addCase(layMenuLoaiCongViec.rejected, (state, action) => {
        state.isFetching = false;
        state.error = action.payload;
      })

      // layDsCongViecTheoTen
      .addCase(layDsCongViecTheoTen.pending, (state, action) => {
        state.isFetching = true;
      })
      .addCase(layDsCongViecTheoTen.fulfilled, (state, action) => {
        state.dsCongViecTheoTen = action.payload;
        state.isFetching = false;
      })
      .addCase(layDsCongViecTheoTen.rejected, (state, action) => {
        state.isFetching = false;
        state.error = action.payload;
        console.log(action.payload);
      })

      // layCongViecTheoChiTietLoai
      .addCase(layCongViecTheoChiTietLoai.pending, (state, action) => {
        state.isFetching = true;
      })
      .addCase(layCongViecTheoChiTietLoai.fulfilled, (state, action) => {
        state.dsCongViecTheoTen = action.payload;
        state.isFetching = false;
      })
      .addCase(layCongViecTheoChiTietLoai.rejected, (state, action) => {
        state.isFetching = false;
        state.error = action.payload;
        console.log(action.payload);
      })

      // layDsChiTietLoaiCongViec
      .addCase(layDsChiTietLoaiCongViec.pending, (state, action) => {
        state.isFetching = true;
      })
      .addCase(layDsChiTietLoaiCongViec.fulfilled, (state, action) => {
        state.dsChiTietLoaiCongViec = action.payload;
        state.isFetching = false;
      })
      .addCase(layDsChiTietLoaiCongViec.rejected, (state, action) => {
        state.isFetching = false;
        state.error = action.payload;
        console.log(action.payload);
      })

      // layCongViecChiTiet
      .addCase(layCongViecChiTiet.pending, (state, action) => {
        state.isFetching = true;
      })
      .addCase(layCongViecChiTiet.fulfilled, (state, action) => {
        state.workDetail = action.payload;
        state.isFetching = false;
      })
      .addCase(layCongViecChiTiet.rejected, (state, action) => {
        state.isFetching = false;
        state.error = action.payload;
        console.log(action.payload);
      })

      // thueCongViec
      .addCase(thueCongViec.pending, (state, action) => {
        state.isFetching = true;
      })
      .addCase(thueCongViec.fulfilled, (state, action) => {
        state.isFetching = false;
        // console.log(action.payload);
        Swal.fire(
          "Thành Công!",
          "Bạn đã thuê công việc thành công!",
          "success"
        );
      })
      .addCase(thueCongViec.rejected, (state, action) => {
        state.error = action.payload;
        console.log(action.payload);
        state.isFetching = false;
        Swal.fire({
          icon: "error",
          title: "Thất bại...",
          text: action.payload.content,
          footer: '<a href="">Xin cảm ơn</a>',
        });
      });
  },
});

export const layMenuLoaiCongViec = createAsyncThunk(
  "quanLyCongViec/layMenuLoaiCongViec",
  async (data, { dispatch, getState, rejectWithValue }) => {
    try {
      const result = await axios({
        url: "https://fiverrnew.cybersoft.edu.vn/api/cong-viec/lay-menu-loai-cong-viec",
        method: "GET",
        headers: {
          TokenCyberSoft:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzOSIsIkhldEhhblN0cmluZyI6IjI0LzA3LzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY5MDE1NjgwMDAwMCIsIm5iZiI6MTY2MTcwNjAwMCwiZXhwIjoxNjkwMzA0NDAwfQ.v3QBEWqiclIwpSJXtVil8Lu30xYH1J5FT82rQrUyv1c",
        },
      });
      return result.data.content;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const layDsCongViecTheoTen = createAsyncThunk(
  "quanLyCongViec/layDsCongViecTheoTen",
  async (data, { dispatch, getState, rejectWithValue }) => {
    try {
      const result = await axios({
        url: `https://fiverrnew.cybersoft.edu.vn/api/cong-viec/lay-danh-sach-cong-viec-theo-ten/${data}`,
        method: "GET",
        headers: {
          TokenCyberSoft:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzOSIsIkhldEhhblN0cmluZyI6IjI0LzA3LzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY5MDE1NjgwMDAwMCIsIm5iZiI6MTY2MTcwNjAwMCwiZXhwIjoxNjkwMzA0NDAwfQ.v3QBEWqiclIwpSJXtVil8Lu30xYH1J5FT82rQrUyv1c",
        },
      });
      return result.data.content;
    } catch (err) {
      console.log(err.response.data);
      return rejectWithValue(err.response.data);
    }
  }
);

export const layDsChiTietLoaiCongViec = createAsyncThunk(
  "quanLyCongViec/layDsChiTietLoaiCongViec",
  async (data, { dispatch, getState, rejectWithValue }) => {
    try {
      const result = await axios({
        url: `https://fiverrnew.cybersoft.edu.vn/api/cong-viec/lay-chi-tiet-loai-cong-viec/${data}`,
        method: "GET",
        headers: {
          TokenCyberSoft:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzOSIsIkhldEhhblN0cmluZyI6IjI0LzA3LzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY5MDE1NjgwMDAwMCIsIm5iZiI6MTY2MTcwNjAwMCwiZXhwIjoxNjkwMzA0NDAwfQ.v3QBEWqiclIwpSJXtVil8Lu30xYH1J5FT82rQrUyv1c",
        },
      });
      return result.data.content;
    } catch (err) {
      console.log(err.response.data);
      return rejectWithValue(err.response.data);
    }
  }
);

export const layCongViecTheoChiTietLoai = createAsyncThunk(
  "quanLyCongViec/layCongViecTheoChiTietLoai",
  async (data, { dispatch, getState, rejectWithValue }) => {
    try {
      const result = await axios({
        url: `https://fiverrnew.cybersoft.edu.vn/api/cong-viec/lay-cong-viec-theo-chi-tiet-loai/${data}`,
        method: "GET",
        headers: {
          TokenCyberSoft:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzOSIsIkhldEhhblN0cmluZyI6IjI0LzA3LzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY5MDE1NjgwMDAwMCIsIm5iZiI6MTY2MTcwNjAwMCwiZXhwIjoxNjkwMzA0NDAwfQ.v3QBEWqiclIwpSJXtVil8Lu30xYH1J5FT82rQrUyv1c",
        },
      });
      return result.data.content;
    } catch (err) {
      console.log(err.response.data);
      return rejectWithValue(err.response.data);
    }
  }
);

export const layCongViecChiTiet = createAsyncThunk(
  "quanLyCongViec/layCongViecChiTiet",
  async (data, { dispatch, getState, rejectWithValue }) => {
    try {
      const result = await axios({
        url: `https://fiverrnew.cybersoft.edu.vn/api/cong-viec/lay-cong-viec-chi-tiet/${data}`,
        method: "GET",
        headers: {
          TokenCyberSoft:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzOSIsIkhldEhhblN0cmluZyI6IjI0LzA3LzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY5MDE1NjgwMDAwMCIsIm5iZiI6MTY2MTcwNjAwMCwiZXhwIjoxNjkwMzA0NDAwfQ.v3QBEWqiclIwpSJXtVil8Lu30xYH1J5FT82rQrUyv1c",
        },
      });
      return result.data.content;
    } catch (err) {
      console.log(err.response.data);
      return rejectWithValue(err.response.data);
    }
  }
);

export const thueCongViec = createAsyncThunk(
  "quanLyCongViec/thueCongViec",
  async (data, { dispatch, getState, rejectWithValue }) => {
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
      console.log(err.response.data);
      return rejectWithValue(err.response.data);
    }
  }
);
