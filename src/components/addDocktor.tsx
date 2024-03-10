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
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };
    const onSubmit = () => {
        setLoadingCnx(true);
        setTimeout(() => {
            setLoadingCnx(false);
            setOpen(false);
            setLoadingCnx(false);
            messageApi.success("Shifokor muvaffaqqiyatli yaratildi", 2);
        }, 2000);
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
                </Form>
                {contextHolder}
            </Drawer>
        </>
    );
};
export default CreateAccount;
