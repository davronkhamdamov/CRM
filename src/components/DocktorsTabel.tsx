import {
  ColorPicker,
  Form,
  Input,
  Popconfirm,
  Space,
  Table,
  Tooltip,
  message,
} from "antd";
import qs from "qs";
import { useEffect, useState } from "react";
import {
  LoadingOutlined,
  DeleteOutlined,
  EditTwoTone,
} from "@ant-design/icons";

import type { TableProps } from "antd";
import { DataType, EditModal, TableParams } from "../types/type";
import { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";
import EditDoctor from "./EditDocktor";

const getRandomuserParams = (params: TableParams) => ({
  results: params.pagination?.pageSize,
  page: params.pagination?.current,
  ...params,
});
const DoctorsTable = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [data, setData] = useState<DataType[]>();
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("auth");
  const [search, setSearch] = useState<string>(" ");
  const [doctorModal, setDoctorModal] = useState<EditModal>({
    id: "",
    isOpen: false,
  });
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  const Delete_doctor = (staff_id: string) => {
    setLoading(true);
    fetch(import.meta.env.VITE_APP_URL + `/staffs/` + staff_id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then(() => {
        fetchData();
        messageApi.success("Shifokor muvaffaqqiyatli o'chirildi", 2);
      })
      .catch((err) => {
        if (err.message === "Failed to fetch") {
          messageApi.error("Internet bilan aloqani tekshiring!", 2);
        }
        setLoading(false);
      });
  };
  const columns: ColumnsType<DataType> = [
    {
      title: "Ism Familyasi",
      dataIndex: "",
      sorter: true,
      render: (name) => {
        return (
          <Link to={name.id}>
            {name.name} {name.surname}
          </Link>
        );
      },

      width: "20%",
    },
    {
      title: "Jinsi",
      dataIndex: "gender",
      render: (record) => (record === "male" ? "Erkak" : "Ayol"),
      width: "20%",
    },
    {
      title: "Rangi",
      dataIndex: "color",
      render: (_, record) => (
        <ColorPicker
          size="large"
          onChangeComplete={(e) => {
            fetch(import.meta.env.VITE_APP_URL + "/staffs/color/" + record.id, {
              method: "PUT",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-type": "application/json",
              },
              body: JSON.stringify({
                color: e.toHex(),
              }),
            })
              .then((res) => res.json())
              .then((data) => console.log(data));
          }}
          defaultValue={record.color}
        />
      ),
      width: "20%",
    },
    {
      title: "Ish xaqqi foizi",
      dataIndex: "foiz",
      width: "15%",
      render: (foiz) => (foiz ? foiz : 0) + "%",
    },
    {
      title: "Role",
      dataIndex: "role",
      width: "15%",
    },
    {
      title: "Bajariladigan ishlar",
      dataIndex: "operation",
      key: "operation",
      render: (_, record) => {
        return (
          <Space size="middle">
            <Tooltip placement="bottom" title="Tahrirlash">
              <EditTwoTone
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setDoctorModal({ id: record.id, isOpen: true });
                }}
              />
            </Tooltip>
            <Popconfirm
              title="O'chirishga ishonchingiz komilmi?"
              onConfirm={() => Delete_doctor(record.id)}
            >
              <Tooltip placement="bottom" title="O'chirish">
                <DeleteOutlined style={{ color: "red" }} />
              </Tooltip>
            </Popconfirm>
          </Space>
        );
      },
      width: "20%",
    },
  ];
  console.log(data);
  useEffect(() => {
    fetchData();
  }, [JSON.stringify(tableParams), search]);

  const handleTableChange: TableProps["onChange"] = (
    pagination,
    filters,
    sorter
  ) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });

    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
  };
  const fetchData = () => {
    setLoading(true);
    fetch(
      import.meta.env.VITE_APP_URL +
        `/staffs?${qs.stringify(
          getRandomuserParams(tableParams)
        )}&search=${search}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((result) => {
        setData(result.result);
        setLoading(false);
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: result.total,
          },
        });
      })
      .catch((err) => {
        if (err.message === "Failed to fetch") {
          messageApi.error("Internet bilan aloqani tekshiring!", 2);
        }
        setData([]);
        setLoading(false);
      });
  };

  return (
    <>
      <Form
        style={{ maxWidth: 300 }}
        onFinish={(a: { search: string }) => setSearch(a.search)}
      >
        <Form.Item name="search">
          <Input placeholder="Shifokorni qidirish" />
        </Form.Item>
      </Form>
      <Table
        columns={columns}
        rowKey={(record) => record.id}
        dataSource={data}
        pagination={tableParams.pagination}
        scroll={{ y: 590 }}
        loading={
          loading
            ? {
                indicator: (
                  <LoadingOutlined
                    style={{
                      fontSize: 34,
                    }}
                    spin
                  />
                ),
              }
            : false
        }
        onChange={handleTableChange}
      />
      <EditDoctor data={doctorModal} setOpen={setDoctorModal} />
      {contextHolder}
    </>
  );
};

export default DoctorsTable;
