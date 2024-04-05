import { useContext, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Drawer, Form, Input, Switch, message, FormProps, Flex } from "antd";
import { LoadingProvider } from "../App";
import { ServiceFieldType } from "../types/type";

const AddService = () => {
  const { setLoadingCnx } = useContext(LoadingProvider);
  const [open, setOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const token = localStorage.getItem("auth")

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const onSubmit: FormProps<ServiceFieldType>["onFinish"] = (actionData) => {
    setLoadingCnx(true);
    console.log(actionData);
    fetch(import.meta.env.VITE_APP_URL + "/service", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(actionData)
    })
      .then((res) => res.json())
      .then(() => {
        setLoadingCnx(false);
        setOpen(false);
        messageApi.success("Xizmat muvaffaqqiyatli yaratildi", 2);
      }).catch(() => {
        setLoadingCnx(false);
        messageApi.error("Xizmat yaratishda xatolik yuz berdi", 2);
      })
  };
  return (
    <>
      <Button type="default" onClick={showDrawer} icon={<PlusOutlined />}>
        Yangi xizmatni qo'shish
      </Button>
      <Drawer
        title="Yangi xizmatni qo'shish"
        width={720}
        onClose={onClose}
        open={open}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}

      >
        <Form layout="vertical" onFinish={onSubmit} initialValues={{
          isActive: true
        }}>
          <Form.Item
            name="name"
            label="Xizmat nomi"
            rules={[
              {
                required: true,
                message: "Iltimos xizmat nomini kiriting",
              },
            ]}
          >
            <Input placeholder="Xizmat nomini kiriting" />
          </Form.Item>
          <Form.Item
            name="service_price_price"
            label="Xizmat narxi"
            rules={[
              {
                required: true,
                message: "Iltimos xizmat narxini kiriting",
              },
            ]}
          >
            <Input
              type="number"
              min={1}
              placeholder="Xizmat narxini kiriting"
            />
          </Form.Item>

          <Form.Item
            name="raw_material_price"
            label="Xom ashyo narxi"
            rules={[
              {
                required: true,
                message: "Iltimos xom ashyo narxini kiriting!",
              },
            ]}
          >
            <Input
              type="number"
              min={1}
              placeholder="Xom ashyo narxini kiriting!"
            />
          </Form.Item>
          <Form.Item
            name="price"
            label="Narxi"
            rules={[
              {
                required: true,
                message: "Iltimos narx kiriting!",
              },
            ]}
          >
            <Input
              type="number"
              min={1}
              placeholder="Narx kiriting!"
            />
          </Form.Item>
          <Form.Item name="status" label="Xizmat xolati">
            <Switch defaultChecked />
          </Form.Item>
          <Form.Item>
            <Flex gap={20}>
              <Button size="large" type="primary" htmlType="submit">
                Submit
              </Button>
              <Button size="large" onClick={onClose}>Bekor qilish</Button></Flex>
          </Form.Item>
        </Form>
      </Drawer>
      {contextHolder}
    </>
  );
};
export default AddService;
