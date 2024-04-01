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
    getItem("Davolashlar", "treatment", <FaSuitcaseMedical />),
    getItem("Sozlamalar", "settings", <SettingOutlined />),
    getItem("Xisobot", "hisobot", <CiBoxList />),
    getItem("Chiqish", "auth", <SlLogout />),
  ];
  const defaultRout = pathname?.split("/")[2];
  const isAuth = localStorage.getItem("auth");
  useEffect(() => {
    if (isAuth !== "admin") {
      navigate("/auth");
    } else {
      !defaultRout && navigate("/" + isAuth + "/" + "statistic");
    }
  }, [isAuth, defaultRout]);

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
              navigate("/auth");
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
