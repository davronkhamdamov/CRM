import {
  Button,
  DatePicker,
  Flex,
  Popconfirm,
  Select,
  Space,
  Table,
  Tag,
  Tooltip,
  message,
} from "antd";
import qs from "qs";

import { useEffect, useState } from "react";
import {
  LoadingOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  SyncOutlined,
  MinusCircleOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import type { TableProps } from "antd";
import { DataType, EditModal, Staffs, TableParams } from "../types/type";
import { ColumnsType } from "antd/es/table";
import { MdOutlineCancel, MdOutlinePayment } from "react-icons/md";
import dayjs, { Dayjs } from "dayjs";
import { IoIosMore } from "react-icons/io";
import AddPaymentCure from "./AddPaymentCure";
import TreatmentModal from "./TreatmentModal";
import formatMoney from "../lib/money_format";
const { RangePicker } = DatePicker;

const getUserParams = (params: TableParams) => ({
  results: params.pagination?.pageSize,
  page: params.pagination?.current,
  ...params,
});
const Treatment = () => {
  const token = localStorage.getItem("auth");

  const [messageApi, contextHolder] = message.useMessage();
  const [data, setData] = useState<DataType[]>();
  const [loading, setLoading] = useState(false);
  const [openPaymentModal, setOpenPaymentModal] = useState<EditModal>({
    id: "",
    isOpen: false,
  });
  const currentDate = dayjs();
  const lastMonthDate = currentDate.subtract(1, "month");
  const lastWeekDate = currentDate.subtract(1, "week");
  const [filterDate, setFilterDate] = useState<
    [start: Dayjs | null | undefined, end: Dayjs | null | undefined]
  >([null, null]);
  const [staffs, setStaffs] = useState<Staffs[]>([]);
  const [staff, setStaff] = useState<string>("");

  const [view, setView] = useState({
    data: "",
    isOpen: false,
  });
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const cancelTreatment = (id: string) => {
    fetch(import.meta.env.VITE_APP_URL + "/cure/status/" + id, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        status: "Bekor qilingan",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.code == 200) {
          fetchData();
          message.success("Davolash bekor qilindi");
        }
      });
  };
  const classNameFormat = (data: DataType): string => {
    console.log(data);

    if (data.price - data.payed_price == 0 && data.is_done == "Yakunlandi") {
      return "success";
    } else if (data.payed_price === 0) {
      return "qarz";
    }
    return "proccess";
  };
  const columns: ColumnsType<DataType> = [
    {
      title: "Ismi",
      render: (record, data) => {
        return (
          <div className={classNameFormat(data)}>
            <a href={`patient/${record.user_id}`}>
              {record.user_name} {record.user_surname}
            </a>
          </div>
        );
      },
      width: "10%",
      className: "debt",
    },
    {
      title: "Shifokor",
      render: (name, data) => (
        <div className={classNameFormat(data)}>
          <p>{name?.staff_name + " " + name?.staff_surname}</p>
        </div>
      ),
      width: "10%",
      className: "debt",
    },
    {
      title: "Davolash vaqti",
      render: (dob, data) => (
        <div className={classNameFormat(data)}>
          <p>
            {dayjs(dob?.start_time).format("HH:mm DD-MM-YYYY")}{" "}
            {dayjs(dob?.end_time).format("HH:mm DD-MM-YYYY")}
          </p>
        </div>
      ),
      width: "15%",
      className: "debt",
    },
    {
      title: "To'lov summasi",
      dataIndex: "price",
      render: (price, data) => (
        <div className={classNameFormat(data)}>
          <p>{formatMoney(price)}</p>
        </div>
      ),

      width: "10%",
      className: "debt",
    },
    {
      title: "To'langan summa",
      dataIndex: "payed_price",
      render: (price, data) => (
        <div className={classNameFormat(data)}>
          <p>{formatMoney(price)}</p>
        </div>
      ),
      width: "10%",
      className: "debt",
    },
    {
      title: "To'lov holati",
      className: "debt",
      width: "6%",
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
      dataIndex: "is_done",
      width: "6%",
      className: "debt",
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
      dataIndex: "operation",
      key: "operation",
      className: "debt",
      width: "15%",
      render: (_, record) => {
        return (
          <div className={classNameFormat(record)}>
            <Space size="middle">
              {record.payed_price !== record.price ? (
                <Tooltip placement="bottom" title="To'lash">
                  <MdOutlinePayment
                    style={{ cursor: "pointer" }}
                    color="white"
                    onClick={() => {
                      if (openPaymentModal.id !== record.cure_id) {
                        setOpenPaymentModal({
                          id: record.cure_id,
                          isOpen: true,
                        });
                      }
                    }}
                  />
                </Tooltip>
              ) : (
                <MdOutlinePayment color="#33333333" />
              )}
              <Tooltip placement="bottom" title="Ko'proq ma'lumot">
                <IoIosMore
                  color="white"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setView({ data: record.cure_id, isOpen: true });
                  }}
                />
              </Tooltip>
              {record?.is_done !== "Bekor qilingan" &&
              record.is_done !== "Yakunlandi" ? (
                <Popconfirm
                  title="Bekor qilshga ishonchingiz komilmi?"
                  onConfirm={() => cancelTreatment(record.cure_id)}
                >
                  <Tooltip placement="bottom" title="O'chirish">
                    <MdOutlineCancel
                      style={{ color: "red", cursor: "pointer" }}
                    />
                  </Tooltip>
                </Popconfirm>
              ) : (
                <MdOutlineCancel color="rgba(0, 0, 0, 0.1)" />
              )}
            </Space>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    fetchData();
  }, [JSON.stringify(tableParams), staff, filterDate]);
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
  const fetchData = () => {
    setLoading(true);
    fetch(
      import.meta.env.VITE_APP_URL +
        `/cure?${qs.stringify(getUserParams(tableParams))}&start-date=${
          filterDate[0] ? filterDate[0]?.toISOString() : null
        }&end-date=${
          filterDate[0] ? filterDate[1]?.toISOString() : null
        }&filter-staff=${staff}`,
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
  const onChange = (value: string) => {
    setStaff(value);
  };
  return (
    <>
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
      </Flex>
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
      <AddPaymentCure data={openPaymentModal} setOpen={setOpenPaymentModal} />
      {contextHolder}
    </>
  );
};

export default Treatment;
