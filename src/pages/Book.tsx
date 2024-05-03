import React from "react";
import { UserOutlined } from "@ant-design/icons";
import { Button, DatePicker, Form, Input, Space } from "antd";
import dayjs from "dayjs";

const Book: React.FC = () => {
  // const onFinish = (values: any) => {
  //   console.log("Received values of form: ", values);
  // };

  return (
    <div className="book_wrapper">
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        // onFinish={onFinish}
      >
        <Space direction="vertical" style={{ width: "100%" }}>
          <Form.Item
            name="firstname"
            rules={[
              {
                required: true,
                message: "Iltimos ismingizni kiriting!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Ismingiz"
            />
          </Form.Item>
          <Form.Item
            name="surname"
            rules={[
              {
                required: true,
                message: "Iltimos familyangiz kiriting!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              type="text"
              placeholder="Familyangiz"
            />
          </Form.Item>
          <Form.Item
            name="date_birth"
            rules={[
              {
                required: true,
                message: "Iltimos familyangiz kiriting!",
              },
            ]}
          >
            <DatePicker
              style={{
                width: "100%",
              }}
              placeholder="Tug'ilgan sana"
              defaultPickerValue={dayjs("2010-04-13")}
              maxDate={dayjs(new Date())}
              getPopupContainer={(trigger) => trigger.parentElement!}
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Ro'yxattan o'tish
            </Button>
          </Form.Item>
        </Space>
      </Form>
    </div>
  );
};

export default Book;
