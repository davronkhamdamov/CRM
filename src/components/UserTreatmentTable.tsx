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
type OnChange = NonNullable<TableProps<DataType>["onChange"]>;
import { DataType, EditModal, Staffs, TableParams } from "../types/type";
import { ColumnsType } from "antd/es/table";
import { MdOutlineCancel } from "react-icons/md";
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
    id: "",
    isOpen: false,
  });
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const deleteTreatment = (id: string) => {
    fetch(import.meta.env.VITE_APP_URL + "/user/cure/" + id, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.code == 200) {
          fetchData();
          message.success("Davolash o'chirildi");
        }
      });
  };
  const columns: ColumnsType<DataType> = [
    {
      title: "Shifokor",
      render: (name) => <p>{name?.staff_name + " " + name?.staff_surname}</p>,
      width: "8%",
    },
    {
      title: "Davolash vaqti",
      render: (dob) => (
        <p>
          {dayjs(dob?.start_time).format("HH:mm DD-MM-YYYY")}{" "}
          {dayjs(dob?.end_time).format("HH:mm DD-MM-YYYY")}
        </p>
      ),
      width: "15%",
    },
    {
      title: "To'lov summasi",
      dataIndex: "price",
      render: (price) => <p>{formatMoney(price)}</p>,
      width: "10%",
    },
    {
      title: "To'langan summa",
      dataIndex: "payed_price",
      render: (price) => <p>{formatMoney(price)}</p>,
      width: "10%",
    },
    {
      title: "To'lov holati",

      width: "6%",
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
      render: (record) => {
        if (record?.is_done == "Bekor qilingan") {
          return (
            <Tag icon={<CloseCircleOutlined />} color="error">
              Bekor qilingan
            </Tag>
          );
        } else if (record.price === 0) {
          return (
            <Tag icon={<ClockCircleOutlined color="black" />} color="blue">
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
      width: "6%",

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
          case "Bekor qilingan":
            return (
              <Tag icon={<MinusCircleOutlined />} color="error">
                Bekor qilingnan
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
      dataIndex: "operation",
      key: "operation",

      width: "9%",
      render: (_, record) => {
        return (
          <Space size="middle">
            {/* {record.payed_price !== record.price ? (
              <Tooltip placement="bottom" title="To'lash">
                <MdOutlinePayment
                  style={{ cursor: "pointer" }}
                  color="dodgerblue"
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
            )} */}
            <Tooltip placement="bottom" title="Ko'proq ma'lumot">
              <IoIosMore
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setView({ id: record.cure_id, isOpen: true });
                }}
              />
            </Tooltip>
            {record.is_done === "Kutilmoqda" ? (
              <Popconfirm
                title="Bekor qilishga ishonchingiz komilmi?"
                onConfirm={() => deleteTreatment(record.cure_id)}
              >
                <Tooltip placement="bottom" title="Bekor qilish">
                  <MdOutlineCancel color="red" style={{ cursor: "pointer" }} />
                </Tooltip>
              </Popconfirm>
            ) : (
              <MdOutlineCancel
                color="rgba(0, 0, 0, 0.1)"
                style={{ cursor: "pointer" }}
              />
            )}
          </Space>
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
      import.meta.env.VITE_APP_URL +
        `/user/cure?${qs.stringify(
          getUserParams(tableParams)
        )}&start-date=${filterDate[0]?.format(
          "YYYY-MM-DD"
        )}&end-date=${filterDate[1]?.format(
          "YYYY-MM-DD"
        )}&filter-staff=${staff}`,
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
