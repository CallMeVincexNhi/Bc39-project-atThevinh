import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import thunk from "redux-thunk";
import { authReducer } from "./auth/authReducer";
import { quanLyBinhLuanReducer } from "./quanLyBinhLuan";
import { quanLyCongViecReducer } from "./quanLyCongViec";
import { nguoiDungReducer } from "./nguoiDung/nguoiDungReducer";
import { thueCongViecReducer } from "./thueCongViec/thueCongViec";
import { congViecReducer } from "./congViec/congViecReducer";
import { chiTietLoaiCongViecReducer } from "./chiTietLoaiCongViec/chiTietLoaiCongViecReducer";
import { loaiCongViecReducer } from "./loaiCongViec/loaiCongViec";

const rootReducer = combineReducers({
  authReducer,
  quanLyCongViecReducer,
  nguoiDungReducer,
  thueCongViecReducer,
  quanLyBinhLuanReducer,
  congViecReducer,
  chiTietLoaiCongViecReducer,
  loaiCongViecReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
  devTools: true,
});
