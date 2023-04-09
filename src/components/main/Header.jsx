import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  NavLink,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import {
  layMenuLoaiCongViec,
  useQuanLyCongViec,
} from "../../store/quanLyCongViec";
import Avatar from "react-avatar";
import "./header.css";
import {
  BellOutlined,
  ContactsTwoTone,
  MailOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { logOut } from "../../store/auth/authReducer";

const Header = (props) => {
  const [togglePopover, setTogglePopover] = useState(false);
  const [isScroll, setIsScroll] = useState();
  // Get work's catagory by useParams

  useEffect(() => {
    const handleScroll = () => {
      let newScroll = 0;
      if (window.scrollY < 70) {
        newScroll = 0;
      } else if (window.scrollY < 170) {
        newScroll = 1;
      } else newScroll = 2;
      if (isScroll !== newScroll) {
        setIsScroll(newScroll);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const { menuLoaiCongViec } = useQuanLyCongViec();

  const [searchParams, setSearchParam] = useSearchParams();

  const search = searchParams.get("search");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();
  const { userLogIn } = useSelector((state) => state.authReducer);
  const userLogOut = () => {
    dispatch(logOut());
    navigate("/");
  };

  useEffect(() => {
    dispatch(layMenuLoaiCongViec());
  }, []);

  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === "/home") {
      reset({ searchText: "" });
    } else {
      reset({ searchText: search });
    }
    window.scrollTo(0, 0);
  }, [pathname, search]);

  return (
    <div className="main_header relative">
      <nav
        className={` ${
          pathname !== "/home" && pathname.slice(1).length !== 0
            ? "bg-white border-b-[1px] border-solid border-[#e4e5e7] text-black"
            : `fixed top-0 w-full z-[2] transition-all duration-300 ease-in-out ${
                isScroll === 1 || isScroll === 2
                  ? "bg-white border-b-[1px] border-solid border-[#e4e5e7] text-black"
                  : "text-white"
              }`
        } `}
      >
        <div>
          <div className="max-width-container flex justify-between h-20 items-center">
            <div className="flex justify-between items-center ">
              <button
                className={`button-toggle hidden border border-solid rounded px-3 py-1 mr-3 ${
                  pathname !== "/home" && pathname.slice(1).length !== 0
                    ? "border-gray-600 text-gray-600"
                    : isScroll === 1 || isScroll === 2
                    ? "border-gray-600 text-gray-600"
                    : "text-white border-white"
                }  `}
                id="navbar-toggle"
              >
                <i className="fas fa-bars" />
              </button>
              <NavLink to="/home" className="font-bold text-4xl text-inherit">
                fiverr<span className="text-green-400">.</span>
              </NavLink>
            </div>
            <div
              className={`header-searchform w-[40%] transition-all duration-300 ease-in-out ${
                pathname !== "/home" && pathname.slice(1).length !== 0
                  ? "opacity-100 block"
                  : `${
                      isScroll === 2 ? "opacity-100 block" : "opacity-0 hidden"
                    }`
              }  `}
            >
              <form
                onSubmit={handleSubmit((data) => {
                  console.log({ data });
                  if (data.searchText === "" || data.searchText === null) {
                    return;
                  }
                  navigate(`/worklist?search=${data.searchText}`);
                })}
                className="search-form relative flex border-2"
              >
                <input
                  className="rounded-l  pl-[16px] mb-0 border-[#dadbdd] flex flex-auto"
                  type="text"
                  autoComplete="off"
                  placeholder="What service are you looking for today?"
                  {...register("searchText")}
                />

                <button className="m-0 rounded-r block text-[16px] h-[42px] font-bold px-6  submit-button text-white bg-black">
                  <span
                    className="fill-white"
                    aria-hidden="true"
                    style={{ width: 16, height: 16 }}
                  >
                    <svg
                      width={16}
                      height={16}
                      viewBox="0 0 16 16"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M15.8906 14.6531L12.0969 10.8594C12.025 10.7875 11.9313 10.75 11.8313 10.75H11.4187C12.4031 9.60938 13 8.125 13 6.5C13 2.90937 10.0906 0 6.5 0C2.90937 0 0 2.90937 0 6.5C0 10.0906 2.90937 13 6.5 13C8.125 13 9.60938 12.4031 10.75 11.4187V11.8313C10.75 11.9313 10.7906 12.025 10.8594 12.0969L14.6531 15.8906C14.8 16.0375 15.0375 16.0375 15.1844 15.8906L15.8906 15.1844C16.0375 15.0375 16.0375 14.8 15.8906 14.6531ZM6.5 11.5C3.7375 11.5 1.5 9.2625 1.5 6.5C1.5 3.7375 3.7375 1.5 6.5 1.5C9.2625 1.5 11.5 3.7375 11.5 6.5C11.5 9.2625 9.2625 11.5 6.5 11.5Z" />
                    </svg>
                  </span>
                </button>
              </form>
            </div>
            <div
              className="font-bold flex flex-row  mt-3 md:mt-0"
              id="navbar-collapse"
            >
              {localStorage.getItem("USER_LOGIN") ? (
                <div
                  className={`flex items-center transition-colors duration-300 ${
                    pathname !== "/home" && pathname.slice(1).length !== 0
                      ? "text-zinc-500"
                      : ` ${
                          isScroll === 0 || isScroll === undefined
                            ? "text-white"
                            : "text-zinc-500"
                        }`
                  }   `}
                >
                  <div className="mr-5 mb-2 font-semibold  text-lg cursor-pointer">
                    <BellOutlined />
                  </div>
                  <div className="mr-5 mb-2 font-semibold  text-lg cursor-pointer">
                    <MailOutlined />
                  </div>
                  <div className="mr-5 mb-2 font-semibold  text-lg cursor-pointer">
                    <StarOutlined />
                  </div>
                  <div className="mr-3 font-semibold  text-lg cursor-pointer">
                    Orders
                  </div>
                  <div
                    className="relative"
                    onClick={() => {
                      setTogglePopover(!togglePopover);
                    }}
                  >
                    <Avatar
                      className="cursor-pointer"
                      size="40"
                      name={userLogIn?.user?.name}
                      src={userLogIn?.user?.avatar}
                      round
                    />
                  </div>
                  {togglePopover ? (
                    <div className="nav-popover-avatar py-3 px-5 h-[150px] bg-white border rounded-md absolute right-[1.5rem] z-10 top-[78px] flex flex-wrap">
                      <div className="absolute top-[-15px] right-[16px]">
                        <ContactsTwoTone className="text-xl" />
                      </div>
                      <NavLink
                        to={`/profile/${userLogIn?.user?.id}`}
                        className="text-md text-zinc-400 font-medium w-full border-b"
                      >
                        Profile
                      </NavLink>
                      {userLogIn?.user?.role === "ADMIN" ? (
                        <NavLink
                          to="/admin"
                          className="text-md text-zinc-400 font-medium w-full border-b mt-2"
                        >
                          Admin
                        </NavLink>
                      ) : (
                        <div></div>
                      )}
                      <div
                        className="text-md text-zinc-400 font-medium w-full cursor-pointer hover:text-[#40a9ff] mt-2"
                        onClick={userLogOut}
                      >
                        Logout
                      </div>
                    </div>
                  ) : null}
                </div>
              ) : (
                <div className="font-bold flex flex-row  mt-3 md:mt-0">
                  <NavLink
                    href="#"
                    className="header-nav px-4 mx-2 text-inherit"
                  >
                    Become a Seller
                  </NavLink>
                  <NavLink
                    to="/signin"
                    className="button-toggle px-4 mx-2 text-center border border-transparent text-inherit"
                  >
                    Sign In
                  </NavLink>
                  <NavLink
                    to="/signup"
                    className={`button-toggle px-4 mx-2 text-center border border-solid rounded transition-colors duration-300 ${
                      pathname !== "/home" && pathname.slice(1).length !== 0
                        ? "border-green-400 text-green-400 hover:bg-green-600 hover:text-white"
                        : ` ${
                            isScroll === 1 || isScroll === 2
                              ? "border-green-400 text-green-400"
                              : "border-white text-inherit"
                          }`
                    }   `}
                  >
                    Join
                  </NavLink>
                </div>
              )}
            </div>
          </div>
        </div>

        <div
          className={`border-t-[1px] border-solid border-[#e4e5e7] ${
            pathname !== "/home" && pathname.slice(1).length !== 0
              ? "opacity-100 block"
              : `${isScroll === 2 ? "opacity-100 block" : "opacity-0 hidden"}`
          } `}
        >
          <div
            className={
              "max-width-container menu transition-all duration-500 ease-in-out"
            }
          >
            <nav className="categories flex justify-between flex-wrap">
              {menuLoaiCongViec.map((loaiCV) => (
                <div
                  key={loaiCV.id}
                  className="group/dropdown dropdown inline-block relative "
                >
                  <NavLink
                    to={`/workcategory/${loaiCV.id}`}
                    className="menu-item py-2 text-base text-[#62646a] inline-flex items-center whitespace-nowrap pr-[10px]"
                  >
                    <span className="mr-1">{loaiCV.tenLoaiCongViec}</span>
                  </NavLink>
                  <ul className="dropdown-menu absolute hidden group-hover/dropdown:block text-gray-700 bg-white shadow z-[1]">
                    {loaiCV.dsNhomChiTietLoai.map((nhomChiTietLoai) => (
                      <li key={nhomChiTietLoai.id}>
                        <span
                          className="font-bold rounded-sm text-base text-[#62646a]  hover:bg-gray-400 py-2 px-4 block whitespace-nowrap"
                          href="#"
                        >
                          {nhomChiTietLoai.tenNhom}
                        </span>
                        <ul>
                          {nhomChiTietLoai.dsChiTietLoai.map((chiTiet) => (
                            <li key={chiTiet.id}>
                              <div>
                                <NavLink
                                  to={`/worklist/${chiTiet.id}`}
                                  className="text-base cursor-pointer text-[#62646a]  hover:bg-gray-400 hover:text-inherit py-2 px-4 block whitespace-nowrap"
                                >
                                  {chiTiet.tenChiTiet}
                                </NavLink>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
