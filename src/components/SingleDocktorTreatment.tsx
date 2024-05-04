import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Badge,
  Button,
  Checkbox,
  Descriptions,
  DescriptionsProps,
  Flex,
  Modal,
  Tag,
  message,
  theme,
} from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { Content } from "antd/es/layout/layout";
import {
  CureDataType,
  PayloadType,
  ServiceCategoryType,
  ServiceType,
} from "../types/type";
import dayjs from "dayjs";
import Successfully from "./Success";
import confetti from "canvas-confetti";
import one from "../assets/image/teeth/1-removebg.png";
import two from "../assets/image/teeth/2-removebg-preview.png";
import three from "../assets/image/teeth/3-removebg-preview.png";
import four from "../assets/image/teeth/4-removebg-preview.png";
import five from "../assets/image/teeth/5-removebg-preview.png";
import six from "../assets/image/teeth/6-removebg-preview.png";
import seven from "../assets/image/teeth/7-removebg-preview.png";
import eight from "../assets/image/teeth/8-removebg-preview.png";
import nine from "../assets/image/teeth/9-removebg-preview.png";
import ten from "../assets/image/teeth/10-removebg-preview.png";
import eleven from "../assets/image/teeth/11-removebg-preview.png";
import twelve from "../assets/image/teeth/12-removebg-preview.png";
import thirteen from "../assets/image/teeth/13-removebg-preview.png";
import fourteen from "../assets/image/teeth/14-removebg-preview.png";
import fifteen from "../assets/image/teeth/15-removebg-preview.png";
import sixteen from "../assets/image/teeth/16-removebg-preview.png";
import seventeen from "../assets/image/teeth/17-removebg-preview.png";
import eighteen from "../assets/image/teeth/18-removebg-preview.png";
import nineteen from "../assets/image/teeth/19-removebg-preview.png";
import twenty from "../assets/image/teeth/20-removebg-preview.png";
import twentyone from "../assets/image/teeth/21-removebg-preview.png";
import twentytwo from "../assets/image/teeth/22-removebg-preview.png";
import twentythree from "../assets/image/teeth/23-removebg-preview.png";
import twentyfour from "../assets/image/teeth/24-removebg-preview.png";
import twentyfive from "../assets/image/teeth/25-removebg-preview.png";
import twentysix from "../assets/image/teeth/26-removebg-preview.png";
import twentyseven from "../assets/image/teeth/27-removebg-preview.png";
import twentyeight from "../assets/image/teeth/28-removebg-preview.png";
import twentynine from "../assets/image/teeth/29-removebg-preview.png";
import thirty from "../assets/image/teeth/30-removebg-preview (1).png";
import thirtyone from "../assets/image/teeth/31-removebg-preview.png";
import thirtytwo from "../assets/image/teeth/32-removebg-preview.png";
import { PiToothFill } from "react-icons/pi";
import { GiTooth } from "react-icons/gi";

const SingleDocktorTreatment = () => {
  const params = useParams();
  const [messageApi, contextHolder] = message.useMessage();
  const [cureData, setCureData] = useState<CureDataType>();
  const [services, setServices] = useState<ServiceCategoryType[]>([]);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [payload, setPayload] = useState<PayloadType[]>([]);
  const [saved_payload, setSaved_payload] = useState<PayloadType[]>([]);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const token = localStorage.getItem("auth");

  useEffect(() => {
    fetch(import.meta.env.VITE_APP_URL + "/cure/" + params.id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCureData(data.result);
      });
    fetch(import.meta.env.VITE_APP_URL + "/service/by-category", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
alert(JSON.stringify(data))
        setServices(data.result);
      });
  }, [params.id, saved_payload,payload]);

  const teeth = [
    {
      id: 1,
      img: one,
      style: {
        width: "60px",
        transform: "translate(-15px, 0)",
      },
      text_style: {
        transform: "translate(-20px, 20px)",
      },
      selected: false,
      div_style: {
        width: "50px",
        height: "50px",
        left: "37px",
        top: "400px",
      },
    },
    {
      id: 2,
      img: two,
      style: {
        width: "60px",
        transform: "translate(-5px, 0)",
      },
      text_style: {
        transform: "translate(-20px, 20px)",
      },
      selected: false,
      div_style: {
        left: "40px",
        top: "335px",
        width: "60px",
        height: "60px",
      },
    },
    {
      id: 3,
      img: three,
      style: {
        width: "60px",
        transform: "translate(-7px, 0)",
      },
      text_style: {
        transform: "translate(-20px, 15px)",
      },
      selected: false,
      div_style: {
        left: "50px",
        top: "271px",
        width: "65px",
        height: "63px",
      },
    },
    {
      id: 4,
      img: four,
      style: {
        width: "60px",
        transform: "translate(-12px, 0)",
      },
      text_style: {
        transform: "translate(-20px, -15px)",
      },
      selected: false,
      div_style: {
        top: "225px",
        left: "70px",
        width: "55px",
        height: "45px",
      },
    },
    {
      id: 5,
      img: five,
      style: {
        width: "60px",
        transform: "translate(-12px, 0)",
      },
      text_style: {
        transform: "translate(-15px, -20px)",
      },
      selected: false,
      div_style: {
        left: "90px",
        top: "180px",
        width: "55px",
        height: "45px",
      },
    },
    {
      id: 6,
      img: six,
      style: {
        width: "60px",
        transform: "translate(-12px, 0)",
      },
      text_style: {
        transform: "translate(-20px, -20px)",
      },
      selected: false,
      div_style: {
        left: "110px",
        top: "135px",
        width: "55px",
        height: "45px",
      },
    },
    {
      id: 7,
      img: seven,
      style: {
        width: "60px",
        transform: "translate(-16px, 0)",
      },
      text_style: {
        transform: "translate(-15px, -15px)",
      },
      selected: false,
      div_style: {
        left: "140px",
        top: "90px",
        width: "50px",
        height: "45px",
      },
    },
    {
      id: 8,
      img: eight,
      style: {
        width: "60px",
        transform: "translate(-13px, 0)",
      },
      text_style: {
        transform: "translate(20px, -25px)",
      },
      selected: false,
      div_style: {
        left: "190px",
        top: "70px",
        width: "50px",
        height: "50px",
      },
    },
    {
      id: 9,
      img: nine,
      style: {
        width: "60px",
        transform: "translate(-16px, 0)",
      },
      text_style: {
        transform: "translate(20px, -25px)",
      },
      selected: false,
      div_style: {
        left: "240px",
        top: "70px",
        width: "50px",
        height: "50px",
      },
    },
    {
      id: 10,
      img: ten,
      style: {
        width: "60px",
        transform: "translate(-30px, 0)",
      },
      text_style: {
        transform: "translate(45px, -20px)",
      },
      selected: false,
      div_style: {
        left: "290px",
        top: "90px",
        width: "45px",
        height: "45px",
      },
    },
    {
      id: 11,
      img: eleven,
      style: {
        width: "60px",
        transform: "translate(-22px, 0)",
      },
      text_style: {
        transform: "translate(55px, 10px)",
      },
      selected: false,
      div_style: {
        left: "310px",
        top: "135px",
        width: "50px",
        height: "45px",
      },
    },
    {
      id: 12,
      img: twelve,
      style: {
        width: "60px",
        transform: "translate(-18px, 0)",
      },
      text_style: {
        transform: "translate(60px, 15px)",
      },
      selected: false,
      div_style: {
        left: "330px",
        top: "180px",
        width: "60px",
        height: "50px",
      },
    },
    {
      id: 13,
      img: thirteen,
      style: {
        width: "60px",
        transform: "translate(-22px, 0)",
      },
      text_style: {
        transform: "translate(60px, 10px)",
      },
      selected: false,
      div_style: {
        left: "345px",
        top: "230px",
        width: "55px",
        height: "45px",
      },
    },
    {
      id: 14,
      img: fourteen,
      style: {
        width: "60px",
        transform: "translate(-17px, 0)",
      },
      text_style: {
        transform: "translate(65px, 20px)",
      },
      selected: false,
      div_style: {
        left: "355px",
        top: "275px",
        width: "60px",
        height: "65px",
      },
    },
    {
      id: 15,
      img: fifteen,
      style: {
        width: "60px",
        transform: "translate(-25px, 0)",
      },
      text_style: {
        transform: "translate(60px, 15px)",
      },
      selected: false,
      div_style: {
        left: "370px",
        top: "340px",
        width: "50px",
        height: "60px",
      },
    },
    {
      id: 16,
      img: sixteen,
      style: {
        width: "65px",
        transform: "translate(-22px, 0)",
      },
      text_style: {
        transform: "translate(60px, 10px)",
      },
      selected: false,
      div_style: {
        left: "375px",
        top: "400px",
        width: "55px",
        height: "55px",
      },
    },
    {
      id: 17,
      img: seventeen,
      style: {
        width: "65px",
        transform: "translate(-25px, 0)",
      },
      text_style: {
        transform: "translate(80px, 20px)",
      },
      selected: false,
      div_style: {
        left: "370px",
        top: "485px",
        width: "60px",
        height: "64px",
      },
    },
    {
      id: 18,
      img: eighteen,
      style: {
        width: "60px",
        transform: "translate(-20px, 0)",
      },
      text_style: {
        transform: "translate(80px, 20px)",
      },
      selected: false,
      div_style: {
        left: "365px",
        top: "555px",
        width: "65px",
        height: "64px",
      },
    },
    {
      id: 19,
      img: nineteen,
      style: {
        width: "65px",
        transform: "translate(-18px, 0)",
      },
      text_style: {
        transform: "translate(80px, 30px)",
      },
      selected: false,
      div_style: {
        left: "355px",
        top: "625px",
        width: "70px",
        height: "70px",
      },
    },
    {
      id: 20,
      img: twenty,
      style: {
        width: "60px",
        transform: "translate(-22px, 0)",
      },
      text_style: {
        transform: "translate(60px, 15px)",
      },
      selected: false,
      div_style: {
        left: "350px",
        top: "695px",
        width: "50px",
        height: "50px",
      },
    },
    {
      id: 21,
      img: twentyone,
      style: {
        width: "60px",
        transform: "translate(-23px, 0)",
      },
      text_style: {
        transform: "translate(55px, 30px)",
      },
      selected: false,
      div_style: {
        left: "330px",
        top: "745px",
        width: "50px",
        height: "45px",
      },
    },
    {
      id: 22,
      img: twentytwo,
      style: {
        width: "45px",
        transform: "translate(-20px, 0)",
      },
      text_style: {
        transform: "translate(40px, 45px)",
      },
      selected: false,
      div_style: {
        left: "320px",
        top: "790px",
        width: "40px",
        height: "50px",
      },
    },
    {
      id: 23,
      img: twentythree,
      style: {
        width: "40px",
        transform: "translate(-20px, 0)",
      },
      text_style: {
        transform: "translate(10px, 50px)",
      },
      selected: false,
      div_style: {
        left: "280px",
        top: "810px",
        width: "35px",
        height: "55px",
      },
    },
    {
      id: 24,
      img: twentyfour,
      style: {
        width: "40px",
        transform: "translate(-20px, 0)",
      },
      text_style: {
        transform: "translate(10px, 50px)",
      },
      selected: false,
      div_style: {
        left: "240px",
        top: "815px",
        width: "35px",
        height: "50px",
      },
    },
    {
      id: 25,
      img: twentyfive,
      style: {
        width: "40px",
        transform: "translate(-18px, 0)",
      },
      text_style: {
        transform: "translate(10px, 55px)",
      },
      selected: false,
      div_style: {
        left: "195px",
        top: "815px",
        width: "40px",
        height: "50px",
      },
    },
    {
      id: 26,
      img: twentysix,
      style: {
        width: "40px",
        transform: "translate(-17px, 0)",
      },
      text_style: {
        transform: "translate(10px, 50px)",
      },
      selected: false,
      div_style: {
        left: "155px",
        top: "810px",
        width: "40px",
        height: "50px",
      },
    },
    {
      id: 27,
      img: twentyseven,
      style: {
        width: "45px",
        transform: "translate(-15px, -3px)",
      },
      text_style: {
        transform: "translate(-25px, 45px)",
      },
      selected: false,
      div_style: {
        left: "105px",
        top: "790px",
        width: "50px",
        height: "50px",
      },
    },
    {
      id: 28,
      img: twentyeight,
      style: {
        width: "60px",
        transform: "translate(-25px, 0)",
      },
      text_style: {
        transform: "translate(-25px, 50px)",
      },
      selected: false,
      div_style: {
        left: "80px",
        top: "745px",
        height: "45px",
        width: "45px",
      },
    },
    {
      id: 29,
      img: twentynine,
      style: {
        width: "60px",
        transform: "translate(-22px, 0)",
      },
      text_style: {
        transform: "translate(-20px, 25px)",
      },
      selected: false,
      div_style: {
        left: "65px",
        top: "695px",
        height: "50px",
        width: "53px",
      },
    },
    {
      id: 30,
      img: thirty,
      style: {
        width: "60px",
        transform: "translate(-15px, 0)",
      },
      text_style: {
        transform: "translate(-25px , 25px)",
      },
      selected: false,
      div_style: {
        left: "45px",
        top: "625px",
        width: "65px",
        height: "68px",
      },
    },
    {
      id: 31,
      img: thirtyone,
      style: {
        width: "60px",
        transform: "translate(-15px, 0)",
      },
      text_style: {
        transform: "translate(-20px, 25px)",
      },
      selected: false,
      div_style: {
        left: "35px",
        top: "550px",
        height: "70px",
        width: "65px",
      },
    },
    {
      id: 32,
      img: thirtytwo,
      style: {
        width: "60px",
        transform: "translate(-20px, 0)",
      },
      text_style: {
        transform: "translate(-20px, 25px)",
      },
      selected: false,
      div_style: {
        left: "25px",
        top: "485px",
        width: "60px",
        height: "60px",
      },
    },
  ];

  const items: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "Bemor ismi",
      children: cureData?.user_name + " " + cureData?.user_surname,
    },
    {
      key: "2",
      label: "Mas'ul shifokor",
      children: cureData?.staff_name + " " + cureData?.staff_surname,
    },
    {
      key: "3",
      label: "Davolash boshlanish vaqti",
      children: dayjs(cureData?.start_time).format("DD-MM-YYYY HH-mm"),
    },
    {
      key: "4",
      label: "Davolash tugash vaqti",
      children: dayjs(cureData?.end_time).format("DD-MM-YYYY HH:mm"),
    },
    {
      key: "5",
      label: "Holati",
      children: (
        <Flex gap={100} align="center">
          <Badge status="processing" text={cureData?.is_done} />
        </Flex>
      ),
    },
  ];

  const finish = (is_done: string) => {
    if (saved_payload.length != 0) {
      fetch(import.meta.env.VITE_APP_URL + "/cure/update/" + params.id, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          payload_services: saved_payload,
          price: calculateSumOfPayload(),
          is_done: is_done,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setIsSuccess(true);
          console.log(data);

          const colors = ["#FFF000", "#00FF00", "#FF0000"];
          const duration = 2 * 1000;
          const end = Date.now() + duration;
          (function frame() {
            confetti({
              particleCount: 3,
              angle: 60,
              spread: 55,
              origin: { x: 0 },
              colors: colors,
            });
            confetti({
              particleCount: 3,
              angle: 120,
              spread: 55,
              origin: { x: 1 },
              colors: colors,
            });
            confetti({
              particleCount: 3,
              angle: 120,
              spread: 55,
              origin: { x: 2 },
              colors: colors,
            });
            if (Date.now() < end) {
              requestAnimationFrame(frame);
            }
          })();
        });
    } else {
      messageApi.warning("Tish yoki xizmat tanladingiz!");
    }
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const getName = (e: string) => {
    const service: ServiceType[] = [];
    services.forEach((e) => {
      service.push(...e.services.map((e) => e));
    });
    return service.find((el) => el.id == e);
  };
  const calculateSumOfPayload = () => {
    const _services: any[] = [];
    saved_payload?.forEach((e) => {
      e?.services?.forEach((e) => {
        _services.push(getName(e)?.price);
      });
    });
    return _services.reduce((a, e) => a + e, 0);
  };
  return (
    <Content>
      <div>
        <Flex
          vertical
          style={{
            padding: 24,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            minHeight: "80dvh",
          }}
        >
          <Descriptions
            title="Davolash haqida umumiy ma'lumotlar"
            layout="vertical"
            items={items}
            column={{ xs: 1, sm: 2, md: 3, lg: 3, xl: 4, xxl: 4 }}
          />
          <br />
          <br />
          <Flex
            justify="space-around"
            style={{
              width: "100%",
              height: "1000px",
            }}
          >
            <Flex align="center" style={{ width: "50%" }} vertical>
              <h3
                style={{ width: "100%", textAlign: "center", fontSize: "20px" }}
              >
                Davolamoqchi bo'lgan tishlarni tanlang:
              </h3>
              <div
                style={{
                  width: "100%",
                  maxWidth: "500px",
                  position: "relative",
                }}
              >
                {teeth.map((e) => {
                  const check = payload.find((el) => el.id == e.id);
                  return (
                    <button
                      key={e.id}
                      onClick={() => {
                        if (!check) {
                          setPayload((prev) => [...prev, { id: e.id }]);
                        } else {
                          setPayload((prev) =>
                            prev.filter((el) => el.id !== e.id)
                          );
                        }
                      }}
                      style={{
                        ...e.div_style,
                        display: "flex",
                        position: "absolute",
                        cursor: "pointer",
                        background: "transparent",
                        border: 0,
                      }}
                    >
                      <p style={{ ...e.text_style, userSelect: "none" }}>
                        {e.id}
                      </p>
                      <img
                        src={e.img}
                        alt=""
                        style={{
                          filter: check
                            ? `drop-shadow(0px 0px 2px dodgerblue)`
                            : "",
                          ...e.style,
                          objectFit: "cover",
                        }}
                      />
                    </button>
                  );
                })}
              </div>
            </Flex>
            <Flex vertical style={{ width: "50%" }} align="center">
              <Flex
                vertical
                align="center"
                style={{
                  maxHeight: "55%",
                  overflowY: "auto",
                  paddingBottom: "10px",
                }}
              >
                <h2>Tanlangan tishlar</h2>
                <br />
                <Flex gap={20} wrap="wrap">
                  {payload[0] ? (
                    payload.map((e) => {
                      return (
                        <Flex
                          key={e.id}
                          gap={10}
                          align="center"
                          justify="center"
                          style={{
                            background: "rgba(0, 0, 0, 0.03)",
                            width: "100px",
                            borderRadius: "10px",
                            height: "40px",
                          }}
                        >
                          <p style={{ fontSize: "20px" }}>{e.id}</p>
                          <Button
                            onClick={() => {
                              setPayload((prev) =>
                                prev.filter((el) => el != e)
                              );
                            }}
                            type="default"
                            style={{ color: "red", border: "1px solid red" }}
                            icon={<DeleteOutlined />}
                          />
                        </Flex>
                      );
                    })
                  ) : (
                    <Flex align="center" vertical gap={10}>
                      <PiToothFill size={40} />
                      <p>Hech qanday tish tanlanmagan</p>
                    </Flex>
                  )}
                </Flex>

                {payload[0] && (
                  <Flex style={{ marginTop: "30px" }} vertical align="center">
                    <h2 style={{ textAlign: "center" }}>Tanlangan xizmatlar</h2>
                    <br />
                    <br />
                    <Flex gap={10} justify="center" wrap="wrap">
                      {payload[0]?.services?.length ? (
                        payload[0]?.services?.map((e) => {
                          return (
                            <Flex
                              key={e}
                              gap={10}
                              align="center"
                              justify="center"
                              style={{
                                background: "rgba(0, 0, 0 , 0.02)",
                                width: "max-content",
                                padding: "0 10px",
                                borderRadius: "10px",
                                height: "40px",
                              }}
                            >
                              <p style={{ fontSize: "20px" }}>
                                {getName(e)?.name}
                              </p>
                              <Tag style={{ marginLeft: "10px" }}>
                                Xizmat narxi: {getName(e)?.price} so'm
                              </Tag>
                            </Flex>
                          );
                        })
                      ) : (
                        <Flex align="center" vertical gap={10}>
                          <PiToothFill size={40} />
                          <p>Hech qanday xizmat tanlanmagan</p>
                        </Flex>
                      )}
                    </Flex>
                    <Flex gap={20}>
                      <Button
                        style={{
                          width: "max-content",
                          marginTop: "40px",
                        }}
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => setIsModalOpen(true)}
                      >
                        Yangi ximat qo'shish
                      </Button>
                      <Button
                        style={{
                          width: "max-content",
                          marginTop: "40px",
                        }}
                        type="primary"
                        icon={<GiTooth />}
                        onClick={() => {
                          if (
                            payload.length > 0 &&
                            payload.some(
                              (el) => (el?.services?.length || 0) > 0
                            )
                          ) {
                            setPayload([]);
                            setSaved_payload((prev) => [...prev, ...payload]);
                          } else {
                            messageApi.warning("Tish yoki xizmat tanladingiz!");
                          }
                        }}
                      >
                        Saqlash
                      </Button>
                    </Flex>
                  </Flex>
                )}
                <Modal
                  width={1200}
                  title="Mavjud xizmatlar"
                  open={isModalOpen}
                  onOk={handleOk}
                  onCancel={handleCancel}
                >
                  <Flex style={{ minHeight: "400px", overflowY: "auto" }}>
                    <Flex gap={20} wrap="wrap" style={{ width: "100%" }}>
                      {services?.map((category) => {
                        return (
                          <div key={category.id}>
                            <p
                              style={{
                                width: "100%",
                                height: "40px",
                                background: "rgba(0, 0, 0, 0.02)",
                                borderRadius: "6px",
                                paddingLeft: "10px",
                                display: "flex",
                                alignItems: "center",
                                marginBottom: "10px",
                              }}
                            >
                              {category.name}
                            </p>
                            {category.services.map((service) => {
alert(service.name)
                              return (
                                <Checkbox
                                  key={service.id}
                                  checked={payload.some((el) =>
                                    el.services?.find((e) => e == service.id)
                                  )}
                                  onChange={() => {
                                    setPayload((prev) =>
                                      prev?.map((e) => {
                                        if (!e.services?.includes(service.id)) {
                                          return {
                                            id: e.id,
                                            services: [
                                              ...(e.services || []),
                                              service.id,
                                            ],
                                          };
                                        }
                                        return {
                                          id: e.id,
                                          services: [
                                            ...(e.services.filter(
                                              (ele) => ele !== service.id
                                            ) || []),
                                          ],
                                        };
                                      })
                                    );
                                  }}
                                >
                                  {service.name}
                                  <Tag style={{ marginLeft: "10px" }}>
                                    Xizmat narxi: {service.price} so'm
                                  </Tag>
                                </Checkbox>
                              );
                            })}
                          </div>
                        );
                      })}
                    </Flex>
                  </Flex>
                </Modal>
              </Flex>
              <Flex
                style={{ paddingTop: "20px", height: "45%", width: "100%" }}
                vertical
              >
                <h2 style={{ textAlign: "center" }}>Saqlangan davolashlar</h2>
                <br />
                {saved_payload[0] ? (
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <tr className="table_wrapper">
                      <th className="table_item">Tish id</th>
                      <th className="table_item">Xizmat nomi</th>
                      <th className="table_item">Xizmat narxi</th>
                    </tr>
                    {saved_payload?.map((tooth) => {
                      return tooth.services?.map((service: string) => {
                        return (
                          <tr className="table_wrapper">
                            <td className="table_item">{tooth.id}</td>
                            <td className="table_item">
                              {getName(service)?.name}
                            </td>
                            <td className="table_item">
                              {getName(service)?.price}
                            </td>
                          </tr>
                        );
                      });
                    })}
                    <tr className="table_wrapper">
                      <th className="table_item"></th>
                      <th className="table_item">Jami</th>
                      <th className="table_item">{calculateSumOfPayload()}</th>
                    </tr>
                  </table>
                ) : (
                  <Flex align="center" vertical gap={10}>
                    <PiToothFill size={40} />
                    <p>Hech qanday xizmat tanlanmagan</p>
                  </Flex>
                )}
              </Flex>
            </Flex>
          </Flex>
          <br />
          <Button
            type="primary"
            style={{ width: "max-content" }}
            onClick={() => finish("Yakunlandi")}
          >
            Davolashni yakunlash
          </Button>
        </Flex>
      </div>
      {isSuccess && (
        <Successfully
          title="Davolashni muvaffaqiyatli tugatganingiz bilan tabriklayman!"
          modalStatus="success"
          link="/doctor/treatment"
        />
      )}
      {contextHolder}
    </Content>
  );
};
export default SingleDocktorTreatment;
