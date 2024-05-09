import { FC, useEffect, useState } from "react";
import { Table, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import { DataType } from "../types/type";
import dayjs from "dayjs";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  SyncOutlined,
  MinusCircleOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";

const ServiceHistory: FC<{ patient_id: string | undefined }> = ({
  patient_id,
}) => {
  const [data, setData] = useState();
  const token = localStorage.getItem("auth");
  useEffect(() => {
    fetch(import.meta.env.VITE_APP_URL + `/cure/for-patient/` + patient_id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setData(result.result);
      });
  }, [patient_id]);
  const columns: ColumnsType<DataType> = [
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
  ];
  return (
    <Table
      columns={columns}
      dataSource={data}
      rowKey={(record) => record.cure_id}
    />
  );
};
export default ServiceHistory;
