import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import "./workdetail.css";
import {
  guiBinhLuan,
  layBinhLuanTheoCongViec,
  useQuanLyBinhLuan,
} from "../../store/quanLyBinhLuan";

import {
  layCongViecChiTiet,
  thueCongViec,
  useQuanLyCongViec,
} from "../../store/quanLyCongViec";
import { useForm } from "react-hook-form";
import moment from "moment";

const WorkDetail = () => {
  const navigate = useNavigate();

  const params = useParams();

  const { userLogIn } = useSelector((state) => state.authReducer);

  const { workDetail } = useQuanLyCongViec();

  const { dsBinhLuan } = useQuanLyBinhLuan();

  const time = moment(moment().toDate()).format("DD-MM-YYYY");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onBlur",
    defaultValues: {},
  });

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(layCongViecChiTiet(params.idwork));
    dispatch(layBinhLuanTheoCongViec(params.idwork));
  }, []);

  useEffect(() => {
    reset({
      maCongViec: workDetail[0]?.id,
      maNguoiBinhLuan: userLogIn?.user.id,
      ngayBinhLuan: time,
      saoBinhLuan: 5,
    });
  }, [workDetail]);

  const onSubmit = async (data) => {
    if (!userLogIn) {
      return navigate("/signin");
    } else {
      try {
        await dispatch(guiBinhLuan(data));
        reset({
          noiDung: "",
        });
        dispatch(layBinhLuanTheoCongViec(params.idwork));
      } catch (error) {
        // handle any rejections/errors
      }
    }
  };

  const handleButton = () => {
    if (!userLogIn) {
      return navigate("/signin");
    } else {
      const data = {
        maCongViec: workDetail[0]?.id,
        maNguoiThue: userLogIn?.user.id,
        ngayThue: time,
        hoanThanh: true,
      };
      console.log(data);
      dispatch(thueCongViec(data));
    }
  };

  return (
    <div className="workdetail max-w-[1400px] mx-auto">
      <div className="workdetail-wrapper flex p-8">
        <div className="sidebar order-3 self-start w-1/3 sticky top-0 box-border">
          <div className="sidebar-content border-[1px] border-solid">
            <div className="nav-container flex grow font-bold">
              <div className=" grow bg-[#fafafa] p-4 text-center border-b-[1px] border-solid cursor-pointer">
                Basic
              </div>
              <div className=" grow bg-white p-4 text-center border-x-[1px] border-solid text-[#1dbf73] border-b-[3px] border-b-[#1dbf73] cursor-pointer ">
                Standard
              </div>
              <div className=" grow bg-[#fafafa] p-4 text-center border-b-[1px] border-solid cursor-pointer">
                Premium
              </div>
            </div>
            <div className="pt-8 px-6 sticky">
              <header className="leading-[21px] pb-[10px]">
                <h2 className="text-2xl font-bold whitespace-nowrap">
                  $ {workDetail[0]?.congViec.giaTien}
                </h2>
              </header>
              <article>
                <div className="addition-info flex gap-4 font-bold">
                  <div className="delivery-wrapper flex gap-2 items-center">
                    <span
                      className="nFghBOe delivery-icon"
                      aria-hidden="true"
                      style={{ width: 16, height: 16 }}
                    >
                      <svg
                        width={16}
                        height={16}
                        viewBox="0 0 16 16"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 14c-3.3 0-6-2.7-6-6s2.7-6 6-6 6 2.7 6 6-2.7 6-6 6z" />
                        <path d="M9 4H7v5h5V7H9V4z" />
                      </svg>
                    </span>
                    <span>2 Days Delivery</span>
                  </div>
                  <div className="revision-wrapper flex gap-2 items-center">
                    <span
                      className="nFghBOe revisions-icon"
                      aria-hidden="true"
                      style={{ width: 16, height: 16 }}
                    >
                      <svg
                        width={16}
                        height={16}
                        viewBox="0 0 16 16"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M4.50001 11.4999C6.40001 13.3999 9.60001 13.3999 11.5 11.4999C12.2 10.7999 12.7 9.7999 12.9 8.7999L14.9 9.0999C14.7 10.5999 14 11.8999 13 12.8999C10.3 15.5999 5.90001 15.5999 3.10001 12.8999L0.900012 15.0999L0.200012 8.6999L6.60001 9.3999L4.50001 11.4999Z" />
                        <path d="M15.8 7.2999L9.40001 6.5999L11.5 4.4999C9.60001 2.5999 6.40001 2.5999 4.50001 4.4999C3.80001 5.1999 3.30001 6.1999 3.10001 7.1999L1.10001 6.8999C1.30001 5.3999 2.00001 4.0999 3.00001 3.0999C4.40001 1.6999 6.10001 1.0999 7.90001 1.0999C9.70001 1.0999 11.5 1.7999 12.8 3.0999L15 0.899902L15.8 7.2999Z" />
                      </svg>
                    </span>
                    <span>5 Revisions</span>
                  </div>
                </div>
                <ul className="features mb-5">
                  {workDetail[0]?.congViec.moTaNgan
                    .split("\r\n")
                    .filter((val) => val !== "")
                    .map((value, index) => (
                      <li
                        key={index}
                        className="flex items-center text-[#95979d] gap-3"
                      >
                        <span
                          className="nFghBOe bvg2_O1 ZbQv8bb"
                          aria-hidden="true"
                          style={{ width: 16, height: 16 }}
                        >
                          <svg
                            width={16}
                            height={16}
                            viewBox="0 0 11 9"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="#1dbf73"
                          >
                            <path d="M3.645 8.102.158 4.615a.536.536 0 0 1 0-.759l.759-.758c.21-.21.549-.21.758 0l2.35 2.349L9.054.416c.21-.21.55-.21.759 0l.758.758c.21.21.21.55 0 .759L4.403 8.102c-.209.21-.549.21-.758 0Z" />
                          </svg>
                        </span>

                        {value}
                      </li>
                    ))}
                </ul>
              </article>
              <div className="footer pb-5">
                <button
                  onClick={() => handleButton()}
                  className="w-full bg-[#1dbf73] hover:bg-[#19a463] text-white rounded px-6 py-3 text-base "
                >
                  Continue
                </button>
                <button className="w-full text-[#1dbf73] px-6 py-3">
                  Compare Packages
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="content w-3/5 mr-[9%] ">
          <div className="gig-overview order-1">
            <nav className="mb-[10px] ">
              <ul className="breadcrumb flex">
                <li className="flex gap-2 items-center ">
                  <NavLink
                    //   to={`/workcategory/${workDetail[0].id}`}
                    className="text-[#446ee7] text-[14px]"
                  >
                    {workDetail[0]?.tenLoaiCongViec}
                  </NavLink>
                  <span
                    className="nFghBOe hHj5hL_ H1E92Nx"
                    style={{ width: 12, height: 12 }}
                    aria-hidden="true"
                  >
                    <svg
                      width={8}
                      height={12}
                      viewBox="0 0 8 16"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M0.772126 1.19065L0.153407 1.80934C0.00696973 1.95578 0.00696973 2.19322 0.153407 2.33969L5.80025 8L0.153407 13.6603C0.00696973 13.8067 0.00696973 14.0442 0.153407 14.1907L0.772126 14.8094C0.918563 14.9558 1.156 14.9558 1.30247 14.8094L7.84666 8.26519C7.99309 8.11875 7.99309 7.88131 7.84666 7.73484L1.30247 1.19065C1.156 1.04419 0.918563 1.04419 0.772126 1.19065Z" />
                    </svg>
                  </span>
                </li>
                <li className="flex gap-2 items-center ">
                  <NavLink
                    //   to={`/workcategory/${workDetail[0].id}`}
                    className="text-[#446ee7] text-[14px]"
                  >
                    {workDetail[0]?.tenNhomChiTietLoai}
                  </NavLink>
                  <span
                    className="nFghBOe hHj5hL_ H1E92Nx"
                    style={{ width: 12, height: 12 }}
                    aria-hidden="true"
                  >
                    <svg
                      width={8}
                      height={12}
                      viewBox="0 0 8 16"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M0.772126 1.19065L0.153407 1.80934C0.00696973 1.95578 0.00696973 2.19322 0.153407 2.33969L5.80025 8L0.153407 13.6603C0.00696973 13.8067 0.00696973 14.0442 0.153407 14.1907L0.772126 14.8094C0.918563 14.9558 1.156 14.9558 1.30247 14.8094L7.84666 8.26519C7.99309 8.11875 7.99309 7.88131 7.84666 7.73484L1.30247 1.19065C1.156 1.04419 0.918563 1.04419 0.772126 1.19065Z" />
                    </svg>
                  </span>
                </li>
                <li className="text-[#446ee7] ">
                  {workDetail[0]?.tenChiTietLoai}
                </li>
              </ul>
            </nav>
            <h1 className="pb-4 text-[28px] leading-[130%] font-bold text-[#404145] mb-0 ">
              {workDetail[0]?.congViec.tenCongViec}
            </h1>
            <div className="seller-overview mb-6">
              <div className="flex items-center">
                <div className="w-[30px] h-[30px] mr-4 ">
                  <img
                    className="rounded-full"
                    src={workDetail[0]?.avatar}
                    alt=""
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#404145] font-bold">
                    {workDetail[0]?.tenNguoiTao}
                  </span>
                  <span className="text-sm">Level 2 Seller</span>
                  <div className="flex items-center">
                    <span>
                      <svg
                        className="text-yellow-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 1792 1792"
                        width={15}
                        height={15}
                      >
                        <path
                          fill="currentColor"
                          d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z"
                        />
                      </svg>
                    </span>
                    <span>
                      <svg
                        className="text-yellow-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 1792 1792"
                        width={15}
                        height={15}
                      >
                        <path
                          fill="currentColor"
                          d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z"
                        />
                      </svg>
                    </span>
                    <span>
                      <svg
                        className="text-yellow-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 1792 1792"
                        width={15}
                        height={15}
                      >
                        <path
                          fill="currentColor"
                          d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z"
                        />
                      </svg>
                    </span>
                    <span>
                      <svg
                        className="text-yellow-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 1792 1792"
                        width={15}
                        height={15}
                      >
                        <path
                          fill="currentColor"
                          d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z"
                        />
                      </svg>
                    </span>
                    <span>
                      <svg
                        className="text-yellow-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 1792 1792"
                        width={15}
                        height={15}
                      >
                        <path
                          fill="currentColor"
                          d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z"
                        />
                      </svg>
                    </span>
                    <span className="mx-[1px] font-bold text-yellow-400">
                      {workDetail[0]?.congViec.saoCongViec}
                    </span>
                    <span className="mr-2">
                      ({workDetail[0]?.congViec.danhGia})
                    </span>
                    <span>1k+ Orders in Queue</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="work-thumb order-2 bg-gray-300 overflow-hidden mb-16 ">
            <img
              className="w-4/5 mx-auto hover:scale-[1.04] transition-all duration-200 "
              src={workDetail[0]?.congViec.hinhAnh}
              alt={workDetail[0]?.congViec.tenCongViec}
            />
          </div>
          <div className="gig-description order-4">
            <header>
              <h2 className="text-xl mb-[25px]">About This gig</h2>
            </header>
            <div className="description-wrapper text-base text-[#62646a] mb-5">
              {workDetail[0]?.congViec.moTa
                .split("\r\n")
                .map((value, index) => (
                  <div key={index} className="text-base text-[#62646a]">
                    {value}
                  </div>
                ))}
            </div>
          </div>
          <div className="profile-card mb-16 order-5">
            <h2 className="text-xl pb-6 text-[#404145] ">About the Seller</h2>
            <div className="profile-info flex">
              <div className="userprofile-image w-[110px] h-[110px]  ">
                <img
                  className="rounded-full"
                  src={workDetail[0]?.avatar}
                  alt=""
                />
              </div>
              <div className="userprofile-label pl-4">
                <div className="username text-[#62646a] font-bold text-base ">
                  {workDetail[0]?.tenNguoiTao}
                </div>
                <div className="user-rated flex items-center">
                  <span>
                    <svg
                      className="text-yellow-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 1792 1792"
                      width={15}
                      height={15}
                    >
                      <path
                        fill="currentColor"
                        d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z"
                      />
                    </svg>
                  </span>
                  <span>
                    <svg
                      className="text-yellow-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 1792 1792"
                      width={15}
                      height={15}
                    >
                      <path
                        fill="currentColor"
                        d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z"
                      />
                    </svg>
                  </span>
                  <span>
                    <svg
                      className="text-yellow-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 1792 1792"
                      width={15}
                      height={15}
                    >
                      <path
                        fill="currentColor"
                        d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z"
                      />
                    </svg>
                  </span>
                  <span>
                    <svg
                      className="text-yellow-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 1792 1792"
                      width={15}
                      height={15}
                    >
                      <path
                        fill="currentColor"
                        d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z"
                      />
                    </svg>
                  </span>
                  <span>
                    <svg
                      className="text-yellow-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 1792 1792"
                      width={15}
                      height={15}
                    >
                      <path
                        fill="currentColor"
                        d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z"
                      />
                    </svg>
                  </span>
                  <span className="mx-1 font-bold text-yellow-400">
                    {workDetail[0]?.congViec.saoCongViec}
                  </span>
                  <span className="mr-2">
                    ({workDetail[0]?.congViec.danhGia})
                  </span>
                </div>
                <button className="mt-5 text-sm rounded font-semibold px-6 py-3 border-[1px] border-[#62646a] text-[#62646a] hover:bg-[#62646a] hover:text-white transition-all duration-300 ">
                  Contact Me
                </button>
              </div>
            </div>
          </div>
          <div className="faq-collapable mb-16 order-6">
            <h2 className="text-xl font-bold text-[#404145] ">FAQ</h2>
            <div className="group/dropdown border-b-[1px] border-solid border-[#dadbdd]  transition-all duration-300">
              <div className="flex justify-between items-center">
                <div className="py-5 font-semibold text-base dropdown inline-block ">
                  Can i add your zalo?
                </div>
                <div>
                  <span style={{ width: 14, height: 14 }} aria-hidden="true">
                    <svg
                      className="group-hover/dropdown:rotate-90 transition-all duration-300"
                      width={8}
                      height={16}
                      viewBox="0 0 8 16"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M0.772126 1.19065L0.153407 1.80934C0.00696973 1.95578 0.00696973 2.19322 0.153407 2.33969L5.80025 8L0.153407 13.6603C0.00696973 13.8067 0.00696973 14.0442 0.153407 14.1907L0.772126 14.8094C0.918563 14.9558 1.156 14.9558 1.30247 14.8094L7.84666 8.26519C7.99309 8.11875 7.99309 7.88131 7.84666 7.73484L1.30247 1.19065C1.156 1.04419 0.918563 1.04419 0.772126 1.19065Z" />
                    </svg>
                  </span>
                </div>
              </div>
              <div className="dropdown-menu hidden group-hover/dropdown:block text-blue-700 bg-white pb-5 font-semibold text-base transition-all duration-300 ">
                Yes,sure
              </div>
            </div>
            <div className="group/dropdown border-b-[1px] border-solid border-[#dadbdd]  transition-all duration-300">
              <div className="flex justify-between items-center">
                <div className="py-5 font-semibold text-base dropdown inline-block ">
                  Can you make it for free or can i owe you?
                </div>
                <div>
                  <span style={{ width: 14, height: 14 }} aria-hidden="true">
                    <svg
                      className="group-hover/dropdown:rotate-90 transition-all duration-300"
                      width={8}
                      height={16}
                      viewBox="0 0 8 16"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M0.772126 1.19065L0.153407 1.80934C0.00696973 1.95578 0.00696973 2.19322 0.153407 2.33969L5.80025 8L0.153407 13.6603C0.00696973 13.8067 0.00696973 14.0442 0.153407 14.1907L0.772126 14.8094C0.918563 14.9558 1.156 14.9558 1.30247 14.8094L7.84666 8.26519C7.99309 8.11875 7.99309 7.88131 7.84666 7.73484L1.30247 1.19065C1.156 1.04419 0.918563 1.04419 0.772126 1.19065Z" />
                    </svg>
                  </span>
                </div>
              </div>
              <div className="dropdown-menu hidden group-hover/dropdown:block text-blue-700 bg-white pb-5 font-semibold text-base transition-all duration-300 ">
                No, please!!!
              </div>
            </div>
            <div className="group/dropdown border-b-[1px] border-solid border-[#dadbdd]  transition-all duration-300">
              <div className="flex justify-between items-center">
                <div className="py-5 font-semibold text-base dropdown inline-block ">
                  Can we date?
                </div>
                <div>
                  <span style={{ width: 14, height: 14 }} aria-hidden="true">
                    <svg
                      className="group-hover/dropdown:rotate-90 transition-all duration-300"
                      width={8}
                      height={16}
                      viewBox="0 0 8 16"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M0.772126 1.19065L0.153407 1.80934C0.00696973 1.95578 0.00696973 2.19322 0.153407 2.33969L5.80025 8L0.153407 13.6603C0.00696973 13.8067 0.00696973 14.0442 0.153407 14.1907L0.772126 14.8094C0.918563 14.9558 1.156 14.9558 1.30247 14.8094L7.84666 8.26519C7.99309 8.11875 7.99309 7.88131 7.84666 7.73484L1.30247 1.19065C1.156 1.04419 0.918563 1.04419 0.772126 1.19065Z" />
                    </svg>
                  </span>
                </div>
              </div>
              <div className="dropdown-menu hidden group-hover/dropdown:block text-blue-700 bg-white pb-5 font-semibold text-base transition-all duration-300 ">
                Why not?
              </div>
            </div>
          </div>
          <div className="reviews-packages order-7">
            <header className="flex justify-between">
              <div className="flex text-xl leading-10 font-bold ">
                {workDetail[0]?.congViec.danhGia}
                <span className="mx-2">Reviews</span>
                <div className="user-rated flex items-center">
                  <span>
                    <svg
                      className="text-yellow-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 1792 1792"
                      width={15}
                      height={15}
                    >
                      <path
                        fill="currentColor"
                        d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z"
                      />
                    </svg>
                  </span>
                  <span>
                    <svg
                      className="text-yellow-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 1792 1792"
                      width={15}
                      height={15}
                    >
                      <path
                        fill="currentColor"
                        d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z"
                      />
                    </svg>
                  </span>
                  <span>
                    <svg
                      className="text-yellow-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 1792 1792"
                      width={15}
                      height={15}
                    >
                      <path
                        fill="currentColor"
                        d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z"
                      />
                    </svg>
                  </span>
                  <span>
                    <svg
                      className="text-yellow-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 1792 1792"
                      width={15}
                      height={15}
                    >
                      <path
                        fill="currentColor"
                        d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z"
                      />
                    </svg>
                  </span>
                  <span>
                    <svg
                      className="text-yellow-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 1792 1792"
                      width={15}
                      height={15}
                    >
                      <path
                        fill="currentColor"
                        d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z"
                      />
                    </svg>
                  </span>
                  <span className="mx-1 font-bold text-yellow-400">
                    {workDetail[0]?.congViec.saoCongViec}
                  </span>
                </div>
              </div>
              <div className="filter flex items-center text-xl leading-10">
                <span>Sort By</span>
                <span className="font-bold mx-2">Most relevant</span>
                <span
                  className="flex items-center"
                  style={{ width: 11, height: 11 }}
                  aria-hidden="true"
                >
                  <svg
                    width={11}
                    height={7}
                    viewBox="0 0 11 7"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M5.4636 6.38899L0.839326 1.769C0.692474 1.62109 0.692474 1.38191 0.839326 1.23399L1.45798 0.61086C1.60483 0.462945 1.84229 0.462945 1.98915 0.61086L5.72919 4.34021L9.46923 0.61086C9.61608 0.462945 9.85354 0.462945 10.0004 0.61086L10.619 1.23399C10.7659 1.38191 10.7659 1.62109 10.619 1.769L5.99477 6.38899C5.84792 6.5369 5.61046 6.5369 5.4636 6.38899Z" />
                  </svg>
                </span>
              </div>
            </header>
            <div className="filter-section">
              <div className="filter-total flex pb-6">
                <div className="w-1/2 px-4">
                  <table>
                    <tbody>
                      <tr>
                        <td className="whitespace-nowrap">
                          <button className="text-[#446ee7] text-base leading-[100%] font-semibold p-[6px]">
                            5 Start
                          </button>
                        </td>
                        <td className="w-full p-[10px]">
                          <div className="h-2 relative bg-[#e4e5e7] rounded-full ">
                            <span className="absolute w-full h-full rounded-full bg-[#ffb33e]"></span>
                          </div>
                        </td>
                        <td className="text-[#446ee7] text-base leading-[100%] font-semibold">
                          ({workDetail[0]?.congViec.danhGia})
                        </td>
                      </tr>
                      <tr>
                        <td className="whitespace-nowrap">
                          <button className="text-[#446ee7] text-base leading-[100%] font-semibold p-[6px]">
                            4 Start
                          </button>
                        </td>
                        <td className="w-full p-[10px]">
                          <div className="h-2 relative bg-[#e4e5e7] rounded-full ">
                            <span className="absolute w-0 h-full rounded-full bg-[#ffb33e]"></span>
                          </div>
                        </td>
                        <td className="text-[#446ee7] text-base leading-[100%] font-semibold">
                          (0)
                        </td>
                      </tr>
                      <tr>
                        <td className="whitespace-nowrap">
                          <button className="text-[#446ee7] text-base leading-[100%] font-semibold p-[6px]">
                            3 Start
                          </button>
                        </td>
                        <td className="w-full p-[10px]">
                          <div className="h-2 relative bg-[#e4e5e7] rounded-full ">
                            <span className="absolute w-0 h-full rounded-full bg-[#ffb33e]"></span>
                          </div>
                        </td>
                        <td className="text-[#446ee7] text-base leading-[100%] font-semibold">
                          (0)
                        </td>
                      </tr>
                      <tr>
                        <td className="whitespace-nowrap">
                          <button className="text-[#446ee7] text-base leading-[100%] font-semibold p-[6px]">
                            2 Start
                          </button>
                        </td>
                        <td className="w-full p-[10px]">
                          <div className="h-2 relative bg-[#e4e5e7] rounded-full ">
                            <span className="absolute w-0 h-full rounded-full bg-[#ffb33e]"></span>
                          </div>
                        </td>
                        <td className="text-[#446ee7] text-base leading-[100%] font-semibold">
                          (0)
                        </td>
                      </tr>
                      <tr>
                        <td className="whitespace-nowrap">
                          <button className="text-[#446ee7] text-base leading-[100%] font-semibold p-[6px]">
                            1 Start
                          </button>
                        </td>
                        <td className="w-full p-[10px]">
                          <div className="h-2 relative bg-[#e4e5e7] rounded-full ">
                            <span className="absolute w-0 h-full rounded-full bg-[#ffb33e]"></span>
                          </div>
                        </td>
                        <td className="text-[#446ee7] text-base leading-[100%] font-semibold">
                          (0)
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="w-1/2 px-4">
                  <div className="ranking">
                    <h6 className="font-semibold pb-4 mb-0 text-base leading-[140%]">
                      Rating Breakdown
                    </h6>
                    <div className="flex justify-between pb-2">
                      <span className="text-base text-[#95979d]">
                        Seller communication level
                      </span>
                      <div className="flex gap-2 items-center">
                        <span>
                          <svg
                            className="text-yellow-400"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 1792 1792"
                            width={15}
                            height={15}
                          >
                            <path
                              fill="currentColor"
                              d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z"
                            />
                          </svg>
                        </span>
                        <span>{workDetail[0]?.congViec.saoCongViec}</span>
                      </div>
                    </div>
                    <div className="flex justify-between pb-2">
                      <span className="text-base text-[#95979d]">
                        Recommend to a friend
                      </span>
                      <div className="flex gap-2 items-center">
                        <span>
                          <svg
                            className="text-yellow-400"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 1792 1792"
                            width={15}
                            height={15}
                          >
                            <path
                              fill="currentColor"
                              d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z"
                            />
                          </svg>
                        </span>
                        <span>{workDetail[0]?.congViec.saoCongViec}</span>
                      </div>
                    </div>
                    <div className="flex justify-between pb-2">
                      <span className="text-base text-[#95979d]">
                        Service as described
                      </span>
                      <div className="flex gap-2 items-center">
                        <span>
                          <svg
                            className="text-yellow-400"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 1792 1792"
                            width={15}
                            height={15}
                          >
                            <path
                              fill="currentColor"
                              d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z"
                            />
                          </svg>
                        </span>
                        <span>{workDetail[0]?.congViec.saoCongViec}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="filter-wrapper pt-2">
                <h6 className="pb-4 text-lg leading-[140%] text-[#404145] font-bold ">
                  Filters
                </h6>
                <p className="pb-4 text-lg leading-[140%] text-[#404145] mb-0">
                  <span className="mr-2">Industry</span>
                  <span className=" font-bold">All Industries</span>
                </p>
              </div>
            </div>
            <div className="reviews-wrap">
              <ul>
                {dsBinhLuan.map((binhLuan, index) => (
                  <li
                    className="py-10 flex border-t-[1px] border-solid border-[#dadbdd] "
                    key={index}
                  >
                    <div className="review-item flex">
                      <div className="mr-4 w-12 h-12 bg-[#e4e5e7] rounded-full text-center leading-[48px] text-2xl ">
                        {[...binhLuan.tenNguoiBinhLuan][0].toUpperCase()}
                        {/* <img
                          className="w-full h-full rounded-full"
                          src={binhLuan.avatar}
                          alt="binhLuan.tenNguoiBinhLuan"
                        /> */}
                      </div>
                    </div>
                    <div className="user-reviews-info">
                      <div className="flex items-center">
                        <span className="font-bold text-base">
                          {binhLuan.tenNguoiBinhLuan}
                        </span>
                        <span className="ml-2 mr-1">
                          <svg
                            className="text-yellow-400"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 1792 1792"
                            width={15}
                            height={15}
                          >
                            <path
                              fill="currentColor"
                              d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z"
                            />
                          </svg>
                        </span>
                        <span>{binhLuan.saoBinhLuan}</span>
                        <span className="mx-1 px-1 border-l-2 border-solid">
                          Published
                        </span>
                        {binhLuan.ngayBinhLuan}
                      </div>
                      <div className="mt-1 flex items-center">
                        <span className="h-5 w-5">
                          <img
                            src="https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png"
                            alt={binhLuan.tenNguoiBinhLuan}
                          />
                        </span>
                        <span className="text-sm ml-2">
                          Mỹ Tho - bạn của Khoa
                        </span>
                      </div>
                      <div className="user-review-detail mt-5 text-base text-[#404145]">
                        {binhLuan.noiDung}
                      </div>
                      <div className="footer-helpfull mt-4">
                        <div className="helpfull-thumb flex font-bold">
                          <div className="mr-4">HelpFul?</div>
                          <div className="flex items-center gap-2">
                            <span
                              className="nFghBOe thumbs-icon cursor-pointer"
                              style={{ width: 14, height: 14 }}
                              aria-hidden="true"
                            >
                              <svg
                                width={16}
                                height={16}
                                viewBox="0 0 16 16"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M11.89 14.75H1C0.59 14.75 0.25 14.41 0.25 14V8C0.25 7.59 0.59 7.25 1 7.25H3.46L6.05 0.72C6.16 0.43 6.44 0.25 6.75 0.25H7.67C8.59 0.25 9.34 0.98 9.34 1.87V5.45H13.17C14 5.45 14.78 5.84 15.27 6.48C15.73 7.1 15.87 7.87 15.66 8.6L14.39 12.93C14.08 13.99 13.06 14.74 11.9 14.74L11.89 14.75ZM4.75 13.25H11.89C12.38 13.25 12.81 12.95 12.94 12.52L14.21 8.19C14.32 7.81 14.16 7.52 14.06 7.39C13.85 7.12 13.53 6.96 13.16 6.96H8.58C8.17 6.96 7.83 6.62 7.83 6.21V1.87C7.83 1.81 7.76 1.75 7.66 1.75H7.25L4.74 8.08V13.25H4.75ZM1.75 13.25H3.25V8.75H1.75V13.25V13.25Z" />
                              </svg>
                            </span>
                            <span className=" cursor-pointer">Yes</span>

                            <span
                              className="nFghBOe thumbs-icon cursor-pointer"
                              style={{ width: 14, height: 14 }}
                              aria-hidden="true"
                            >
                              <svg
                                width={16}
                                height={16}
                                viewBox="0 0 16 16"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M9.25533 14.75H8.33533C7.41533 14.75 6.66533 14.03 6.66533 13.13L6.66533 9.55H2.83533C2.00533 9.55 1.22533 9.16 0.735326 8.52C0.275326 7.9 0.135326 7.13 0.345326 6.4L1.62533 2.06C1.93533 1 2.95533 0.25 4.11533 0.25L15.0053 0.25C15.4153 0.25 15.7553 0.59 15.7553 1V7C15.7553 7.41 15.4153 7.75 15.0053 7.75H12.5453L9.95533 14.28C9.84533 14.57 9.56533 14.75 9.25533 14.75ZM4.11533 1.75C3.62533 1.75 3.19533 2.05 3.06533 2.48L1.79533 6.81C1.68533 7.19 1.84533 7.48 1.94533 7.61C2.15533 7.88 2.47533 8.04 2.84533 8.04H7.42533C7.83533 8.04 8.17533 8.38 8.17533 8.79L8.17533 13.12C8.17533 13.17 8.24533 13.24 8.34533 13.24H8.75533L11.2653 6.91V1.75L4.11533 1.75ZM12.7553 6.25H14.2553V1.75L12.7553 1.75V6.25Z" />
                              </svg>
                            </span>

                            <span className=" cursor-pointer">No</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="max-width-container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="relative">
            <textarea
              aria-label="comment"
              className="w-8/12 border-[1px] block relative border-solid border-[#dadbdd]"
              id="w3review"
              name="w3review"
              rows={4}
              // cols={50}
              defaultValue=""
              {...register("noiDung", {
                required: "Không được bỏ trống",
              })}
            />
            {errors?.noiDung?.message && (
              <p className="text-red-400 absolute -bottom-6 m-0">
                {errors?.noiDung?.message}
              </p>
            )}
          </div>
          <button className="bg-blue-500 text-white px-4 py-2 mt-6">
            Add Comment
          </button>
        </form>
      </div>
    </div>
  );
};

export default WorkDetail;
