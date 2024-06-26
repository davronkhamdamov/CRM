import {
  Form,
  Flex,
  Layout,
  Typography,
  theme,
  Input,
  Button,
  Select,
  FormProps,
  message,
} from "antd";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
const { Title } = Typography;
const { Content } = Layout;
import { Staffs, UserData } from "../types/type";

import userImage from "../assets/image/Sample_User_Icon.png";
import { TbCameraPlus } from "react-icons/tb";
import { Option } from "antd/es/mentions";
import { LoadingProvider } from "../App";

const EditProfile = () => {
  const location = useLocation();
  const [userData, setUserData] = useState<UserData>();
  const { setLoadingCnx } = useContext(LoadingProvider);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const token = localStorage.getItem("auth");
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    fetchData();
  }, [location, token]);
  const fetchData = () => {
    fetch(import.meta.env.VITE_APP_URL + "/staffs/get-me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUserData(data.result);
      });
  };
  const updateProfile: FormProps<Staffs>["onFinish"] = (actionData) => {
    setLoadingCnx(true);
    fetch(import.meta.env.VITE_APP_URL + "/staffs/update-me", {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: actionData.name,
        surname: actionData.surname,
        address: actionData.address,
        phone_number: actionData.phone_number,
        gender: actionData.gender,
        login: actionData.login,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        fetchData();
        setLoadingCnx(false);
        messageApi.success("Profile yangilandi", 2);
      })
      .catch(() => {
        setLoadingCnx(false);
        messageApi.error("Profile yangilashda xatolik yuz berdi", 2);
      });
  };
  return (
    <Content style={{ margin: "24px 0 0" }}>
      <div
        style={{
          minHeight: "96vh",
        }}
      >
        <Flex
          align="center"
          gap={30}
          style={{
            padding: 24,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            minHeight: "400px",
          }}
        >
          <Flex vertical style={{ width: "20%" }}>
            <Flex align="center" vertical gap={20}>
              <label htmlFor="profile" className="profile_image">
                <img
                  src={userData?.img_url || userImage}
                  alt=""
                  style={{
                    width: "200px",
                    borderRadius: "50%",
                    height: "200px",
                    objectFit: "cover",
                  }}
                />
                <div className="profile_hidden">
                  <TbCameraPlus size={30} color="white" />
                </div>
              </label>
              <input
                type="file"
                style={{ display: "none" }}
                id="profile"
                onChange={(e) => {
                  if (e.target.files?.length) {
                    messageApi.loading("Profile rasmi yangilanmoqda", 15);
                    const formData = new FormData();
                    formData.append("file", e.target.files[0]);
                    formData.append("upload_preset", "youtube");
                    fetch(
                      "https://api.cloudinary.com/v1_1/didddubfm/image/upload",
                      {
                        method: "POST",
                        body: formData,
                      }
                    )
                      .then((res) => res.json())
                      .then((data) => {
                        fetch(
                          import.meta.env.VITE_APP_URL +
                            "/staffs/image/" +
                            userData?.id,
                          {
                            method: "PUT",
                            headers: {
                              Authorization: `Bearer ${token}`,
                              "Content-type": "application/json",
                            },
                            body: JSON.stringify({ image_url: data.url }),
                          }
                        )
                          .then((res) => res.json())
                          .then((data) => {
                            if (data.message == "updated") {
                              messageApi.destroy();
                              messageApi.success("Profile rasmi yangilandi", 2);
                              fetchData();
                            } else {
                              messageApi.destroy();
                              messageApi.error(
                                "Profile rasmi yangilashda xatolik yuzaga keldi",
                                2
                              );
                            }
                          });
                      });
                  }
                }}
              />
              <Title level={4} style={{ margin: 0 }}>
                {userData?.name ? userData?.name : "Yuklanmoqda..."}{" "}
                {userData?.surname}
              </Title>
              <Title level={5} style={{ margin: 0 }}>
                Login: {userData?.login ? userData?.login : "Yuklanmoqda..."}
              </Title>
            </Flex>
          </Flex>
          {userData?.id && (
            <Form
              onFinish={updateProfile}
              style={{ width: "100%" }}
              initialValues={{
                name: userData?.name,
                surname: userData?.surname,
                gender: userData?.gender,
                address: userData?.address,
                phone_number: userData?.phone_number,
              }}
            >
              <Flex gap={50}>
                <div style={{ width: "33%" }}>
                  <Typography.Title level={5}>Ism</Typography.Title>
                  <Form.Item name={"name"} rules={[{ required: true }]}>
                    <Input />
                  </Form.Item>
                </div>
                <div style={{ width: "33%" }}>
                  <Typography.Title level={5}>Familya</Typography.Title>
                  <Form.Item name={"surname"} rules={[{ required: true }]}>
                    <Input />
                  </Form.Item>
                </div>
              </Flex>
              <Flex gap={50}>
                <div style={{ width: "33%" }}>
                  <Typography.Title level={5}>Manzil</Typography.Title>
                  <Form.Item name={"address"} rules={[{ required: true }]}>
                    <Input />
                  </Form.Item>
                </div>
                <div style={{ width: "33%" }}>
                  <Typography.Title level={5}>Telefon raqam</Typography.Title>
                  <Form.Item name={"phone_number"}>
                    <Input />
                  </Form.Item>
                </div>
              </Flex>

              <div style={{ width: "33%" }}>
                <Typography.Title level={5}>Jinsi</Typography.Title>
                <Form.Item
                  name="gender"
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
              </div>
              <Form.Item>
                <Button
                  style={{ width: "200px" }}
                  type="primary"
                  htmlType="submit"
                >
                  Submit
                </Button>
              </Form.Item>
            </Form>
          )}
        </Flex>
      </div>
      {contextHolder}
    </Content>
  );
};

export default EditProfile;
