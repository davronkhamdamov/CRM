import { Divider, Flex, Layout, Tabs, Typography, theme } from "antd";
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
import userImage from '../assets/image/Sample_User_Icon.png'
import { TbCameraPlus } from "react-icons/tb";

const SingleBemor: React.FC = () => {
    const params = useParams();
    const location = useLocation();
    const [userData, setUserData] = useState<UserData>()
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    useEffect(() => {
        fetch(import.meta.env.VITE_APP_URL + "/user/" + params.id)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setUserData(data.result)
            })
    }, [location])
    const tabItems = [
        {
            icon: MdOutlinePayments,
            title: "To'lovlar tarixi",
            children: <PaymentHistory />
        },
        {
            icon: GrServices,
            title: "Foydalanilgan xizmatlar tarixi",
            children: <ServiceHistory />
        }
    ]

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
                        minHeight: "400px"
                    }}>


                    <Flex vertical style={{ width: "20%" }}>
                        <Flex align="center" vertical gap={20}>
                            <label htmlFor="profile" className="profile_image">
                                <img src={userImage} alt="" style={{ width: "200px" }} />
                                <div className="profile_hidden">
                                    <TbCameraPlus size={30} color="white" />
                                </div>
                            </label>
                            <input type="file" style={{ display: "none" }} id="profile" />
                            <Title level={4} style={{ margin: 0 }}>{userData?.name} {userData?.surname}</Title>
                        </Flex>
                    </Flex>
                    <Divider type="vertical" style={{ height: "350px" }} />
                    <Flex vertical style={{ width: "80%" }}>
                        <Flex style={{ width: "100%", height: "60px" }} gap={50} align="center">
                            {userData?.gender &&
                                <Flex style={{ width: "33.3%" }} align="center" gap={10}> Jinsi: {userData?.gender == "male" ? <Flex>  Erkak <FaMale /></Flex> : <Flex>Ayol <FaFemale /></Flex>} </Flex>
                            }
                            <Divider type="vertical" style={{ height: "100px" }} />
                            <Flex align="center" gap={10} style={{ width: "33.3%" }}><BsCalendar2Date /> Tug'ilgan sana: {dayjs(userData?.date_birth).format("DD-MM-YYYY")}</Flex>
                            <Divider type="vertical" style={{ height: "100px" }} />
                            <Flex style={{ width: "33.3%" }} gap={10}><GrPhone /> Telefon raqam: {userData?.phone_number}</Flex>
                        </Flex>
                        <Divider />
                        <Flex style={{ width: "100%", height: "60px" }} align="center" gap={50}>
                            <Flex align="center" gap={10} style={{ width: "33.3%" }}>
                                <IoHomeOutline /> Manzil:  {userData?.address}
                            </Flex>
                            <Divider type="vertical" style={{ height: "100px" }} />
                            <Flex align="center" gap={10} style={{ width: "33.3%" }}>
                                <MdWork /> Kasbi:  {userData?.job}
                            </Flex>
                            <Divider type="vertical" style={{ height: "100px" }} />
                            <Flex align="center" gap={10} style={{ width: "33.3%" }}>
                                <BsCalendar2Date /> Ro'yatdan o'tgan sanasi : {dayjs(userData?.created_at).format("DD-MM-YYYY")}
                            </Flex>
                        </Flex>
                        <Divider />

                        <Flex style={{ width: "100%", height: "60px" }} gap={50} align="end">
                            <Flex style={{ width: "100%", height: "60px", fontSize: "20px" }} gap={10} align="center">
                                <LuCircleDollarSign />   Balance : <span style={{ fontSize: "30px" }}>{userData?.balance} so'm</span>
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
                        marginTop: "20px"
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
        </Content>
    );
};

export default SingleBemor;
