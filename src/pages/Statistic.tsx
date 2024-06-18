import { Button, Flex, Layout, Statistic, Typography, theme } from "antd";
import React, { useEffect, useState } from "react";
const { Title } = Typography;
import CountUp from "react-countup";
import { FaUserMd } from "react-icons/fa";
import { FaUserLarge } from "react-icons/fa6";
import { GiReceiveMoney } from "react-icons/gi";
import { MdOutlineMedicalServices } from "react-icons/md";
import LineChartFC from "../components/lineChart";
import PieChartFC from "../components/PieChart";
import { StatisticType } from "../types/type";
import dayjs from "dayjs";

const { Content } = Layout;
type Formatter = (value: number | string) => JSX.Element;

const formatter: Formatter = (value) => {
  const numericValue = typeof value === "string" ? parseFloat(value) : value;
  return <CountUp end={numericValue} separator="," />;
};
const Statistica: React.FC = () => {
  const token = localStorage.getItem("auth");
  const [statistic, setStatistic] = useState<StatisticType>({
    staffs: 0,
    services: 0,
    qarz: 0,
    patient: 0,
  });
  const [month, setMonth] = useState(dayjs());

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  useEffect(() => {
    fetch(import.meta.env.VITE_APP_URL + "/staffs/count", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) =>
        setStatistic((prev) => {
          return { ...prev, staffs: data.result };
        })
      );
    fetch(import.meta.env.VITE_APP_URL + "/user/count", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) =>
        setStatistic((prev) => {
          return { ...prev, patient: data.result };
        })
      );
    fetch(import.meta.env.VITE_APP_URL + "/service/count", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setStatistic((prev) => {
          return { ...prev, services: data.result };
        });
      });
    fetch(import.meta.env.VITE_APP_URL + "/user/qarz-count", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setStatistic((prev) => {
          return { ...prev, qarz: data.result };
        });
      });
  }, [token]);
  return (
    <>
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
                value={statistic?.staffs}
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
                value={statistic.patient}
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
                value={statistic.services}
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
                value={statistic.qarz}
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
              width: "100%",
              minHeight: "600px",
              height: "50vh",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              display: "flex",
              flexDirection: "column",
              gap: "30px",
            }}
          >
            <Flex vertical align="center" gap={20}>
              <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
                Maosh bo'yicha statistika
              </h2>
              <Flex gap={40}>
                <Button
                  type="primary"
                  onClick={() => {
                    setMonth(month.add(-1, "month"));
                  }}
                >
                  Avvalgi oy
                </Button>
                <Button
                  type="primary"
                  onClick={() => {
                    setMonth(dayjs());
                  }}
                >
                  Hozirgi oy
                </Button>
                <Button
                  type="primary"
                  onClick={() => {
                    setMonth(month.add(1, "month"));
                  }}
                >
                  Keyingi oy
                </Button>
              </Flex>
              <p style={{ fontSize: "23px" }}>{month.format("YYYY-MM")}</p>
            </Flex>
            <LineChartFC month={month} />
          </div>
        </Flex>
        <div
          style={{
            padding: 24,
            height: "500px",
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            paddingBottom: 100,
          }}
        >
          <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
            Manzil bo'yicha statistika
          </h2>
          <PieChartFC />
        </div>
      </Content>
    </>
  );
};

export default Statistica;
