import { Flex, Layout, Typography, theme } from "antd";
import React from "react";
import EditProfile from "../components/EditProfile";
const { Title } = Typography;
const { Content } = Layout;

const Settings: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Content style={{ margin: "24px 16px 0" }}>
      <div
        style={{
          padding: 24,
          minHeight: "100px",
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}
      >
        <Flex align="center" gap={30}>
          <Title style={{ margin: 0 }}>Sozlamalar</Title>
        </Flex>
      </div>
      <EditProfile />
    </Content>
  );
};

export default Settings;
