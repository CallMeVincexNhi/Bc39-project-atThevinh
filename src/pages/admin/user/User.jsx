import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DeleteTwoTone, EditTwoTone, SearchOutlined } from "@ant-design/icons";
import {
  deleteUser,
  getUserPageSearch,
  putChangeUserToAdmin,
} from "../../../store/nguoiDung/nguoiDungReducer";
import { Table, Button, Input, Space, Layout } from "antd";
import Highlighter from "react-highlight-words";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import Popup from "reactjs-popup";
import { useForm } from "react-hook-form";

const User = () => {
  const { Content, Footer, Sider } = Layout;
  const { userLogIn } = useSelector((state) => state.authReducer);
  console.log("userLogIn: ", userLogIn);
  const { listUserPageSearch } = useSelector((state) => state.nguoiDungReducer);
  console.log("listUserPageSearch: ", listUserPageSearch);
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    dispatch(getUserPageSearch());
  }, []);

  const data = [];
  listUserPageSearch?.data?.map((item, i) => {
    data.push({
      id: item?.id,
      name: item?.name,
      birthday: item?.birthday,
      email: item?.email,
      phone: item?.phone,
      role: item?.role,
    });
  });
  console.log(data);

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
  const Modal = (i) => (
    <Popup
      trigger={
        <div className="button">
          <EditTwoTone></EditTwoTone>
        </div>
      }
      modal
    >
      {(close) => (
        <div className="modal-user border bg-white rounded-xl w-[450px] h-full flex flex-wrap justify-center  px-10 pb-10 pt-5 shadow-lg shadow-cyan-500/50">
          <div className="w-full flex justify-end">
            <span
              className="border rounded-lg py-2 px-4 bg-green-500 text-white font-bold text-lg cursor-pointer"
              onClick={close}
            >
              X
            </span>
          </div>
          <div className="w-full text-xl  text-center font-bold mb-1 text-red-600">
            Page Role
          </div>
          <form
            onSubmit={handleSubmit((data) => {
              console.log("data: ", data);
              dispatch(
                putChangeUserToAdmin({
                  id: i.id,
                  name: i.name,
                  email: i.email,
                  phone: i.phone,
                  birthday: i.birthday,
                  role: data.role,
                })
              );
            })}
          >
            <div className="w-full flex text-center border-b">
              <div className="w-full flex text-lg font-medium mr-1">
                ID:
                <div>{i.id}</div>
              </div>
            </div>
            <div className="w-full mt-2">
              <div className="text-lg font-medium">Name:</div>
              <div className="mb-0 text-lg font-semibold text-green-500">
                <div>{i.name}</div>
              </div>
            </div>
            <div className="w-full mt-2">
              <div className="text-lg font-medium mr-1">Email:</div>
              <div className="mb-0 text-lg font-semibold text-green-500">
                <div>{i.email}</div>
              </div>
            </div>
            <div className="w-full mt-2">
              <div className="text-lg font-medium mr-1">Phone:</div>
              <div className="mb-0 text-lg font-semibold text-green-500">
                <div>{i.phone}</div>
              </div>
            </div>
            <div className="w-full mt-2">
              <div className="text-lg font-medium mr-1">Birthday:</div>
              <div className="mb-0 text-lg font-semibold text-green-500">
                <div>{i.birthday}</div>
              </div>
            </div>
            <div className="w-full my-3">
              <div className="text-lg font-semibold mr-1 text-red-500">
                Assign a new page role
              </div>
              {i.role === "USER" ? (
                <div className="flex flex-wrap w-full">
                  <div className="text-lg flex font-semibold mb-2">
                    Role:
                    <div className="text-cyan-500 font-bold ml-1 mr-2">
                      <span>{i.role}</span>
                    </div>
                  </div>
                  <select
                    className="ml-2 text-red-500 font-bold text-lg border rounded-md mb-3"
                    {...register("role")}
                  >
                    <option
                      className="text-lg font-bold text-red-500"
                      value="ADMIN"
                    >
                      ADMIN
                    </option>
                    <option
                      className="text-lg font-bold text-red-500"
                      value="USER"
                    >
                      USER
                    </option>
                  </select>
                  <div className="w-full mt-4 text-center">
                    <button
                      className=" border rounded-md bg-green-500 text-white px-4 py-2 text-lg cursor-pointer"
                      type="submit"
                    >
                      Change
                    </button>
                  </div>
                </div>
              ) : (
                <div className="w-full font-semibold text-lg text-red-500">
                  User is currently an Admin
                </div>
              )}
            </div>
          </form>
        </div>
      )}
    </Popup>
  );
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: "5%",
      ...getColumnSearchProps("id"),
      sorter: (a, b) => a.id - b.id,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "20%",
      ...getColumnSearchProps("name"),
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Birthday",
      dataIndex: "birthday",
      key: "birthday",
      width: "15%",
      responsive: ["xl"],
      ...getColumnSearchProps("birthday"),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      with: "25%",
      responsive: ["md"],
      ...getColumnSearchProps("email"),
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      width: "15%",
      responsive: ["lg"],
      ...getColumnSearchProps("phone"),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      width: "10%",
      ...getColumnSearchProps("role"),
    },
    {
      title: "Edit",
      with: "10%",
      dataIndex: "edit",
      key: "edit",
      responsive: ["md"],
      render: (_, record) => (
        <Space size="middle">
          {console.log("record: ", record)}
          <a>
            <button>{Modal(record)}</button>
          </a>
          <a>
            <DeleteTwoTone
              twoToneColor="#ee1d40"
              onClick={() => {
                Swal.fire({
                  title: "Are you sure?",
                  text: "You won't be able to revert this!",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Yes, delete it!",
                }).then((result) => {
                  if (result.isConfirmed) {
                    dispatch(deleteUser(record?.id));
                  }
                });
              }}
            ></DeleteTwoTone>
          </a>
        </Space>
      ),
    },
  ];
  return (
    <div className="container overflow-hidden pt-5">
      <div className="mb-5 text-center max-[767.95px]:hidden">
        <Link
          to="/admin/user/addadmin"
          className="border rounded-md text-white bg-green-500 px-4 py-3"
        >
          Add New Admin
        </Link>
      </div>
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  );
};

export default User;
