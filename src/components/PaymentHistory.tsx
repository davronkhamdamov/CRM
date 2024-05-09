import React, { FC, useEffect, useState } from "react";
import { Table, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import formatMoney from "../lib/money_format";

const { Column } = Table;

interface DataType {
  id: string;
  key: React.Key;
  name: string;
  lastName: string;
  age: number;
  address: string;
  tags: string;
}

const PaymentHistory: FC<{ patient_id: string | undefined }> = ({
  patient_id,
}) => {
  const token = localStorage.getItem("auth");
  const [userData, setUserData] = useState();
  useEffect(() => {
    fetch(import.meta.env.VITE_APP_URL + "/payment/for-patient/" + patient_id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUserData(data.result);
      });
  }, [patient_id]);

  const columns: ColumnsType<DataType> = [
    {
      title: "To'lov qilgan vaqti",
      dataIndex: "created_at",
      render: (registered) => `${dayjs(registered?.date).format("DD-MM-YYYY")}`,
      width: "15%",
    },
    {
      title: "To'lov turi",
      dataIndex: "method",
      render: (location) => `${location}`,
      width: "15%",
    },
    {
      title: "Tolov miqdori",
      dataIndex: "amount",
      render: (balance) => {
        if (balance < 0) {
          return <Tag color="error">{formatMoney(balance)}</Tag>;
        }
        return <Tag color="default">{formatMoney(balance)}</Tag>;
      },
      width: "15%",
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={userData}
      rowKey={(record) => record.id}
    >
      <Column title="To'lov miqdori" dataIndex="name" key="name" />
      <Column title="To'lov turi" dataIndex="lastName" key="lastName" />
      <Column title="Sana" dataIndex="age" key="age" />
    </Table>
  );
};
export default PaymentHistory;
