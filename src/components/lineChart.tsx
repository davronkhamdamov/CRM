import { message } from "antd";
import { Dayjs } from "dayjs";
import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const LineChartFC: React.FC<{ month: Dayjs }> = ({ month }) => {
  const token = localStorage.getItem("auth");
  const [messageApi, contextHolder] = message.useMessage();
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_APP_URL}/staffs/statistic?month=${month.format(
        "YYYY-MM"
      )}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((results) => {
        setData(results.result);
      })
      .catch((err) => {
        if (err.message === "Failed to fetch") {
          messageApi.error("Internet bilan aloqani tekshiring!", 2);
        }
        setData([]);
      });
  }, [month]);

  return (
    <>
      {contextHolder}
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          height={300}
          margin={{
            top: 5,
            right: 10,
            left: 10,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="9 9" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="Maosh" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};

export default LineChartFC;
