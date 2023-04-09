import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  DeleteTwoTone,
  EditTwoTone,
  InfoCircleTwoTone,
  SearchOutlined,
} from "@ant-design/icons";
import { Table, Button, Input, Space } from "antd";
import Highlighter from "react-highlight-words";
import Swal from "sweetalert2";

import { useForm } from "react-hook-form";
import Popup from "reactjs-popup";
import {
  deleteDetailWorkType,
  getDetailWorkType,
  putDetailWorkType,
} from "../../../../store/chiTietLoaiCongViec/chiTietLoaiCongViecReducer";
import { Link } from "react-router-dom";
import "./detailWorkType.css";
import {
  getWorkType,
  getWorkTypeById,
} from "../../../../store/loaiCongViec/loaiCongViec";

const DetailWorkType = () => {
  const [expand, setExpand] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const dispatch = useDispatch();
  const { listWorkType } = useSelector(
    (state) => state.chiTietLoaiCongViecReducer
  );
  const { workType } = useSelector((state) => state.loaiCongViecReducer);
  const { workTypeById } = useSelector((state) => state.loaiCongViecReducer);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    dispatch(getDetailWorkType());
  }, []);

  useEffect(() => {
    dispatch(getWorkType());
  }, []);

  const data = [];

  listWorkType?.map((value, index) => {
    data.push({
      id: value?.id,
      hinhAnh: <img src={value?.hinhAnh}></img>,
      tenNhom: value?.tenNhom,
      dsChiTietLoai: value?.dsChiTietLoai,
      maLoaiCongviec: value?.maLoaiCongviec,
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
            Page Detail WorkType
          </div>
          <form
            className="w-full h-full"
            onSubmit={handleSubmit((data) => {
              console.log("data: ", data);
              dispatch(
                putDetailWorkType({
                  id: i?.id,
                  tenChiTiet: data.tenChiTiet,
                  maLoaiCongViec: parseInt(data.maLoaiCongViec),
                  danhSachChiTiet: [parseInt(data.danhSachChiTiet)],
                })
              );
            })}
          >
            <div className="w-full flex text-center border-b">
              <div className="w-full flex text-lg font-medium mr-1">
                ID:
                <div className="ml-1">{i?.id}</div>
              </div>
            </div>
            <div className="w-full mt-2">
              <div className="text-lg font-medium">Detail Name</div>
              <div className="mb-0 w-full text-lg font-semibold text-green-500">
                <input
                  className="w-full border rounded-sm"
                  {...register("tenChiTiet", {
                    required: "Looks like this detail name is incomplete.",
                  })}
                />
                <p className="text-red-600 m-0">
                  {errors?.tenChiTiet?.message}
                </p>
              </div>
            </div>
            <div className="w-full mt-2">
              <div className="text-lg font-medium">ID Work Type</div>
              <div className="mb-0 w-full text-lg font-semibold text-green-500">
                <input
                  className="w-full border rounded-md p-2"
                  {...register("maLoaiCongViec", {
                    required: "Looks like this id work type is incomplete.",
                    pattern: {
                      value: /^[0-9\b]+$/,
                      message: "Please input numeric characters only.",
                    },
                  })}
                />
                <p className="text-red-600 m-0">
                  {errors?.maLoaiCongviec?.message}
                </p>
              </div>
            </div>
            <div className="w-full mt-2">
              <div className="text-lg font-medium">List Work Type</div>
              <div className="mb-0 w-full text-lg font-semibold text-green-500">
                <input
                  className="w-full border rounded-md p-2"
                  {...register("danhSachChiTiet", {
                    required: "Looks like this list work type is incomplete.",
                    pattern: {
                      value: /^[0-9\b]+$/,
                      message: "Please input numeric characters only.",
                    },
                  })}
                />
                <p className="text-red-600 m-0">
                  {errors?.tenChiTiet?.message}
                </p>
              </div>
            </div>
            <div className="text-center">
              <button
                className=" border rounded-md bg-green-500 text-white px-4 py-2 text-lg cursor-pointer"
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
      title: "Avatar",
      dataIndex: "hinhAnh",
      key: "hinhAnh",
      width: "20%",
      responsive: ["lg"],
    },
    {
      title: "Group Name",
      dataIndex: "tenNhom",
      key: "tenNhom",
      width: "30%",
      sorter: (a, b) => a.tenNhom.length - b.tenNhom.length,
      sortDirections: ["descend", "ascend"],
      ...getColumnSearchProps("tenNhom"),
    },
    {
      title: "Work Type List",
      dataIndex: "dsChiTietLoai",
      render: (dsChiTietLoai) =>
        dsChiTietLoai?.map((dsChiTietLoai) => dsChiTietLoai.tenChiTiet).join(),
      key: "hinhAnh",
      width: "30%",
    },
    {
      title: "ID Work Type",
      dataIndex: "maLoaiCongviec",
      key: "maLoaiCongviec",
      width: "10%",
    },
    {
      title: "Edit",
      with: "10%",
      dataIndex: "edit",
      key: "edit",
      responsive: ["md"],
      render: (_, record) => (
        <Space size="middle">
          {console.log("record", record)}
          <InfoCircleTwoTone
            onClick={() => {
              setExpand(true);
              workType?.map((item) => {
                if (item?.id === record?.maLoaiCongviec) {
                  dispatch(getWorkTypeById(record?.maLoaiCongviec));
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
                    dispatch(deleteDetailWorkType(record?.id));
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
    <div className=" overflow-hidden table-detailworktype pt-5 h-full">
      {expand ? (
        <div className="popup-expand">
          <div className="popup-expand-content w-[300px] h-[300px] rounded-md">
            <div className="flex justify-end">
              <button
                className="border bg-green-500 text-white font-semibold py-2 px-4 rounded-md"
                onClick={() => {
                  setExpand(false);
                }}
              >
                X
              </button>
            </div>
            <div>
              <div className="w-full flex flex-wrap justify-center text-lg font-medium mr-1 mt-10">
                <div className="w-full text-center">Work Type:</div>
                <div className="ml-1 text-green-500 text-xl">
                  {workTypeById?.tenLoaiCongViec}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      <div className="mb-5 text-center max-[767.95px]:hidden">
        <Link
          to="/admin/worktype/detailworktype/adddetailworktype"
          className="btn-detailworktype border rounded-md text-white bg-green-500 px-4 py-3"
        >
          Add Detail Work
        </Link>
      </div>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default DetailWorkType;
