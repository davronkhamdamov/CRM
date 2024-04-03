import { Flex, Layout, Typography, theme } from "antd";
import React from "react";
import { Link, useParams } from "react-router-dom";
const { Title } = Typography;
const { Content } = Layout;
import { IoArrowBackSharp } from "react-icons/io5";

const SingleDocktor: React.FC = () => {
    const params = useParams();
    console.log(params.id);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <Content style={{ margin: "24px 16px 0" }}>
            <div
                style={{
                    padding: 24,
                    minHeight: "96vh",
                    background: colorBgContainer,
                    borderRadius: borderRadiusLG,
                }}
            >
                <Link to="/admin/doctors">
                    <Flex align="center" gap={5}>
                        <IoArrowBackSharp />
                        <p>Doktorlar ro'yhatiga qaytish</p>
                    </Flex>
                </Link>
                <br />
                <Flex align="center" gap={30}>
                    <Title style={{ margin: 0 }}>Usmonov Nosir</Title>
                </Flex>
            </div>
        </Content>
    );
};

export default SingleDocktor;
