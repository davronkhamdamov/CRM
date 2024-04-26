import { Typography, Flex, Space, Layout, theme } from "antd";
import React from "react";
import ServiceCategoryTable from "../components/ServiceCategoryTable";
import AddServiceCategory from "../components/AddServiceCategory";
const { Title } = Typography;
const { Content } = Layout;

const ServiceCategory: React.FC = () => {
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
          <Title style={{ margin: 0 }}>Xizmatlar toifalari</Title>
          <AddServiceCategory />
        </Flex>
        <ServiceCategoryTable />
      </Space>
    </Content>
  );
};

export default ServiceCategory;
