import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CheckCircleTwoTone,
  DeleteTwoTone,
  EditTwoTone,
  SearchOutlined,
} from "@ant-design/icons";
import { Table, Button, Input, Space } from "antd";
import Highlighter from "react-highlight-words";
import Swal from "sweetalert2";
import {
  checkDoneWork,
  delHiredWork,
  getServicesSearch,
  putHireWork,
} from "../../../../store/thueCongViec/thueCongViec";
import { useForm } from "react-hook-form";
import Popup from "reactjs-popup";
import moment from "moment/moment";
import { Link } from "react-router-dom";

const HireWork = () => {
  const { listServicesSearch } = useSelector(
    (state) => state.thueCongViecReducer
  );
  console.log("listServicesSearch: ", listServicesSearch);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getServicesSearch());
  }, []);

  const checkGender = (data) => {
    if (data.hoanThanh === "true") {
      return (data.hoanThanh = true);
    } else if (data.hoanThanh === "false") {
      return (data.hoanThanh = false);
    }
  };

  const data = [];
  listServicesSearch?.data?.map((item, i) => {
    if (item?.hoanThanh === true) {
      data.push({
        id: item?.id,
        maCongViec: item?.maCongViec,
        maNguoiThue: item?.maNguoiThue,
        ngayThue: moment(item?.ngayThue).format("MMMM Do YYYY, h:mm:ss a"),
        hoanThanh: "true",
      });
    } else {
      data.push({
        id: item?.id,
        maCongViec: item?.maCongViec,
        maNguoiThue: item?.maNguoiThue,
        ngayThue: moment(item?.ngayThue).format("MMMM Do YYYY, h:mm:ss a"),
        hoanThanh: "false",
      });
    }
  });

  //Popup
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
        <div className="modal-user border bg-white rounded-xl w-[600px] h-[500px] overflow-y-scroll flex flex-wrap justify-center  px-10 pb-10 pt-5 shadow-lg shadow-cyan-500/50">
          <div className="w-full flex justify-end">
            <span
              className="border rounded-lg py-2 px-4 bg-green-500 text-white font-bold text-lg cursor-pointer"
              onClick={close}
            >
              X
            </span>
          </div>
          <div className="w-full text-xl text-center font-bold mb-1 text-red-600">
            Page Role
          </div>
          <form
            className="w-full h-full"
            onSubmit={handleSubmit((data) => {
              checkGender(data);
              dispatch(
                putHireWork({
                  id: i?.id,
                  maCongViec: parseInt(data.maCongViec),
                  maNguoiThue: parseInt(data.maNguoiThue),
                  ngayThue: data.ngayThue,
                  hoanThanh: data.hoanThanh,
                })
              );
            })}
          >
            <div className="w-full flex text-center border-b">
              <div className="w-full flex text-lg font-medium mr-1">
                ID:
                <div>{i?.id}</div>
              </div>
            </div>
            <div className="w-full mt-2">
              <div className="text-lg font-medium">ID Job</div>
              <div className="mb-0 w-full text-lg font-semibold text-green-500">
                <input
                  className="w-full border rounded-sm"
                  {...register("maCongViec", {
                    required: "Looks like this Id Job is incomplete.",
                    pattern: {
                      value: /^[0-9\b]+$/,
                      message: "Please input numeric characters only.",
                    },
                  })}
                />
                <p className="text-red-600 m-0">
                  {errors?.maCongViec?.message}
                </p>
              </div>
            </div>
            <div className="w-full mt-2">
              <div className="text-lg font-medium mr-1">ID User</div>
              <div className="mb-0 text-lg w-full font-semibold text-green-500">
                <input
                  className="w-full border rounded-sm"
                  {...register("maNguoiThue", {
                    required: "Looks like this Id User is incomplete.",
                    pattern: {
                      value: /^[0-9\b]+$/,
                      message: "Please input numeric characters only.",
                    },
                  })}
                />
                <p className="text-red-600 m-0">
                  {errors?.maNguoiThue?.message}
                </p>
              </div>
            </div>
            <div className="w-full mt-2">
              <div className="text-lg font-medium mr-1">Start</div>
              <div className="mb-0 text-lg w-full font-semibold text-green-500">
                <input
                  className="w-full border rounded-sm"
                  {...register("ngayThue", {
                    required: "Looks like this start day is incomplete.",
                    pattern: {
                      value:
                        /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/,
                      message: "Please input DDDD-MMMM-YYYY",
                    },
                  })}
                />
                <p className="text-red-600 m-0">{errors?.ngayThue?.message}</p>
              </div>
            </div>
            <div className="w-full mt-2">
              <div className="text-lg font-medium mr-1">Finish</div>
              <div className="mb-0 w-full text-lg font-semibold text-green-500">
                <select
                  className="border rounded-sm"
                  {...register("hoanThanh")}
                >
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select>
              </div>
            </div>
            <div className="text-center">
              <button
                className=" border rounded-md bg-green-500 text-white px-4 py-2 text-lg cursor-pointer mt-5"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
    </Popup>
  );

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
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
      responsive: ["md"],
      ...getColumnSearchProps("id"),
      sorter: (a, b) => a.id - b.id,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "ID Job",
      dataIndex: "maCongViec",
      key: "maCongViec",
      width: "20%",
      ...getColumnSearchProps("maCongViec"),
      sorter: (a, b) => a.maCongViec - b.maCongViec,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "ID User",
      dataIndex: "maNguoiThue",
      key: "maNguoiThue",
      width: "20%",
      responsive: ["md"],
      ...getColumnSearchProps("maNguoiThue"),
      sorter: (a, b) => a.maNguoiThue - b.maNguoiThue,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Start",
      dataIndex: "ngayThue",
      key: "ngayThue",
      with: "15%",
      ...getColumnSearchProps("ngayThue"),
    },
    {
      title: "Finish",
      dataIndex: "hoanThanh",
      key: "hoanThanh",
      width: "15%",
      ...getColumnSearchProps("hoanThanh"),
    },
    {
      title: "Edit",
      with: "15%",
      dataIndex: "edit",
      key: "edit",
      responsive: ["md"],
      render: (_, record) => (
        <Space size="middle">
          {console.log("record: ", record)}
          <CheckCircleTwoTone
            className="cursor-pointer"
            onClick={() => {
              Swal.fire({
                title: "Done Task?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes!",
              }).then((result) => {
                if (result.isConfirmed) {
                  dispatch(checkDoneWork(record?.id));
                }
              });
            }}
          />
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
                    dispatch(delHiredWork(record?.id));
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
    <div className="overflow-hidden pt-5">
      <div className="btn-hirework mb-5 text-center max-[767.95px]:hidden">
        <Link
          to="/admin/services/hirework/addnewhire"
          className="border rounded-md text-white bg-green-500 px-4 py-3"
        >
          Add New Hire
        </Link>
      </div>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default HireWork;
