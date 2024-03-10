import {
    AutoComplete,
    Popconfirm,
    Space,
    Spin,
    Table,
    Tooltip,
    message,
} from "antd";
import qs from "qs";
import { useEffect, useState } from "react";
import { LoadingOutlined, DeleteOutlined } from "@ant-design/icons";
import type { TableProps } from "antd";
import { DataType, EditModal, TableParams } from "../types/type";
import { ColumnsType } from "antd/es/table";
import { FaUserDoctor } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import EditAccound from "./EditAccound";
import dayjs from "dayjs";

const getRandomuserParams = (params: TableParams) => ({
    results: params.pagination?.pageSize,
    page: params.pagination?.current,
    ...params,
});
const TableComponent = () => {
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
            messageApi.success("Bemor muvaffaqqiyatli o'chirildi", 2);
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
            title: "Jinsi",
            dataIndex: "gender",
            filters: [
                {
                    text: "Erkak",
                    value: "male",
                },
                {
                    text: "Ayol",
                    value: "female",
                },
            ],
            width: "10%",
        },
        {
            title: "Ro'yxatdan o'tgan sanasi",
            dataIndex: "registered",
            render: (registered) =>
                `${dayjs(registered?.date).format("DD-MM-YYYY")}`,
            width: "15%",
        },
        {
            title: "Manzil",
            dataIndex: "location",
            render: (location) => `${location.street.name}`,
            width: "20%",
        },
        {
            title: "Balans",
            dataIndex: "location",
            render: (location) => `${location.street.number} so'm`,
            width: "15%",
        },
        {
            title: "Bajariladigan ishlar",
            dataIndex: "operation",
            key: "operation",
            render: (_, record) => {
                return (
                    <Space size="middle">
                        <Tooltip placement="bottom" title="Tahrirlash">
                            <MdEdit
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
                        <Tooltip placement="bottom" title="Davolash">
                            <FaUserDoctor
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
            <EditAccound setOpen={setOpenEditModal} data={openEditModal} />
            {contextHolder}
        </>
    );
};

export default TableComponent;
