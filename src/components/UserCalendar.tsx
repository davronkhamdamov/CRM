import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import uzLocale from "@fullcalendar/core/locales/uz";
import { useEffect, useState } from "react";
import { CureDataType } from "../types/type";
import { Button, Divider, Modal } from "antd";
import dayjs from "dayjs";
const { confirm } = Modal;
import { CheckCircleOutlined } from "@ant-design/icons";

const Calendar = () => {
  const token = localStorage.getItem("auth");
  const [data, setData] = useState<CureDataType[]>();

  const [open, setOpen] = useState<boolean>(false);
  const [cureData, setCureData] = useState<CureDataType>();

  const fetchData = () => {
    let url = import.meta.env.VITE_APP_URL;
    url += `/cure/for-schedule`;
    fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setData(result.result);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getCure = (cure_id: string) => {
    fetch(import.meta.env.VITE_APP_URL + "/cure/" + cure_id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCureData(data.result);
      });
  };
  const showPromiseConfirm = (e: DateClickArg) => {
    confirm({
      title: "Navbat olish",
      icon: <CheckCircleOutlined color="red" />,
      okText: "Navbat olish",
      cancelText: "Bekor qilish",
      centered: true,
      content:
        dayjs(e.dateStr).format("DD-MM-YYYY") +
        " shu kun uchun navbat olishmoqchimisiz",
      async onOk() {
        try {
          return await new Promise((resolve, reject) => {
            setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
          });
        } catch {
          return console.log("Oops errors!");
        }
      },
      onCancel() {},
    });
  };
  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        locale={uzLocale}
        eventClick={(e) => {
          setOpen(true);
          getCure(e.event.id);
        }}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          end: "",
        }}
        height={700}
        dayMaxEventRows={3}
        dayHeaderFormat={{
          weekday: "long",
        }}
        titleFormat={{
          year: "numeric",
          month: "numeric",
        }}
        events={data
          ?.filter((e) => e.is_done !== "Bekor qilingan")
          ?.map((e) => {
            return {
              title: e.user_name[0] + "." + e.user_surname[0],
              start: e.start_time,
              end: e.end_time,
              id: e.cure_id,
              color: e.is_done == "Yakunlandi" ? "green" : "red",
            };
          })}
        eventTimeFormat={{
          hour: "numeric",
          minute: "2-digit",
          meridiem: "short",
        }}
        selectable
        dateClick={showPromiseConfirm}
      />
      <Modal
        centered
        title={<p>Davolash haqida</p>}
        open={open}
        footer={
          <Button type="primary" onClick={() => setOpen(false)}>
            Yopish
          </Button>
        }
        onCancel={() => setOpen(false)}
      >
        <div>
          <Divider style={{ margin: 10 }} />
          <p>
            Boshlanish vaqti:{" "}
            {dayjs(cureData?.start_time).format("YYYY-MM-DD HH-mm")}
          </p>
          <Divider style={{ margin: 10 }} />
          <p>
            Tugash vaqti: {dayjs(cureData?.end_time).format("YYYY-MM-DD HH-mm")}
          </p>
          <Divider style={{ margin: 10 }} />
          <p>
            Bemorni ismi va familyasi:{" "}
            {cureData?.user_name[0] + "." + cureData?.user_surname[0]}
          </p>
          <Divider style={{ margin: 10 }} />
          <p>
            Ma'sul shifokor ismi va familyasi:{" "}
            {cureData?.staff_name + " " + cureData?.staff_surname}
          </p>
          <Divider style={{ margin: 10 }} />
          <p>Davolash holati: {cureData?.is_done}</p>
          <Divider style={{ margin: 10 }} />
        </div>
      </Modal>
    </>
  );
};
export default Calendar;
