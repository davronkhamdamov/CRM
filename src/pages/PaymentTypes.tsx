import { Layout, Space, Typography, theme } from "antd";
import React from "react";
import PaymentTypeTable from "../components/PaymentTypeTable";
import CreatePaymentType from "../components/CreatePaymentType";
const { Title } = Typography;
const { Content } = Layout;

const PaymentType: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Content style={{ margin: "30px 16px 0" }}>
      <Space direction="vertical" size="large" style={{ display: "flex" }}>
        <div
          style={{
            padding: 24,
            minHeight: 110,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Title style={{ margin: 0 }}>To'lov turlari</Title>
          <CreatePaymentType />
        </div>
        <PaymentTypeTable />
      </Space>
    </Content>
  );
};

export default PaymentType;
