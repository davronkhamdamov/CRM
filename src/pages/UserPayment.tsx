import { Layout, Space, Typography, theme } from "antd";
import React from "react";
import UserPaymentsTable from "../components/UserPaymentsTable";
const { Title } = Typography;
const { Content } = Layout;

const Payment: React.FC = () => {
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
            alignItems: "center",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Title style={{ margin: 0 }}>To'lovlarim</Title>
        </div>
        <UserPaymentsTable />
      </Space>
    </Content>
  );
};

export default Payment;
