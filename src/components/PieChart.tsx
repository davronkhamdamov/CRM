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

const PieChartFC = () => {
  const [statistic, setStatistic] = useState<any>();
  const token = localStorage.getItem("auth");
  useEffect(() => {
    fetch(import.meta.env.VITE_APP_URL + "/user/statistic_by_address", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setStatistic(data.result));
  }, []);
  return (
    <ResponsiveContainer width="100%" height="100%">
      {statistic && (
        <BarChart
          width={500}
          height={300}
          data={Object.keys(statistic)?.map((e) => {
            return { name: e, value: statistic[e] };
          })}
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
