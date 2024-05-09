import { Button, DatePicker, Flex, Select, Table, message } from "antd";
import { ColumnsType, TableProps } from "antd/es/table";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import { DataType, Staffs, TableParams } from "../types/type";
import qs from "qs";
import formatMoney from "../lib/money_format";

const { RangePicker } = DatePicker;
const StaffsTable = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const currentDate = dayjs();
  const lastMonthDate = currentDate.subtract(1, "month");
  const lastWeekDate = currentDate.subtract(1, "week");
  const [filterDate, setFilterDate] = useState<
    [start: Dayjs | null | undefined, end: Dayjs | null | undefined]
  >([currentDate, currentDate]);
  const [data, setData] = useState<DataType[]>();
  const [staffs, setStaffs] = useState<Staffs[]>([]);
  const [staff, setStaff] = useState<string>("");

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
          <a href={`patient/${record.id}`}>
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

  return (
    <div>
      <br />
      <br />
      <Flex gap={20}>
        <RangePicker
          format="DD-MM-YYYY"
          value={filterDate}
          onChange={(date) => {
            setFilterDate([date[0]?.add(5, "hour"), date[1]?.add(5, "hour")]);
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
        <Select
          style={{ minWidth: "100px" }}
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
      </Flex>
      <br />
      <br />
      <br />
      <Table
        columns={columns}
        rowKey={(record) => record.id}
        dataSource={data}
        pagination={tableParams.pagination}
        scroll={{ y: 590 }}
        onChange={handleTableChange}
      />
      {contextHolder}
    </div>
  );
};

export default StaffsTable;