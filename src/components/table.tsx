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
import { FC, useEffect, useState } from "react";
import { LoadingOutlined, DeleteOutlined } from "@ant-design/icons";
import { DataType, EditModal, TableParams } from "../types/type";
import { ColumnsType, TableProps } from "antd/es/table";
import { FaUserDoctor } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import EditAccound from "./EditAccound";
import dayjs from "dayjs";

const getuserParams = (params: TableParams) => ({
    results: params.pagination?.pageSize,
    page: params.pagination?.current,
    ...params,
});
const TableComponent: FC = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<DataType[]>();

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
    const deleteUser = (id: string) => {
        setToLoading(true);
        fetch(import.meta.env.VITE_APP_URL + "/user/" + id, { method: "DELETE" }).then(res => res.json())
            .then(() => {
                setToLoading(false);
                fetchData()
                messageApi.success("Bemor muvaffaqqiyatli o'chirildi", 2);
            }).catch(() => {
                setToLoading(false);
                messageApi.error("Nimadir xato ketdi", 2);
            })
    };

    const columns: ColumnsType<DataType> = [
        {
            title: "Ismi",
            sorter: true,
            render: (record) => {
                return (
                    <a href={`patient/${record.id}`}>
                        {record.name} {record.surname}
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
            dataIndex: "created_at",
            render: (registered) =>
                `${dayjs(registered?.date).format("DD-MM-YYYY")}`,
            width: "15%",
        },
        {
            title: "Manzil",
            dataIndex: "address",
            render: (location) => `${location}`,
            width: "20%",
        },
        {
            title: "Balans",
            dataIndex: "balance",
            render: (balance) => `${balance} so'm`,
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
                                        openEditModal.id !== record.id
                                    ) {
                                        setOpenEditModal({
                                            id: record.id,
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
                            onConfirm={() => deleteUser(record.id)}
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
            `${import.meta.env.VITE_APP_URL}/user/?${qs.stringify(
                getuserParams(tableParams)
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
                rowKey={(record) => record.id}
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
