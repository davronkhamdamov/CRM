import React, { useContext, useEffect, useState } from "react";
import { Button, Drawer, Form, FormProps, Input, Space, message } from "antd";
import { FaDollarSign } from "react-icons/fa6";
import { LoadingProvider } from "../App";
import { CureFieldType, EditModalProps } from "../types/type";

const AddTechnicPaymentCureOrta: React.FC<EditModalProps> = ({
  data,
  setOpen,
}) => {
  const { setLoadingCnx } = useContext(LoadingProvider);
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(true);
  const [cure, setCure] = useState<{
    raw_material_price: number;
    payed_raw_material_price: number;
  }>({
    raw_material_price: 0,
    payed_raw_material_price: 0,
  });
  const token = localStorage.getItem("auth");

  const onClose = () => {
    setOpen({ isOpen: false, id: "" });
  };
  const PayWithBalance: FormProps<CureFieldType>["onFinish"] = (e) => {
    setLoadingCnx(true);
    fetch(`${import.meta.env.VITE_APP_URL}/orto-cure/pay-technic/` + data.id, {
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
      .then(() => {
        setLoading(false);
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

  const fetchData = () => {
    setCure({
      raw_material_price: 0,
      payed_raw_material_price: 0,
    });
    fetch(`${import.meta.env.VITE_APP_URL}/orto-cure/` + data.id, {
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
      });
  };
  useEffect(() => {
    data.id && fetchData();
  }, [data.isOpen]);

  return (
    <>
      <Drawer
        title="Texnik uchun to'lov qilish"
        width={520}
        onClose={onClose}
        open={data.isOpen}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
      >
        {(cure.payed_raw_material_price || cure.raw_material_price) && (
          <Form
            layout="vertical"
            onFinish={PayWithBalance}
            initialValues={{
              balance_amount:
                cure.raw_material_price - cure.payed_raw_material_price,
            }}
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
                max={cure.raw_material_price - cure.payed_raw_material_price}
              />
            </Form.Item>
            <Space>
              <Button htmlType="submit" type="primary" loading={loading}>
                To'lov qilish
              </Button>
              <Button htmlType="button" onClick={onClose}>
                Bekor qilish
              </Button>
            </Space>
          </Form>
        )}
      </Drawer>
      {contextHolder}
    </>
  );
};
export default AddTechnicPaymentCureOrta;
