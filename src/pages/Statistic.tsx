import { Col, Flex, Layout, Statistic, Typography, theme } from "antd";
import React from "react";
const { Title } = Typography;
import CountUp from "react-countup";

const { Content } = Layout;

const formatter = (value: number) => <CountUp end={value} separator="," />;

const Statistica: React.FC = () => {
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
                    <Title style={{ margin: 0 }}>Statistika</Title>
                </Flex>
            </div>
            <br />
            <Flex
                style={{
                    padding: 24,
                    minHeight: "100px",
                    background: colorBgContainer,
                    borderRadius: borderRadiusLG,
                }}
            >
                <Flex>
                    <Col span={20}>
                        <Statistic
                            title="Umumiy shifokorlar"
                            value={10}
                            formatter={formatter}
                        />
                    </Col>
                    <Col span={20}>
                        <Statistic
                            title="Umumiy bemorlar"
                            value={341}
                            precision={2}
                            formatter={formatter}
                        />
                    </Col>
                </Flex>
            </Flex>
        </Content>
    );
};

export default Statistica;
