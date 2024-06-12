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
  Checkbox,
  Flex,
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
import formatMoney from "../lib/money_format";

const getuserParams = (params: TableParams) => ({
  results: params.pagination?.pageSize,
  page: params.pagination?.current,
  ...params,
});
const TableComponent: FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [debt, setDebt] = useState<boolean>(false);
  const [totalPage, setTotalPage] = useState<number>(0);
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
      render: (record, data) => {
        return (
          <div className={data.balance < 0 ? "qarz" : "column"}>
            <a
              href={`patient/${record.id}`}
              style={{ color: data.balance < 0 ? "white" : "" }}
            >
              {record.name} {record.surname}
            </a>
          </div>
        );
      },
      width: "15%",
      className: "debt",
    },
    {
      title: "Jinsi",
      dataIndex: "gender",
      render: (gender, data) => (
        <div className={data.balance < 0 ? "qarz" : "column"}>
          <p style={{ color: data.balance < 0 ? "white" : "" }}>
            {gender == "male" ? "Erkak" : "Ayol"}
          </p>
        </div>
      ),
      width: "5%",
      className: "debt",
    },
    {
      title: "Ro'yxatdan o'tgan sanasi",
      dataIndex: "created_at",
      render: (registered, data) => (
        <div className={data.balance < 0 ? "qarz" : "column"}>
          <p style={{ color: data.balance < 0 ? "white" : "" }}>
            {dayjs(registered).format("DD-MM-YYYY")}
          </p>
        </div>
      ),
      className: "debt",
      width: "14%",
    },
    {
      title: "Manzil",
      dataIndex: "address",
      render: (location, data) => (
        <div className={data.balance < 0 ? "qarz" : "column"}>
          <p style={{ color: data.balance < 0 ? "white" : "" }}>{location}</p>
        </div>
      ),
      className: "debt",
      width: "20%",
    },
    {
      title: "Telefon raqami",
      dataIndex: "phone_number",
      render: (location, data) => (
        <div className={data.balance < 0 ? "qarz" : "column"}>
          <p style={{ color: data.balance < 0 ? "white" : "" }}>{location}</p>
        </div>
      ),
      className: "debt",
      width: "10%",
    },
    {
      title: "Balans",
      dataIndex: "balance",
      render: (balance, data) => {
        if (balance < 0) {
          return (
            <div className={data.balance < 0 ? "qarz" : "column"}>
              <Tag color="error">{formatMoney(balance)}</Tag>
            </div>
          );
        }
        return (
          <div className={data.balance < 0 ? "qarz" : "column"}>
            <Tag color="green">{formatMoney(balance)}</Tag>
          </div>
        );
      },
      width: "15%",
      className: "debt",
    },
    {
      title: "Bajariladigan ishlar",
      dataIndex: "operation",
      className: "debt",
      align: "center",
      key: "operation",
      render: (_, record) => {
        return (
          <div className={record.balance < 0 ? "qarz" : "column"}>
            <Space size="middle">
              <Tooltip placement="bottom" title="Tahrirlash">
                <MdEdit
                  style={{ cursor: "pointer" }}
                  color={record.balance < 0 ? "white" : "dodgerblue"}
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
                  color={record.balance < 0 ? "white" : "dodgerblue"}
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
                  color={record.balance < 0 ? "white" : "dodgerblue"}
                  style={{ cursor: "pointer" }}
                />
              </Tooltip>
              <Popconfirm
                title="O'chirishga ishonchingiz komilmi?"
                onConfirm={() => deleteUser(record.id)}
              >
                <Tooltip placement="bottom" title="O'chirish">
                  <DeleteOutlined
                    style={{
                      color: record.balance < 0 ? "blue" : "red",
                      cursor: "pointer",
                    }}
                  />
                </Tooltip>
              </Popconfirm>
            </Space>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    fetchData();
  }, [JSON.stringify(tableParams), search, debt]);

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
      )}&search=${search}&debt=${debt}`,
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
        setTotalPage(results.total);
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
      <Flex>
        <Form
          onFinish={(a: { search: string }) => setSearch(a.search)}
          style={{ display: "flex", alignItems: "center", gap: 50 }}
        >
          <Form.Item name="search">
            <Input placeholder="Bemorni qidirish" />
          </Form.Item>
          <div style={{ height: "50px" }}>
            <Checkbox
              onChange={(e) => {
                setDebt(e.target.checked);
              }}
            >
              Qarzdor bemorlar
            </Checkbox>
          </div>
        </Form>
      </Flex>
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
      <p style={{ textAlign: "right", marginRight: "20px" }}>
        Barcha bemorlar soni - {totalPage}
      </p>
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
