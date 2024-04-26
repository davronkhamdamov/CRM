import { AutoComplete, Space, Table, Tag, Tooltip } from "antd";
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
import dayjs from "dayjs";
import { FaTooth } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import { AiOutlineFileSearch } from "react-icons/ai";
import TreatmentModal from "./TreatmentModal";

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
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const columns: ColumnsType<CureDataType> = [
    {
      title: "Ismi",
      sorter: true,
      render: (record) => {
        return record.user_name + " " + record.user_surname;
      },
      width: "17%",
    },
    {
      title: "Shifokor",
      dataIndex: "",
      filters: [
        {
          text: "Birinchi doktor",
          value: "first",
        },
        {
          text: "Ikkinchi doktor",
          value: "second",
        },
        {
          text: "Uchinchi doktor",
          value: "third",
        },
      ],
      render: (staff) => `${staff?.staff_name + " " + staff.staff_surname}`,
      width: "17%",
    },
    {
      title: "Davolash vaqti",
      render: (date) =>
        `${dayjs(date?.start_time).format("HH:MM")} - ${dayjs(
          date?.end_time
        ).format("HH:MM DD-MM-YYYY")}`,
      width: "17%",
    },
    {
      title: "To'lov summasi",
      dataIndex: "price",
      render: (price) => (price ? price + " so'm" : "0 so'm"),
      width: "17%",
    },
    {
      title: "To'lov holati",
      dataIndex: "is_done",
      width: "7%",
      render: () => {
        return (
          <>
            {/* <Tag icon={<CheckCircleOutlined />} color="success">
                    To'landi
                </Tag> */}
            <Tag icon={<CloseCircleOutlined />} color="error">
              To'lanmadi
            </Tag>
            {/* <Tag icon={<SyncOutlined spin />} color="processing">
                      To'liq to'lanmadi
                  </Tag>
                  <Tag icon={<CloseCircleOutlined />} color="error">
                      To'lanmadi
                  </Tag>
                  <Tag icon={<ClockCircleOutlined />} color="default">
                      Kutilmoqda
                  </Tag>
                  <Tag icon={<MinusCircleOutlined />} color="default">
                      To'lanmadi
                  </Tag> */}
          </>
        );
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
                <Tooltip placement="bottom" title="Batafsil ko'rish">
                  <Link to={"info/" + record.cure_id}>
                    <BsThreeDotsVertical
                      color="#3b82f6"
                      style={{ cursor: "pointer" }}
                    />
                  </Link>
                </Tooltip>
              </Space>
            )}
          </Space>
        );
      },
    },
  ];

  useEffect(() => {
    fetchData();
  }, [JSON.stringify(tableParams)]);

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
        `/cure/for-staff/?${qs.stringify(getRandomuserParams(tableParams))}`,
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
  const [value, setValue] = useState("");
  const [options, setOptions] = useState<{ value: string }[]>([]);
  const onChange = (data: string) => {
    setValue(data);
  };
  const mockVal = async (str: string) => {
    return await fetch(`https://randomuser.me/api?search=${str}`)
      .then((res) => res.json())
      .then(({ results }) => {
        return results?.map((e: { name: { first: string; last: string } }) => {
          return { value: e.name.first + " " + e.name.last };
        });
      });
  };
  const getPanelValue = async (searchText: string) =>
    !searchText ? [] : await mockVal(searchText);

  const onSelect = (data: string) => {
    console.log("onSelect", data);
  };

  return (
    <>
      <AutoComplete
        value={value}
        options={options}
        style={{ width: 300, marginBottom: 20 }}
        onSelect={onSelect}
        onSearch={async (text) => setOptions(await getPanelValue(text))}
        onChange={onChange}
        placeholder="Davolashni qidirish"
      />
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
    </>
  );
};

export default DocktorTreatment;
