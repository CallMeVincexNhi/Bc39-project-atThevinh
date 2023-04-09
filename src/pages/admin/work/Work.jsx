import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DeleteTwoTone, EditTwoTone, SearchOutlined } from "@ant-design/icons";
import { Table, Button, Input, Space, Layout } from "antd";
import Highlighter from "react-highlight-words";
import Swal from "sweetalert2";
import {
  deleteWork,
  getAllWork,
  putWorkDetail,
} from "../../../store/congViec/congViecReducer";
import Popup from "reactjs-popup";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const Work = () => {
  const { allWork } = useSelector((state) => state.congViecReducer);
  console.log("AllWork: ", allWork);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    dispatch(getAllWork());
  }, []);

  const data = [];
  allWork?.map((value, i) => {
    data.push({
      id: value?.id,
      hinhAnh: <img src={value?.hinhAnh} alt="" />,
      tenCongViec: value?.tenCongViec,
      danhGia: value?.danhGia,
      giaTien: value?.giaTien,
      moTa: value?.moTa,
      moTaNgan: value?.moTaNgan,
    });
  });

  console.log(data);

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
              console.log("data: ", data);
              dispatch(
                putWorkDetail({
                  id: i.id,
                  tenCongViec: data.tenCongViec,
                  danhGia: data.danhGia,
                  giaTien: data.giaTien,
                  moTa: data.moTa,
                  moTaNgan: data.moTaNgan,
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
              <div className="text-lg font-medium">Work:</div>
              <div className="mb-0 w-full text-lg font-semibold text-green-500">
                <input
                  className="w-full border rounded-sm"
                  {...register("tenCongViec", {
                    required: "Looks like this name is incomplete.",
                  })}
                />
                <p className="text-red-600 m-0">
                  {errors?.tenCongViec?.message}
                </p>
              </div>
            </div>
            <div className="w-full mt-2">
              <div className="text-lg font-medium mr-1">Rate:</div>
              <div className="mb-0 text-lg w-full font-semibold text-green-500">
                <input
                  className="w-full border rounded-sm"
                  {...register("danhGia", {
                    required: "Looks like this rate is incomplete.",
                    pattern: {
                      value: /^[0-9\b]+$/,
                      message: "Please input numeric characters only.",
                    },
                  })}
                />
                <p className="text-red-600 m-0">{errors?.danhGia?.message}</p>
              </div>
            </div>
            <div className="w-full mt-2">
              <div className="text-lg font-medium mr-1">Price:</div>
              <div className="mb-0 text-lg w-full font-semibold text-green-500">
                <input
                  className="w-full border rounded-sm"
                  {...register("giaTien", {
                    required: "Looks like this rate is incomplete.",
                    pattern: {
                      value: /^[0-9\b]+$/,
                      message: "Please input numeric characters only.",
                    },
                  })}
                />
                <p className="text-red-600 m-0">{errors?.giaTien?.message}</p>
              </div>
            </div>
            <div className="w-full mt-2">
              <div className="text-lg font-medium mr-1">Detail:</div>
              <div className="mb-0 w-full text-lg font-semibold text-green-500">
                <textarea
                  className="w-full border rounded-sm"
                  rows="2"
                  cols="20"
                  {...register("moTa", {
                    required: "Looks like this name is incomplete.",
                  })}
                ></textarea>
                <p className="text-red-600 m-0">{errors?.moTa?.message}</p>
              </div>
            </div>
            <div className="w-full mt-2">
              <div className="text-lg font-medium mr-1">Short Detail:</div>
              <div className="mb-0 w-full text-lg font-semibold text-green-500">
                <textarea
                  className="w-full border rounded-sm"
                  rows="2"
                  cols="20"
                  {...register("moTaNgan", {
                    required: "Looks like this name is incomplete.",
                  })}
                ></textarea>
                <p className="text-red-600 m-0">{errors?.moTaNgan?.message}</p>
              </div>
            </div>
            <div className="text-center">
              <button
                className=" border rounded-md bg-green-500 text-white px-4 py-2 text-lg cursor-pointer mb-2"
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
      title: "Picture",
      dataIndex: "hinhAnh",
      key: "hinhAnh",
      width: "5%",
      responsive: ["lg"],
    },
    {
      title: "Work",
      dataIndex: "tenCongViec",
      key: "tenCongViec",
      width: "15%",
      ...getColumnSearchProps("tenCongViec"),
    },
    {
      title: "Rate",
      dataIndex: "danhGia",
      key: "danhGia",
      with: "5%",
      responsive: ["lg"],
      ...getColumnSearchProps("danhGia"),
    },
    {
      title: "Price",
      dataIndex: "giaTien",
      key: "giaTien",
      width: "5%",
      ...getColumnSearchProps("giaTien"),
    },
    {
      title: "Detail",
      dataIndex: "moTa",
      key: "moTa",
      width: "35%",
      responsive: ["xl"],
      ...getColumnSearchProps("moTa"),
    },
    {
      title: "ShortDetail",
      dataIndex: "moTaNgan",
      key: "moTaNgan",
      width: "25%",
      responsive: ["md"],
      ...getColumnSearchProps("moTaNgan"),
    },
    {
      title: "Edit",
      with: "5%",
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
                    dispatch(deleteWork(record?.id));
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
    <div className="h-full overflow-hidden pt-5">
      <div className="mb-5 text-center max-[767.95px]:hidden">
        <Link
          to="/admin/user/addwork"
          className="border rounded-md text-white bg-green-500 px-4 py-3"
        >
          Add New Work
        </Link>
      </div>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default Work;
