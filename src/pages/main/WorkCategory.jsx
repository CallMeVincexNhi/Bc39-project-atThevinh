import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import {
  layCongViecTheoChiTietLoai,
  layDsChiTietLoaiCongViec,
  useQuanLyCongViec,
} from "../../store/quanLyCongViec";
import dataimg from "./data-img.json";
import "./workcategory.css";

const WorkCategory = () => {
  const params = useParams();

  const { dsChiTietLoaiCongViec } = useQuanLyCongViec();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(layDsChiTietLoaiCongViec(params.id));
  }, [params]);

  return (
    <div className="workcategory">
      <div className="workcategory-content max-width-container py-8">
        <div
          className="workcategory-banner h-[272px] w-full bg-no-repeat bg-cover rounded-md text-white text-center p-[50px]"
          style={{
            backgroundColor: "green",
            backgroundImage: `url(${dataimg[params.id - 1]?.hinhAnh})`,
          }}
        >
          <h1 className="text-[32px] text-white mb-0">
            {dsChiTietLoaiCongViec[0]?.tenLoaiCongViec}
          </h1>
          <p className="mt-2 text-[20px]">Make you stand out.</p>
          <div className="text-center">
            <button className="text-[16px] border-[1px] border-solid border-white inline-flex items-center leading-[24px] text-white px-4 py-[10px] rounded-lg">
              <span
                className="rounded-full mr-2"
                aria-hidden="true"
                style={{ width: 16, height: 16 }}
              >
                <svg
                  //   style={{ color: "white" }}
                  width={17}
                  height={17}
                  viewBox="0 0 16 16"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="white"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8 0a8 8 0 1 0 8 8 8.009 8.009 0 0 0-8-8ZM5.742 11.778 11.655 8.3a.348.348 0 0 0 0-.6L5.742 4.222a.348.348 0 0 0-.525.3v6.956a.348.348 0 0 0 .525.3Z"
                  />
                </svg>
              </span>
              How Fiverr Works
            </button>
          </div>
        </div>
        <div className="mt-12">
          <h2 className="text-[24px] leading-[130%] font-bold">
            Most popular in {dsChiTietLoaiCongViec[0]?.tenLoaiCongViec}
          </h2>
          <div className="slides-list flex gap-2 p-2">
            <div className="slide">
              <a
                href="#"
                className="most-popular-slide flex items-center p-3 rounded-[12px] border-[1px] border-solid border-[#efeff0] shadow-md text-[#404145]"
              >
                <img
                  className="w-12 h-12 mr-3"
                  src="https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/97477f04af40de3aa1f8d6aa21f69725-1626179101614/Logo%20design_2x.png"
                  alt="Minimalist Logo Design"
                />
                <span className="font-semibold text-base mr-3">
                  Minimalist Logo Design
                </span>
                <span
                  className="XQskgrQ arrow m-l-12"
                  aria-hidden="true"
                  style={{ width: 16, height: 16 }}
                >
                  <svg
                    width={16}
                    height={16}
                    viewBox="0 0 16 16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9.92332 2.96885C9.63854 2.66807 9.1768 2.66807 8.89202 2.96885C8.60723 3.26963 8.60723 3.75729 8.89202 4.05807L11.6958 7.01931H1.48616C1.08341 7.01931 0.756918 7.36413 0.756918 7.7895C0.756918 8.21487 1.08341 8.5597 1.48616 8.5597H11.8436L8.89202 11.677C8.60723 11.9778 8.60723 12.4654 8.89202 12.7662C9.1768 13.067 9.63854 13.067 9.92332 12.7662L14.0459 8.41213C14.3307 8.11135 14.3307 7.62369 14.0459 7.32291L13.977 7.25011C13.9737 7.24661 13.9704 7.24315 13.9671 7.23972L9.92332 2.96885Z" />
                  </svg>
                </span>
              </a>
            </div>
            <div className="slide">
              <a
                href="#"
                className="most-popular-slide flex items-center p-3 rounded-[12px] border-[1px] border-solid border-[#efeff0] shadow-md text-[#404145]"
              >
                <img
                  className="w-12 h-12 mr-3"
                  src="https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/97477f04af40de3aa1f8d6aa21f69725-1626179101618/Architecture%20_%20Interior%20Design_2x.png"
                  alt="Architecture & Interior Design"
                />
                <span className="font-semibold text-base mr-3">
                  Architecture & Interior Design
                </span>
                <span
                  className="XQskgrQ arrow m-l-12"
                  aria-hidden="true"
                  style={{ width: 16, height: 16 }}
                >
                  <svg
                    width={16}
                    height={16}
                    viewBox="0 0 16 16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9.92332 2.96885C9.63854 2.66807 9.1768 2.66807 8.89202 2.96885C8.60723 3.26963 8.60723 3.75729 8.89202 4.05807L11.6958 7.01931H1.48616C1.08341 7.01931 0.756918 7.36413 0.756918 7.7895C0.756918 8.21487 1.08341 8.5597 1.48616 8.5597H11.8436L8.89202 11.677C8.60723 11.9778 8.60723 12.4654 8.89202 12.7662C9.1768 13.067 9.63854 13.067 9.92332 12.7662L14.0459 8.41213C14.3307 8.11135 14.3307 7.62369 14.0459 7.32291L13.977 7.25011C13.9737 7.24661 13.9704 7.24315 13.9671 7.23972L9.92332 2.96885Z" />
                  </svg>
                </span>
              </a>
            </div>
            <div className="slide">
              <a
                href="#"
                className="most-popular-slide flex items-center p-3 rounded-[12px] border-[1px] border-solid border-[#efeff0] shadow-md text-[#404145]"
              >
                <img
                  className="w-12 h-12 mr-3"
                  src="https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/97477f04af40de3aa1f8d6aa21f69725-1626179101624/Photoshop%20Editing_2x.png"
                  alt="Image Editing"
                />
                <span className="font-semibold text-base mr-3">
                  Image Editing
                </span>
                <span
                  className="XQskgrQ arrow m-l-12"
                  aria-hidden="true"
                  style={{ width: 16, height: 16 }}
                >
                  <svg
                    width={16}
                    height={16}
                    viewBox="0 0 16 16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9.92332 2.96885C9.63854 2.66807 9.1768 2.66807 8.89202 2.96885C8.60723 3.26963 8.60723 3.75729 8.89202 4.05807L11.6958 7.01931H1.48616C1.08341 7.01931 0.756918 7.36413 0.756918 7.7895C0.756918 8.21487 1.08341 8.5597 1.48616 8.5597H11.8436L8.89202 11.677C8.60723 11.9778 8.60723 12.4654 8.89202 12.7662C9.1768 13.067 9.63854 13.067 9.92332 12.7662L14.0459 8.41213C14.3307 8.11135 14.3307 7.62369 14.0459 7.32291L13.977 7.25011C13.9737 7.24661 13.9704 7.24315 13.9671 7.23972L9.92332 2.96885Z" />
                  </svg>
                </span>
              </a>
            </div>
          </div>
        </div>
        <div className="workcategory-maincontent mt-14 mb-22">
          <h2 className="text-2xl font-bold">
            Explore {dsChiTietLoaiCongViec[0]?.tenLoaiCongViec}
          </h2>
          <div className="div-lamthe flex flex-wrap">
            {dsChiTietLoaiCongViec[0]?.dsNhomChiTietLoai.map((congViec) => (
              <div
                key={congViec.id}
                className="workcategory-item card px-2 w-1/4 py-4"
              >
                <div
                  className="h-[181px] rounded-2xl bg-center bg-cover bg-no-repeat"
                  style={{ backgroundImage: `url(${congViec.hinhAnh})` }}
                ></div>

                <div className="container">
                  <h3 className="mt-6 mb-3 text-xl font-bold">
                    {congViec.tenNhom}
                  </h3>
                  <div className="items-content">
                    {congViec.dsChiTietLoai.map((chitietCV) => (
                      <div
                        key={chitietCV.id}
                        className="item-wrapper py-2 hover:border-[1px] hover:border-solid hover:bg-gray-300"
                      >
                        <NavLink
                          to={`/workcategory?query=${chitietCV.tenChiTiet}`}
                          onClick={() => {
                            try {
                              dispatch(
                                layCongViecTheoChiTietLoai(chitietCV.id)
                              );
                              // navigate("/worklist");
                            } catch (error) {
                              // handle any rejections/errors
                            }
                          }}
                          className="text-lg text-[#62646a] hover:text-inherit"
                          href="#"
                        >
                          {chitietCV.tenChiTiet}
                        </NavLink>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkCategory;
