import {
  Descriptions,
  DescriptionsProps,
  Flex,
  Layout,
  Typography,
  message,
  theme,
} from "antd";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
const { Title } = Typography;
const { Content } = Layout;
import { UserData } from "../types/type";
import { ThemeProvider } from "../App";

import userImage from "../assets/image/Sample_User_Icon.png";
import { TbCameraPlus } from "react-icons/tb";
import dayjs from "dayjs";

const Profile = () => {
  const location = useLocation();
  const [userData, setUserData] = useState<UserData>();
  const [messageApi, contextHolder] = message.useMessage();

  const ThemeProvide = useContext(ThemeProvider);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const token = localStorage.getItem("auth");
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
  const items: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "Ismi",
      children: userData?.name,
    },
    {
      key: "2",
      label: "Familyasi",
      children: userData?.surname,
    },
    {
      key: "3",
      label: "Yashash joyi",
      children: userData?.address,
    },
    {
      key: "4",
      label: "Tug'ilgan sana",
      children: dayjs(userData?.date_birth).format("DD-MM-YYYY"),
    },
    {
      key: "5",
      label: "Jinsi",
      children: userData?.gender == "male" ? "Erkak" : "Ayol",
    },
  ];
  return (
    <Content style={{ margin: "24px 0 0" }}>
      <div
        style={{
          minHeight: "96vh",
        }}
      >
        <Flex
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
          <br />
          <br />
          <Descriptions
            layout="vertical"
            items={items}
            labelStyle={{
              color: ThemeProvide.theme == "dark" ? "#eee" : "#333",
              fontSize: "20px",
            }}
          />
        </Flex>
      </div>
      {contextHolder}
    </Content>
  );
};

export default Profile;
