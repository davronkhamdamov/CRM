import { useContext, useState } from "react";
import {
    LogoutOutlined,
    PieChartOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { Flex, Layout, Menu } from "antd";

import { Outlet, useNavigate } from "react-router-dom";
import { JSX } from "react/jsx-runtime";
import ProfileAvatar from "../components/ProfileAvatar";
import { MdPayments } from "react-icons/md";
import { ThemeProvider } from "../App";

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

    const items = [
        getItem("Statistika", "statistic", <PieChartOutlined />),
        getItem(
            "To'lov",
            "payment",
            <MdPayments color={theme === "dark" ? "#f2f2f2" : "#000"} />
        ),
        getItem("Foydalanuvchilar", "patient", <UserOutlined />),
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
                    defaultSelectedKeys={["patient"]}
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
