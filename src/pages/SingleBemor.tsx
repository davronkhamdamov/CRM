import { Divider, Flex, Layout, Tabs, Typography, message, theme } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
const { Title } = Typography;
const { Content } = Layout;
import { IoArrowBackSharp, IoHomeOutline } from "react-icons/io5";
import { UserData } from "../types/type";
import { FaFemale, FaMale } from "react-icons/fa";
import dayjs from "dayjs";
import { BsCalendar2Date } from "react-icons/bs";
import { GrPhone, GrServices } from "react-icons/gr";
import { MdOutlinePayments, MdWork } from "react-icons/md";
import { LuCircleDollarSign } from "react-icons/lu";
import PaymentHistory from "../components/PaymentHistory";
import ServiceHistory from "../components/ServiceHistory ";
import userImage from "../assets/image/Sample_User_Icon.png";
import { TbCameraPlus } from "react-icons/tb";
import { IoMdInformationCircleOutline } from "react-icons/io";
import formatMoney from "../lib/money_format";

const SingleBemor: React.FC = () => {
  const params = useParams();
  const location = useLocation();
  const [userData, setUserData] = useState<UserData>();
  const [messageApi, contextHolder] = message.useMessage();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const token = localStorage.getItem("auth");

  useEffect(() => {
    fetchData();
  }, [location, params.id, token]);
  const fetchData = () => {
    fetch(import.meta.env.VITE_APP_URL + "/user/" + params.id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUserData(data.result);
      });
  };

  const tabItems = [
    {
      icon: MdOutlinePayments,
      title: "To'lovlar tarixi",
      children: <PaymentHistory patient_id={params?.id} />,
    },
    {
      icon: GrServices,
      title: "Foydalanilgan xizmatlar tarixi",
      children: <ServiceHistory patient_id={params?.id} />,
    },
  ];

  return (
    <Content style={{ margin: "24px 16px 0" }}>
      <div
        style={{
          minHeight: "96vh",
        }}
      >
        <Link to={location.pathname.split("/").splice(0, 3).join("/")}>
          <Flex align="center" gap={5}>
            <IoArrowBackSharp />
            <p>Bemorlar ro'yhatiga qaytish</p>
          </Flex>
        </Link>
        <br />
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
                  style={{ width: "200px", borderRadius: "50%" }}
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
                            "/user/image/" +
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
            </Flex>
          </Flex>
          <Divider type="vertical" style={{ height: "550px" }} />
          <Flex vertical style={{ width: "80%" }}>
            <Flex style={{ width: "100%" }} gap={50} align="center">
              {userData?.gender ? (
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
                {userData?.date_birth
                  ? dayjs(userData?.date_birth).format("DD-MM-YYYY")
                  : "Yuklanmoqda..."}
              </Flex>
              <Divider type="vertical" style={{ height: "100px" }} />
              <Flex style={{ width: "33.3%" }} gap={10}>
                <GrPhone /> Telefon raqam:{" "}
                {userData?.phone_number
                  ? userData?.phone_number
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
                <IoHomeOutline /> Manzil:{" "}
                {userData?.address ? userData?.address : "Yuklanmoqda.."}
              </Flex>
              <Divider type="vertical" style={{ height: "100px" }} />
              <Flex align="center" gap={10} style={{ width: "33.3%" }}>
                <MdWork /> Kasbi:{" "}
                {userData?.job ? userData?.job : "Yuklanmoqda.."}
              </Flex>
              <Divider type="vertical" style={{ height: "100px" }} />
              <Flex align="center" gap={10} style={{ width: "33.3%" }}>
                <BsCalendar2Date /> Ro'yatdan o'tgan sanasi :{" "}
                {userData?.created_at
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
                {userData?.placental_diseases
                  ? userData?.placental_diseases
                  : "Yuklanmoqda.."}
              </Flex>
              <Divider type="vertical" style={{ height: "100px" }} />
              <Flex align="center" gap={10} style={{ width: "33.3%" }}>
                Ushbu kasallikning rivojlanishi:{" "}
                {userData?.disease_progression
                  ? userData?.disease_progression
                  : "Yuklanmoqda.."}
              </Flex>
              <Divider type="vertical" style={{ height: "100px" }} />
              <Flex align="center" gap={10} style={{ width: "33.3%" }}>
                Obyektiv tekshiruv:
                <p>
                  {userData?.objective_check
                    ? userData?.objective_check
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
                {userData?.description === null
                  ? "Hech qanday malumot topilmadi"
                  : userData?.description}
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
        <Flex
          style={{
            padding: 24,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            minHeight: "400px",
            marginTop: "20px",
          }}
        >
          <Tabs
            style={{ width: "100%" }}
            defaultActiveKey="1"
            items={tabItems.map((el, i) => {
              const id = String(i + 1);
              return {
                forceRender: true,
                key: id,
                label: el.title,
                children: el.children,
                icon: <el.icon />,
              };
            })}
          />
        </Flex>
      </div>
      {contextHolder}
    </Content>
  );
};

export default SingleBemor;
