import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Button,
  Checkbox,
  Descriptions,
  DescriptionsProps,
  Flex,
  Modal,
  Select,
  Tag,
  Typography,
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
import teeth from "../lib/teeth";
import { PiToothFill } from "react-icons/pi";
import { GiTooth } from "react-icons/gi";
import formatMoney from "../lib/money_format";
const { Option } = Select;

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
        setServices(data.result);
      });
  }, [params.id, saved_payload, payload]);

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
      label: "Boshidan o'tkazgan yo'ldosh kasalliklari",
      children: cureData?.placental_disease
        ? cureData?.placental_disease
        : "Hech qanday malumot topilmadi",
    },
    {
      key: "6",
      label: "Ushbu kasallikning rivojlanishi",
      children: cureData?.disease_progression
        ? cureData?.disease_progression
        : "Hech qanday malumot topilmadi",
    },
    {
      key: "7",
      label: "Obyektiv tekshiruv",
      children: cureData?.objective_check
        ? cureData?.objective_check
        : "Hech qanday malumot topilmadi",
    },
    {
      key: "8",
      label: "Milk va olveola xolati",
      children: cureData?.milk
        ? cureData?.milk
        : "Hech qanday malumot topilmadi",
    },
    {
      key: "9",
      label: "Bemor xaqida malumot",
      children: cureData?.description
        ? cureData?.description
        : "Hech qanday malumot topilmadi",
    },
    {
      key: "10",
      label: "Prikus",
      children: cureData?.created_at && (
        <Select
          defaultValue={cureData?.prikus}
          placeholder="Prikus"
          onChange={(e) => {
            fetch(
              import.meta.env.VITE_APP_URL +
                "/user/prikus/" +
                cureData?.user_id,
              {
                method: "PUT",
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-type": "application/json",
                },
                body: JSON.stringify({
                  prikus: e,
                }),
              }
            )
              .then((res) => res.json())
              .then((data) => {
                if (data.code === 200) message.success("Prikus yangilandi");
              });
          }}
          style={{ width: "200px" }}
        >
          <Option value="ortognatik">Ortognatik</Option>
          <Option value="progenik">Progenik</Option>
          <Option value="biprognatik">Biprognatik</Option>
          <Option value="distal">Distal</Option>
          <Option value="mezial">Mezial</Option>
          <Option value="chuqur">Chuqur</Option>
          <Option value="ochiq">Ochiq</Option>
          <Option value="kesuvchi">Kesuvchi</Option>
        </Select>
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
        .then(() => {
          setIsSuccess(true);
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
        })
        .catch(() => {
          messageApi.warning("Nimadir xato ketdi!");
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
    const _services: number[] = [];
    saved_payload?.forEach((e) => {
      e?.services?.forEach((e) => {
        _services.push(
          +(getName(e)?.price || 0) + +(getName(e)?.raw_material_price || 0)
        );
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
          <Button
            type="primary"
            style={{ width: "200px", height: "40px" }}
            onClick={() => finish("Yakunlandi")}
          >
            Davolashni yakunlash
          </Button>
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
                      <Typography.Paragraph
                        style={{
                          ...e.text_style,
                          userSelect: "none",
                        }}
                      >
                        <p style={{ width: "20px" }}>{e.id}</p>
                      </Typography.Paragraph>
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
            <Flex vertical style={{ width: "50%" }}>
              <Flex
                vertical
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
                  <Flex style={{ marginTop: "30px" }} vertical>
                    <h2>Tanlangan xizmatlar</h2>
                    <br />
                    <br />
                    <Flex gap={10} wrap="wrap">
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
                                height: "35px",
                              }}
                            >
                              <p style={{ fontSize: "20px" }}>
                                {getName(e)?.name}
                              </p>
                              <Tag style={{ marginLeft: "10px" }}>
                                Xizmat narxi:{" "}
                                {formatMoney(Number(getName(e)?.price))}
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
                            <Flex vertical gap={10}>
                              {category.services.map((service) => {
                                return (
                                  <Checkbox
                                    key={service.id}
                                    checked={payload.some((el) =>
                                      el.services?.find((e) => e == service.id)
                                    )}
                                    onChange={() => {
                                      setPayload((prev) =>
                                        prev?.map((e) => {
                                          if (
                                            !e.services?.includes(service.id)
                                          ) {
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
                                      Xizmat narxi:{" "}
                                      {formatMoney(+service.price)} so'm
                                    </Tag>
                                  </Checkbox>
                                );
                              })}
                            </Flex>
                          </div>
                        );
                      })}
                    </Flex>
                  </Flex>
                </Modal>
              </Flex>
              <Flex
                style={{
                  paddingTop: "20px",
                  height: "45%",
                }}
                vertical
              >
                <h2>Saqlangan davolashlar</h2>
                <br />
                {saved_payload[0] ? (
                  <table
                    style={{
                      width: "100%",
                      marginBottom: "100px",
                      borderCollapse: "collapse",
                    }}
                  >
                    <tr className="table_wrapper">
                      <th className="table_item">Tish id</th>
                      <th className="table_item">Xizmat nomi</th>
                      <th className="table_item">Umumiy narxi</th>
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
                              {formatMoney(Number(getName(service)?.price))}
                            </td>
                          </tr>
                        );
                      });
                    })}
                    <tr className="table_wrapper">
                      <th className="table_item"></th>
                      <th className="table_item">Jami</th>
                      <th className="table_item">
                        {formatMoney(calculateSumOfPayload())}
                      </th>
                    </tr>
                  </table>
                ) : (
                  <div>
                    <Flex
                      style={{ width: "max-content" }}
                      vertical
                      align="center"
                      gap={10}
                    >
                      <PiToothFill size={40} />
                      <p>Hech qanday xizmat tanlanmagan</p>
                    </Flex>
                  </div>
                )}
                <br />
              </Flex>
            </Flex>
          </Flex>
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
