import React, { useContext, useEffect, useState } from "react";
import { Button, Drawer, Form, Input, Select, Space, message } from "antd";
import { FaDollarSign } from "react-icons/fa6";
import { LoadingProvider } from "../App";
import { EditModalProps, PaymentDataType } from "../types/type";

const AddPayment: React.FC<EditModalProps> = ({ data, setOpen }) => {
  const { setLoadingCnx } = useContext(LoadingProvider);
  const [messageApi, contextHolder] = message.useMessage();
  const [paymentTypeData, setPaymentTypeData] = useState<PaymentDataType[]>();
  const [loading, setLoading] = useState(true);
  const [actionData, setActionData] = useState({
    amount: 0,
    payment_type_id: "",
  });

  const token = localStorage.getItem("auth");

  const onClose = () => {
    setOpen({ isOpen: false, id: "" });
  };
  const onSubmit = () => {
    setLoadingCnx(true);
    fetch(`${import.meta.env.VITE_APP_URL}/payment`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        ...actionData,
        user_id: data.id,
      }),
    })
      .then((res) => res.json())
      .then((results) => {
        setLoading(false);
        setPaymentTypeData(results.result);
        setOpen({ isOpen: false, id: "" });
        location.reload();
        setLoadingCnx(false);
        messageApi.success("To'lov muvaffaqqiyatli yaratildi", 2);
      })
      .catch(() => {
        setLoadingCnx(false);
        setLoading(false);
        messageApi.error("Nimadir xato ketdi", 2);
      });
  };
  const fetchData = () => {
    fetch(`${import.meta.env.VITE_APP_URL}/payment-type`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((results) => {
        setLoading(false);
        setPaymentTypeData(results.result);
      })
      .catch(() => {
        setLoading(false);
        setPaymentTypeData([]);
      });
  };
  useEffect(() => {
    data.id && fetchData();
  }, [data.isOpen]);

  return (
    <>
      <Drawer
        title="To'lov qilish"
        width={520}
        onClose={onClose}
        open={data.isOpen}
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
              loading={loading}
              options={paymentTypeData?.map((e) => {
                return { value: e.id, label: e.method };
              })}
              onChange={(e) => {
                setActionData((prev) => {
                  return { ...prev, payment_type_id: e };
                });
              }}
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
              onChange={(e) => {
                setActionData((prev) => {
                  return { ...prev, amount: +e.target.value };
                });
              }}
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
