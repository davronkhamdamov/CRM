import { FC, useContext, useEffect, useState } from "react";
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
import {
  EditModalProps,
  ServiceCategoryType,
  ServiceFieldType,
  ServiceType,
} from "../types/type";

const EditService: FC<EditModalProps> = ({ data, setOpen }) => {
  const { setLoadingCnx } = useContext(LoadingProvider);
  const [serviceData, setData] = useState<ServiceType>({
    id: "",
    name: "",
    price: "",
    status: true,
    service_category_id: "",
  });
  const [serviceCategory, setServiceCategory] = useState<ServiceCategoryType[]>(
    []
  );
  const [messageApi, contextHolder] = message.useMessage();
  const token = localStorage.getItem("auth");

  const onClose = () => {
    setOpen({ id: "", isOpen: false });
    setData({
      id: "",
      name: "",
      price: "0",
      status: true,
      service_category_id: "",
    });
  };
  useEffect(() => {
    if (data.id) {
      fetch(import.meta.env.VITE_APP_URL + "/service-category", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setServiceCategory(data.result);
        });
      fetch(import.meta.env.VITE_APP_URL + "/service/" + data.id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setData(data.result);
        });
    }
  }, [data]);

  const onSubmit: FormProps<ServiceFieldType>["onFinish"] = (actionData) => {
    setLoadingCnx(true);
    fetch(import.meta.env.VITE_APP_URL + "/service/" + data.id, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(actionData),
    })
      .then((res) => res.json())
      .then(() => {
        setLoadingCnx(false);
        location.reload();
        setOpen({ id: "", isOpen: false });
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
        open={data.isOpen}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
      >
        {serviceData.id && (
          <Form
            layout="vertical"
            onFinish={onSubmit}
            initialValues={{
              name: serviceData.name,
              price: serviceData?.price?.replace(" ", ""),
              status: serviceData.status,
              service_category_id: serviceData.service_category_id,
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
              <Switch />
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
        )}
      </Drawer>
      {contextHolder}
    </>
  );
};
export default EditService;
