import { Typography, Flex, Space, Layout, theme } from "antd";
import UserTreatmentTable from "../components/UserTreatmentTable";
import React from "react";
const { Title } = Typography;
const { Content } = Layout;

const Treatment: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Content
      style={{
        margin: "30px 16px 0",
      }}
    >
      <Space direction="vertical" size="large" style={{ display: "flex" }}>
        <Flex
          justify="space-between"
          align="center"
          style={{
            padding: 24,
            minHeight: 110,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Title style={{ margin: 0 }}>Davolashlarim</Title>
        </Flex>
        <UserTreatmentTable />
      </Space>
    </Content>
  );
};

export default Treatment;
