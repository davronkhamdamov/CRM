import { useEffect, useState } from "react";
import {
  Tooltip,
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ReferenceLine,
  Brush,
  Bar,
} from "recharts";
interface Statistic {
  [key: string]: number; // `key` as string and `value` as number
}

const PieChartFC = () => {
  const [statistic, setStatistic] = useState<Statistic>({});

  const token = localStorage.getItem("auth");
  useEffect(() => {
    fetch(import.meta.env.VITE_APP_URL + "/user/statistic_by_address", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        return res.json();
      })
      .then((data) => {
        setStatistic(data.result);
      });
  }, [token]);

  return (
    <ResponsiveContainer width="100%" height="100%">
      {statistic && (
        <BarChart
          width={500}
          height={300}
          data={Object.keys(statistic).map((e) => ({
            name: e,
            value: statistic[e],
          }))}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <ReferenceLine y={0} stroke="#000" />
          <Brush dataKey="name" height={30} stroke="#8884d8" />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      )}
    </ResponsiveContainer>
  );
};

export default PieChartFC;
