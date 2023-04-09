import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DeleteTwoTone, EditTwoTone, SearchOutlined } from "@ant-design/icons";
import { Table, Button, Input, Space } from "antd";
import Highlighter from "react-highlight-words";
import Swal from "sweetalert2";

import { useForm } from "react-hook-form";
import Popup from "reactjs-popup";
import {
  deleteWorkType,
  getWorkType,
  putWorkType,
} from "../../../../store/loaiCongViec/loaiCongViec";
import { Link } from "react-router-dom";
import "./worktype.css";

const WorkType = () => {
  const dispatch = useDispatch();
  const { workType } = useSelector((state) => state.loaiCongViecReducer);
  console.log("workType: ", workType);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    dispatch(getWorkType());
  }, []);

  const data = [];

  workType?.map((value, index) => {
    data.push({
      id: value.id,
      tenLoaiCongViec: value.tenLoaiCongViec,
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
        <div className="modal-user border bg-white rounded-xl w-[600px] h-[400px] overflow-y-scroll flex flex-wrap justify-center  px-10 pb-10 pt-5 shadow-lg shadow-cyan-500/50">
          <div className="w-full flex justify-end">
            <span
              className="border rounded-lg py-2 px-4 bg-green-500 text-white font-bold text-lg cursor-pointer"
              onClick={close}
            >
              X
            </span>
          </div>
          <div className="w-full text-xl text-center font-bold mb-1 text-red-600">
            Page WorkType
          </div>
          <form
            className="w-full h-full"
            onSubmit={handleSubmit((data) => {
              console.log("data: ", data);
              dispatch(
                putWorkType({
                  id: i.id,
                  tenLoaiCongViec: data.tenLoaiCongViec,
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
            <div className="w-full mt-20 mb-14">
              <div className="text-lg font-medium mr-1">Work Type</div>
              <div className="mb-0 text-lg w-full font-semibold text-green-500">
                <input
                  className="w-full border rounded-sm"
                  {...register("tenLoaiCongViec", {
                    required: "Looks like this rate is incomplete.",
                  })}
                />
                <p className="text-red-600 m-0">
                  {errors?.tenLoaiCongViec?.message}
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
  //Table
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
      width: "25%",
      ...getColumnSearchProps("id"),
      sorter: (a, b) => a.id - b.id,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Work Type",
      dataIndex: "tenLoaiCongViec",
      key: "tenLoaiCongViec",
      width: "65%",
      ...getColumnSearchProps("tenLoaiCongViec"),
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
                    dispatch(deleteWorkType(record?.id));
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
    <div className="table-worktype h-full overflow-hidden pt-5">
      <div className="mb-5 text-center max-[767.95px]:hidden">
        <Link
          to="/admin/worktype/addworktype"
          className="btn-worktype border rounded-md text-white bg-green-500 px-4 py-3"
        >
          Add Work Type
        </Link>
      </div>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default WorkType;
