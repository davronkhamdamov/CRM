import {
    AutoComplete,
    Popconfirm,
    Space,
    Spin,
    Table,
    Tooltip,
    message,
} from "antd";
import { useState } from "react";
import {
    LoadingOutlined,
    DeleteOutlined,
    EditTwoTone,
} from "@ant-design/icons";

import { PaymentDataType, TableParams } from "../types/type";
import { ColumnsType } from "antd/es/table";

import { HiOutlineCash } from "react-icons/hi";
import { IoCardOutline } from "react-icons/io5";
import dayjs from "dayjs";
import { CiCalendarDate } from "react-icons/ci";

const PaymentTypeTable = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [data] = useState<PaymentDataType[]>([
        { name: "Naqt", created_at: new Date() },
        { name: "Karta", created_at: new Date() },
    ]);
    const [loading] = useState(false);
    const [toLoading, setToLoading] = useState(false);
    const [tableParams] = useState<TableParams>({
        pagination: {
            current: 1,
            pageSize: 10,
        },
    });
    const cancel = () => {
        setToLoading(true);
        setTimeout(() => {
            setToLoading(false);
            messageApi.success("To'lov turi muvaffaqqiyatli o'chirildi", 2);
        }, 2000);
    };

    const columns: ColumnsType<PaymentDataType> = [
        {
            title: "To'lov turi",
            dataIndex: "name",
            render: (record) => {
                return (
                    <div
                        style={{
                            display: "flex",
                            gap: "10px",
                            alignItems: "center",
                        }}
                    >
                        {record === "Naqt" ? (
                            <HiOutlineCash />
                        ) : (
                            <IoCardOutline />
                        )}
                        {record}
                    </div>
                );
            },
            width: "33%",
        },
        {
            title: "Yaratilgan vaqti",
            dataIndex: "created_at",
            render: (record) => {
                return (
                    <div
                        style={{
                            display: "flex",
                            gap: "10px",
                            alignItems: "center",
                        }}
                    >
                        <CiCalendarDate />
                        {dayjs(record).format("DD-MM-YYYY")}
                    </div>
                );
            },
            width: "33%",
        },
        {
            title: "Bajariladigan ishlar",
            dataIndex: "operation",
            key: "operation",
            render: () => {
                return (
                    <Space size="middle">
                        <Tooltip placement="bottom" title="Tahrirlash">
                            <EditTwoTone />
                        </Tooltip>
                        <Popconfirm
                            title="O'chirishga ishonchingiz komilmi?"
                            onConfirm={cancel}
                        >
                            <Tooltip placement="bottom" title="O'chirish">
                                <DeleteOutlined style={{ color: "red" }} />
                            </Tooltip>
                        </Popconfirm>
                    </Space>
                );
            },
            width: "33%",
        },
    ];

    // useEffect(() => {
    //     fetchData();
    // }, [JSON.stringify(tableParams)]);

    // const handleTableChange: TableProps["onChange"] = (
    //     pagination,
    //     filters,
    //     sorter
    // ) => {
    //     setTableParams({
    //         pagination,
    //         filters,
    //         ...sorter,
    //     });

    //     if (pagination.pageSize !== tableParams.pagination?.pageSize) {
    //         setData([]);
    //     }
    // };
    // const fetchData = () => {
    //     setLoading(true);
    //     setData([]);
    //     setLoading(false);
    // };

    // const [value, setValue] = useState("");
    // const [options, setOptions] = useState<{ value: string }[]>([]);
    // const onChange = (data: string) => {
    //     setValue(data);
    // };

    return (
        <>
            <AutoComplete
                // value={value}
                // options={options}
                style={{ width: 300, marginBottom: 20 }}
                // onSelect={onSelect}
                // onSearch={async (text) => setOptions(await getPanelValue(text))}
                // onChange={onChange}
                placeholder="To'lov turlarni qidirish"
            />
            <Table
                columns={columns}
                rowKey={(record) => record.name}
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
                // onChange={handleTableChange}
            />
            <Spin
                indicator={<LoadingOutlined style={{ fontSize: 30 }} spin />}
                spinning={toLoading}
                fullscreen
            />
            {contextHolder}
        </>
    );
};

export default PaymentTypeTable;
