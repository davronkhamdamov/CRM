import { useContext, useState } from "react";
import {
    LogoutOutlined,
    PieChartOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { Flex, Layout, Menu } from "antd";

import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { JSX } from "react/jsx-runtime";
import ProfileAvatar from "../components/ProfileAvatar";
import { MdPayments } from "react-icons/md";
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

const RootLayout = () => {
    const { theme } = useContext(ThemeProvider);
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const [collapsed, setCollapsed] = useState(false);

    const items = [
        getItem("Statistika", "statistic", <PieChartOutlined />),
        getItem(
            "To'lovlar",
            "payment",
            <MdPayments color={theme === "dark" ? "#f2f2f2" : "#000"} />
        ),
        getItem("Bemorlar", "patient", <UserOutlined />),
        getItem("Davolashlar", "treatment", <FaSuitcaseMedical />),
        getItem("Log out", "auth", <LogoutOutlined />),
    ];

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
                <Flex
                    align="center"
                    justify="center"
                    style={{ height: "60px" }}
                >
                    <ProfileAvatar />
                </Flex>
                <Menu
                    theme={
                        "light" === theme || "dark" === theme ? theme : "dark"
                    }
                    mode="inline"
                    defaultSelectedKeys={[pathname.split("/")[2]]}
                    items={items}
                    onClick={(e) => {
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
