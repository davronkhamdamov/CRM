import { useContext, useEffect, useState } from "react";
import {
  PieChartOutlined,
  UserOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Flex, Layout, Menu } from "antd";

import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { JSX } from "react/jsx-runtime";
import ProfileAvatar from "../components/ProfileAvatar";
import { MdPayments } from "react-icons/md";
import { ThemeProvider } from "../App";
import { FaDollarSign, FaSuitcaseMedical, FaUserDoctor } from "react-icons/fa6";
import { GrServices } from "react-icons/gr";
import { CiBoxList } from "react-icons/ci";
import { SlLogout } from "react-icons/sl";
import { BiCategory } from "react-icons/bi";

const { Sider } = Layout;

function getItem(label: string, key: string, icon: JSX.Element) {
  return {
    key,
    icon,
    label,
  };
}

const RootLayout = () => {
  const { theme } = useContext(ThemeProvider);
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const { pathname } = useLocation();

  const items = [
    getItem("Statistika", "statistic", <PieChartOutlined />),
    getItem(
      "To'lov",
      "payment",
      <FaDollarSign color={theme === "dark" ? "#f2f2f2" : "#000"} />
    ),
    getItem("Bemorlar", "patient", <UserOutlined />),
    getItem("Shifokorlar", "doctors", <FaUserDoctor />),
    getItem("To'lov turlari", "payment-type", <MdPayments />),
    getItem("Xizmatlar", "services", <GrServices />),
    getItem("Xizmatlar toifasi", "service-category", <BiCategory />),
    getItem("Davolashlar", "treatment", <FaSuitcaseMedical />),
    getItem("Sozlamalar", "settings", <SettingOutlined />),
    getItem("Xisobot", "hisobot", <CiBoxList />),
    getItem("Chiqish", "auth", <SlLogout />),
  ];
  const defaultRout = pathname?.split("/")[2];
  const token = localStorage.getItem("auth");
  useEffect(() => {
    fetch(import.meta.env.VITE_APP_URL + "/staffs/get-me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.detail === "Invalid token") {
          navigate("/auth");
        }
        if (!["reception", "admin", "doctor"].includes(data?.result?.role)) {
          navigate("/auth");
        } else if (defaultRout[1] !== data?.result?.role) {
          !defaultRout[2] && navigate("/" + data?.result?.role + "/statistic");
        }
      });
  }, [token, defaultRout]);

  return (
    <Layout hasSider>
      <Sider
        breakpoint="lg"
        theme={"light" === theme || "dark" === theme ? theme : "dark"}
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        style={{
          minHeight: "100vh",
        }}
      >
        <Flex justify="center" style={{ height: "50px", marginTop: 20 }}>
          <ProfileAvatar />
        </Flex>
        <Menu
          theme={"light" === theme || "dark" === theme ? theme : "dark"}
          mode="inline"
          defaultSelectedKeys={[pathname.split("/")[2] || "statistic"]}
          items={items}
          onClick={(e) => {
            if (e.key === "auth") {
              navigate("auth");
              localStorage.removeItem("auth");
            }
            navigate(e.key);
          }}
        />
      </Sider>
      <Layout>
        <Outlet />
      </Layout>
    </Layout>
  );
};
export default RootLayout;
