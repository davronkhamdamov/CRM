import { Flex, Layout, Statistic, Typography, theme } from "antd";
import React from "react";
const { Title } = Typography;
import CountUp from "react-countup";
import { FaUserMd } from "react-icons/fa";
import { FaUserLarge } from "react-icons/fa6";
import { GiReceiveMoney } from "react-icons/gi";
import { MdOutlineMedicalServices } from "react-icons/md";
import LineChartFC from "../components/lineChart";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import PieChartFC from "../components/PieChart";

const { Content } = Layout;
type Formatter = (value: number | string) => JSX.Element;

const formatter: Formatter = (value) => {
  const numericValue = typeof value === "string" ? parseFloat(value) : value;
  return <CountUp end={numericValue} separator="," />;
};
const Statistica: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Content style={{ margin: "30px 16px 0" }}>
      <div
        style={{
          padding: 24,
          minHeight: 110,
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Title style={{ margin: 0 }}>Statistika</Title>
      </div>
      <br />
      <Flex
        style={{
          padding: 24,
          minHeight: "200px",
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}
      >
        <Flex justify="space-around" style={{ width: "100%" }} gap={10}>
          <Flex
            justify="space-evenly"
            vertical
            style={{
              maxWidth: 350,
              width: "100%",
              background: "#082f49",
              padding: "20px 30px",
              borderRadius: 15,
              color: "#e5e5e5",
            }}
          >
            <FaUserMd size={30} />
            <Statistic
              value={10}
              formatter={formatter}
              valueStyle={{ color: "white" }}
            />
            <p>Umumiy shifokorlar soni</p>
          </Flex>
          <Flex
            justify="space-evenly"
            vertical
            style={{
              maxWidth: 350,
              width: "100%",
              background: "#082f49",
              padding: "20px 30px",
              borderRadius: 15,
              color: "#e5e5e5",
            }}
          >
            <FaUserLarge size={30} />
            <Statistic
              value={341}
              valueStyle={{ color: "white" }}
              precision={2}
              formatter={formatter}
            />
            <p>Umumiy bemorlar soni</p>
          </Flex>
          <Flex
            justify="space-evenly"
            vertical
            style={{
              maxWidth: 350,
              width: "100%",
              background: "#082f49",
              padding: "20px 30px",
              borderRadius: 15,
              color: "#e5e5e5",
            }}
          >
            <MdOutlineMedicalServices size={30} />
            <Statistic
              value={23}
              valueStyle={{ color: "white" }}
              precision={2}
              formatter={formatter}
            />
            <p>Hamma xizmatlar soni</p>
          </Flex>
          <Flex
            justify="space-evenly"
            vertical
            style={{
              width: "100%",
              maxWidth: 350,
              background: "#082f49",
              padding: "20px 30px",
              borderRadius: 15,
              color: "#e5e5e5",
            }}
          >
            <GiReceiveMoney size={30} />
            <Statistic
              value={12}
              valueStyle={{ color: "white" }}
              precision={2}
              formatter={formatter}
            />
            <p>Qarzdorlar bemorlar soni</p>
          </Flex>
        </Flex>
      </Flex>
      <br />
      <Flex>
        <div
          style={{
            padding: 24,
            width: "70%",
            minHeight: "500px",
            height: "50vh",
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            display: "flex",
            flexDirection: "column",
            gap: "30px",
          }}
        >
          <Flex
            style={{
              width: "100%",
              height: "100px",
            }}
            justify="space-around"
          >
            <Statistic
              title="Shu oydagi hisob"
              value={1.28}
              precision={2}
              valueStyle={{ color: "#3f8600" }}
              prefix={<ArrowUpOutlined />}
              suffix="%"
            />
            <Statistic
              title="O'tgan oydagi hisob"
              value={0.3}
              precision={2}
              valueStyle={{ color: "#cf1322" }}
              prefix={<ArrowDownOutlined />}
              suffix="%"
            />
          </Flex>
          <LineChartFC />
        </div>
        <div
          style={{
            padding: 24,
            width: "30%",
            minHeight: "500px",
            height: "50vh",
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            display: "flex",
            flexDirection: "column",
            gap: "30px",
          }}
        >
          <PieChartFC />
        </div>
      </Flex>
    </Content>
  );
};

export default Statistica;
