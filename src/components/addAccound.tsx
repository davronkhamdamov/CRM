import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
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
} from "antd";
import dayjs from "dayjs";

const { Option } = Select;
const CreateAccount = () => {
    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };
    return (
        <>
            <Button type="default" onClick={showDrawer} icon={<PlusOutlined />}>
                Yangi bemor
            </Button>
            <Drawer
                title="Yangi bemor qo'shish"
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
                        <Button onClick={onClose} type="primary">
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
export default CreateAccount;
