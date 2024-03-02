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
                New account
            </Button>
            <Drawer
                title="Create a new account"
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
                                name="owner"
                                label="Owner"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please select an owner",
                                    },
                                ]}
                            >
                                <Select placeholder="Please select an owner">
                                    <Option value="xiao">Xiaoxiao Fu</Option>
                                    <Option value="mao">Maomao Zhou</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="type"
                                label="Type"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please choose the type",
                                    },
                                ]}
                            >
                                <Select placeholder="Please choose the type">
                                    <Option value="private">Private</Option>
                                    <Option value="public">Public</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="approver"
                                label="Approver"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please choose the approver",
                                    },
                                ]}
                            >
                                <Select placeholder="Please choose the approver">
                                    <Option value="jack">Jack Ma</Option>
                                    <Option value="tom">Tom Liu</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="dateTime"
                                label="DateTime"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please choose the dateTime",
                                    },
                                ]}
                            >
                                <DatePicker.RangePicker
                                    style={{
                                        width: "100%",
                                    }}
                                    getPopupContainer={(trigger) =>
                                        trigger.parentElement
                                    }
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="description"
                                label="Description"
                                rules={[
                                    {
                                        required: true,
                                        message: "please enter url description",
                                    },
                                ]}
                            >
                                <Input.TextArea
                                    rows={4}
                                    placeholder="please enter url description"
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
