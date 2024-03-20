import { Typography, Flex, Space, Layout, theme } from "antd";
import CreateAccount from "../components/addAccound";
import TableComponent from "../components/table";
import React from "react";
const { Title } = Typography;
const { Content } = Layout;

const Bemorlar: React.FC = () => {
    const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken();

    return (
        <Content style={{ margin: "30px 16px 0" }}>
            <Space
                direction="vertical"
                size="large"
                style={{ display: "flex" }}
            >
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
                    <Title style={{ margin: 0 }}>Bemorlar</Title>
                    <CreateAccount />
                </Flex>
                <TableComponent />
            </Space>
        </Content>
    );
};

export default Bemorlar;
