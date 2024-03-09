import { Flex, Layout, Typography, theme } from "antd";
import React from "react";
const { Title } = Typography;
const { Content } = Layout;

const Services: React.FC = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <Content style={{ margin: "24px 16px 0" }}>
            <div
                style={{
                    padding: 24,
                    minHeight: "100px",
                    background: colorBgContainer,
                    borderRadius: borderRadiusLG,
                }}
            >
                <Flex align="center" gap={30}>
                    <Title style={{ margin: 0 }}>Xizmatlar</Title>
                </Flex>
            </div>
        </Content>
    );
};

export default Services;
