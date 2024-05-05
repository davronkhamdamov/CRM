import { FC, useContext, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  FormProps,
  Input,
  Row,
  Select,
  Space,
  message,
} from "antd";

import dayjs from "dayjs";
import { LoadingProvider } from "../App";
import TextArea from "antd/es/input/TextArea";
import { UserData } from "../types/type";

const { Option } = Select;
const CreateAccount: FC = () => {
  const [open, setOpen] = useState(false);
  const { setLoadingCnx } = useContext(LoadingProvider);
  const [messageApi, contextHolder] = message.useMessage();

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const token = localStorage.getItem("auth");

  const onSubmit: FormProps<UserData>["onFinish"] = (actionData) => {
    console.log(actionData);

    setLoadingCnx(true);
    messageApi.loading("Bemor yaratilmoqda");
    fetch(import.meta.env.VITE_APP_URL + "/user", {
      method: "POST",
      body: JSON.stringify(actionData),
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
                name="job"
                label="Kasb"
                rules={[
                  {
                    required: true,
                    message: "Iltimos kasbingizni kiriting",
                  },
                ]}
              >
                <Input placeholder="Iltimos kasbingizni kiriting" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="date_birth"
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
                  placeholder="Tug'ilgan sana"
                  defaultPickerValue={dayjs("2010-04-13")}
                  maxDate={dayjs(new Date())}
                  getPopupContainer={(trigger) => trigger.parentElement!}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="prikus"
                label="Prikus"
                rules={[
                  {
                    message: "Prikus",
                  },
                ]}
              >
                <Select placeholder="Prikus">
                  <Option value="ortognatik">Ortognatik</Option>
                  <Option value="progenik">Progenik</Option>
                  <Option value="biprognatik">Biprognatik</Option>
                  <Option value="distal">Distal</Option>
                  <Option value="mezial">Mezial</Option>
                  <Option value="chuqur">Chuqur</Option>
                  <Option value="ochiq">Ochiq</Option>
                  <Option value="kesuvchi">Kesuvchi</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col style={{ width: "100%" }}>
              <Form.Item
                name="placental_diseases"
                label="Boshidan o'tkazgan yo'ldosh kasalliklarini"
                rules={[
                  {
                    message:
                      "Boshidan o'tkazgan yo'ldosh kasalliklarini kiriting",
                  },
                ]}
              >
                <TextArea
                  placeholder="Boshidan o'tkazgan yo'ldosh kasalliklarini..."
                  autoSize={{ minRows: 2, maxRows: 5 }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col style={{ width: "100%" }}>
              <Form.Item
                name="milk"
                label="Milk va olveola xolati"
                rules={[
                  {
                    message: "Milk va olveola xolati",
                  },
                ]}
              >
                <TextArea
                  placeholder="Milk va olveola xolati"
                  autoSize={{ minRows: 2, maxRows: 5 }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="disease_progression"
                label="Ushbu kasallikning rivojlanishi"
                rules={[
                  {
                    message: "Ushbu kasallikning rivojlanishi",
                  },
                ]}
              >
                <Input placeholder="Ushbu kasallikning rivojlanishi..." />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="objective_check"
                label="Obyektiv tekshiruv"
                rules={[
                  {
                    message: "Obyektiv tekshiruv",
                  },
                ]}
              >
                <Input placeholder="Obyektiv tekshiruv kiriting" />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col style={{ width: "100%" }}>
              <Form.Item
                name="description"
                label="Bemor haqida ko'proq ma'lumot"
                rules={[
                  {
                    message: "Iltimos Bemor haqida ko'proq ma'lumot kiriting",
                  },
                ]}
              >
                <TextArea
                  placeholder="Ko'proq ma'lumot"
                  autoSize={{ minRows: 7, maxRows: 17 }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Space>
            <Button onClick={onClose} htmlType="button">
              Bekor qilish
            </Button>
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
