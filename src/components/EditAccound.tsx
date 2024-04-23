import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Space,
  message,
} from "antd";
import dayjs from "dayjs";
import { EditModalProps, UserData } from "../types/type";
import { LoadingProvider } from "../App";

const { Option } = Select;

const EditAccound: React.FC<EditModalProps> = ({ data, setOpen }) => {
  const { setLoadingCnx } = useContext(LoadingProvider);
  const [user_data, setData] = useState<UserData>({
    address: "",
    gender: "",
    job: "",
    name: "",
    phone_number: "",
    img_url: "",
    surname: "",
  });
  const token = localStorage.getItem("auth");
  useEffect(() => {
    if (data.id) {
      fetch(import.meta.env.VITE_APP_URL + "/user/" + data.id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((res) => setData(res.result));
    }
  }, [data.isOpen]);

  const [messageApi, contextHolder] = message.useMessage();

  const onClose = () => {
    setOpen({ id: "", isOpen: false });
  };

  const onSubmit = () => {
    setLoadingCnx(true);
    user_data.updated_at = new Date();
    fetch(import.meta.env.VITE_APP_URL + "/user", {
      method: "PUT",
      body: JSON.stringify(user_data),
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setOpen({ id: "", isOpen: false });
        setLoadingCnx(false);
        messageApi.success("Bemor muvaffaqqiyatli yangilandi", 2);
      })
      .catch((err) => {
        console.log(err);
        setLoadingCnx(false);
        messageApi.error("Nimadir xato ketdi", 2);
      });
  };

  return (
    <>
      {contextHolder}
      <Drawer
        title="Bemorni ma'lumotlarini yangilash"
        width={720}
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
              Yangilash
            </Button>
          </Space>
        }
      >
        {user_data.created_at && (
          <Form
            layout="vertical"
            initialValues={{
              first_name: user_data?.name,
              last_name: user_data?.surname,
              adress: user_data?.address,
              phone: user_data?.phone_number,
              gender: user_data?.gender,
              job: user_data?.job,
              birth_date: dayjs(user_data?.date_birth),
            }}
          >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="first_name"
                  label="Ism"
                  rules={[
                    {
                      required: true,
                      message: "Iltimos ism kiriting",
                    },
                  ]}
                >
                  <Input
                    placeholder="Iltimos ism kiriting"
                    onChange={(e) =>
                      setData((prev) => {
                        return { ...prev, name: e.target.value };
                      })
                    }
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="last_name"
                  label="Familya"
                  rules={[
                    {
                      required: true,
                      message: "Familya kiriting",
                    },
                  ]}
                >
                  <Input
                    placeholder="Familya kiriting"
                    onChange={(e) =>
                      setData((prev) => {
                        return { ...prev, surname: e.target.value };
                      })
                    }
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="adress"
                  label="Yashash joyi"
                  rules={[
                    {
                      required: true,
                      message: "Yashash joyi",
                    },
                  ]}
                >
                  <Input
                    placeholder="Iltimos yashash joyini kiriting"
                    onChange={(e) =>
                      setData((prev) => {
                        return { ...prev, address: e.target.value };
                      })
                    }
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="phone"
                  label="Telefon"
                  rules={[
                    {
                      required: true,
                      message: "Telefon nomer",
                    },
                  ]}
                >
                  <Input
                    placeholder="Iltimos telefon nomer kiriting"
                    onChange={(e) =>
                      setData((prev) => {
                        return { ...prev, phone_number: e.target.value };
                      })
                    }
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="gender"
                  label="Jinsi"
                  rules={[
                    {
                      required: true,
                      message: "Iltimos jinsingizni tanlang",
                    },
                  ]}
                >
                  <Select
                    placeholder="Iltimos jinsingizni tanlang"
                    onChange={(e) =>
                      setData((prev) => {
                        return { ...prev, gender: e };
                      })
                    }
                  >
                    <Option value="male">Erkak</Option>
                    <Option value="female">Ayol</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="job"
                  label="Kasb"
                  rules={[
                    {
                      required: true,
                      message: "Iltimos kasbingizni kiriting",
                    },
                  ]}
                >
                  <Input
                    placeholder="Iltimos kasbingizni kiriting"
                    onChange={(e) =>
                      setData((prev) => {
                        return { ...prev, job: e.target.value };
                      })
                    }
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Item
                  name="birth_date"
                  label="Tug'ilgan sana"
                  rules={[
                    {
                      required: true,
                      message: "Tug'ilgan sana",
                    },
                  ]}
                >
                  <DatePicker
                    style={{
                      width: "100%",
                    }}
                    onChange={(e) => {
                      setData((prev) => {
                        return { ...prev, date_birth: dayjs(e).add(1, "day") };
                      });
                    }}
                    placeholder="Tug'ilgan sana"
                    maxDate={dayjs(new Date())}
                    getPopupContainer={(trigger) => trigger.parentElement!}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        )}
      </Drawer>
    </>
  );
};
export default EditAccound;
