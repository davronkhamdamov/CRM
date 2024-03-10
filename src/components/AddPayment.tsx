import { useContext, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Drawer, Form, Input, Select, Space, message } from "antd";
import { FaDollarSign } from "react-icons/fa6";
import { LoadingProvider } from "../App";

const AddPayment = () => {
    const { setLoadingCnx } = useContext(LoadingProvider);
    const [messageApi, contextHolder] = message.useMessage();

    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };
    const onSubmit = () => {
        setLoadingCnx(true);
        setTimeout(() => {
            setOpen(false);
            setLoadingCnx(false);
            messageApi.success("To'lov muvaffaqqiyatli yaratildi", 2);
        }, 2000);
    };

    return (
        <>
            <Button type="default" onClick={showDrawer} icon={<PlusOutlined />}>
                Yangi to'lov qo'shish
            </Button>
            <Drawer
                title="To'lov qilish"
                width={520}
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
                            To'lov qilish
                        </Button>
                    </Space>
                }
            >
                <Form layout="vertical">
                    <Form.Item
                        name="payment_type"
                        label="To'lov turini tanlang"
                        rules={[
                            {
                                required: true,
                                message: "Iltimos to'lov turini tanlang",
                            },
                        ]}
                    >
                        <Select
                            defaultValue="naqt"
                            options={[
                                { value: "card", label: "Karta" },
                                { value: "naqt", label: "Naqt" },
                            ]}
                        />
                    </Form.Item>
                    <Form.Item
                        name="amount"
                        label="To'lov miqdori"
                        rules={[
                            {
                                required: true,
                                message: "Iltimos to'lov miqdorini kiriting",
                            },
                        ]}
                    >
                        <Input
                            type="number"
                            prefix={<FaDollarSign />}
                            placeholder="To'lov Miqdorini kiriting"
                        />
                    </Form.Item>
                </Form>
            </Drawer>
            {contextHolder}
        </>
    );
};
export default AddPayment;
