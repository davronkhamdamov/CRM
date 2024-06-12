import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import uzLocale from "@fullcalendar/core/locales/uz";
import { useEffect, useState } from "react";
import { CureDataType } from "../types/type";

const Calendar = () => {
  const token = localStorage.getItem("auth");

  const [data, setData] = useState<CureDataType[]>();
  const fetchData = () => {
    fetch(import.meta.env.VITE_APP_URL + `/cure`, {
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
  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      locale={uzLocale}
      eventClick={(e) => {
        alert(e.event.title);
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
      events={data?.map((e) => {
        return {
          title: e.user_name + " " + e.user_surname,
          start: e.start_time,
          end: e.end_time,
          color: e.is_done == "Yakunlandi" ? "green" : "red",
        };
      })}
      eventTimeFormat={{
        hour: "numeric",
        minute: "2-digit",
        meridiem: "short",
      }}
    />
  );
};
export default Calendar;
