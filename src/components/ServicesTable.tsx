import {
  Form,
  Input,
  Popconfirm,
  Space,
  Table,
  Tag,
  Tooltip,
  message,
} from "antd";
import qs from "qs";
import { useContext, useEffect, useState } from "react";
import {
  LoadingOutlined,
  DeleteOutlined,
  EditTwoTone,
} from "@ant-design/icons";

import type { TableProps } from "antd";
import { DataType, EditModal, TableParams } from "../types/type";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { LoadingProvider } from "../App";
import EditService from "./EditService";

const getRandomuserParams = (params: TableParams) => ({
  results: params.pagination?.pageSize,
  page: params.pagination?.current,
  ...params,
});

const ServicesTable = () => {
  const { setLoadingCnx } = useContext(LoadingProvider);
  const [messageApi, contextHolder] = message.useMessage();
  const [search, setSearch] = useState<string>("");
  const [data, setData] = useState<DataType[]>();
  const [loading, setLoading] = useState(false);
  const [serviceModal, setServiceModal] = useState<EditModal>({
    id: "",
    isOpen: false,
  });
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  const token = localStorage.getItem("auth");

  const deleteService = (id: string) => {
    setLoadingCnx(true);
    fetch(import.meta.env.VITE_APP_URL + "/service/" + id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        setLoadingCnx(false);
        messageApi.success("Xizmat muvaffaqqiyatli o'chirildi", 2);
        fetchData();
      })
      .catch(() => {
        setLoadingCnx(false);
        messageApi.error("Xizmat o'chirishda muommo paydo bo'ldi", 2);
      });
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "Xizmat nomi",
      dataIndex: "name",
      width: "20%",
      align: "center",
    },
    {
      title: "Toifasi",
      dataIndex: "category_name",
      align: "center",
      width: "15%",
    },
    {
      title: "Narxi",
      dataIndex: "",
      align: "center",
      width: "15%",
      render: ({ price }) => `${price} so'm`,
    },
    {
      title: "Yaratilgan vaqti",
      dataIndex: "create_at",
      align: "center",
      render: (record) => `${dayjs(record).format("DD-MM-YYYY")}`,
      width: "15%",
    },
    {
      title: "Xizmat holati",
      dataIndex: "status",
      align: "center",
      render: (record) => {
        return record ? (
          <Tag
            style={{
              maxWidth: "90px",
              minWidth: "80px",
              textAlign: "center",
            }}
            color="success"
          >
            Foal
          </Tag>
        ) : (
          <Tag
            style={{
              maxWidth: "90px",
              minWidth: "80px",
              textAlign: "center",
            }}
            color="error"
          >
            Foal emas
          </Tag>
        );
      },
      width: "10%",
    },
    {
      title: "Bajariladigan ishlar",
      dataIndex: "operation",
      key: "operation",
      align: "center",
      width: "10%",
      render: (_, record) => {
        return (
          <Space size="middle">
            <Tooltip placement="bottom" title="Tahrirlash">
              <EditTwoTone
                onClick={() => setServiceModal({ id: record.id, isOpen: true })}
              />
            </Tooltip>
            <Popconfirm
              title="O'chirishga ishonchingiz komilmi?"
              onConfirm={() => deleteService(record.id)}
            >
              <Tooltip placement="bottom" title="O'chirish">
                <DeleteOutlined style={{ color: "red" }} />
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
      import.meta.env.VITE_APP_URL +
        `/service/?${qs.stringify(
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
      <EditService data={serviceModal} setOpen={setServiceModal} />
      {contextHolder}
    </>
  );
};

export default ServicesTable;
