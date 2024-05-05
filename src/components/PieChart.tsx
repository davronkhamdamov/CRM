import { useEffect, useState } from "react";
import { PieChart, Tooltip, Pie, Cell, ResponsiveContainer } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      fontSize={20}
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

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
      <PieChart>
        {statistic && (
          <Pie
            data={Object.keys(statistic)?.map((e) => {
              return { name: e, value: statistic[e] };
            })}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={(window.screen.width / 100) * 10}
            fill="#8884d8"
            dataKey="value"
          >
            <Tooltip />
            {Object.keys(statistic).map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        )}
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PieChartFC;
