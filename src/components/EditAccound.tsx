import React, { useContext, useEffect, useState } from "react";
import {
    Button,
    Col,
    DatePicker,
    Drawer,
    Form,
    Input,
    Row,
    Select,
    Space,
    message,
} from "antd";
import dayjs from "dayjs";
import { EditModalProps, UserData } from "../types/type";
import { LoadingProvider } from "../App";

const { Option } = Select;
const EditAccound: React.FC<EditModalProps> = ({ data, setOpen }) => {
    const { setLoadingCnx } = useContext(LoadingProvider);
    const [messageApi, contextHolder] = message.useMessage();

    const onClose = () => {
        setOpen({ id: "", isOpen: false });
    };

    const onSubmit = () => {
        setLoadingCnx(true);
        setTimeout(() => {
            setOpen({ id: "", isOpen: false });
            setLoadingCnx(false);
            messageApi.success("Bemor muvaffaqqiyatli yangilandi", 2);
        }, 2000);
    };
    const [user_data, setData] = useState<UserData>();
    useEffect(() => {
        fetch("https://randomuser.me/api")
            .then((res) => res.json())
            .then((data) => {
                setData(data.results[0]);
            });
    }, [data]);

    return (
        <>
            {contextHolder}
            <Drawer
                title="Bemorni ma'lumotlarini yangilash"
                width={720}
                onClose={onClose}
                open={data.isOpen}
                styles={{
                    body: {
                        paddingBottom: 80,
                    },
                }}
                extra={
                    <Space>
                        <Button onClick={onClose}>Bekor qilish</Button>
                        <Button onClick={onSubmit} type="primary">
                            Yangilash
                        </Button>
                    </Space>
                }
            >
                <Form
                    layout="vertical"
                    initialValues={{
                        first_name: user_data?.name?.first,
                        last_name: user_data?.name?.last,
                        adress: user_data?.location?.state,
                        phone: "+" + user_data?.phone,
                        gender: user_data?.gender,
                        job: "Ishsiz",
                        birth_date: dayjs(user_data?.dob.date),
                    }}
                >
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="first_name"
                                label="Ism"
                                rules={[
                                    {
                                        required: true,
                                        message: "Iltimos ism kiriting",
                                    },
                                ]}
                            >
                                <Input placeholder="Iltimos ism kiriting" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="last_name"
                                label="Familya"
                                rules={[
                                    {
                                        required: true,
                                        message: "Familya kiriting",
                                    },
                                ]}
                            >
                                <Input placeholder="Familya kiriting" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="adress"
                                label="Yashash joyi"
                                rules={[
                                    {
                                        required: true,
                                        message: "Yashash joyi",
                                    },
                                ]}
                            >
                                <Input placeholder="Iltimos yashash joyini kiriting" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="phone"
                                label="Telefon"
                                rules={[
                                    {
                                        required: true,
                                        message: "Telefon nomer",
                                    },
                                ]}
                            >
                                <Input placeholder="Iltimos telefon nomer kiriting" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="gender"
                                label="Jinsi"
                                rules={[
                                    {
                                        required: true,
                                        message: "Iltimos jinsingizni tanlang",
                                    },
                                ]}
                            >
                                <Select placeholder="Iltimos jinsingizni tanlang">
                                    <Option value="male">Erkak</Option>
                                    <Option value="female">Ayol</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="job"
                                label="Kasb"
                                rules={[
                                    {
                                        required: true,
                                        message: "Iltimos kasbingizni kiriting",
                                    },
                                ]}
                            >
                                <Input placeholder="Iltimos kasbingizni kiriting" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="birth_date"
                                label="Tug'ilgan sana"
                                rules={[
                                    {
                                        required: true,
                                        message: "Tug'ilgan sana",
                                    },
                                ]}
                            >
                                <DatePicker
                                    style={{
                                        width: "100%",
                                    }}
                                    placeholder="Tug'ilgan sana"
                                    defaultPickerValue={dayjs("2010-04-13")}
                                    maxDate={dayjs(new Date())}
                                    getPopupContainer={(trigger) =>
                                        trigger.parentElement!
                                    }
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Drawer>
        </>
    );
};
export default EditAccound;
