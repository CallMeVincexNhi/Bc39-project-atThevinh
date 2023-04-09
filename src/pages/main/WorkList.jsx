import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, NavLink, useParams, useSearchParams } from "react-router-dom";
import {
  layCongViecTheoChiTietLoai,
  layDsCongViecTheoTen,
  useQuanLyCongViec,
} from "../../store/quanLyCongViec";
import "./worklist.css";

const WorkList = () => {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");

  const query = searchParams.get("query");
  const params = useParams();

  const dispatch = useDispatch();
  const { dsCongViecTheoTen } = useQuanLyCongViec();

  useEffect(() => {
    if (search !== null) {
      dispatch(layDsCongViecTheoTen(search));
    }
    if (params.idcv) {
      dispatch(layCongViecTheoChiTietLoai(params.idcv));
    }
  }, [search, params.idcv]);
  return (
    <div className="worklist">
      <div className="worklist-content border-b-[1px] border-solid border-[#dadbdd]">
        <header className="related-search bg-[#f5f5f5]">
          <nav className="max-width-container flex flex-nowrap items-center overflow-hidden h-14">
            <b className="text-[15px] mr-2">Suggested</b>
            <div className="search-tags">
              <Link
                to="/worklist?search=html css"
                className="bg-white text-[13px] font-medium inline-block text-[#62646a] border-[1px] border-solid border-[#dadbdd] px-[10px] my-[15px] mr-[10px] rounded-[3px] hover:bg-[#efeff0] hover:text-[#62646a] hover:border-[#95979d]"
              >
                html css
              </Link>
              <Link
                to="/worklist?search=html website"
                className="bg-white text-[13px] font-medium inline-block text-[#62646a] border-[1px] border-solid border-[#dadbdd] px-[10px] my-[15px] mr-[10px] rounded-[3px] hover:bg-[#efeff0] hover:text-[#62646a] hover:border-[#95979d]"
              >
                html website
              </Link>
              <Link
                to="/worklist?search=psd to html"
                className="bg-white text-[13px] font-medium inline-block text-[#62646a] border-[1px] border-solid border-[#dadbdd] px-[10px] my-[15px] mr-[10px] rounded-[3px] hover:bg-[#efeff0] hover:text-[#62646a] hover:border-[#95979d]"
              >
                psd to html
              </Link>
              <Link
                to="/worklist?search=html email"
                className="bg-white text-[13px] font-medium inline-block text-[#62646a] border-[1px] border-solid border-[#dadbdd] px-[10px] my-[15px] mr-[10px] rounded-[3px] hover:bg-[#efeff0] hover:text-[#62646a] hover:border-[#95979d]"
              >
                html email
              </Link>
              <Link
                to="/worklist?search=css"
                className="bg-white text-[13px] font-medium inline-block text-[#62646a] border-[1px] border-solid border-[#dadbdd] px-[10px] my-[15px] mr-[10px] rounded-[3px] hover:bg-[#efeff0] hover:text-[#62646a] hover:border-[#95979d]"
              >
                css
              </Link>
              <Link
                to="/worklist?search=javascript"
                className="bg-white text-[13px] font-medium inline-block text-[#62646a] border-[1px] border-solid border-[#dadbdd] px-[10px] my-[15px] mr-[10px] rounded-[3px] hover:bg-[#efeff0] hover:text-[#62646a] hover:border-[#95979d]"
              >
                javascript
              </Link>
              <Link
                to="/worklist?search=figma to html"
                className="bg-white text-[13px] font-medium inline-block text-[#62646a] border-[1px] border-solid border-[#dadbdd] px-[10px] my-[15px] mr-[10px] rounded-[3px] hover:bg-[#efeff0] hover:text-[#62646a] hover:border-[#95979d]"
              >
                figma to html
              </Link>
            </div>
          </nav>
        </header>
        <div className="max-width-container pt-8 pb-3">
          <span className="text-black text-[32px] leading-[150%] font-bold">
            {search !== null
              ? `Results for "${search}"`
              : query !== null
              ? `Results for "${query}"`
              : ""}
          </span>
        </div>
        <div className="max-width-container worklist-menu overflow-hidden flex flex-wrap justify-between text-[18px] font-[600px] text-[#222325] bg-white sticky top-0">
          <div className="worklist-dropdown flex flex-nowrap mt-4">
            <button className="mr-[6px] border-[1px] border-solid border-[#dadbdd] rounded-[4px] px-3 py-[6px] whitespace-nowrap">
              Category
              <span
                className="XQskgrQ chevron-icon-down"
                aria-hidden="true"
                style={{ width: 10, height: 10 }}
              >
                <svg
                  className="inline ml-2"
                  width={11}
                  height={7}
                  viewBox="0 0 11 7"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M5.4636 6.38899L0.839326 1.769C0.692474 1.62109 0.692474 1.38191 0.839326 1.23399L1.45798 0.61086C1.60483 0.462945 1.84229 0.462945 1.98915 0.61086L5.72919 4.34021L9.46923 0.61086C9.61608 0.462945 9.85354 0.462945 10.0004 0.61086L10.619 1.23399C10.7659 1.38191 10.7659 1.62109 10.619 1.769L5.99477 6.38899C5.84792 6.5369 5.61046 6.5369 5.4636 6.38899Z" />
                </svg>
              </span>
            </button>
            <button className="mx-[6px] border-[1px] border-solid border-[#dadbdd] rounded-[4px] px-3 py-[6px] whitespace-nowrap">
              Service Options
              <span
                className="XQskgrQ chevron-icon-down"
                aria-hidden="true"
                style={{ width: 10, height: 10 }}
              >
                <svg
                  className="inline ml-2"
                  width={11}
                  height={7}
                  viewBox="0 0 11 7"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M5.4636 6.38899L0.839326 1.769C0.692474 1.62109 0.692474 1.38191 0.839326 1.23399L1.45798 0.61086C1.60483 0.462945 1.84229 0.462945 1.98915 0.61086L5.72919 4.34021L9.46923 0.61086C9.61608 0.462945 9.85354 0.462945 10.0004 0.61086L10.619 1.23399C10.7659 1.38191 10.7659 1.62109 10.619 1.769L5.99477 6.38899C5.84792 6.5369 5.61046 6.5369 5.4636 6.38899Z" />
                </svg>
              </span>
            </button>
            <button className="mx-[6px] border-[1px] border-solid border-[#dadbdd] rounded-[4px] px-3 py-[6px] whitespace-nowrap">
              Seller Details
              <span
                className="XQskgrQ chevron-icon-down"
                aria-hidden="true"
                style={{ width: 10, height: 10 }}
              >
                <svg
                  className="inline ml-2"
                  width={11}
                  height={7}
                  viewBox="0 0 11 7"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M5.4636 6.38899L0.839326 1.769C0.692474 1.62109 0.692474 1.38191 0.839326 1.23399L1.45798 0.61086C1.60483 0.462945 1.84229 0.462945 1.98915 0.61086L5.72919 4.34021L9.46923 0.61086C9.61608 0.462945 9.85354 0.462945 10.0004 0.61086L10.619 1.23399C10.7659 1.38191 10.7659 1.62109 10.619 1.769L5.99477 6.38899C5.84792 6.5369 5.61046 6.5369 5.4636 6.38899Z" />
                </svg>
              </span>
            </button>
            <button className="mx-[6px] border-[1px] border-solid border-[#dadbdd] rounded-[4px] px-3 py-[6px] whitespace-nowrap">
              Budget
              <span
                className="XQskgrQ chevron-icon-down"
                aria-hidden="true"
                style={{ width: 10, height: 10 }}
              >
                <svg
                  className="inline ml-2"
                  width={11}
                  height={7}
                  viewBox="0 0 11 7"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M5.4636 6.38899L0.839326 1.769C0.692474 1.62109 0.692474 1.38191 0.839326 1.23399L1.45798 0.61086C1.60483 0.462945 1.84229 0.462945 1.98915 0.61086L5.72919 4.34021L9.46923 0.61086C9.61608 0.462945 9.85354 0.462945 10.0004 0.61086L10.619 1.23399C10.7659 1.38191 10.7659 1.62109 10.619 1.769L5.99477 6.38899C5.84792 6.5369 5.61046 6.5369 5.4636 6.38899Z" />
                </svg>
              </span>
            </button>
            <button className="mx-[6px] border-[1px] border-solid border-[#dadbdd] rounded-[4px] px-3 py-[6px] whitespace-nowrap">
              Delivery Time
              <span
                className="XQskgrQ chevron-icon-down"
                aria-hidden="true"
                style={{ width: 10, height: 10 }}
              >
                <svg
                  className="inline ml-2"
                  width={11}
                  height={7}
                  viewBox="0 0 11 7"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M5.4636 6.38899L0.839326 1.769C0.692474 1.62109 0.692474 1.38191 0.839326 1.23399L1.45798 0.61086C1.60483 0.462945 1.84229 0.462945 1.98915 0.61086L5.72919 4.34021L9.46923 0.61086C9.61608 0.462945 9.85354 0.462945 10.0004 0.61086L10.619 1.23399C10.7659 1.38191 10.7659 1.62109 10.619 1.769L5.99477 6.38899C5.84792 6.5369 5.61046 6.5369 5.4636 6.38899Z" />
                </svg>
              </span>
            </button>
          </div>
          <div className="worklist-toggle-wraper mt-4 flex justify-between items-center">
            <div className="worklist-toggle flex justify-between items-center mr-8">
              <label className="switch mr-4">
                <input type="checkbox" />
                <span className="slider round" />
              </label>
              Local sellers
            </div>
            <div className="worklist-toggle flex justify-between items-center mr-8">
              <label className="switch mr-4">
                <input type="checkbox" />
                <span className="slider round" />
              </label>
              Online sellers
            </div>
            <div className="worklist-toggle flex justify-between items-center">
              <label className="switch mr-4">
                <input type="checkbox" />
                <span className="slider round" />
              </label>
              Pro Services
            </div>
          </div>
        </div>
        <div className="worklist-container max-width-container">
          <h3 className="text-2xl">
            {dsCongViecTheoTen.length} services available
          </h3>
          <div className="worklist-container-item grid gap-9 grid-cols-4 my-3 pt-[42px] px-8 pb-4 bg-[#f5f5f5]">
            {dsCongViecTheoTen.length === 0 ? (
              <div className="text-center col-span-4">
                <div className="w-1/3 mx-auto">
                  <img
                    className="block mx-auto"
                    // height={100}
                    width={"100%"}
                    src="./images/empty-search-results.png"
                    alt="empty"
                  />
                </div>
                <h2 className="text-3xl">No Services Found For Your Search</h2>
                <p className="text-2xl">
                  Try a new search or get a free quote for your project from our
                  community of freelancers.
                </p>
              </div>
            ) : (
              dsCongViecTheoTen.map((dsCV) => (
                <div key={dsCV.id}>
                  <div className="card bg-white">
                    <NavLink
                      to={`/workdetail/${dsCV.tenLoaiCongViec}/${dsCV.id}`}
                    >
                      <img
                        src={dsCV.congViec.hinhAnh}
                        alt={dsCV.congViec.hinhAnh}
                        style={{ width: "100%" }}
                      />
                    </NavLink>
                    <div className="seller-info text-[14px] leading-[21px]">
                      <div className="seller-info-content w-full h-[54px] px-3 pt-3 pb-2 flex items-center">
                        <div className="w-6 h-6">
                          <img
                            className="rounded-full"
                            src={dsCV.avatar}
                            alt={dsCV.avatar}
                          />
                        </div>
                        <div className="ml-2">
                          <p className="font-bold mb-0">{dsCV.tenNguoiTao}</p>
                          <p className="mb-0">Level 2 Seller</p>
                        </div>
                      </div>
                    </div>
                    <h3 className="text-base leading-[130%]">
                      <NavLink
                        to={`/workdetail/${dsCV.tenLoaiCongViec}/${dsCV.id}`}
                        className="inline-block text-[#222325] leading-[22px] h-[43px] px-3 pb-[5px] mt-[5px] text-left hover:text-inherit"
                      >
                        {dsCV.congViec.tenCongViec}
                      </NavLink>
                    </h3>
                    <div className="seller-rate py-[10px] px-3">
                      <span className="flex items-center">
                        <svg
                          className="text-yellow-400 mr-2"
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
                        {dsCV.congViec.saoCongViec.toFixed(1)}
                        <span className="ml-[3px]">
                          ({dsCV.congViec.danhGia})
                        </span>
                      </span>
                    </div>
                    <footer className="border-t-[1px] border-solid border-[#efeff0] px-3 py-[10px]">
                      <div className="price-wraper flex justify-between items-center">
                        <div>
                          <span>
                            <button
                              position="top"
                              boxclassname="_8UHHk5Q"
                              boxcontentclassname="Yn90o2E"
                              containerclassname="collect-package-tooltip"
                            >
                              <span
                                className="XQskgrQ heart-icon"
                                aria-hidden="true"
                                style={{ width: 16, height: 16 }}
                              >
                                <svg
                                  width={16}
                                  height={16}
                                  viewBox="0 0 16 16"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M14.4469 1.95625C12.7344 0.496875 10.1875 0.759375 8.61561 2.38125L7.99999 3.01562L7.38436 2.38125C5.81561 0.759375 3.26561 0.496875 1.55311 1.95625C-0.409388 3.63125 -0.512513 6.6375 1.24374 8.45312L7.29061 14.6969C7.68124 15.1 8.31561 15.1 8.70624 14.6969L14.7531 8.45312C16.5125 6.6375 16.4094 3.63125 14.4469 1.95625Z" />
                                </svg>
                              </span>
                            </button>
                          </span>
                        </div>
                        <div>
                          <NavLink
                            to={`/workdetail/${dsCV.tenLoaiCongViec}/${dsCV.id}`}
                            className="text-[#404145] hover:text-inherit"
                          >
                            <span className="mr-3">STARTING AT</span>
                            <span className="text-[18px] leading-[20px]">
                              $ {dsCV.congViec.giaTien}
                            </span>
                          </NavLink>
                        </div>
                      </div>
                    </footer>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkList;
