import React, { useEffect, useState } from "react";
import { Divider, Flex, Layout, Typography, theme } from "antd";
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
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const token = localStorage.getItem("auth");

  useEffect(() => {
    fetch(import.meta.env.VITE_APP_URL + "/staffs/" + params.id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUserData(data.result);
        console.log(data);
      });
  }, [location, params.id, token]);

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
              <input type="file" style={{ display: "none" }} id="profile" />
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
        <DocktorTreatmentTable patient_id={params.id} />
      </div>
    </Content>
  );
};

export default SingleDocktor;
