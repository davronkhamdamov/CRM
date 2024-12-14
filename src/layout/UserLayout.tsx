import { useContext, useEffect, useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import { Flex, Layout, Menu } from "antd";

import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { JSX } from "react/jsx-runtime";
import ProfileAvatar from "../components/ProfileAvatar";
import { ThemeProvider } from "../App";
import { FaDollarSign, FaSuitcaseMedical } from "react-icons/fa6";
import { GrSchedule } from "react-icons/gr";
import { SlLogout } from "react-icons/sl";

const { Sider } = Layout;

function getItem(label: string, key: string, icon: JSX.Element) {
  return {
    key,
    icon,
    label,
  };
}
const UserLayout = () => {
  const { theme } = useContext(ThemeProvider);
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const { pathname } = useLocation();

  const items = [
    getItem("Profilim", "profile", <UserOutlined />),
    getItem(
      "To'lovlarim",
      "payment",
      <FaDollarSign color={theme === "dark" ? "#f2f2f2" : "#000"} />
    ),
    getItem("Taqvim", "schedule", <GrSchedule />),
    getItem("Davolashlarim", "treatment", <FaSuitcaseMedical />),
    getItem("Chiqish", "auth", <SlLogout />),
  ];
  const defaultRout = pathname?.split("/")[2];
  const token = localStorage.getItem("auth");
  useEffect(() => {
    fetch(import.meta.env.VITE_APP_URL + "/user/get-me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.detail === "Invalid token") {
          navigate("/auth");
        }

        if (!defaultRout) {
          navigate("/home" + "/payment");
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

export default UserLayout;
