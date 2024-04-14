import { FC, useContext, useEffect, useState } from "react";
import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Space,
  Select,
  message,
} from "antd";

const { RangePicker } = DatePicker;

import dayjs from "dayjs";
import { LoadingProvider } from "../App";
import { EditModalProps, Staffs } from "../types/type";
import { RangePickerProps } from "antd/es/date-picker";

const AddDoctorTreatment: FC<EditModalProps> = ({ data, setOpen }) => {
  const [staffs, setStaffs] = useState<Staffs[]>([]);
  const { setLoadingCnx } = useContext(LoadingProvider);
  const [messageApi, contextHolder] = message.useMessage();

  const onClose = () => {
    setOpen({
      id: "",
      isOpen: false,
    });
  };
  const token = localStorage.getItem("auth");
  const onSubmit = (values: any) => {
    setLoadingCnx(true);
    fetch(import.meta.env.VITE_APP_URL + "/cure", {
      method: "POST",
      body: JSON.stringify({
        staff_id: values.doctor_id,
        user_id: data.id,
        is_done: "Kutilmoqda",
        start_time: dayjs(values.cure_time[0]).toISOString(),
        end_time: dayjs(values.cure_time[1]).toISOString(),
      }),
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then(() => {
        setOpen({
          id: "",
          isOpen: false,
        });
        setLoadingCnx(false);
        messageApi.success("Bemor muvaffaqqiyatli yaratildi", 2);
      })
      .catch((err) => {
        console.log(err);
        setLoadingCnx(false);
        messageApi.error("Nimadir xato ketdi", 2);
      });
  };

  useEffect(() => {
    fetch(import.meta.env.VITE_APP_URL + "/staffs", {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setStaffs(data.result);
      })
      .catch(() => {
        messageApi.error("Shifokorni yuklash xatolik yuz berdi", 2);
      });
  }, [data.isOpen]);

  const range = (start: number, end: number, disable: number[] = []) => {
    const result = [];
    for (let i = start; i < end; i++) {
      if (!disable.includes(i)) {
        result.push(i);
      }
    }
    return result;
  };

  const disabledRangeTime: RangePickerProps["disabledTime"] = (_, type) => {
    const current_time = new Date();
    if (type === "start") {
      return {
        disabledHours: () => range(0, current_time.getHours()),
        disabledMinutes: () => range(0, 60, [0, 30]),
      };
    }
    return {
      disabledHours: () => range(0, current_time.getHours()),
      disabledMinutes: () => range(0, 60, [0, 30]),
    };
  };

  const disabledDate: RangePickerProps["disabledDate"] = (current) => {
    return current && current == dayjs().endOf("day");
  };
  return (
    <>
      <Drawer
        title="Bemorni doktorga biriktirish"
        width={520}
        onClose={onClose}
        open={data.isOpen}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
      >
        <Form layout="vertical" onFinish={onSubmit}>
          <Col>
            <Form.Item
              name="doctor_id"
              label="Doktorni tanlang"
              rules={[
                {
                  required: true,
                  message: "Iltimos doktorni tanlang",
                },
              ]}
            >
              <Select
                options={staffs.map((e) => {
                  return {
                    value: e.id,
                    label: e.name,
                  };
                })}
              />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item
              name="cure_time"
              label="Davolash vaqti"
              rules={[
                {
                  required: true,
                  message: "Iltimos davolash vaqtini tanlang",
                },
              ]}
            >
              <RangePicker
                minDate={dayjs(new Date())}
                format="DD-MM-YYYY HH:mm"
                disabledDate={disabledDate}
                disabledTime={disabledRangeTime}
                placeholder={["Boshlanish vaqti", "Tugash vaqti"]}
                showTime={{
                  hideDisabledOptions: true,
                }}
              />
            </Form.Item>
          </Col>
          <Space>
            <Button onClick={onClose}>Bekor qilish</Button>
            <Button htmlType="submit" type="primary">
              Biriktirish
            </Button>
          </Space>
        </Form>
        {contextHolder}
      </Drawer>
    </>
  );
};
export default AddDoctorTreatment;
