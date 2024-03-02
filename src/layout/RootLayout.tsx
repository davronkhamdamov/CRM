import { useEffect, useState } from "react";
import {
    LogoutOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Tooltip } from "antd";

import { Outlet, useNavigate } from "react-router-dom";
import { JSX } from "react/jsx-runtime";

const { Sider } = Layout;

function getItem(
    label: string,
    key: string,
    icon: JSX.Element,
    children: undefined
) {
    return {
        key,
        icon,
        children,
        label,
    };
}

const RootLayout = () => {
    const getCurrentTheme = () =>
        window.matchMedia("(prefers-color-scheme: dark)").matches;
    let [themeMode, setThemeMode] = useState("");
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem("theme") === "system") {
            setThemeMode(getCurrentTheme() ? "dark" : "light");
        } else if (!["dark", "light"].includes(localStorage.getItem("theme"))) {
            setThemeMode("light");
            localStorage.setItem("theme", "light");
        } else {
            setThemeMode(localStorage.getItem("theme"));
        }
    }, [themeMode]);
    const items = [
        getItem("Statistika", "statistic", <PieChartOutlined />),
        getItem(
            "Admin",
            "admin",
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                fill={themeMode === "dark" ? "#f2f2f2" : "#000"}
                width={14}
            >
                <path d="M96 128a128 128 0 1 0 256 0A128 128 0 1 0 96 128zm94.5 200.2l18.6 31L175.8 483.1l-36-146.9c-2-8.1-9.8-13.4-17.9-11.3C51.9 342.4 0 405.8 0 481.3c0 17 13.8 30.7 30.7 30.7H162.5c0 0 0 0 .1 0H168 280h5.5c0 0 0 0 .1 0H417.3c17 0 30.7-13.8 30.7-30.7c0-75.5-51.9-138.9-121.9-156.4c-8.1-2-15.9 3.3-17.9 11.3l-36 146.9L238.9 359.2l18.6-31c6.4-10.7-1.3-24.2-13.7-24.2H224 204.3c-12.4 0-20.1 13.6-13.7 24.2z" />
            </svg>
        ),
        getItem(
            "To'lov",
            "payment",
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
                fill={themeMode === "dark" ? "#f2f2f2" : "#000"}
                width={14}
            >
                <path d="M512 80c8.8 0 16 7.2 16 16v32H48V96c0-8.8 7.2-16 16-16H512zm16 144V416c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V224H528zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm56 304c-13.3 0-24 10.7-24 24s10.7 24 24 24h48c13.3 0 24-10.7 24-24s-10.7-24-24-24H120zm128 0c-13.3 0-24 10.7-24 24s10.7 24 24 24H360c13.3 0 24-10.7 24-24s-10.7-24-24-24H248z" />
            </svg>
        ),
        getItem("Foydalanuvchilar", "patient", <UserOutlined />),
        getItem("Shifokorlar", "doctors", <TeamOutlined />),
        getItem("Log out", "auth", <LogoutOutlined />),
    ];

    return (
        <Layout hasSider>
            <Sider
                breakpoint="lg"
                theme={themeMode}
                collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
                style={{
                    height: "100vh",
                }}
            >
                <Tooltip placement="right" title="Logo">
                    <div className="demo-logo">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={30}
                            fill={themeMode === "dark" ? "#f2f2f2" : "#000"}
                            viewBox="0 0 384 512"
                        >
                            <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
                        </svg>
                    </div>
                </Tooltip>
                <Menu
                    theme={themeMode}
                    mode="inline"
                    defaultSelectedKeys={["patient"]}
                    items={items}
                    onClick={(e) => {
                        navigate("/" + e.key);
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
