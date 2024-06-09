import { useContext, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Drawer,
  Form,
  FormProps,
  Input,
  Row,
  Select,
  Space,
  message,
} from "antd";
import { LoadingProvider } from "../App";
import { UserData } from "../types/type";

const { Option } = Select;
const CreateAccount = () => {
  const { setLoadingCnx } = useContext(LoadingProvider);
  const [open, setOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const token = localStorage.getItem("auth");
  const onSubmit: FormProps<UserData>["onFinish"] = (actionData) => {
    setLoadingCnx(true);
    fetch(import.meta.env.VITE_APP_URL + "/staffs", {
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
        location.reload();
        messageApi.success("Shifokor muvaffaqqiyatli yaratildi", 2);
      })
      .catch(() => {
        setLoadingCnx(false);
        messageApi.error("Shifokor yaratishda xatolik yuz berdi", 2);
      });
  };

  return (
    <>
      <Button type="default" onClick={showDrawer} icon={<PlusOutlined />}>
        Yangi shifokor
      </Button>
      <Drawer
        title="Yangi shifokor"
        width={720}
        onClose={onClose}
        open={open}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
      >
        <Form layout="vertical" onFinish={onSubmit}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Ism"
                rules={[
                  {
                    required: true,
                    message: "Iltimos ism kiriting",
                  },
                ]}
              >
                <Input placeholder="Iltimos ism kiriting" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="surname"
                label="Familya"
                rules={[
                  {
                    required: true,
                    message: "Familya kiriting",
                  },
                ]}
              >
                <Input placeholder="Familya kiriting" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="address"
                label="Yashash joyi"
                rules={[
                  {
                    required: true,
                    message: "Yashash joyi",
                  },
                ]}
              >
                <Input placeholder="Iltimos yashash joyini kiriting" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="phone_number"
                label="Telefon"
                rules={[
                  {
                    required: true,
                    message: "Telefon nomer",
                  },
                ]}
              >
                <Input placeholder="Iltimos telefon nomer kiriting" />
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
                <Select placeholder="Iltimos jinsingizni tanlang">
                  <Option value="male">Erkak</Option>
                  <Option value="female">Ayol</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="role"
                label="Role"
                rules={[
                  {
                    required: true,
                    message: "",
                  },
                ]}
              >
                <Select placeholder="Role">
                  <Option value="reception">Qabulxona mudiri</Option>
                  <Option value="doctor">Doktor</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="login"
                label="Login"
                rules={[
                  {
                    required: true,
                    message: "Login",
                  },
                ]}
              >
                <Input placeholder="Iltimos login kiriting" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="password"
                label="Parol"
                rules={[
                  {
                    required: true,
                    message: "Parol",
                  },
                ]}
              >
                <Input placeholder="Iltimos parol kiriting" />
              </Form.Item>
            </Col>
          </Row>
          <Col span={12}>
            <Form.Item
              name="foiz"
              label="Ish xaqqi foizi"
              rules={[
                {
                  required: true,
                  max: 100,
                  min: 0,
                  message: "Ish xaqqi foizini kiriting maximum 100 minimum 1",
                },
              ]}
            >
              <Input
                placeholder="Ish xaqqi foizi"
                type="number"
                maxLength={3}
                max={100}
                min={0}
              />
            </Form.Item>
          </Col>
          <Space>
            <Button onClick={onClose}>Bekor qilish</Button>
            <Button type="primary" htmlType="submit">
              Yaratish
            </Button>
          </Space>
        </Form>
        {contextHolder}
      </Drawer>
    </>
  );
};
export default CreateAccount;
