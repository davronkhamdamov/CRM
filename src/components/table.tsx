import {
  Popconfirm,
  Space,
  Spin,
  Table,
  Tooltip,
  message,
  Tag,
  Form,
  Input,
} from "antd";
import qs from "qs";
import { FC, useEffect, useState } from "react";
import { LoadingOutlined, DeleteOutlined } from "@ant-design/icons";
import { DataType, EditModal, TableParams } from "../types/type";
import { ColumnsType, TableProps } from "antd/es/table";
import { FaUserDoctor } from "react-icons/fa6";
import { MdEdit, MdOutlinePayment } from "react-icons/md";
import EditAccound from "./EditAccound";
import dayjs from "dayjs";
import AddPayment from "./AddPayment";
import AddDoctorTreatment from "./AddDoctorTreatment";

const getuserParams = (params: TableParams) => ({
  results: params.pagination?.pageSize,
  page: params.pagination?.current,
  ...params,
});
const TableComponent: FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [doctorModal, setDoctorModal] = useState<EditModal>({
    id: "",
    isOpen: false,
  });
  const [data, setData] = useState<DataType[]>();
  const [openPaymentModal, setOpenPaymentModal] = useState<EditModal>({
    id: "",
    isOpen: false,
  });
  const [openEditModal, setOpenEditModal] = useState<EditModal>({
    id: "",
    isOpen: false,
  });
  const [toLoading, setToLoading] = useState(false);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  const token = localStorage.getItem("auth");

  const deleteUser = (id: string) => {
    setToLoading(true);
    fetch(import.meta.env.VITE_APP_URL + "/user/" + id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then(() => {
        setToLoading(false);
        fetchData();
        messageApi.success("Bemor muvaffaqqiyatli o'chirildi", 2);
      })
      .catch(() => {
        setToLoading(false);
        messageApi.error("Nimadir xato ketdi", 2);
      });
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "Ismi",
      sorter: true,
      render: (record) => {
        return (
          <a href={`patient/${record.id}`}>
            {record.name} {record.surname}
          </a>
        );
      },
      width: "20%",
    },
    {
      title: "Jinsi",
      dataIndex: "gender",
      width: "10%",
    },
    {
      title: "Ro'yxatdan o'tgan sanasi",
      dataIndex: "created_at",
      render: (registered) => `${dayjs(registered?.date).format("DD-MM-YYYY")}`,
      width: "15%",
    },
    {
      title: "Manzil",
      dataIndex: "address",
      render: (location) => `${location}`,
      width: "20%",
    },
    {
      title: "Balans",
      dataIndex: "balance",
      render: (balance) => {
        if (+balance.replace(" ", "") < 0) {
          return <Tag color="error">{balance} so'm</Tag>;
        }
        return <Tag color="default">{balance} so'm</Tag>;
      },
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
              <MdEdit
                style={{ cursor: "pointer" }}
                color="dodgerblue"
                onClick={() => {
                  if (openEditModal.id !== record.id) {
                    setOpenEditModal({
                      id: record.id,
                      isOpen: true,
                    });
                  }
                }}
              />
            </Tooltip>
            <Tooltip placement="bottom" title="To'lash">
              <MdOutlinePayment
                style={{ cursor: "pointer" }}
                color="dodgerblue"
                onClick={() => {
                  if (openPaymentModal.id !== record.id) {
                    setOpenPaymentModal({
                      id: record.id,
                      isOpen: true,
                    });
                  }
                }}
              />
            </Tooltip>
            <Tooltip placement="bottom" title="Davolash">
              <FaUserDoctor
                onClick={() => {
                  setDoctorModal({
                    id: record.id,
                    isOpen: true,
                  });
                }}
                color="#3b82f6"
                style={{ cursor: "pointer" }}
              />
            </Tooltip>
            <Popconfirm
              title="O'chirishga ishonchingiz komilmi?"
              onConfirm={() => deleteUser(record.id)}
            >
              <Tooltip placement="bottom" title="O'chirish">
                <DeleteOutlined style={{ color: "red", cursor: "pointer" }} />
              </Tooltip>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

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
      `${import.meta.env.VITE_APP_URL}/user/?${qs.stringify(
        getuserParams(tableParams)
      )}&search=${search}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((results) => {
        setData(results.result);
        setLoading(false);
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: results.total,
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
          <Input placeholder="Bemorni qidirish" />
        </Form.Item>
      </Form>
      <br />
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
      <Spin
        indicator={<LoadingOutlined style={{ fontSize: 30 }} spin />}
        spinning={toLoading}
        fullscreen
      />
      <AddPayment data={openPaymentModal} setOpen={setOpenPaymentModal} />
      <EditAccound setOpen={setOpenEditModal} data={openEditModal} />
      <AddDoctorTreatment setOpen={setDoctorModal} data={doctorModal} />
      {contextHolder}
    </>
  );
};

export default TableComponent;
