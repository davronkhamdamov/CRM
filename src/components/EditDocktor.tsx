import { useContext, useEffect, useState } from "react";
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
import { EditModalProps, Staffs } from "../types/type";

const { Option } = Select;
const EditDoctor: React.FC<EditModalProps> = ({ data, setOpen }) => {
  const { setLoadingCnx } = useContext(LoadingProvider);
  const [messageApi, contextHolder] = message.useMessage();
  const [doctor, setDoctor] = useState<Staffs>({
    id: "",
    name: "",
    surname: "",
    role: "",
    address: "",
    gender: "",
    login: "",
    phone_number: "",
    password: "",
  });
  useEffect(() => {
    if (data.id) {
      fetch(import.meta.env.VITE_APP_URL + "/staffs/" + data.id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setDoctor(data.result);
        });
    }
  }, [data]);

  const onClose = () => {
    setOpen({ id: "", isOpen: false });
    setDoctor({
      id: "",
      surname: "",
      name: "",
      role: "",
      address: "",
      gender: "",
      login: "",
      phone_number: "",
      password: "",
    });
  };

  const token = localStorage.getItem("auth");
  const onSubmit: FormProps<Staffs>["onFinish"] = (actionData) => {
    setLoadingCnx(true);
    console.log(actionData);

    fetch(import.meta.env.VITE_APP_URL + "/staffs", {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        id: data.id,
        surname: actionData.surname,
        name: actionData.name,
        address: actionData.address,
        gender: actionData.gender,
        login: actionData.login,
        password: actionData.password,
        phone_number: actionData.phone_number,
        role: actionData.role,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        setLoadingCnx(false);
        setOpen({ id: "", isOpen: false });
        messageApi.success("Shifokor muvaffaqqiyatli yaratildi", 2);
      })
      .catch(() => {
        setLoadingCnx(false);
        messageApi.error("Shifokor yaratishda xatolik yuz berdi", 2);
      });
  };

  return (
    <>
      <Drawer
        title="Shifokorni tahrishlash"
        width={720}
        onClose={onClose}
        open={data.isOpen}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
      >
        {doctor.id && (
          <Form
            onFinish={onSubmit}
            layout="vertical"
            initialValues={{
              name: doctor.name,
              surname: doctor.surname,
              address: doctor.address,
              role: doctor.role,
              phone_number: doctor.phone_number,
              login: doctor.login,
              gender: doctor.gender,
            }}
          >
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
                      message: "Parol",
                    },
                  ]}
                >
                  <Input placeholder="Iltimos parol kiriting" />
                </Form.Item>
              </Col>
            </Row>
            <Space>
              <Button type="primary" htmlType="submit">
                Yangilash
              </Button>
              <Button htmlType="button" onClick={onClose}>
                Bekor qilish
              </Button>
            </Space>
          </Form>
        )}
        {contextHolder}
      </Drawer>
    </>
  );
};
export default EditDoctor;
