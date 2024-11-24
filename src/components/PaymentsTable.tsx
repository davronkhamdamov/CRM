import { Form, Input, Table, message } from "antd";
import qs from "qs";
import { useEffect, useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";

import type { TableProps } from "antd";
type OnChange = NonNullable<TableProps<DataType>["onChange"]>;
import { DataType, TableParams } from "../types/type";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { HiOutlineCash } from "react-icons/hi";
import { IoCardOutline } from "react-icons/io5";
import formatMoney from "../lib/money_format";

const getRandomuserParams = (params: TableParams) => ({
  results: params.pagination?.pageSize,
  page: params.pagination?.current,
  ...params,
});
const PaymentsTable = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  const token = localStorage.getItem("auth");

  const columns: ColumnsType<DataType> = [
    {
      title: "Ism Familyasi",
      dataIndex: "",
      render: (user) => (
        <a href={`patient/${user.user_id}`}>
          {user.username} {user.surname}
        </a>
      ),
      width: "20%",
      align: "center",
    },
    {
      title: "To'lov miqdori",
      dataIndex: "amount",
      align: "center",
      width: "20%",
      render: (amount) => formatMoney(amount),
    },
    {
      title: "Sana",
      dataIndex: "created_at",
      align: "center",
      render: (record) => `${dayjs(record).format("DD-MM-YYYY HH:mm")}`,
      width: "20%",
    },
    {
      title: "To'lov turi",
      dataIndex: "method",
      align: "center",
      render: (_, record) => {
        return (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "10px",
              alignItems: "center",
            }}
          >
            {record.method === "Naqt" ? <HiOutlineCash /> : <IoCardOutline />}
            {record.method}
          </div>
        );
      },
      width: "20%",
    },
  ];

  useEffect(() => {
    fetchData();
  }, [JSON.stringify(tableParams), search]);

  const handleTableChange: OnChange = (pagination, filters, sorter) => {
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
      `${import.meta.env.VITE_APP_URL}/payment/?${qs.stringify(
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
            total: result?.total,
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
      <Table
        columns={columns}
        rowKey={(record) => record.id}
        dataSource={data}
        pagination={tableParams.pagination}
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
      {contextHolder}
    </>
  );
};

export default PaymentsTable;
