import React, { useEffect, useState } from "react";
import "./App.css";
import {
    LogoutOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { Flex, Select, Space, Tooltip } from "antd";
import { Layout, Menu, theme } from "antd";
import { Typography } from "antd";
import CreateAccount from "./components/addAccound.jsx";
import TableComponent from "./components/table.jsx";

const { Title } = Typography;
const { Content, Sider } = Layout;

function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}

const App = () => {
    const getCurrentTheme = () =>
        window.matchMedia("(prefers-color-scheme: dark)").matches;
    let [themeMode, setThemeMode] = useState("");
    const [collapsed, setCollapsed] = useState(false);

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
        getItem("Statistika", "1", <PieChartOutlined />),
        getItem(
            "To'lov",
            "2",
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
                fill={themeMode === "dark" ? "#f2f2f2" : "#000"}
                width={14}
            >
                <path d="M512 80c8.8 0 16 7.2 16 16v32H48V96c0-8.8 7.2-16 16-16H512zm16 144V416c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V224H528zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm56 304c-13.3 0-24 10.7-24 24s10.7 24 24 24h48c13.3 0 24-10.7 24-24s-10.7-24-24-24H120zm128 0c-13.3 0-24 10.7-24 24s10.7 24 24 24H360c13.3 0 24-10.7 24-24s-10.7-24-24-24H248z" />
            </svg>
        ),
        getItem("Foydalanuvchilar", "sub1", <UserOutlined />, [
            getItem("Tom", "3"),
            getItem("Bill", "4"),
            getItem("Alex", "5"),
        ]),
        getItem("Shifokorlar", "sub2", <TeamOutlined />, [
            getItem("Shifokorlar 1", "6"),
            getItem("Shifokorlar 2", "8"),
        ]),
        getItem("Log out", "9", <LogoutOutlined />),
    ];

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const handleChange = (value) => {
        if (value === "system") {
            setThemeMode(getCurrentTheme() ? "dark" : "light");
            localStorage.setItem("theme", "system");
        } else {
            setThemeMode(value);
            localStorage.setItem("theme", value);
        }
    };
    return (
        <Layout hasSider>
            <Sider
                theme={themeMode}
                collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
                style={{
                    overflow: "auto",
                    height: "100vh",
                    position: "fixed",
                    left: 0,
                    top: 0,
                    bottom: 0,
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
                    defaultSelectedKeys={["1"]}
                    items={items}
                />
            </Sider>
            <Layout
                style={{
                    marginLeft: collapsed ? 100 : 200,
                }}
            >
                <Content
                    style={{
                        margin: "30px 16px 0",
                    }}
                >
                    <Space
                        direction="vertical"
                        size="large"
                        style={{ display: "flex" }}
                    >
                        <Flex>
                            <Select
                                defaultValue={() => {
                                    if (themeMode == "light") {
                                        return "Yorug' mavzu";
                                    } else if (themeMode === "light") {
                                        return "Tungi mavzu";
                                    } else {
                                        return "Sistema mavzusi";
                                    }
                                }}
                                style={{
                                    width: 200,
                                }}
                                onChange={handleChange}
                                options={[
                                    {
                                        value: "light",
                                        label: "Yorug' mavzu",
                                    },
                                    {
                                        value: "dark",
                                        label: "Tungi mavzu",
                                    },
                                    {
                                        value: "system",
                                        label: "Sistema mavzusi",
                                    },
                                ]}
                            />
                        </Flex>
                        <Flex
                            justify="space-between"
                            align="center"
                            style={{
                                padding: 24,
                                minHeight: 110,
                                background: colorBgContainer,
                                borderRadius: borderRadiusLG,
                            }}
                        >
                            <Title style={{ margin: 0 }}>Title</Title>
                            <CreateAccount />
                        </Flex>
                        <TableComponent />
                    </Space>
                </Content>
            </Layout>
        </Layout>
    );
};
export default App;
