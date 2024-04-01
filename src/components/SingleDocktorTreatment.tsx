import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Badge, Descriptions, DescriptionsProps, Flex, Space, theme } from "antd";
import { Content } from "antd/es/layout/layout";
import { UserData } from "../types/type";
import dayjs from "dayjs";

const SingleDocktorTreatment = () => {
    const params = useParams();
    const [cureData, setCureData] = useState<UserData>()
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    useEffect(() => {
        fetch(import.meta.env.VITE_APP_URL + "/cure/" + params.id)
            .then(res => res.json())
            .then(data => {
                setCureData(data.result)
            })
    }, [params.id])
    console.log(cureData);

    const items: DescriptionsProps['items'] = [
        {
            key: '1',
            label: 'Bemor ismi:',
            children: 'Bemor ismi bo\'lishi kerak',
        },
        {
            key: '2',
            label: 'Mas\'ul shifokor',
            children: 'Shifokor ismi',
        },
        {
            key: '3',
            label: 'Davolash boshlanish vaqti',
            children: dayjs(new Date).format("DD-MM-YYYY HH-mm"),
        },
        {
            key: '4',
            label: 'Davolash tugash vaqti',
            children: dayjs(new Date).add(1, "hour").format("DD-MM-YYYY HH:mm")
        },
        {
            key: '6',
            label: 'Holati',
            span: 3,
            children:
                <Flex gap={100} align="center">
                    <Badge status="processing" text="Jarayonda" />
                </Flex>
        },
    ];
    return <Content>
        <div
            style={{
                minHeight: "96vh",
            }}
        >
            <Flex
                vertical
                style={{
                    padding: 24,
                    background: colorBgContainer,
                    borderRadius: borderRadiusLG,
                    minHeight: "80dvh"
                }}>
                <Descriptions title="Davolash haqida umumiy ma'lumotlar" layout="vertical" items={items} column={{ xs: 1, sm: 2, md: 3, lg: 3, xl: 4, xxl: 4 }}
                />
            </Flex>
        </div>
    </Content>
}
export default SingleDocktorTreatment

