import { Button, DatePicker, Flex, Space, Table, Tag, Tooltip } from "antd";
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
import {
  DataType,
  EditModal as EditModalType,
  TableParams,
} from "../types/type";
import { ColumnsType } from "antd/es/table";
import dayjs, { Dayjs } from "dayjs";
import TreatmentModal from "./OrtaTreatmentModal";
import formatMoney from "../lib/money_format";
import { Link } from "react-router-dom";
import { FaTooth } from "react-icons/fa6";
import { AiOutlineFileSearch } from "react-icons/ai";
import { MdModeEditOutline, MdOutlinePayment } from "react-icons/md";
const { RangePicker } = DatePicker;
import EditModal from "./EditModal";
import AddTechnicPaymentCureOrta from "./AddTechnicPaymentCureOrta";

const getUserParams = (params: TableParams) => ({
  results: params.pagination?.pageSize,
  page: params.pagination?.current,
  ...params,
});
const Treatment = () => {
  const [data, setData] = useState<DataType[]>();
  const [loading, setLoading] = useState(false);
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

  const [view, setView] = useState({
    id: "",
    isOpen: false,
  });
  const [openTechnicPaymentModal, setOpenTechnicPaymentModal] =
    useState<EditModalType>({
      id: "",
      isOpen: false,
    });
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const columns: ColumnsType<DataType> = [
    {
      title: "Ismi",
      render: (record) => {
        return (
          <a href={`patient/${record.user_id}`}>
            {record.user_name} {record.user_surname}
          </a>
        );
      },
      width: "5%",
    },
    {
      title: "Shifokor",
      render: (name) => `${name?.staff_name + " " + name?.staff_surname}`,
      width: "5%",
    },
    {
      title: "Davolash vaqti",
      render: (dob) =>
        `${dayjs(dob?.start_time).format("HH:mm DD-MM-YYYY")} - ${dayjs(
          dob?.end_time
        ).format("HH:mm DD-MM-YYYY")}`,
      width: "10%",
    },
    {
      title: "Texnik ismi",
      dataIndex: "technic_name",
      render: (name) => name || "Ismi belgilanmagan",
      width: "5%",
    },
    {
      title: "To'lov summasi",
      dataIndex: "price",
      render: (price) => formatMoney(price),
      width: "5%",
    },
    {
      title: "Texnik summasi",
      dataIndex: "raw_material_price",
      render: (price) => formatMoney(price),
      width: "5%",
    },
    {
      title: "Texnikka berilgan summasi",
      dataIndex: "payed_raw_material_price",
      render: (price) => formatMoney(price),
      width: "5%",
    },
    {
      title: "To'langan summa",
      dataIndex: "payed_price",
      render: (price) => formatMoney(price),
      width: "5%",
    },
    {
      title: "To'lov holati",
      width: "5%",
      render: (record) => {
        if (record?.is_done == "Bekor qilingan") {
          return (
            <Tag icon={<CloseCircleOutlined />} color="error">
              Bekor qilingan
            </Tag>
          );
        } else if (record.price === 0) {
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
      className: "debt",
      width: "5%",
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
      width: "10%",
      render: (_, record) => {
        return (
          <div>
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
              {record.raw_material_price !== record.payed_raw_material_price ? (
                <Tooltip placement="bottom" title="Texnikka to'lash">
                  <MdOutlinePayment
                    style={{ cursor: "pointer" }}
                    color="dodgerblue"
                    onClick={() => {
                      if (openTechnicPaymentModal.id !== record.cure_id) {
                        setOpenTechnicPaymentModal({
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
        `/orto-cure/for-staff?${qs.stringify(
          getUserParams(tableParams)
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
            total: result.total,
          },
        });
      });
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
      <br />
      <Flex align="end" vertical>
        <p>
          Texnik umumiy summasi:{" "}
          {formatMoney(
            data?.reduce((a, e) => a + +e.raw_material_price, 0) || 0
          )}
        </p>
        <p>
          Texnikga berilishi kerak bo'lgan summasi:{" "}
          {formatMoney(
            data?.reduce(
              (a, e) =>
                a + (+e.raw_material_price - +e.payed_raw_material_price),
              0
            ) || 0
          )}
        </p>
        <p>
          Texnikga berligan summa:{" "}
          {formatMoney(
            data?.reduce((a, e) => a + +e.payed_raw_material_price, 0) || 0
          )}
        </p>
      </Flex>
      <TreatmentModal setData={setView} data={view} />
      <EditModal setData={setEditModal} data={editModal} />
      <AddTechnicPaymentCureOrta
        data={openTechnicPaymentModal}
        setOpen={setOpenTechnicPaymentModal}
      />
    </>
  );
};

export default Treatment;
