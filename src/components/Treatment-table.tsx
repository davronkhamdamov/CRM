import {
    AutoComplete,
    Popconfirm,
    Space,
    Spin,
    Table,
    Tag,
    Tooltip,
    message,
} from "antd";
import qs from "qs";

import { useEffect, useState } from "react";
import {
    DownOutlined,
    LoadingOutlined,
    DeleteOutlined,
    CheckCircleOutlined,
    ClockCircleOutlined,
    CloseCircleOutlined,
    ExclamationCircleOutlined,
    MinusCircleOutlined,
    SyncOutlined,
} from "@ant-design/icons";
import type { TableProps } from "antd";
import { DataType, EditModal, TableParams } from "../types/type";
import { ColumnsType } from "antd/es/table";
import { FaUserDoctor } from "react-icons/fa6";
import { MdEdit, MdOutlinePayment } from "react-icons/md";
import dayjs from "dayjs";
import { IoIosMore } from "react-icons/io";

const getRandomuserParams = (params: TableParams) => ({
    results: params.pagination?.pageSize,
    page: params.pagination?.current,
    ...params,
});
const Treatment = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [data, setData] = useState<DataType[]>();
    const [loading, setLoading] = useState(false);
    const [openEditModal, setOpenEditModal] = useState<EditModal>({
        id: "",
        isOpen: false,
    });
    const [toLoading, setToLoading] = useState(false);
    const [tableParams, setTableParams] = useState<TableParams>({
        pagination: {
            current: 1,
            pageSize: 10,
        },
    });
    const cancel = () => {
        setToLoading(true);
        setTimeout(() => {
            setToLoading(false);
            messageApi.success("Muvaffaqqiyatli o'chirildi", 2);
        }, 2000);
    };

    const columns: ColumnsType<DataType> = [
        {
            title: "Ismi",
            sorter: true,
            render: (record) => {
                return (
                    <a href={`patient/${record.login.uuid}`}>
                        {record.name.first} {record.name.last}
                    </a>
                );
            },
            width: "20%",
        },
        {
            title: "Shifokor",
            dataIndex: "name",
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
            render: (name) => `${name?.first}`,
            width: "20%",
        },
        {
            title: "Sana",
            dataIndex: "registered",
            render: (dob) =>
                `${dayjs(dob?.date).format("DD-MM-YYYY HH:MM")} - ${dayjs(
                    dob?.date
                ).format("HH:MM")}`,
            width: "20%",
        },
        {
            title: "Holati",
            dataIndex: "",
            width: "5%",
            render: () => {
                return (
                    <>
                        <Tag icon={<CheckCircleOutlined />} color="success">
                            Yakunlandi
                        </Tag>
                        {/* <Tag icon={<SyncOutlined spin />} color="processing">
                            Jarayonda
                        </Tag>
                        <Tag icon={<CloseCircleOutlined />} color="error">
                            Xatolik
                        </Tag>
                        <Tag icon={<ClockCircleOutlined />} color="default">
                            Kutillmoqda
                        </Tag>
                        <Tag icon={<MinusCircleOutlined />} color="default">
                            To'xtatilgan
                        </Tag> */}
                    </>
                );
            },
        },
        {
            title: "Bajariladigan ishlar",
            dataIndex: "operation",
            key: "operation",
            align: "center",
            render: (_, record) => {
                return (
                    <Space size="middle">
                        <Tooltip placement="bottom" title="To'lash">
                            <MdOutlinePayment
                                style={{ cursor: "pointer" }}
                                color="dodgerblue"
                                onClick={() => {
                                    if (
                                        openEditModal.id !== record.login.uuid
                                    ) {
                                        setOpenEditModal({
                                            id: record.login.uuid,
                                            isOpen: true,
                                        });
                                    }
                                }}
                            />
                        </Tooltip>
                        <Tooltip placement="bottom" title="Tahrirlash">
                            <MdEdit
                                color="#3b82f6"
                                style={{ cursor: "pointer" }}
                            />
                        </Tooltip>
                        <Tooltip placement="bottom" title="Ko'proq ma'lumot">
                            <IoIosMore
                                color="#3b82f6"
                                style={{ cursor: "pointer" }}
                            />
                        </Tooltip>
                        <Popconfirm
                            title="O'chirishga ishonchingiz komilmi?"
                            onConfirm={cancel}
                        >
                            <Tooltip placement="bottom" title="O'chirish">
                                <DeleteOutlined
                                    style={{ color: "red", cursor: "pointer" }}
                                />
                            </Tooltip>
                        </Popconfirm>
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
    const fetchData = () => {
        setLoading(true);
        fetch(
            `https://randomuser.me/api?${qs.stringify(
                getRandomuserParams(tableParams)
            )}`
        )
            .then((res) => res.json())
            .then(({ results }) => {
                setData(results);
                setLoading(false);
                setTableParams({
                    ...tableParams,
                    pagination: {
                        ...tableParams.pagination,
                        total: 200,
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
                return results?.map(
                    (e: { name: { first: string; last: string } }) => {
                        return { value: e.name.first + " " + e.name.last };
                    }
                );
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
                placeholder="Bemorni qidirish"
            />
            <Table
                columns={columns}
                rowKey={(record) => record.login.uuid}
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

export default Treatment;
