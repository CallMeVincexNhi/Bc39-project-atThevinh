import { useSelector } from "react-redux";

export const useQuanLyCongViec = () =>
  useSelector((state) => state.quanLyCongViecReducer);
