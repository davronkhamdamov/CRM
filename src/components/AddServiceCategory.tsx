import { useContext, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Drawer, Form, Input, message, FormProps, Flex } from "antd";
import { LoadingProvider } from "../App";
import { ServiceFieldType } from "../types/type";

const AddServiceCategory = () => {
  const { setLoadingCnx } = useContext(LoadingProvider);
  const [open, setOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const token = localStorage.getItem("auth");

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const onSubmit: FormProps<ServiceFieldType>["onFinish"] = (actionData) => {
    setLoadingCnx(true);
    fetch(import.meta.env.VITE_APP_URL + "/service", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(actionData),
    })
      .then((res) => res.json())
      .then(() => {
        setLoadingCnx(false);
        setOpen(false);
        messageApi.success("Xizmat muvaffaqqiyatli yaratildi", 2);
      })
      .catch(() => {
        setLoadingCnx(false);
        messageApi.error("Xizmat yaratishda xatolik yuz berdi", 2);
      });
  };
  return (
    <>
      <Button type="default" onClick={showDrawer} icon={<PlusOutlined />}>
        Yangi xizmat toifasini qo'shish
      </Button>
      <Drawer
        title="Yangi xizmatni qo'shish"
        width={400}
        onClose={onClose}
        open={open}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
      >
        <Form
          layout="vertical"
          onFinish={onSubmit}
          initialValues={{
            isActive: true,
          }}
        >
          <Form.Item
            name="name"
            label="Toifa nomi"
            rules={[
              {
                required: true,
                message: "Iltimos toifa nomini kiriting",
              },
            ]}
          >
            <Input placeholder="Toifa nomini kiriting" />
            <br />
            <br />
            <Flex gap={20}>
              <Button size="large" type="primary" htmlType="submit">
                Yaratish
              </Button>
              <Button size="large" onClick={onClose}>
                Bekor qilish
              </Button>
            </Flex>
          </Form.Item>
        </Form>
      </Drawer>
      {contextHolder}
    </>
  );
};

export default AddServiceCategory;
