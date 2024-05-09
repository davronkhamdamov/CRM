import { Flex, Layout, Typography, theme } from "antd";
import StaffsTable from "../components/StaffsTable";
const { Title } = Typography;
const { Content } = Layout;

const Hisobot = () => {
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
          <Title style={{ margin: 0 }}>Hisobotlar</Title>
        </Flex>
      </div>
      <StaffsTable />
    </Content>
  );
};

export default Hisobot;
