import React, { useContext, useEffect, useState } from "react";
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
import { TableProp, UserData } from "../types/type";
import { LoadingProvider } from "../App";
import TextArea from "antd/es/input/TextArea";

const { Option } = Select;

const EditModalAccound: React.FC<TableProp> = ({ data, setData }) => {
  const { setLoadingCnx } = useContext(LoadingProvider);
  const [messageApi, contextHolder] = message.useMessage();
  const [user_data, setDatas] = useState<UserData>({
    address: "",
    gender: "",
    job: "",
    name: "",
    phone_number: "",
    img_url: "",
    surname: "",
    description: "",
    login: "",
    disease_progression: "",
    milk: "",
    objective_check: "",
    placental_diseases: "",
    prikus: "",
    balance: 0,
  });
  const token = localStorage.getItem("auth");
  useEffect(() => {
    if (data.data) {
      fetch(import.meta.env.VITE_APP_URL + "/user/" + data.data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((res) => setDatas(res.result));
    }
  }, [data.data]);

  const onClose = () => {
    setData({ id: "", isOpen: false });
    setDatas({
      address: "",
      gender: "",
      job: "",
      name: "",
      phone_number: "",
      img_url: "",
      surname: "",
      description: "",
      login: "",
      disease_progression: "",
      milk: "",
      objective_check: "",
      placental_diseases: "",
      prikus: "",
      balance: 0,
    });
  };

  const onSubmit: FormProps<UserData>["onFinish"] = (actionData) => {
    setLoadingCnx(true);
    fetch(import.meta.env.VITE_APP_URL + "/user/" + data.data, {
      method: "PUT",
      body: JSON.stringify(actionData),
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then(() => {
        setData({ id: "", isOpen: false });
        setLoadingCnx(false);
        setTimeout(() => {
          location.reload();
        }, 1000);
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
      >
        {user_data.created_at && (
          <Form
            layout="vertical"
            onFinish={onSubmit}
            initialValues={{
              name: user_data?.name,
              surname: user_data?.surname,
              address: user_data?.address,
              phone_number: user_data?.phone_number,
              gender: user_data?.gender,
              job: user_data?.job,
              date_birth: dayjs(user_data?.date_birth),
              description: user_data?.description,
              prikus: user_data?.prikus,
              disease_progression: user_data?.disease_progression,
              objective_check: user_data?.objective_check,
              milk: user_data?.milk,
              placental_diseases: user_data?.placental_diseases,
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
                  <Input
                    disabled
                    placeholder="Iltimos ism kiriting"
                    onChange={(e) =>
                      setDatas((prev) => {
                        return { ...prev, name: e.target.value };
                      })
                    }
                  />
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
                  <Input
                    disabled
                    placeholder="Familya kiriting"
                    onChange={(e) =>
                      setDatas((prev) => {
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
                  name="address"
                  label="Yashash joyi"
                  rules={[
                    {
                      required: true,
                      message: "Yashash joyi",
                    },
                  ]}
                >
                  <Input
                    disabled
                    placeholder="Iltimos yashash joyini kiriting"
                    onChange={(e) =>
                      setDatas((prev) => {
                        return { ...prev, address: e.target.value };
                      })
                    }
                  />
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
                  <Input
                    placeholder="Iltimos telefon nomer kiriting"
                    disabled
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
                    disabled
                    placeholder="Iltimos jinsingizni tanlang"
                    onChange={(e) =>
                      setDatas((prev) => {
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
                    disabled
                    placeholder="Iltimos kasbingizni kiriting"
                    onChange={(e) =>
                      setDatas((prev) => {
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
                    disabled
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
        )}
      </Drawer>
    </>
  );
};
export default EditModalAccound;
