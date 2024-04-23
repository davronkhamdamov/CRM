import React from "react";
import { Table } from "antd";

const { Column } = Table;

interface DataType {
  key: React.Key;
  name: string;
  lastName: string;
  age: number;
  address: string;
  tags: string;
}

const data: DataType[] = [
  {
    key: "1",
    name: "John",
    lastName: "Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: "active",
  },
  {
    key: "2",
    name: "Jim",
    lastName: "Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: "active",
  },
  {
    key: "3",
    name: "Joe",
    lastName: "Black",
    age: 32,
    address: "Sydney No. 1 Lake Park",
    tags: "active",
  },
];

const PaymentHistory = () => {
  return (
    <Table dataSource={data}>
      <Column title="To'lov miqdori" dataIndex="name" key="name" />
      <Column title="To'lov turi" dataIndex="lastName" key="lastName" />
      <Column title="Sana" dataIndex="age" key="age" />
    </Table>
  );
};
export default PaymentHistory;
