import { useSelector } from "react-redux";

export const useQuanLyBinhLuan = () =>
  useSelector((state) => state.quanLyBinhLuanReducer);
