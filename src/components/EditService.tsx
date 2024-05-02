import { useContext, useEffect, useState } from "react";
import {
  Button,
  Drawer,
  Form,
  Input,
  Switch,
  message,
  FormProps,
  Flex,
  Select,
} from "antd";
import { LoadingProvider } from "../App";
import { ServiceCategoryType, ServiceFieldType } from "../types/type";
const AddService = () => {
  const { setLoadingCnx } = useContext(LoadingProvider);
  const [open, setOpen] = useState(false);
  const [serviceCategory, setServiceCategory] = useState<ServiceCategoryType[]>(
    []
  );
  const [messageApi, contextHolder] = message.useMessage();
  const token = localStorage.getItem("auth");

  const onClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    fetch(import.meta.env.VITE_APP_URL + "/service-category", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setServiceCategory(data.result);
      });
  }, [open]);

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
      <Drawer
        title="Xizmatni Tahrirlash"
        width={520}
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
            name="service_category_id"
            label="Xizmat toifasi"
            rules={[
              {
                required: true,
                message: "Iltimos xizmat toifasini narxini kiriting",
              },
            ]}
          >
            <Select
              options={serviceCategory.map((e) => {
                return { value: e.id, label: e.name };
              })}
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
            <Input type="number" min={1} placeholder="Narx kiriting!" />
          </Form.Item>
          <Form.Item name="status" label="Xizmat xolati">
            <Switch defaultChecked />
          </Form.Item>
          <Form.Item>
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
export default AddService;
