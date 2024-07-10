import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Drawer,
  Form,
  FormProps,
  Input,
  Select,
  Space,
  Tabs,
  TabsProps,
  message,
} from "antd";
import { FaDollarSign } from "react-icons/fa6";
import { LoadingProvider } from "../App";
import { CureFieldType, EditModalProps, PaymentDataType } from "../types/type";

const AddPaymentCure: React.FC<EditModalProps> = ({ data, setOpen }) => {
  const { setLoadingCnx } = useContext(LoadingProvider);
  const [messageApi, contextHolder] = message.useMessage();
  const [paymentTypeData, setPaymentTypeData] = useState<PaymentDataType[]>();
  const [loading, setLoading] = useState(true);
  const [cure, setCure] = useState<{ price: number; payed_price: number }>({
    price: 0,
    payed_price: 0,
  });
  const token = localStorage.getItem("auth");

  const onClose = () => {
    setOpen({ isOpen: false, id: "" });
  };
  const PayWithBalance: FormProps<CureFieldType>["onFinish"] = (e) => {
    setLoadingCnx(true);
    fetch(`${import.meta.env.VITE_APP_URL}/cure/pay-balance/` + data.id, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        price: e.balance_amount,
      }),
    })
      .then((res) => res.json())
      .then((results) => {
        setLoading(false);
        setPaymentTypeData(results.result);
        setOpen({ isOpen: false, id: "" });
        setLoadingCnx(false);
        location.reload();
        messageApi.success("To'lov qilindi", 2);
      })
      .catch(() => {
        setLoadingCnx(false);
        setLoading(false);
        messageApi.error("Nimadir xato ketdi", 2);
      });
  };
  const PayWithCash: FormProps<CureFieldType>["onFinish"] = (e) => {
    setLoadingCnx(true);
    fetch(`${import.meta.env.VITE_APP_URL}/cure/pay/` + data.id, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        amount: e.cash_amount,
        payment_type_id: e.payment_type,
      }),
    })
      .then((res) => res.json())
      .then((results) => {
        location.reload();
        setLoading(false);
        setPaymentTypeData(results.result);
        setOpen({ isOpen: false, id: "" });
        setLoadingCnx(false);
        messageApi.success("To'lov qilindi", 2);
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
    fetch(`${import.meta.env.VITE_APP_URL}/cure/` + data.id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((results) => {
        setLoading(false);
        setCure(results.result);
      })
      .catch(() => {
        setLoading(false);
        setPaymentTypeData([]);
      });
  };
  useEffect(() => {
    data.id && fetchData();
  }, [data.isOpen]);

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Hisobdan to'lash",
      children: cure && (
        <Form
          layout="vertical"
          onFinish={PayWithBalance}
          initialValues={{ balance_amount: cure.price - cure.payed_price }}
        >
          <Form.Item
            name="balance_amount"
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
              max={cure.price - cure.payed_price}
            />
          </Form.Item>
          <Space>
            <Button htmlType="submit" type="primary">
              To'lov qilish
            </Button>
            <Button htmlType="button" onClick={onClose}>
              Bekor qilish
            </Button>
          </Space>
        </Form>
      ),
    },
    {
      key: "2",
      label: "To'lov qilish",
      children: cure && (
        <Form
          layout="vertical"
          onFinish={PayWithCash}
          initialValues={{ cash_amount: cure.price - cure.payed_price }}
        >
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
            />
          </Form.Item>
          <Form.Item
            name="cash_amount"
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
          <Space>
            <Button htmlType="button" onClick={onClose}>
              Bekor qilish
            </Button>
            <Button htmlType="submit" type="primary">
              To'lov qilish
            </Button>
          </Space>
        </Form>
      ),
    },
  ];
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
      >
        {(cure.payed_price || cure.price) && (
          <Tabs defaultActiveKey="1" items={items} />
        )}
      </Drawer>
      {contextHolder}
    </>
  );
};
export default AddPaymentCure;
