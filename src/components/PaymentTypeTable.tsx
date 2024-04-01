import {
    AutoComplete,
    Popconfirm,
    Space,
    Spin,
    Table,
    Tooltip,
    message,
} from "antd";
import { useEffect, useState } from "react";
import {
    LoadingOutlined,
    DeleteOutlined,
    EditTwoTone,
} from "@ant-design/icons";

import { PaymentDataType, TableParams } from "../types/type";
import { ColumnsType, TableProps } from "antd/es/table";

import { HiOutlineCash } from "react-icons/hi";
import { IoCardOutline } from "react-icons/io5";
import dayjs from "dayjs";
import { CiCalendarDate } from "react-icons/ci";
import qs from "qs";

const getPaymentTypeParams = (params: TableParams) => ({
    results: params.pagination?.pageSize,
    page: params.pagination?.current,
    ...params,
});
const PaymentTypeTable = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [data, setData] = useState<PaymentDataType[]>();
    const [loading, setLoading] = useState(false);
    const [toLoading, setToLoading] = useState(false);
    const [tableParams, setTableParams] = useState<TableParams>({
        pagination: {
            current: 1,
            pageSize: 10,
        },
    });

    const deletePaymentType = (id: string) => {
        setToLoading(true);
        fetch(import.meta.env.VITE_APP_URL + "/payment-type/" + id, { method: "DELETE" }).then(res => res.json())
            .then(() => {
                setToLoading(false);
                fetchData()
                messageApi.success("To'lov turi muvaffaqqiyatli o'chirildi", 2);
            }).catch(() => {
                setToLoading(false);
                messageApi.error("Nimadir xato ketdi", 2);
            })
    };


    const columns: ColumnsType<PaymentDataType> = [
        {
            title: "To'lov turi",
            dataIndex: "method",
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
            render: (_, record) => {
                return (
                    <Space size="middle">
                        <Tooltip placement="bottom" title="Tahrirlash">
                            <EditTwoTone />
                        </Tooltip>
                        <Popconfirm
                            title="O'chirishga ishonchingiz komilmi?"
                            onConfirm={() => deletePaymentType(record.id)}
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
    const fetchData = () => {
        setLoading(true);
        fetch(
            `${import.meta.env.VITE_APP_URL}/payment-type/?${qs.stringify(
                getPaymentTypeParams(tableParams)
            )}`
        )
            .then((res) => res.json())
            .then((results) => {
                setData(results.result);
                setLoading(false);
                setTableParams({
                    ...tableParams,
                    pagination: {
                        ...tableParams.pagination,
                        total: results.count_of_users,
                    },
                });
            });
    };

    const [value, setValue] = useState("");
    const [options, setOptions] = useState<{ value: string }[]>([]);
    const onChange = (data: string) => {
        setValue(data);
    };

    function getPanelValue(text: string): import("react").SetStateAction<{ value: string; }[]> | PromiseLike<import("react").SetStateAction<{ value: string; }[]>> {
        throw new Error("Function not implemented." + text);
    }

    return (
        <>
            <AutoComplete
                value={value}
                options={options}
                style={{ width: 300, marginBottom: 20 }}
                // onSelect={onSelect}
                onSearch={async (text) => setOptions(await getPanelValue(text))}
                onChange={onChange}
                placeholder="To'lov turlarni qidirish"
            />
            <Table
                columns={columns}
                rowKey={(record) => record.method}
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
