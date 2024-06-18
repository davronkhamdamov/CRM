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
  TooltipProps,
  LabelProps,
} from "recharts";
import formatMoney from "../lib/money_format";

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
  const CustomTooltip: React.FC<TooltipProps<number, string>> = ({
    active,
    payload,
    label,
  }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`${label} : ${formatMoney(
            payload[0].value as number
          )}`}</p>
        </div>
      );
    }

    return null;
  };
  const CustomizedLabel: React.FC<LabelProps> = ({ x, y, stroke, value }) => {
    return (
      <text x={x} y={y} dy={-4} fill={stroke} fontSize={10} textAnchor="middle">
        {formatMoney(value as number)}
      </text>
    );
  };

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
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="Maosh"
            stroke="#8884d8"
            label={<CustomizedLabel x={0} y={0} stroke={""} value={""} />}
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};

export default LineChartFC;
