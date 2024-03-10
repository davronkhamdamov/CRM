import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Drawer, Form, Input, Space } from "antd";

const CreatePaymentType = () => {
    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };
    // const onChange = (value: string) => {
    //     console.log(`selected ${value}`);
    // };

    // const onSearch = (value: string) => {
    //     console.log("search:", value);
    // };

    // const filterOption = (
    //     input: string,
    //     option?: { label: string; value: string }
    // ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

    return (
        <>
            <Button type="default" onClick={showDrawer} icon={<PlusOutlined />}>
                Yangi to'lov turini qoshish
            </Button>
            <Drawer
                title="Yangi to'lov turini qo'shish"
                width={500}
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
                    <Form.Item
                        name="first_name"
                        label="To'lov turi"
                        rules={[
                            {
                                required: true,
                                message: "Iltimos to'lov turi nomini kiriting",
                            },
                        ]}
                    >
                        <Input placeholder="Iltimos to'lov turi nomini kiriting" />
                    </Form.Item>
                </Form>
            </Drawer>
        </>
    );
};
export default CreatePaymentType;
