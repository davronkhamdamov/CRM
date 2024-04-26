import { AutoComplete, Popconfirm, Space, Table, Tooltip, message } from "antd";
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
import { IoIosMore } from "react-icons/io";
import { LoadingProvider } from "../App";

const getRandomuserParams = (params: TableParams) => ({
  results: params.pagination?.pageSize,
  page: params.pagination?.current,
  ...params,
});

const ServicesCategoryTable = () => {
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
  const token = localStorage.getItem("auth");

  const deleteServiceCategory = (id: string) => {
    setLoadingCnx(true);
    fetch(import.meta.env.VITE_APP_URL + "/service-category/" + id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        setLoadingCnx(false);
        messageApi.success("Xizmat toifasi muvaffaqqiyatli o'chirildi", 2);
        fetchData();
      })
      .catch(() => {
        setLoadingCnx(false);
        messageApi.success("Xizmat toifasi o'chirishda muommo paydo bo'ldi", 2);
      });
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "Toifa nomi",
      dataIndex: "name",
      sorter: true,
      width: "50%",
      align: "center",
    },
    {
      title: "Bajariladigan ishlar",
      dataIndex: "operation",
      key: "operation",
      align: "center",
      render: (_, record) => {
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
              onConfirm={() => deleteServiceCategory(record.id)}
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
      import.meta.env.VITE_APP_URL +
        `/service-category/?${qs.stringify(getRandomuserParams(tableParams))}`,
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
            total: 1,
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
        placeholder="Toifalarni qidirish"
      />
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
      {contextHolder}
    </>
  );
};

export default ServicesCategoryTable;
