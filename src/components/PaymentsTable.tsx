import {
  AutoComplete,
  Spin,
  Table,
  message,
} from "antd";
import qs from "qs";
import { useEffect, useState } from "react";
import {
  LoadingOutlined,
} from "@ant-design/icons";

import type { TableProps } from "antd";
import { DataType, TableParams } from "../types/type";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { HiOutlineCash } from "react-icons/hi";
import { IoCardOutline } from "react-icons/io5";

const getRandomuserParams = (params: TableParams) => ({
  results: params.pagination?.pageSize,
  page: params.pagination?.current,
  ...params,
});
const PaymentsTable = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toLoading, setToLoading] = useState(false);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  const token = localStorage.getItem("auth")

  const columns: ColumnsType<DataType> = [
    {
      title: "Ism Familyasi",
      dataIndex: "",
      sorter: true,
      render: (user) => <a href={`patient/${user.user_id}`}>{user.username} {user.surname}</a>,
      width: "20%",
      align: "center",
    },
    {
      title: "To'lov miqdori",
      dataIndex: "amount",
      align: "center",
      width: "20%",
      render: (amount) => `${amount} so'm`,
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
    }
  ];

  useEffect(() => {
    fetchData();
  }, [JSON.stringify(tableParams)]);

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
      `${import.meta.env.VITE_APP_URL}/payment/?${qs.stringify(
        getRandomuserParams(tableParams)
      )}`,
      {
        headers: {
          "Authorization": `Bearer ${token}`
        }
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
      }).catch((err) => {
        if (err.message === "Failed to fetch") {
          messageApi.error("Internet bilan aloqani tekshiring!", 2);
        };
        setData([]);
        setLoading(false);
      })
  };

  const [value, setValue] = useState("");
  const [options, setOptions] = useState<{ value: string }[]>([]);
  const onChange = (data: string) => {
    setValue(data);
  };
  const mockVal = async (str: string) => {
    return await fetch(`https://randomuser.me/api?search=${str}`)
      .then((res) => res.json())
      .then(({ results }) => {
        return results?.map((e: { name: { first: string; last: string } }) => {
          return { value: e.name.first + " " + e.name.last };
        });
      });
  };
  const getPanelValue = async (searchText: string) =>
    !searchText ? [] : await mockVal(searchText);

  const onSelect = (data: string) => {
    console.log("onSelect", data);
  };
  return (
    <>
      <AutoComplete
        value={value}
        options={options}
        style={{ width: 300, marginBottom: 20 }}
        onSelect={onSelect}
        onSearch={async (text) => setOptions(await getPanelValue(text))}
        onChange={onChange}
        placeholder="To'lovlarni qidirish"
      />
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
      <Spin
        indicator={<LoadingOutlined style={{ fontSize: 30 }} spin />}
        spinning={toLoading}
        fullscreen
      />
      {contextHolder}
    </>
  );
};

export default PaymentsTable;