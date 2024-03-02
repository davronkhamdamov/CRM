import {
    Dropdown,
    Form,
    Popconfirm,
    Space,
    Table,
    Tooltip,
    message,
} from "antd";
import qs from "qs";
import { useEffect, useState } from "react";
import {
    DownOutlined,
    LoadingOutlined,
    DeleteOutlined,
    EditTwoTone,
    EyeTwoTone,
    CheckCircleOutlined,
} from "@ant-design/icons";

const actionItems = [
    {
        key: "1",
        label: (
            <a>
                <Space style={{ color: "green" }}>
                    Bajarish <CheckCircleOutlined />
                </Space>
            </a>
        ),
    },
    {
        key: "2",
        label: "Action 2",
    },
];
const TableComponent = () => {
    const [messageApi, contextHolder] = message.useMessage();

    const cancel = () => {
        messageApi
            .open({
                type: "loading",
                content: "Jarayonda...",
                duration: 2.5,
            })
            .then(() => message.success("Muvaffaqqiyatli o'chirildi", 2.5));
    };

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            sorter: true,
            render: (name) => `${name.first} ${name.last}`,
            width: "20%",
        },
        {
            title: "Gender",
            dataIndex: "gender",
            filters: [
                {
                    text: "Male",
                    value: "male",
                },
                {
                    text: "Female",
                    value: "female",
                },
            ],
            width: "20%",
        },
        {
            title: "Email",
            dataIndex: "email",
        },
        {
            title: "Action",
            dataIndex: "operation",
            key: "operation",
            render: () => {
                return (
                    <Space size="middle">
                        <Tooltip placement="top" title="Tahrirlash">
                            <EditTwoTone />
                        </Tooltip>
                        <Tooltip placement="top" title="Ko'rish">
                            <EyeTwoTone />
                        </Tooltip>
                        <Popconfirm
                            title="O'chirishga ishonchingiz komilmi?"
                            onConfirm={cancel}
                        >
                            <Tooltip placement="top" title="O'chirish">
                                <DeleteOutlined style={{ color: "red" }} />
                            </Tooltip>
                        </Popconfirm>
                        <Dropdown
                            menu={{
                                items: actionItems,
                            }}
                        >
                            <a>
                                More <DownOutlined />
                            </a>
                        </Dropdown>
                    </Space>
                );
            },
        },
    ];

    const getRandomuserParams = (params) => ({
        results: params.pagination?.pageSize,
        page: params.pagination?.current,
        ...params,
    });
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 10,
        },
    });
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
    useEffect(() => {
        fetchData();
    }, [JSON.stringify(tableParams)]);
    const handleTableChange = (pagination, filters, sorter) => {
        setTableParams({
            pagination,
            filters,
            ...sorter,
        });

        if (pagination.pageSize !== tableParams.pagination?.pageSize) {
            setData([]);
        }
    };

    return (
        <>
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
            {contextHolder}
        </>
    );
};

export default TableComponent;
