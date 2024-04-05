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
import {
    LoadingOutlined,
    DeleteOutlined,
    EditTwoTone,
} from "@ant-design/icons";

import type { TableProps } from "antd";
import { DataType, TableParams } from "../types/type";
import { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";

const getRandomuserParams = (params: TableParams) => ({
    results: params.pagination?.pageSize,
    page: params.pagination?.current,
    ...params,
});
const DoctorsTable = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [data, setData] = useState<DataType[]>();
    const [loading, setLoading] = useState(false);
    const [toLoading, setToLoading] = useState(false);
    const [tableParams, setTableParams] = useState<TableParams>({
        pagination: {
            current: 1,
            pageSize: 10,
        },
    });
    const Delete_doctor = () => {
        setToLoading(true);
        setTimeout(() => {
            setToLoading(false);
            messageApi.success("Shifokor muvaffaqqiyatli o'chirildi", 2);
        }, 2000);
    };
    const role_data = ["Doktor", "Admin"];
    const columns: ColumnsType<DataType> = [
        {
            title: "Ism Familyasi",
            dataIndex: "",
            sorter: true,
            render: (name) => {
                return (
                    <Link to={name.id}>
                        {name.name} {name.surname}
                    </Link>
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
            width: "20%",
        },
        {
            title: "Role",
            dataIndex: "role",
            width: "20%",
        },
        {
            title: "Bajariladigan ishlar",
            dataIndex: "operation",
            key: "operation",
            render: () => {
                return (
                    <Space size="middle">
                        <Tooltip placement="bottom" title="Tahrirlash">
                            <EditTwoTone style={{ cursor: "pointer" }} />
                        </Tooltip>
                        <Popconfirm
                            title="O'chirishga ishonchingiz komilmi?"
                            onConfirm={Delete_doctor}
                        >
                            <Tooltip placement="bottom" title="O'chirish">
                                <DeleteOutlined style={{ color: "red" }} />
                            </Tooltip>
                        </Popconfirm>
                    </Space>
                );
            },
            width: "20%",
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
            `${import.meta.env.VITE_APP_URL}/staffs?${qs.stringify(
                getRandomuserParams(tableParams)
            )}`
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
            }).catch((err) => {
                if (err.message === "Failed to fetch") {
                    messageApi.error("Internet bilan aloqani tekshiring!", 2);
                };
                setData([]);
                setLoading(false);
            })
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
                placeholder="Shifokorni qidirish"
            />
            <Table
                columns={columns}
                rowKey={(record) => record.id}
                dataSource={data}
                pagination={tableParams.pagination}
                scroll={{ y: 590 }}
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

export default DoctorsTable;
