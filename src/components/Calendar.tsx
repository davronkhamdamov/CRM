import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import uzLocale from "@fullcalendar/core/locales/uz";
import { useEffect, useState } from "react";
import { CureDataType, Staffs } from "../types/type";
import { Button, Divider, Flex, Modal, Radio } from "antd";
import dayjs from "dayjs";
import formatMoney from "../lib/money_format";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { isValidUUID } from "../lib/validUuid";
const Calendar = () => {
  const token = localStorage.getItem("auth");
  const [data, setData] = useState<CureDataType[]>();
  const params = useParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [staffId, setStaffId] = useState<string>();
  const [current_staff, setCurrentStaff] = useState<{
    role: string;
    id: string;
  }>();
  const [open, setOpen] = useState<boolean>(false);
  const [staffs, setStaffs] = useState<Staffs[]>();
  const [cureData, setCureData] = useState<CureDataType>();

  const fetchData = () => {
    let url = import.meta.env.VITE_APP_URL;
    let paramId;
    if (params.id && isValidUUID(params.id)) {
      paramId = params.id;
    } else {
      paramId = staffId;
    }
    if (["admin", "reception"].some((e) => e == current_staff?.role)) {
      url += `/cure/for-schedule?filter-staff=${paramId}`;
    } else {
      url += `/cure/for-schedule?filter-staff=${current_staff?.id}`;
    }
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
    fetch(import.meta.env.VITE_APP_URL + "/staffs/all", {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCurrentStaff(data.current_staff);
        setStaffs(data.result);
      });
  }, []);
  useEffect(() => {
    if (current_staff?.id) {
      fetchData();
    }
  }, [staffId, current_staff]);

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
  return (
    <>
      <Flex vertical gap="middle" wrap="wrap" style={{ minHeight: "70px" }}>
        {staffs &&
          ["admin", "reception"].some((e) => e == current_staff?.role) && (
            <Radio.Group
              buttonStyle="solid"
              defaultValue={isValidUUID(params.id) ? params.id : ""}
              onChange={(e) => {
                setStaffId(e.target.value);
                navigate(
                  `/${pathname?.split("/")[1]}/schedule/` + e.target.value
                );
              }}
            >
              <Radio.Button value="">Hammasi</Radio.Button>
              {staffs?.map((e) => {
                if (e.role == "doctor") {
                  return (
                    <Radio.Button key={e.id} value={e.id}>
                      {e.name} {e.surname}
                    </Radio.Button>
                  );
                }
              })}
            </Radio.Group>
          )}
      </Flex>
      <br />
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
          right: "dayGridMonth,timeGridWeek,timeGridDay",
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
              title: e.user_name + " " + e.user_surname,
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
        // eventMouseEnter={(e) => {
        //   console.log(e);
        // }}
      />
      <Modal
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
            {cureData?.user_name + " " + cureData?.user_surname}
          </p>
          <Divider style={{ margin: 10 }} />
          <p>
            Ma'sul shifokor ismi va familyasi:{" "}
            {cureData?.staff_name + " " + cureData?.staff_surname}
          </p>
          <Divider style={{ margin: 10 }} />
          <p>Davolash holati: {cureData?.is_done}</p>
          <Divider style={{ margin: 10 }} />
          <p>Narxi: {formatMoney(Number(cureData?.price))}</p>
          <Divider style={{ margin: 10 }} />
          <p>To'lagan summasi: {formatMoney(Number(cureData?.payed_price))}</p>
          <Divider style={{ margin: 10 }} />
        </div>
      </Modal>
    </>
  );
};
export default Calendar;
