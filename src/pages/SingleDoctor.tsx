import React, { useEffect, useState } from "react";
import { Divider, Flex, Layout, Typography, message, theme } from "antd";
import { Link, useLocation, useParams } from "react-router-dom";
import { IoArrowBackSharp, IoHomeOutline } from "react-icons/io5";
const { Title } = Typography;
const { Content } = Layout;
import { UserData } from "../types/type";
import { FaFemale, FaMale } from "react-icons/fa";
import dayjs from "dayjs";
import { BsCalendar2Date } from "react-icons/bs";
import { GrPhone } from "react-icons/gr";
import userImage from "../assets/image/Sample_User_Icon.png";
import { TbCameraPlus } from "react-icons/tb";
import DocktorTreatmentTable from "../components/DoctorTreatmentTable";

const SingleDocktor: React.FC = () => {
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
    fetch(import.meta.env.VITE_APP_URL + "/staffs/" + params.id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUserData(data.result);
      });
  };
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
            <p>Shifokorlar ro'yhatiga qaytish</p>
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
                            "/staffs/image/" +
                            params.id,
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
          <Divider type="vertical" style={{ height: "350px" }} />
          <Flex vertical style={{ width: "80%" }}>
            <Flex
              style={{ width: "100%", height: "60px" }}
              gap={50}
              align="center"
            >
              {userData?.gender ? (
                <Flex style={{ width: "33.3%" }} align="center" gap={10}>
                  {" "}
                  Jinsi:{" "}
                  {userData?.gender == "male" ? (
                    <Flex>
                      {" "}
                      Erkak <FaMale />
                    </Flex>
                  ) : (
                    <Flex>
                      Ayol <FaFemale />
                    </Flex>
                  )}{" "}
                </Flex>
              ) : (
                <Flex style={{ width: "33.3%" }}> Jinsi: Yuklanmoqda... </Flex>
              )}
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
                <BsCalendar2Date /> Ro'yatdan o'tgan sanasi :{" "}
                {userData?.created_at
                  ? dayjs(userData?.created_at).format("DD-MM-YYYY")
                  : "Yuklanmoqda..."}
              </Flex>
            </Flex>
            <Divider />
          </Flex>
        </Flex>
        <br />
        <DocktorTreatmentTable patient_id={params.id} />
      </div>
      {contextHolder}
    </Content>
  );
};

export default SingleDocktor;
