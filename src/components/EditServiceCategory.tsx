import { useContext, useEffect, useState } from "react";
import { Button, Drawer, Form, Input, message, FormProps, Flex } from "antd";
import { LoadingProvider } from "../App";
import { EditModalProps, ServiceCategoryType } from "../types/type";

const EditServiceCategory: React.FC<EditModalProps> = ({ data, setOpen }) => {
  const { setLoadingCnx } = useContext(LoadingProvider);
  const [messageApi, contextHolder] = message.useMessage();
  const token = localStorage.getItem("auth");
  const [serviceCategory_data, setData] = useState<ServiceCategoryType>({
    id: "",
    name: "",
    services: [],
  });
  const onClose = () => {
    setOpen({ id: "", isOpen: false });
    setData({
      id: "",
      name: "",
      services: [],
    });
  };

  const onSubmit: FormProps<ServiceCategoryType>["onFinish"] = (actionData) => {
    setLoadingCnx(true);
    fetch(import.meta.env.VITE_APP_URL + "/service-category", {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id: data.id, name: actionData.name }),
    })
      .then((res) => res.json())
      .then(() => {
        setLoadingCnx(false);
        setOpen({ id: "", isOpen: false });
        messageApi.success("Toifa muvaffaqqiyatli yaratildi", 2);
      })
      .catch(() => {
        setLoadingCnx(false);
        messageApi.error("Toifa yaratishda xatolik yuz berdi", 2);
      });
  };
  useEffect(() => {
    if (data.id) {
      fetch(import.meta.env.VITE_APP_URL + "/service-category/" + data.id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((res) => setData(res.result));
    }
  }, [data.id]);

  return (
    <>
      <Drawer
        title="Yangi toifa qo'shish"
        width={400}
        onClose={onClose}
        open={data.isOpen}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
      >
        {serviceCategory_data.id && (
          <Form
            layout="vertical"
            onFinish={onSubmit}
            initialValues={{ name: serviceCategory_data.name }}
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
              <Input placeholder="Toifa nomini kiriting" type="text" />
            </Form.Item>
            <Flex gap={20}>
              <Button size="large" type="primary" htmlType="submit">
                Yangilash
              </Button>
              <Button size="large" onClick={onClose}>
                Bekor qilish
              </Button>
            </Flex>
          </Form>
        )}
      </Drawer>
      {contextHolder}
    </>
  );
};

export default EditServiceCategory;
