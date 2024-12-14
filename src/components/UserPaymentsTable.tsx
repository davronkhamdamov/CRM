import { Button, DatePicker, Flex, Table, message } from "antd";
import qs from "qs";
import { useEffect, useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";

import type { TableProps } from "antd";
type OnChange = NonNullable<TableProps<DataType>["onChange"]>;
import { DataType, TableParams } from "../types/type";
import { ColumnsType } from "antd/es/table";
import dayjs, { Dayjs } from "dayjs";
import { HiOutlineCash } from "react-icons/hi";
import { IoCardOutline } from "react-icons/io5";
import formatMoney from "../lib/money_format";
const { RangePicker } = DatePicker;

const getRandomuserParams = (params: TableParams) => ({
  results: params.pagination?.pageSize,
  page: params.pagination?.current,
  ...params,
});
const PaymentsTable = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const currentDate = dayjs();
  const lastMonthDate = currentDate.subtract(1, "month");
  const lastWeekDate = currentDate.subtract(1, "week");
  const [filterDate, setFilterDate] = useState<
    [start: Dayjs | null | undefined, end: Dayjs | null | undefined]
  >([null, null]);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  const token = localStorage.getItem("auth");

  const columns: ColumnsType<DataType> = [
    {
      title: "To'lov miqdori",
      dataIndex: "amount",
      align: "center",
      width: "20%",
      render: (amount) => formatMoney(amount),
    },
    {
      title: "Sana",
      dataIndex: "created_at",
      align: "center",
      render: (record) => `${dayjs(record).format("DD-MM-YYYY HH:mm")}`,
      width: "20%",
    },
    {
      title: "To'lov turi",
      dataIndex: "method",
      align: "center",
      render: (_, record) => {
        return (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "10px",
              alignItems: "center",
            }}
          >
            {record.method === "Naqt" ? <HiOutlineCash /> : <IoCardOutline />}
            {record.method}
          </div>
        );
      },
      width: "20%",
    },
  ];

  useEffect(() => {
    fetchData();
  }, [JSON.stringify(tableParams), filterDate]);

  const handleTableChange: OnChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });

    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
  };
  const fetchData = () => {
    setLoading(true);
    fetch(
      `${import.meta.env.VITE_APP_URL}/user/payment/?${qs.stringify(
        getRandomuserParams(tableParams)
      )}&filterDate=${filterDate}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((result) => {
        setData(result.result);
        setLoading(false);
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: result?.total,
          },
        });
      })
      .catch((err) => {
        if (err.message === "Failed to fetch") {
          messageApi.error("Internet bilan aloqani tekshiring!", 2);
        }
        setData([]);
        setLoading(false);
      });
  };

  return (
    <Flex vertical gap={20}>
      <RangePicker
        format="DD-MM-YYYY"
        value={filterDate}
        onChange={(date) => {
          if (date) {
            setFilterDate([date[0]?.add(5, "hour"), date[1]?.add(5, "hour")]);
          } else {
            setFilterDate([null, null]);
          }
        }}
        renderExtraFooter={() => {
          return (
            <Flex justify="space-around" style={{ margin: "20px 0" }}>
              <Button
                onClick={() => {
                  setFilterDate([
                    lastMonthDate.startOf("month"),
                    lastMonthDate.endOf("month"),
                  ]);
                }}
              >
                O'tgan oy
              </Button>
              <Button
                onClick={() => {
                  setFilterDate([
                    currentDate.startOf("month"),
                    currentDate.endOf("month"),
                  ]);
                }}
              >
                Shu oy
              </Button>
              <Button
                onClick={() => {
                  setFilterDate([
                    lastWeekDate.startOf("week"),
                    lastWeekDate.endOf("week"),
                  ]);
                }}
              >
                O'tgan hafta
              </Button>
              <Button
                onClick={() => {
                  setFilterDate([dayjs(new Date()), dayjs(new Date())]);
                }}
              >
                Bugun
              </Button>
            </Flex>
          );
        }}
      />
      <Table
        columns={columns}
        rowKey={(record) => record.id}
        dataSource={data}
        pagination={tableParams.pagination}
        loading={
          loading
            ? {
                indicator: (
                  <LoadingOutlined
                    style={{
                      fontSize: 34,
                    }}
                    spin
                  />
                ),
              }
            : false
        }
        onChange={handleTableChange}
      />
      {contextHolder}
    </Flex>
  );
};

export default PaymentsTable;
