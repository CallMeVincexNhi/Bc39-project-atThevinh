import React, { useEffect, useState, useRef } from "react";
import Avatar from "react-avatar";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { logOut } from "../../store/auth/authReducer";
import { ContactsTwoTone } from "@ant-design/icons";
import "./admin.css";
import { getUserPageSearch } from "../../store/nguoiDung/nguoiDungReducer";
import { Menu, Layout } from "antd";

const { Content, Footer, Sider, Header } = Layout;

function getItem(label, key, children) {
  return {
    key,
    children,
    label,
  };
}

const item = [
  getItem(<NavLink to="/admin/user">Quản lý người dùng</NavLink>, "1"),
  getItem(<NavLink to="/admin/work">Quản lý công việc</NavLink>, "2"),
  getItem(
    <NavLink to="/admin/worktype">Quản lý loại công việc</NavLink>,
    "sub1",
    [
      getItem(
        <NavLink to="/admin/worktype/detailworktype">
          Chi tiết loại công việc
        </NavLink>,
        "3"
      ),
    ]
  ),
  getItem("Quản lý dịch vụ", "sub2", [
    getItem(
      <NavLink to="/admin/services/hirework">Quản lý thuê công việc</NavLink>,
      "4"
    ),
    getItem(<NavLink to="/admin/services/comments">Quản lý bình luận</NavLink>),
    "5",
  ]),
];

const Admin = () => {
  const [togglePopover, setTogglePopover] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const { userLogIn } = useSelector((state) => state.authReducer);
  console.log("userLogIn: ", userLogIn);
  const { listUserPageSearch } = useSelector((state) => state.nguoiDungReducer);
  console.log("listUserPageSearch: ", listUserPageSearch);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogOut = () => {
    dispatch(logOut());
    navigate("/");
  };

  useEffect(() => {
    dispatch(getUserPageSearch());
  }, []);

  // Table
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  return (
    <div className="w-full h-full">
     
        <div className="w-full">
          <Layout>
            <Sider
              collapsed={collapsed}
              onCollapse={(value) => setCollapsed(value)}
              breakpoint="lg"
              collapsedWidth="0"
              onBreakpoint={(broken) => {
                console.log(broken);
              }}
            >
              <div className="flex justify-center my-3">
                <Link to="/">
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
                </Link>
              </div>

              <Menu theme="dark" mode="inline" items={item} />
            </Sider>
            <Layout>
              <Content style={{ margin: "24px 16px 0" }}>
                <div className="mr-5 mb-3">
                  <div className="flex justify-end">
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
                      {togglePopover ? (
                        <div className="nav-popover-avatar py-3 px-5 h-[150px] bg-white border rounded-md absolute right-[-7px] z-10 top-[50px] flex flex-wrap">
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
                  </div>
                </div>
                {/* Table */}
                <div>
                  <Outlet />
                </div>
              </Content>
              <Footer
                className="h-[310px]"
                style={{ textAlign: "center" }}
              ></Footer>
            </Layout>
          </Layout>
        </div>
    </div>
  );
};

export default Admin;
