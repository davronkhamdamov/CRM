import { Divider, Flex, Layout, Typography, message, theme } from "antd";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
const { Title } = Typography;
const { Content } = Layout;
import { IoHomeOutline } from "react-icons/io5";
import { UserData } from "../types/type";
import { FaFemale, FaMale } from "react-icons/fa";
import dayjs from "dayjs";
import { BsCalendar2Date } from "react-icons/bs";
import { GrPhone } from "react-icons/gr";
import { MdWork } from "react-icons/md";
import { LuCircleDollarSign } from "react-icons/lu";
import userImage from "../assets/image/Sample_User_Icon.png";
import { TbCameraPlus } from "react-icons/tb";
import { IoMdInformationCircleOutline } from "react-icons/io";
import formatMoney from "../lib/money_format";

const SingleBemor: React.FC = () => {
  const params = useParams();
  const location = useLocation();
  const [userData, setUserData] = useState<UserData>();
  const [loading, setLoading] = useState<boolean>(false);
  const [messageApi, contextHolder] = message.useMessage();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const token = localStorage.getItem("auth");

  useEffect(() => {
    fetchData();
  }, [location, params.id, token]);
  const fetchData = () => {
    setLoading(true);
    fetch(import.meta.env.VITE_APP_URL + "/user/get-me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setUserData(data.result);
      });
  };

  return (
    <Content style={{ margin: "24px 0" }}>
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
                  src={loading ? "" : userData?.img_url || userImage}
                  alt=""
                  height={200}
                  width={200}
                  style={{ borderRadius: "50%" }}
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
                        fetch(import.meta.env.VITE_APP_URL + "/user/image", {
                          method: "PUT",
                          headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-type": "application/json",
                          },

                          body: JSON.stringify({ image_url: data.url }),
                        })
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
            </Flex>
          </Flex>
          <Divider type="vertical" style={{ height: "550px" }} />
          <Flex vertical style={{ width: "80%" }}>
            <Flex style={{ width: "100%" }} gap={50} align="center">
              {!loading ? (
                <Flex style={{ width: "33.3%" }} align="center" gap={10}>
                  Jinsi:{" "}
                  {userData?.gender == "male" ? (
                    <Flex>
                      Erkak <FaMale />
                    </Flex>
                  ) : (
                    <Flex>
                      Ayol <FaFemale />
                    </Flex>
                  )}
                </Flex>
              ) : (
                <Flex style={{ width: "33.3%" }}> Jinsi: Yuklanmoqda... </Flex>
              )}
              <Divider type="vertical" style={{ height: "100px" }} />
              <Flex align="center" gap={10} style={{ width: "33.3%" }}>
                <BsCalendar2Date /> Tug'ilgan sana:{" "}
                {!loading
                  ? dayjs(userData?.date_birth).format("DD-MM-YYYY")
                  : "Yuklanmoqda..."}
              </Flex>
              <Divider type="vertical" style={{ height: "100px" }} />
              <Flex style={{ width: "33.3%" }} gap={10}>
                <GrPhone /> Telefon raqam:{" "}
                {!loading ? userData?.phone_number : "Yuklanmoqda..."}
              </Flex>
            </Flex>
            <Divider />
            <Flex
              style={{ width: "100%", height: "60px" }}
              align="center"
              gap={50}
            >
              <Flex align="center" gap={10} style={{ width: "33.3%" }}>
                <IoHomeOutline /> Manzil:{" "}
                {!loading ? userData?.address : "Yuklanmoqda.."}
              </Flex>
              <Divider type="vertical" style={{ height: "100px" }} />
              <Flex align="center" gap={10} style={{ width: "33.3%" }}>
                <MdWork /> Kasbi: {!loading ? userData?.job : "Yuklanmoqda.."}
              </Flex>
              <Divider type="vertical" style={{ height: "100px" }} />
              <Flex align="center" gap={10} style={{ width: "33.3%" }}>
                <BsCalendar2Date /> Ro'yatdan o'tgan sanasi :{" "}
                {!loading
                  ? dayjs(userData?.created_at).format("DD-MM-YYYY")
                  : "Yuklanmoqda..."}
              </Flex>
            </Flex>
            <Divider />
            <Flex
              style={{ width: "100%", height: "60px" }}
              align="center"
              gap={50}
            >
              <Flex align="center" gap={10} style={{ width: "33.3%" }}>
                Boshidan o'tkazgan yo'ldosh kasalliklari:{" "}
                {!loading
                  ? userData?.placental_diseases || "-"
                  : "Yuklanmoqda.."}
              </Flex>
              <Divider type="vertical" style={{ height: "100px" }} />
              <Flex align="center" gap={10} style={{ width: "33.3%" }}>
                Ushbu kasallikning rivojlanishi:{" "}
                {!loading
                  ? userData?.disease_progression || "-"
                  : "Yuklanmoqda.."}
              </Flex>
              <Divider type="vertical" style={{ height: "100px" }} />
              <Flex align="center" gap={10} style={{ width: "33.3%" }}>
                Obyektiv tekshiruv:
                <p>
                  {!loading
                    ? userData?.objective_check || "-"
                    : "Yuklanmoqda..."}
                </p>
              </Flex>
            </Flex>
            <Divider />
            <Flex style={{ width: "100%", height: "60px" }} align="center">
              <Flex gap={10} align="center">
                <IoMdInformationCircleOutline size={20} />
                <p>Bemor haqida ko'proq ma'lumot:</p>
              </Flex>
              <p style={{ marginLeft: "10px" }}>
                {userData?.description === null ? "-" : userData?.description}
              </p>
            </Flex>
            <Divider />
            <Flex
              style={{ width: "100%", height: "60px" }}
              gap={50}
              align="end"
            >
              <Flex
                style={{ width: "100%", height: "60px", fontSize: "20px" }}
                gap={10}
                align="center"
              >
                <LuCircleDollarSign /> Balance :
                <Typography.Text
                  style={{
                    fontSize: "30px",
                    color: (userData?.balance || 0) < 0 ? "red" : "",
                  }}
                >
                  {formatMoney(userData?.balance || 0)}
                </Typography.Text>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </div>
      {contextHolder}
    </Content>
  );
};

export default SingleBemor;
