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
type OnChange = NonNullable<TableProps<DataType>["onChange"]>;
import { DataType, TableParams } from "../types/type";
import { ColumnsType } from "antd/es/table";
import dayjs, { Dayjs } from "dayjs";
import { FaTooth } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { AiOutlineFileSearch } from "react-icons/ai";
import TreatmentModal from "./TreatmentModal";
import { MdModeEditOutline } from "react-icons/md";
import EditModal from "./EditModal";
import formatMoney from "../lib/money_format";
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
    id: "",
    isOpen: false,
  });
  const [editModal, setEditModal] = useState({
    id: "",
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
  const classNameFormat = (data: DataType): string => {
    if (data.price - data.payed_price == 0 && data.is_done == "Yakunlandi") {
      return "success";
    } else if (data.payed_price === 0 && data.is_done == "Yakunlandi") {
      return "qarz";
    } else if (data.payed_price < data.price && data.is_done == "Yakunlandi") {
      return "proccess";
    }
    return "base";
  };
  const columns: ColumnsType<DataType> = [
    {
      title: "Ismi",
      className: "debt",
      render: (record, data) => {
        return (
          <div className={classNameFormat(data)}>
            {record.user_name} {record.user_surname}
          </div>
        );
      },
      width: "13%",
    },
    {
      title: "Shifokor",
      dataIndex: "",
      render: (staff, data) => (
        <div className={classNameFormat(data)}>
          {staff?.staff_name + " " + staff.staff_surname}
        </div>
      ),
      width: "10%",
      className: "debt",
    },
    {
      title: "Davolash vaqti",
      render: (date, data) => (
        <div className={classNameFormat(data)}>
          {dayjs(date?.start_time).format("HH:MM DD-MM-YYYY")}{" "}
          {dayjs(date?.end_time).format("HH:mm DD-MM-YYYY")}
        </div>
      ),
      width: "15%",
      className: "debt",
    },
    {
      title: "To'lov summasi",
      dataIndex: "price",
      render: (price, data) => (
        <div className={classNameFormat(data)}>{formatMoney(price)}</div>
      ),
      width: "10%",
      className: "debt",
    },
    // {
    //   title: "Texnik summasi",
    //   dataIndex: "raw_material_price",
    //   render: (raw_material_price, data) => (
    //     <div className={classNameFormat(data)}>
    //       <p>{formatMoney(raw_material_price)}</p>
    //     </div>
    //   ),
    //   width: "10%",
    //   className: "debt",
    // },
    {
      title: "To'langan summa",
      dataIndex: "payed_price",
      render: (price, data) => (
        <div className={classNameFormat(data)}>{formatMoney(price)}</div>
      ),
      width: "10%",
      className: "debt",
    },
    {
      title: "To'lov holati",
      dataIndex: "",
      className: "debt",
      filters: [
        {
          text: "To'langan",
          value: "payed",
        },
        {
          text: "To'liq to'lanmadi",
          value: "not_fully_payed",
        },
        {
          text: "To'lanmadi",
          value: "not_payed",
        },
        {
          text: "Kutilmoqda",
          value: "waiting",
        },
      ],
      width: "7%",
      render: (record) => {
        if (record?.is_done == "Bekor qilingan") {
          return (
            <div className={classNameFormat(record)}>
              <Tag icon={<CloseCircleOutlined />} color="error">
                Bekor qilingan
              </Tag>
            </div>
          );
        } else if (record.price === 0) {
          return (
            <div className={classNameFormat(record)}>
              <Tag icon={<ClockCircleOutlined color="black" />} color="blue">
                Kutilmoqda
              </Tag>
            </div>
          );
        } else if (record.payed_price === record.price) {
          return (
            <div className={classNameFormat(record)}>
              <Tag icon={<CheckCircleOutlined />} color="success">
                To'landi
              </Tag>
            </div>
          );
        } else if (record.payed_price == 0) {
          return (
            <div className={classNameFormat(record)}>
              <Tag icon={<CloseCircleOutlined />} color="error">
                To'lanmadi
              </Tag>
            </div>
          );
        } else {
          return (
            <div className={classNameFormat(record)}>
              <Tag icon={<SyncOutlined />} color="processing">
                To'liq to'lanmadi
              </Tag>
            </div>
          );
        }
      },
    },
    {
      title: "Holati",
      className: "debt",
      dataIndex: "is_done",
      width: "7%",
      filters: [
        {
          text: "Yakunlandi",
          value: "Yakunlandi",
        },
        {
          text: "Kutilmoqda",
          value: "Kutilmoqda",
        },
        {
          text: "Bekor qilingan",
          value: "Bekor qilingan",
        },
      ],
      render: (is_done, data) => {
        switch (is_done) {
          case "Yakunlandi":
            return (
              <div className={classNameFormat(data)}>
                <Tag icon={<CheckCircleOutlined />} color="success">
                  Yakunlandi
                </Tag>
              </div>
            );
          case "Jarayonda":
            return (
              <div className={classNameFormat(data)}>
                <Tag icon={<SyncOutlined spin />} color="processing">
                  Jarayonda
                </Tag>
              </div>
            );
          case "Kutilmoqda":
            return (
              <div className={classNameFormat(data)}>
                <Tag icon={<ClockCircleOutlined />} color="default">
                  Kutilmoqda
                </Tag>
              </div>
            );
          case "Bekor qilingan":
            return (
              <div className={classNameFormat(data)}>
                <Tag icon={<MinusCircleOutlined />} color="error">
                  Bekor qilingnan
                </Tag>
              </div>
            );
          default:
            return (
              <div className={classNameFormat(data)}>
                <Tag icon={<CloseCircleOutlined />} color="error">
                  Xatolik
                </Tag>
              </div>
            );
        }
      },
    },
    {
      title: "Bajariladigan ishlar",
      key: "operation",
      className: "debt",
      align: "center",
      width: "15%",
      render: (_, record) => {
        return (
          <div className={classNameFormat(record)}>
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
                        setView({ id: record.cure_id, isOpen: true });
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
                      setEditModal({ id: record.user_id, isOpen: true });
                    }}
                    color="#3b82f6"
                    style={{ cursor: "pointer" }}
                  />
                </Tooltip>
              </Space>
            </Space>
          </div>
        );
      },
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

  const token = localStorage.getItem("auth");
  const fetchData = () => {
    setLoading(true);
    fetch(
      import.meta.env.VITE_APP_URL +
        `/cure/for-staff/?${qs.stringify(
          getRandomuserParams(tableParams)
        )}&start-date=${
          filterDate[0] ? filterDate[0].format("YYYY-MM-DD") : null
        }&end-date=${
          filterDate[0] ? filterDate[1]?.format("YYYY-MM-DD") : null
        }`,
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
            total: result.total,
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
