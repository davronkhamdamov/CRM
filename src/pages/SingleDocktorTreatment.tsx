import { Typography, Flex, Space, Layout, theme } from "antd";
import SingleDocktorTreatmentCm from "../components/SingleDocktorTreatment";
import { Link } from "react-router-dom";
import { IoArrowBackSharp } from "react-icons/io5";
const { Title } = Typography;
const { Content } = Layout;

const SingleDocktorTreatment = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Content
      style={{
        margin: "30px 16px 0",
      }}
    >
      <Link to={location.pathname.split("/").splice(0, 3).join("/")}>
        <Flex align="center" gap={5}>
          <IoArrowBackSharp />
          <p>Davolashlar ro'yhatiga qaytish</p>
        </Flex>
      </Link>
      <br />
      <Space direction="vertical" size="large" style={{ display: "flex" }}>
        <Flex
          gap={50}
          align="center"
          style={{
            padding: 24,
            minHeight: 110,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Title style={{ margin: 0 }}>Davolash</Title>
        </Flex>
        <SingleDocktorTreatmentCm />
      </Space>
    </Content>
  );
};

export default SingleDocktorTreatment;
