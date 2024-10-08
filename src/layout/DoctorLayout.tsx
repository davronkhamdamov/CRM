import { useContext, useEffect, useState } from "react";
import { LogoutOutlined, PieChartOutlined } from "@ant-design/icons";
import { Flex, Layout, Menu } from "antd";

import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { JSX } from "react/jsx-runtime";
import ProfileAvatar from "../components/ProfileAvatar";
import { ThemeProvider } from "../App";
import { FaSuitcaseMedical } from "react-icons/fa6";
import { CiBoxList } from "react-icons/ci";
import { GrSchedule } from "react-icons/gr";

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
    getItem("Ortopedik davolashlar", "orta-treatment", <FaSuitcaseMedical />),
    getItem("Taqvim", "schedule", <GrSchedule />),
    getItem("Xisobot", "hisobot", <CiBoxList />),
    getItem("Chiqish", "auth", <LogoutOutlined />),
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
        } else if (defaultRout[1] !== data.result.role) {
          !defaultRout[2] && navigate("/" + data.result.role + "/statistic");
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
export default DockerLayout;
