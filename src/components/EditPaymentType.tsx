import { useContext, useEffect, useState } from "react";
import { Button, Drawer, Form, FormProps, Input, Space, message } from "antd";
import { LoadingProvider } from "../App";
import { EditModalProps, PaymentDataType } from "../types/type";

const CreatePaymentType: React.FC<EditModalProps> = ({ data, setOpen }) => {
  const { setLoadingCnx } = useContext(LoadingProvider);
  const [messageApi, contextHolder] = message.useMessage();
  const token = localStorage.getItem("auth");
  const [paymentType, setPaymentType] = useState<PaymentDataType>({
    created_at: new Date(),
    id: "",
    method: "",
    payment_type_id: "",
  });

  const onClose = () => {
    setOpen({ id: "", isOpen: false });
    setPaymentType({
      created_at: new Date(),
      id: "",
      method: "",
      payment_type_id: "",
    });
  };
  const onSubmit: FormProps<PaymentDataType>["onFinish"] = (actionData) => {
    setLoadingCnx(true);
    fetch(import.meta.env.VITE_APP_URL + "/payment-type/" + data.id, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        method: actionData.method,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        setOpen({ id: "", isOpen: false });
        setLoadingCnx(false);
        messageApi.success("To'lov turi muvaffaqqiyatli yangilandi", 2);
      })
      .catch((err) => {
        console.log(err);
        setLoadingCnx(false);
        messageApi.error("Nimadir xato ketdi", 2);
      });
  };
  useEffect(() => {
    if (data.id) {
      fetch(import.meta.env.VITE_APP_URL + "/payment-type/" + data.id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setPaymentType(data.result);
        })
        .catch((err) => {
          console.log(err);
          messageApi.error("Nimadir xato ketdi", 2);
        });
    }
  }, [data.id]);

  return (
    <>
      {contextHolder}
      <Drawer
        title="Yangi to'lov turini qo'shish"
        width={500}
        onClose={onClose}
        open={data.isOpen}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
      >
        {paymentType.id && (
          <Form
            layout="vertical"
            onFinish={onSubmit}
            initialValues={{ method: paymentType.method }}
          >
            <Form.Item
              name="method"
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
            <Space>
              <Button htmlType="button" onClick={onClose}>
                Bekor qilish
              </Button>
              <Button type="primary">Yaratish</Button>
            </Space>
          </Form>
        )}
      </Drawer>
    </>
  );
};
export default CreatePaymentType;
