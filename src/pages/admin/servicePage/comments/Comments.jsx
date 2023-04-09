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
import {
  changeComment,
  deleteComment,
  getCommentsSearch,
  layBinhLuanTheoCongViec,
} from "../../../../store/quanLyBinhLuan/quanLyBinhLuanReducer";
import { useQuanLyBinhLuan } from "../../../../store/quanLyBinhLuan/quanLyBinhLuanSelector";
import moment from "moment/moment";
import { getAllWork } from "../../../../store/congViec/congViecReducer";
import "./comments.css";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Popup from "reactjs-popup";

const Comments = () => {
  const [expand, setExpand] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const { listCommentsSearch } = useQuanLyBinhLuan();
  console.log("listCommentsSearch: ", listCommentsSearch);
  const { allWork } = useSelector((state) => state.congViecReducer);
  const { dsBinhLuan } = useQuanLyBinhLuan();
  console.log("dsBinhLuan: ", dsBinhLuan);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    dispatch(getCommentsSearch());
  }, []);

  useEffect(() => {
    dispatch(getAllWork());
  }, []);

  const data = [];
  listCommentsSearch?.map((item, i) => {
    data.push({
      id: item?.id,
      maCongViec: item?.maCongViec,
      maNguoiBinhLuan: item?.maNguoiBinhLuan,
      ngayBinhLuan: moment(item?.ngayBinhLuan).format("l"),
      noiDung: item?.noiDung,
      saoBinhLuan: item?.saoBinhLuan,
    });
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
              dispatch(
                changeComment({
                  id: i?.id,
                  maCongViec: parseInt(data.maCongViec),
                  maNguoiBinhLuan: parseInt(data.maNguoiBinhLuan),
                  ngayBinhLuan: data.ngayBinhLuan,
                  noiDung: data.noiDung,
                  saoBinhLuan: parseInt(data.saoBinhLuan),
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
                  {...register("maNguoiBinhLuan", {
                    required: "Looks like this Id User is incomplete.",
                    pattern: {
                      value: /^[0-9\b]+$/,
                      message: "Please input numeric characters only.",
                    },
                  })}
                />
                <p className="text-red-600 m-0">
                  {errors?.maNguoiBinhLuan?.message}
                </p>
              </div>
            </div>
            <div className="w-full mt-2">
              <div className="text-lg font-medium mr-1">Date</div>
              <div className="mb-0 text-lg w-full font-semibold text-green-500">
                <input
                  className="w-full border rounded-sm"
                  {...register("ngayBinhLuan", {
                    required: "Looks like this start day is incomplete.",
                    pattern: {
                      value:
                        /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/,
                      message: "Please input DDDD-MMMM-YYYY",
                    },
                  })}
                />
                <p className="text-red-600 m-0">
                  {errors?.ngayBinhLuan?.message}
                </p>
              </div>
            </div>
            <div className="w-full mt-2">
              <div className="text-lg font-medium mr-1">Comment</div>
              <div className="mb-0 w-full text-lg font-semibold text-green-500">
                <textarea
                  className="border rounded-sm"
                  cols="50"
                  rows="2"
                  {...register("noiDung", {
                    required: "Looks like this comment is incomplete.",
                  })}
                ></textarea>
                <p className="text-red-600 error">{errors?.noiDung?.message}</p>
              </div>
            </div>
            <div className="w-full">
              <div className="text-lg font-medium mr-1">Rate</div>
              <div className="mb-0 text-lg w-full font-semibold text-green-500">
                <input
                  className="w-full border rounded-md p-2"
                  placeholder="Rate"
                  {...register("saoBinhLuan", {
                    required: "Looks like this rate is incomplete.",
                    pattern: {
                      value: /^[0-5\b]+$/,
                      message: "Please input numeric 1 to 5 characters only.",
                    },
                  })}
                />
                <p className="text-red-600 error">
                  {errors?.saoBinhLuan?.message}
                </p>
              </div>
            </div>
            <div className="text-center">
              <button
                className=" border rounded-md bg-green-500 text-white px-4 py-2 text-lg cursor-pointer mt-5 mb-3"
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

  //Table
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
      title: "ID Job",
      dataIndex: "maCongViec",
      key: "maCongViec",
      width: "15%",
      ...getColumnSearchProps("maCongViec"),
      sorter: (a, b) => a.maCongViec - b.maCongViec,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "ID User Cmt",
      dataIndex: "maNguoiBinhLuan",
      key: "maNguoiBinhLuan",
      width: "15%",
      ...getColumnSearchProps("maNguoiBinhLuan"),
      sorter: (a, b) => a.maNguoiBinhLuan - b.maNguoiBinhLuan,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Date Cmt",
      dataIndex: "ngayBinhLuan",
      key: "ngayBinhLuan",
      with: "25%",
      ...getColumnSearchProps("ngayBinhLuan"),
    },
    {
      title: "Content Cmt",
      dataIndex: "noiDung",
      key: "noiDung",
      width: "30%",
      responsive: ["md"],
      ...getColumnSearchProps("noiDung"),
    },
    {
      title: "Rate Cmt",
      dataIndex: "saoBinhLuan",
      key: "saoBinhLuan",
      width: "5%",
      responsive: ["lg"],
      ...getColumnSearchProps("saoBinhLuan"),
    },
    {
      title: "Edit",
      with: "25%",
      dataIndex: "edit",
      key: "edit",
      responsive: ["md"],
      render: (_, record) => (
        <Space size="middle">
          {console.log("record: ", record)}
          <InfoCircleTwoTone
            onClick={() => {
              setExpand(true);
              allWork?.map((item) => {
                if (item?.id === record?.maCongViec) {
                  dispatch(layBinhLuanTheoCongViec(record?.maCongViec));
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
                    dispatch(deleteComment(record?.id));
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
    <div className="table-comment overflow-hidden pt-5">
      {expand ? (
        <div className="popup-expand-cmt">
          <div className="popup-expand-content-cmt w-[700px] h-[500px] rounded-md">
            <div className="flex justify-between">
              <div></div>
              <div className="text-xl font-bold text-red-500">Information</div>
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
                <div>
                  {dsBinhLuan?.map((item, i) => {
                    return (
                      <div className="flex">
                        <span className="text-base font-base text-zinc-600 mr-3">
                          Name:{" "}
                          <span className="text-green-600">
                            {item?.tenNguoiBinhLuan}
                          </span>
                        </span>
                        <br></br>
                        <span className="text-base font-base text-zinc-600 mr-3">
                          Comment:{" "}
                          <span className="text-green-600">
                            {item?.noiDung}
                          </span>
                        </span>
                        <br></br>{" "}
                        <span className="text-base font-base text-zinc-600 mr-3">
                          Date:{" "}
                          <span className="text-green-600">
                            {item?.ngayBinhLuan}
                          </span>
                        </span>
                        <span className="text-base font-base text-zinc-600">
                          Rate:{" "}
                          <span className="text-green-600">
                            {item?.saoBinhLuan}
                          </span>
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      <div className="btn-comments mb-5 text-center max-[767.95px]:hidden">
        <Link
          to="/admin/services/comments/addnewcomments"
          className="border rounded-md text-white bg-green-500 px-4 py-3"
        >
          Add New Comment
        </Link>
      </div>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default Comments;
