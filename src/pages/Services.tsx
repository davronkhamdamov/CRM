import { Layout, Space, Typography, theme } from "antd";
import React from "react";
import ServicesTable from "../components/ServicesTable";
import AddService from "../components/AddService";
const { Title } = Typography;
const { Content } = Layout;

const Services: React.FC = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <Content style={{ margin: "30px 16px 0" }}>
            <Space
                direction="vertical"
                size="large"
                style={{ display: "flex" }}
            >
                <div
                    style={{
                        padding: 24,
                        minHeight: 110,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <Title style={{ margin: 0 }}>Xizmatlar</Title>
                    <AddService />
                </div>
                <ServicesTable />
            </Space>
        </Content>
    );
};

export default Services;
