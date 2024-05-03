import { Popconfirm, Space, Table, Tooltip, message } from "antd";
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
import { LoadingProvider } from "../App";
import EditServiceCategory from "./EditServiceCategory";

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
  const [serviceCategoryModal, setServiceCategoryModal] = useState<EditModal>({
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
        messageApi.error("Xizmat toifasi o'chirishda muommo paydo bo'ldi", 2);
      });
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "Toifa nomi",
      dataIndex: "name",
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
              <EditTwoTone
                onClick={() => {
                  setServiceCategoryModal({
                    id: record.id,
                    isOpen: true,
                  });
                }}
              />
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

  return (
    <>
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
      <EditServiceCategory
        data={serviceCategoryModal}
        setOpen={setServiceCategoryModal}
      />
      {contextHolder}
    </>
  );
};

export default ServicesCategoryTable;
