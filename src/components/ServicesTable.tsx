import {
  AutoComplete,
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
import { DataType, TableParams } from "../types/type";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { IoIosMore } from "react-icons/io";
import { LoadingProvider } from "../App";

const getRandomuserParams = (params: TableParams) => ({
  results: params.pagination?.pageSize,
  page: params.pagination?.current,
  ...params,
});
const ServicesTable = () => {
  const { setLoadingCnx } = useContext(LoadingProvider);
  const [messageApi, contextHolder] = message.useMessage();
  const [data, setData] = useState<DataType[]>();
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  const cancel = () => {
    setLoadingCnx(true);
    setTimeout(() => {
      setLoadingCnx(false);
      messageApi.success("Xizmat muvaffaqqiyatli o'chirildi", 2);
    }, 2000);
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "Xizmat nomi",
      dataIndex: "name",
      sorter: true,
      render: (name) => `${name.last}`,
      width: "20%",
      align: "center",
    },
    {
      title: "Xizmat narxi",
      dataIndex: "location",
      align: "center",
      width: "16%",
      render: (location) => `${location.street.number} so'm`,
    },
    {
      title: "Xom ashyo narxi",
      dataIndex: "location",
      align: "center",
      render: (location) => `${location.street.number} so'm`,
      width: "16%",
    },
    {
      title: "Yaratilgan vaqti",
      dataIndex: "registered",
      align: "center",
      render: (record) => `${dayjs(record.date).format("DD-MM-YYYY")}`,
      width: "16%",
    },
    {
      title: "Xizmat holati",
      dataIndex: "gender",
      align: "center",
      render: (record) => {
        return record === "male" ? (
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
            color="default"
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
      render: () => {
        return (
          <Space size="middle">
            <Tooltip placement="bottom" title="Tahrirlash">
              <EditTwoTone />
            </Tooltip>
            <Tooltip placement="bottom" title="Ko'proq ma'lumot">
              <IoIosMore color="#3b82f6" style={{ cursor: "pointer" }} />
            </Tooltip>
            <Popconfirm
              title="O'chirishga ishonchingiz komilmi?"
              onConfirm={cancel}
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
      `https://randomuser.me/api?${qs.stringify(
        getRandomuserParams(tableParams)
      )}`
    )
      .then((res) => res.json())
      .then(({ results }) => {
        setData(results);
        setLoading(false);
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: 200,
          },
        });
      });
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
        placeholder="Xizmatlarni qidirish"
      />
      <Table
        columns={columns}
        rowKey={(record) => record.login.uuid}
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

export default ServicesTable;
