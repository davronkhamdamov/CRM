import { Button, DatePicker, Flex, Select, Table, message } from "antd";
import { ColumnsType, TableProps } from "antd/es/table";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import { DataType, Staffs, TableParams } from "../types/type";
import qs from "qs";
import formatMoney from "../lib/money_format";
import CountUp from "react-countup";
import { GiReceiveMoney } from "react-icons/gi";

const { RangePicker } = DatePicker;
const StaffsTable = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const currentDate = dayjs();
  const lastMonthDate = currentDate.subtract(1, "month");
  const lastWeekDate = currentDate.subtract(1, "week");
  const [filterDate, setFilterDate] = useState<
    [start: Dayjs | null | undefined, end: Dayjs | null | undefined]
  >([currentDate, currentDate]);
  const [data, setData] = useState<DataType[]>([]);
  const [staffs, setStaffs] = useState<Staffs[]>([]);
  const [staff, setStaff] = useState<string>("");
  const [role, setRole] = useState<string>("");

  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  const token = localStorage.getItem("auth");
  const getuserParams = (params: TableParams) => ({
    results: params.pagination?.pageSize,
    page: params.pagination?.current,
    ...params,
  });
  const columns: ColumnsType<DataType> = [
    {
      title: "Ismi",
      render: (record) => {
        return (
          <a href={`staff/${record.id}`}>
            {record.name} {record.surname}
          </a>
        );
      },
      width: "20%",
    },
    {
      title: "Hisob",
      dataIndex: "salary",
      width: "15%",
      render: (money) => formatMoney(money),
    },
  ];
  useEffect(() => {
    fetchData();
  }, [JSON.stringify(tableParams), filterDate, staff]);

  const handleTableChange: TableProps["onChange"] = (
    pagination,
    filters,
    sorter
  ) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
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
        setStaffs(data.result);
      })
      .catch(() => {
        messageApi.error("Shifokorni yuklash xatolik yuz berdi", 2);
      });
  }, []);

  const fetchData = () => {
    fetch(
      `${import.meta.env.VITE_APP_URL}/staffs/salary?${qs.stringify(
        getuserParams(tableParams)
      )}&start-date=${dayjs(filterDate[0]).toISOString()}&end-date=${dayjs(
        filterDate[1]
      ).toISOString()}&filter-staff=${staff}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((results) => {
        setRole(results.role);
        setData(results.result);
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: results.total,
          },
        });
      })
      .catch((err) => {
        if (err.message === "Failed to fetch") {
          messageApi.error("Internet bilan aloqani tekshiring!", 2);
        }
        setData([]);
      });
  };
  const onChange = (value: string) => {
    setStaff(value);
  };
  const formatDate = () => {
    if (
      filterDate[0]?.unix() === dayjs().unix() &&
      filterDate[1]?.unix() === dayjs().unix()
    ) {
      return "Bugungi hisobot";
    } else if (
      Number(filterDate[0]?.unix()) - dayjs().unix() == 37776 &&
      Number(filterDate[1]?.unix()) - dayjs().unix() == 37776
    ) {
      return "Kechagi hisobot";
    } else if (filterDate[0]?.unix() === filterDate[1]?.unix()) {
      return `${filterDate[0]?.format("D MMMM YYYY")} kungi hisobot`;
    } else if (filterDate) {
      return `${filterDate[0]?.format("DD-MM-YYYY")} dan
            ${filterDate[1]?.format("DD-MM-YYYY")} gacha bo'lgan hisobot`;
    }
  };

  return (
    <div>
      <br />
      <br />
      <Flex gap={20}>
        <RangePicker
          format="DD-MM-YYYY"
          value={filterDate}
          onChange={(date) => {
            if (date != null) {
              setFilterDate([date[0]?.add(5, "hour"), date[1]?.add(5, "hour")]);
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
        {role == "admin" && (
          <Select
            style={{ minWidth: "200px" }}
            placeholder="Xodimni tanlang"
            optionFilterProp="children"
            onChange={onChange}
            allowClear
            options={staffs
              .filter((e) => e.role === "doctor")
              .map((e) => {
                return {
                  value: e.id,
                  label: e.name,
                };
              })}
          />
        )}
      </Flex>
      <br />
      <br />
      <br />
      {role === "admin" ? (
        <Table
          columns={columns}
          rowKey={(record) => record.id}
          dataSource={data}
          pagination={tableParams.pagination}
          scroll={{ y: 590 }}
          onChange={handleTableChange}
        />
      ) : (
        <Flex vertical gap={20} justify="center">
          <Flex justify="center">
            <Flex
              gap={50}
              vertical
              align="center"
              style={{
                width: "100%",
                maxWidth: "600px",
                minWidth: "200px",
                background: "#082f49",
                padding: "100px 40px",
                borderRadius: 15,
                color: "#e5e5e5",
                height: "500px",
              }}
            >
              <GiReceiveMoney size={70} />
              <div style={{ fontSize: "20px" }}>{formatDate()}</div>
              <Flex gap={10} style={{ fontSize: "50px" }}>
                <CountUp end={Number(data[0]?.salary)} separator=" " />{" "}
                <p>so'm</p>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      )}
      {contextHolder}
    </div>
  );
};

export default StaffsTable;
