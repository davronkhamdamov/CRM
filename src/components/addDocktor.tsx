import { useContext, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import {
    Button,
    Col,
    Drawer,
    Form,
    Input,
    Row,
    Select,
    Space,
    message,
} from "antd";
import { LoadingProvider } from "../App";

const { Option } = Select;
const CreateAccount = () => {
    const { setLoadingCnx } = useContext(LoadingProvider);
    const [open, setOpen] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const [actionData, setActionData] = useState({})
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };
    const onSubmit = () => {
        setLoadingCnx(true);
        fetch(import.meta.env.VITE_APP_URL + "/staffs", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(actionData)
        })
            .then((res) => res.json())
            .then(() => {
                setLoadingCnx(false);
                setOpen(false);
                messageApi.success("Shifokor muvaffaqqiyatli yaratildi", 2);
            }).catch(() => {
                setLoadingCnx(false);
                messageApi.error("Shifokor yaratishda xatolik yuz berdi", 2);
            })
    };

    return (
        <>
            <Button type="default" onClick={showDrawer} icon={<PlusOutlined />}>
                Yangi shifokor
            </Button>
            <Drawer
                title="Yangi shifokor"
                width={720}
                onClose={onClose}
                open={open}
                styles={{
                    body: {
                        paddingBottom: 80,
                    },
                }}
                extra={
                    <Space>
                        <Button onClick={onClose}>Bekor qilish</Button>
                        <Button onClick={onSubmit} type="primary">
                            Yaratish
                        </Button>
                    </Space>
                }
            >
                <Form layout="vertical">
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
                                <Input placeholder="Iltimos ism kiriting" onChange={(e) => {
                                    setActionData(prev => {
                                        return { ...prev, name: e.target.value }
                                    })
                                }} />
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
                                <Input placeholder="Familya kiriting" onChange={(e) => {
                                    setActionData(prev => {
                                        return { ...prev, surname: e.target.value }
                                    })
                                }} />
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

                                <Input placeholder="Iltimos yashash joyini kiriting" onChange={(e) => {
                                    setActionData(prev => {
                                        return { ...prev, address: e.target.value }
                                    })
                                }} />
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
                                <Input placeholder="Iltimos telefon nomer kiriting"
                                    onChange={(e) => {
                                        setActionData(prev => {
                                            return { ...prev, phone_number: e.target.value }
                                        })
                                    }} />
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
                                <Select placeholder="Iltimos jinsingizni tanlang" onChange={(e) => {
                                    setActionData(prev => {
                                        return { ...prev, gender: e }
                                    })
                                }}>
                                    <Option value="male">Erkak</Option>
                                    <Option value="female">Ayol</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="role"
                                label="Role"
                                rules={[
                                    {
                                        required: true,
                                        message: "",
                                    },
                                ]}
                            >
                                <Select placeholder="Role" onChange={(e) => {
                                    setActionData(prev => {
                                        return { ...prev, role: e }
                                    })
                                }}>
                                    <Option value="reception">Qabulxona mudiri</Option>
                                    <Option value="doctor">Doktor</Option>
                                </Select>

                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="logn"
                                label="Login"
                                rules={[
                                    {
                                        required: true,
                                        message: "Login",
                                    },
                                ]}
                            >

                                <Input placeholder="Iltimos login kiriting" onChange={(e) => {
                                    setActionData(prev => {
                                        return { ...prev, login: e.target.value }
                                    })
                                }} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="password"
                                label="Parol"
                                rules={[
                                    {
                                        required: true,
                                        message: "Parol",
                                    },
                                ]}
                            >
                                <Input placeholder="Iltimos parol kiriting"
                                    onChange={(e) => {
                                        setActionData(prev => {
                                            return { ...prev, password: e.target.value }
                                        })
                                    }} />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
                {contextHolder}
            </Drawer>
        </>
    );
};
export default CreateAccount;
