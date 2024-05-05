import { useContext, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Drawer, Form, Input, Space, message } from "antd";
import { LoadingProvider } from "../App";

const CreatePaymentType = () => {
  const { setLoadingCnx } = useContext(LoadingProvider);
  const [messageApi, contextHolder] = message.useMessage();
  const token = localStorage.getItem("auth");
  const [open, setOpen] = useState(false);
  const [paymentType, setPaymentType] = useState("");
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const onSubmit = () => {
    setLoadingCnx(true);
    fetch(import.meta.env.VITE_APP_URL + "/payment-type", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        method: paymentType,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        setOpen(false);
        location.reload();
        setLoadingCnx(false);
        messageApi.success("To'lov turi muvaffaqqiyatli yaratildi", 2);
      })
      .catch((err) => {
        console.log(err);
        setLoadingCnx(false);
        messageApi.error("Nimadir xato ketdi", 2);
      });
  };

  return (
    <>
      {contextHolder}
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
            <Button onClick={onSubmit} type="primary">
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
            <Input
              placeholder="Iltimos to'lov turi nomini kiriting"
              onChange={(e) => {
                setPaymentType(e.target.value);
              }}
            />
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
};
export default CreatePaymentType;
