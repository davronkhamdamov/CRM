import { useContext, useEffect, useState } from "react";
import { LogoutOutlined, PieChartOutlined } from "@ant-design/icons";
import { Flex, Layout, Menu } from "antd";

import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { JSX } from "react/jsx-runtime";
import ProfileAvatar from "../components/ProfileAvatar";
import { ThemeProvider } from "../App";
import { FaSuitcaseMedical } from "react-icons/fa6";

const { Sider } = Layout;

function getItem(label: string, key: string, icon: JSX.Element) {
  return {
    key,
    icon,
    label,
  };
}

const DockerLayout = () => {
  const { theme } = useContext(ThemeProvider);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const items = [
    getItem("Statistika", "statistic", <PieChartOutlined />),
    getItem("Davolashlar", "treatment", <FaSuitcaseMedical />),
    getItem("Chiqish", "auth", <LogoutOutlined />),
  ];
  const defaultRout = pathname?.split("/")[2];
  const isAuth = localStorage.getItem("auth");

  useEffect(() => {
    if (isAuth !== "doctor") {
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
        <Flex align="center" justify="center" style={{ height: "60px" }}>
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
export default DockerLayout;
