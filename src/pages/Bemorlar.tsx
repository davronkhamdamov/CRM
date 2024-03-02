import { useEffect, useState } from "react";

import { Typography, Flex, Select, Space, Layout, theme } from "antd";
import CreateAccount from "../components/addAccound";
import TableComponent from "../components/table";
const { Title } = Typography;
const { Content } = Layout;

const Bemorlar = () => {
    const getCurrentTheme = () =>
        window.matchMedia("(prefers-color-scheme: dark)").matches;
    let [themeMode, setThemeMode] = useState("");

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
                {/* <Flex>
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
                </Flex> */}
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
    );
};

export default Bemorlar;
