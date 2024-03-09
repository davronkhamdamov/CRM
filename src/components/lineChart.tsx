import React from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

const data = [
    {
        name: "Yanvar",
        "Aziz Rajabov": 4000,
        "Umar Yunusov": 2400,
    },
    {
        name: "Fevral",
        "Aziz Rajabov": 3000,
        "Umar Yunusov": 1398,
    },
    {
        name: "Mart",
        "Aziz Rajabov": 2000,
        "Umar Yunusov": 9800,
    },
    {
        name: "Aprel",
        "Aziz Rajabov": 2780,
        "Umar Yunusov": 3908,
    },
    {
        name: "May",
        "Aziz Rajabov": 1890,
        "Umar Yunusov": 4800,
    },
    {
        name: "Iyun",
        "Aziz Rajabov": 2390,
        "Umar Yunusov": 3800,
    },
    {
        name: "Iyul",
        "Aziz Rajabov": 3490,
        "Umar Yunusov": 4300,
    },
    {
        name: "Avgust",
        "Aziz Rajabov": 2490,
        "Umar Yunusov": 3300,
    },
    {
        name: "Sentabr",
        "Aziz Rajabov": 4490,
        "Umar Yunusov": 1300,
    },
    {
        name: "Oktabr",
        "Aziz Rajabov": 2490,
        "Umar Yunusov": 6300,
    },
    {
        name: "Noyabr",
        "Aziz Rajabov": 2490,
        "Umar Yunusov": 2300,
    },
    {
        name: "Dekabr",
        "Aziz Rajabov": 3490,
        "Umar Yunusov": 2300,
    },
];

const LineChartFC: React.FC = () => {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart
                width={500}
                height={300}
                data={data}
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
                <Legend />
                <Line type="monotone" dataKey="Umar Yunusov" stroke="#1d4ed8" />
                <Line type="monotone" dataKey="Aziz Rajabov" stroke="#65a30d" />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default LineChartFC;
