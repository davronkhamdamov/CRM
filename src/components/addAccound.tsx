import { FC, useContext, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
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
import { LoadingProvider } from "../App";

const { Option } = Select;
const CreateAccount: FC = () => {
  const [open, setOpen] = useState(false);
  const [payload, setPayload] = useState({});
  const { setLoadingCnx } = useContext(LoadingProvider);
  const [messageApi, contextHolder] = message.useMessage();

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const token = localStorage.getItem("auth");
  const onSubmit = () => {
    setLoadingCnx(true);
    messageApi.loading("Bemor yaratilmoqda");
    fetch(import.meta.env.VITE_APP_URL + "/user", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-type": "application/json",

        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then(() => {
        setOpen(false);
        setLoadingCnx(false);
        messageApi.loading("Bemor yaratilmoqda");
        messageApi.destroy();
        messageApi.success("Bemor muvaffaqqiyatli yaratildi", 2);
      })
      .catch((err) => {
        console.log(err);
        setLoadingCnx(false);
        messageApi.error("Nimadir xato ketdi", 2);
      });
  };

  return (
    <>
      <Button type="default" onClick={showDrawer} icon={<PlusOutlined />}>
        Yangi bemor
      </Button>
      <Drawer
        title="Yangi bemor qo'shish"
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
                    setPayload((prev) => {
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
                    setPayload((prev) => {
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
                    setPayload((prev) => {
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
                    setPayload((prev) => {
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
                    setPayload((prev) => {
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
                    setPayload((prev) => {
                      return { ...prev, job: e.target.value };
                    })
                  }
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
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
                    setPayload((prev) => {
                      return { ...prev, date_birth: dayjs(e).add(1, "day") };
                    });
                  }}
                  placeholder="Tug'ilgan sana"
                  defaultPickerValue={dayjs("2010-04-13")}
                  maxDate={dayjs(new Date())}
                  getPopupContainer={(trigger) => trigger.parentElement!}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
        {contextHolder}
      </Drawer>
    </>
  );
};
export default CreateAccount;
