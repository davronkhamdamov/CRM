import { Space, Table, Tag, Tooltip } from "antd";
import qs from "qs";

import { useEffect, useState } from "react";
import {
  LoadingOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  SyncOutlined,
  MinusCircleOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import type { TableProps } from "antd";
import { DataType, EditModal, TableParams } from "../types/type";
import { ColumnsType } from "antd/es/table";
import { MdOutlinePayment } from "react-icons/md";
import dayjs from "dayjs";
import { IoIosMore } from "react-icons/io";
import AddPaymentCure from "./AddPaymentCure";
import TreatmentModal from "./TreatmentModal";

const getUserParams = (params: TableParams) => ({
  results: params.pagination?.pageSize,
  page: params.pagination?.current,
  ...params,
});
const Treatment = () => {
  // const [messageApi, contextHolder] = message.useMessage();
  const [data, setData] = useState<DataType[]>();
  const [loading, setLoading] = useState(false);
  const [openPaymentModal, setOpenPaymentModal] = useState<EditModal>({
    id: "",
    isOpen: false,
  });
  const [view, setView] = useState({
    data: "",
    isOpen: false,
  });
  // const [toLoading, setToLoading] = useState(false);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  // const cancel = () => {
  //   setToLoading(true);
  //   setTimeout(() => {
  //     setToLoading(false);
  //     messageApi.success("Davolash muvaffaqqiyatli o'chirildi", 2);
  //   }, 2000);
  // };

  const columns: ColumnsType<DataType> = [
    {
      title: "Ismi",
      render: (record) => {
        return (
          <a href={`patient/${record.user_id}`}>
            {record.user_name} {record.user_surname}
          </a>
        );
      },
      width: "10%",
    },
    {
      title: "Shifokor",
      render: (name) => `${name?.staff_name + " " + name?.staff_surname}`,
      width: "10%",
    },
    {
      title: "Davolash vaqti",
      render: (dob) =>
        `${dayjs(dob?.start_time).format("HH:MM")} - ${dayjs(
          dob?.end_time
        ).format("HH:MM DD-MM-YYYY")}`,
      width: "15%",
    },
    {
      title: "To'lov summasi",
      dataIndex: "price",
      render: (price) => (price ? price + " so'm" : "0 so'm"),
      width: "10%",
    },
    {
      title: "To'langan summa",
      dataIndex: "payed_price",
      render: (price) => (price ? price + " so'm" : "0 so'm"),
      width: "10%",
    },
    {
      title: "To'lov holati",
      width: "6%",
      render: (record) => {
        if (record.price === 0) {
          return (
            <Tag icon={<ClockCircleOutlined />} color="default">
              Kutilmoqda
            </Tag>
          );
        } else if (record.payed_price === record.price) {
          return (
            <Tag icon={<CheckCircleOutlined />} color="success">
              To'landi
            </Tag>
          );
        } else if (record.payed_price == record.price) {
          return (
            <Tag icon={<CheckCircleOutlined />} color="success">
              To'landi
            </Tag>
          );
        } else if (record.payed_price == 0) {
          return (
            <Tag icon={<CloseCircleOutlined />} color="error">
              To'lanmadi
            </Tag>
          );
        } else {
          return (
            <Tag icon={<SyncOutlined />} color="processing">
              To'liq to'lanmadi
            </Tag>
          );
        }
      },
    },
    {
      title: "Holati",
      dataIndex: "is_done",
      width: "6%",
      render: (is_done) => {
        switch (is_done) {
          case "Yakunlandi":
            return (
              <Tag icon={<CheckCircleOutlined />} color="success">
                Yakunlandi
              </Tag>
            );
          case "Jarayonda":
            return (
              <Tag icon={<SyncOutlined spin />} color="processing">
                Jarayonda
              </Tag>
            );
          case "Kutilmoqda":
            return (
              <Tag icon={<ClockCircleOutlined />} color="default">
                Kutilmoqda
              </Tag>
            );
          case "To'xtatilgan":
            return (
              <Tag icon={<MinusCircleOutlined />} color="default">
                To'xtatilgan
              </Tag>
            );
          default:
            return (
              <Tag icon={<CloseCircleOutlined />} color="error">
                Xatolik
              </Tag>
            );
        }
      },
    },
    {
      title: "Bajariladigan ishlar",
      dataIndex: "operation",
      key: "operation",
      align: "center",
      width: "15%",
      render: (_, record) => {
        return (
          <Space size="middle">
            {record.payed_price !== record.price && (
              <Tooltip placement="bottom" title="To'lash">
                <MdOutlinePayment
                  style={{ cursor: "pointer" }}
                  color="dodgerblue"
                  onClick={() => {
                    if (openPaymentModal.id !== record.cure_id) {
                      setOpenPaymentModal({
                        id: record.cure_id,
                        isOpen: true,
                      });
                    }
                  }}
                />
              </Tooltip>
            )}
            <Tooltip placement="bottom" title="Ko'proq ma'lumot">
              <IoIosMore
                color="#3b82f6"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setView({ data: record.cure_id, isOpen: true });
                }}
              />
            </Tooltip>
            {/* <Popconfirm
              title="O'chirishga ishonchingiz komilmi?"
              onConfirm={cancel}
            >
              <Tooltip placement="bottom" title="O'chirish">
                <DeleteOutlined style={{ color: "red", cursor: "pointer" }} />
              </Tooltip>
            </Popconfirm> */}
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
  const token = localStorage.getItem("auth");
  const fetchData = () => {
    setLoading(true);
    fetch(
      import.meta.env.VITE_APP_URL +
        `/cure?${qs.stringify(getUserParams(tableParams))}`,
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
        rowKey={(record) => record.cure_id}
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
      <TreatmentModal setData={setView} data={view} />
      <AddPaymentCure data={openPaymentModal} setOpen={setOpenPaymentModal} />
      {/* {contextHolder} */}
    </>
  );
};

export default Treatment;
