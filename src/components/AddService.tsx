import { useContext, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Drawer, Form, Input, Space, Switch, message } from "antd";
import { LoadingProvider } from "../App";

const AddService = () => {
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
      setOpen(false);
      setLoadingCnx(false);
      messageApi.success("Xizmat muvaffaqqiyatli yaratildi", 2);
    }, 2000);
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
            name="service_name"
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
            name="price"
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
            name="product_price"
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
          <Form.Item name="isActive" label="Xizmat xolati">
            <Switch defaultChecked />
          </Form.Item>
        </Form>
      </Drawer>
      {contextHolder}
    </>
  );
};
export default AddService;
