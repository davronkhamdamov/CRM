import { Button, DatePicker, Flex, Space, Table, Tag, Tooltip } from "antd";
import qs from "qs";

import { useEffect, useState } from "react";
import {
  LoadingOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ClockCircleOutlined,
  MinusCircleOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import type { TableProps } from "antd";
import { CureDataType, DataType, TableParams } from "../types/type";
import { ColumnsType } from "antd/es/table";
import dayjs, { Dayjs } from "dayjs";
import { FaTooth } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { AiOutlineFileSearch } from "react-icons/ai";
import TreatmentModal from "./TreatmentModal";
import { MdModeEditOutline } from "react-icons/md";
import EditModal from "./EditModal";
const { RangePicker } = DatePicker;

const getRandomuserParams = (params: TableParams) => ({
  results: params.pagination?.pageSize,
  page: params.pagination?.current,
  ...params,
});
const DocktorTreatment = () => {
  const [data, setData] = useState<DataType[]>();
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState({
    data: "",
    isOpen: false,
  });
  const [editModal, setEditModal] = useState({
    data: "",
    isOpen: false,
  });
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

  const columns: ColumnsType<CureDataType> = [
    {
      title: "Ismi",
      render: (record) => {
        return record.user_name + " " + record.user_surname;
      },
      width: "13%",
    },
    {
      title: "Shifokor",
      dataIndex: "",
      render: (staff) => `${staff?.staff_name + " " + staff.staff_surname}`,
      width: "13%",
    },
    {
      title: "Davolash vaqti",
      render: (date) =>
        `${dayjs(date?.start_time).format("HH:mm")} - ${dayjs(
          date?.end_time
        ).format("HH:mm DD-MM-YYYY")}`,
      width: "15%",
    },
    {
      title: "To'lov summasi",
      dataIndex: "price",
      render: (price) => (price ? price + " so'm" : "0 so'm"),
      width: "10%",
    },
    {
      title: "To'langan summa",
      dataIndex: "payed_price",
      render: (price) => (price ? price + " so'm" : "0 so'm"),
      width: "10%",
    },
    {
      title: "To'lov holati",
      dataIndex: "",
      width: "7%",
      render: (record) => {
        if (record.price === 0) {
          return (
            <Tag icon={<ClockCircleOutlined />} color="default">
              Kutilmoqda
            </Tag>
          );
        } else if (record.payed_price === record.price) {
          return (
            <Tag icon={<CheckCircleOutlined />} color="success">
              To'landi
            </Tag>
          );
        } else if (record.payed_price == 0) {
          return (
            <Tag icon={<CloseCircleOutlined />} color="error">
              To'lanmadi
            </Tag>
          );
        } else {
          return (
            <Tag icon={<SyncOutlined />} color="processing">
              To'liq to'lanmadi
            </Tag>
          );
        }
      },
    },
    {
      title: "Holati",
      dataIndex: "is_done",
      width: "7%",
      render: (is_done) => {
        switch (is_done) {
          case "Yakunlandi":
            return (
              <Tag icon={<CheckCircleOutlined />} color="success">
                Yakunlandi
              </Tag>
            );
          case "Jarayonda":
            return (
              <Tag icon={<SyncOutlined spin />} color="processing">
                Jarayonda
              </Tag>
            );
          case "Kutilmoqda":
            return (
              <Tag icon={<ClockCircleOutlined />} color="default">
                Kutilmoqda
              </Tag>
            );
          case "To'xtatilgan":
            return (
              <Tag icon={<MinusCircleOutlined />} color="default">
                To'xtatilgan
              </Tag>
            );
          default:
            return (
              <Tag icon={<CloseCircleOutlined />} color="error">
                Xatolik
              </Tag>
            );
        }
      },
    },
    {
      title: "Bajariladigan ishlar",
      key: "operation",
      align: "center",
      width: "15%",
      render: (_, record) => {
        return (
          <Space size="middle">
            {record.is_done !== "Yakunlandi" ? (
              <Tooltip placement="bottom" title="Davolash">
                <Link to={record.cure_id}>
                  <FaTooth color="#3b82f6" style={{ cursor: "pointer" }} />
                </Link>
              </Tooltip>
            ) : (
              <Space size="large">
                <Tooltip placement="bottom" title="Ko'rish">
                  <AiOutlineFileSearch
                    onClick={() => {
                      setView({ data: record.cure_id, isOpen: true });
                    }}
                    color="#3b82f6"
                    style={{ cursor: "pointer" }}
                  />
                </Tooltip>
              </Space>
            )}
            <Space size="large">
              <Tooltip placement="bottom" title="Tahrirlash">
                <MdModeEditOutline
                  onClick={() => {
                    setEditModal({ data: record.user_id, isOpen: true });
                  }}
                  color="#3b82f6"
                  style={{ cursor: "pointer" }}
                />
              </Tooltip>
            </Space>
          </Space>
        );
      },
    },
  ];

  useEffect(() => {
    fetchData();
  }, [JSON.stringify(tableParams), filterDate]);

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
  const token = localStorage.getItem("auth");
  const fetchData = () => {
    setLoading(true);
    fetch(
      import.meta.env.VITE_APP_URL +
        `/cure/for-staff/?${qs.stringify(
          getRandomuserParams(tableParams)
        )}&start-date=${
          filterDate[0] ? filterDate[0]?.toISOString() : null
        }&end-date=${filterDate[0] ? filterDate[1]?.toISOString() : null}`,
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
            total: 1,
          },
        });
      });
  };

  return (
    <>
      <br />
      <br />
      <Flex gap={20}>
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
      </Flex>
      <br />
      <br />
      <br />

      <Table
        columns={columns}
        rowKey={(record) => record.cure_id}
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
      <TreatmentModal setData={setView} data={view} />
      <EditModal setData={setEditModal} data={editModal} />
    </>
  );
};

export default DocktorTreatment;
