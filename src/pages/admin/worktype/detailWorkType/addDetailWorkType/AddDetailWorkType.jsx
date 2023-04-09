import React from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { postNewDetailWorkType } from "../../../../../store/chiTietLoaiCongViec/chiTietLoaiCongViecReducer";

const AddDetailWorkType = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(
      postNewDetailWorkType({
        tenChiTiet: data.tenChiTiet,
        maLoaiCongViec: parseInt(data.maLoaiCongViec),
        dsChiTietLoai: [parseInt(data.dsChiTietLoai)],
      })
    );
  };
  return (
    <div>
      <div className="container flex justify-center my-3 h-[625px]">
        <Container className="w-2/3 p-3">
          <div className="border rounded-md w-full p-3 mb-3">
            <div className="flex justify-center">
              <svg
                width="89"
                height="27"
                viewBox="0 0 89 27"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g fill="#404145">
                  <path d="m81.6 13.1h-3.1c-2 0-3.1 1.5-3.1 4.1v9.3h-6v-13.4h-2.5c-2 0-3.1 1.5-3.1 4.1v9.3h-6v-18.4h6v2.8c1-2.2 2.3-2.8 4.3-2.8h7.3v2.8c1-2.2 2.3-2.8 4.3-2.8h2zm-25.2 5.6h-12.4c.3 2.1 1.6 3.2 3.7 3.2 1.6 0 2.7-.7 3.1-1.8l5.3 1.5c-1.3 3.2-4.5 5.1-8.4 5.1-6.5 0-9.5-5.1-9.5-9.5 0-4.3 2.6-9.4 9.1-9.4 6.9 0 9.2 5.2 9.2 9.1 0 .9 0 1.4-.1 1.8zm-5.7-3.5c-.1-1.6-1.3-3-3.3-3-1.9 0-3 .8-3.4 3zm-22.9 11.3h5.2l6.6-18.3h-6l-3.2 10.7-3.2-10.8h-6zm-24.4 0h5.9v-13.4h5.7v13.4h5.9v-18.4h-11.6v-1.1c0-1.2.9-2 2.2-2h3.5v-5h-4.4c-4.3 0-7.2 2.7-7.2 6.6v1.5h-3.4v5h3.4z"></path>
                </g>
                <g fill="#1dbf73">
                  <path d="m85.3 27c2 0 3.7-1.7 3.7-3.7s-1.7-3.7-3.7-3.7-3.7 1.7-3.7 3.7 1.7 3.7 3.7 3.7z"></path>
                </g>
              </svg>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3">
                <div className="text-lg font-semibold">Work</div>
                <input
                  className="w-full border rounded-md p-2"
                  placeholder="Work"
                  {...register("tenChiTiet", {
                    required: "Looks like this name is incomplete.",
                  })}
                />
                <p className="text-red-600 error">
                  {errors?.tenChiTiet?.message}
                </p>
              </div>
              <div className="mb-3">
                <div className="text-lg font-semibold">ID Work Type List</div>
                <input
                  className="w-full border rounded-md p-2"
                  placeholder="Id Work Type List"
                  {...register("maLoaiCongViec", {
                    required: "Looks like this price is incomplete.",
                    pattern: {
                      value: /^[0-9\b]+$/,
                      message: "Please input numeric characters only.",
                    },
                  })}
                />
                <p className="text-red-600 error">
                  {errors?.maLoaiCongViec?.message}
                </p>
              </div>
              <div className="mb-3">
                <span className="text-lg font-semibold">Work Type List</span>
                <input
                  className="w-full border rounded-md p-2"
                  placeholder="Work Type List"
                  {...register("dsChiTietLoai", {
                    required: "Looks like this description is incomplete.",
                    pattern: {
                      value: /^[0-9\b]+$/,
                      message: "Please input numeric characters only.",
                    },
                  })}
                />
                <p className="text-red-600 error">
                  {errors.dsChiTietLoai?.message}
                </p>
              </div>
              <div className="mt-3 text-center">
                <button className="bg-green-500 rounded-md text-lg text-white font-semibold px-5 py-2">
                  Submit
                </button>
              </div>
            </form>
            <div className="flex justify-center text-right mt-3">
              <div
                className="text-right cursor-pointer text-lg text-green-500 border-b"
                onClick={() => {
                  navigate(-1);
                }}
              >
                Cancel
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default AddDetailWorkType;

const Container = styled.div`
  .error {
    &:empty {
      display: none;
    }
  }
`;
