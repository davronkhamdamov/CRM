import React from 'react';
import { Space, Table, Tag } from 'antd';

const { Column } = Table;

interface DataType {
    key: React.Key;
    name: string;
    price: number;
    age: number;
    address: string;
    tags: string;
}

const data: DataType[] = [
    {
        key: '1',
        name: 'John',
        price: 133,
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: "active",
    },
    {
        key: '2',
        name: 'Jim',
        price: 534,
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: "active",
    },
    {
        key: '3',
        name: 'Joe',
        price: 243,
        age: 32,
        address: 'Sydney No. 1 Lake Park',
        tags: "noactive"
    },
];

const ServiceHistory = () => {
    return (
        <Table dataSource={data} style={{ width: "100%" }}>
            <Column title="Xizmat nomi" dataIndex="name" key="name" />
            <Column title="Xizmat narxi" dataIndex="price" key="price" />
            <Column title="Xom ashyo narxi" dataIndex="age" key="" />
            <Column title="Yaratilgan vaqti" dataIndex="address" key="address" />
            <Column
                title="Xizmat holati"
                dataIndex="tags"
                key="tags"
                render={(tag: string) => {
                    let color = 'green';
                    if (tag === 'noactive') {
                        color = 'volcano';
                    }
                    return (
                        <Tag color={color} key={tag}>
                            {tag.toUpperCase()}
                        </Tag>
                    )
                }}
            />

        </Table>
    )
}
export default ServiceHistory

