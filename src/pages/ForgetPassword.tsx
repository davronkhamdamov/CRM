import React from "react";
import { UserOutlined } from "@ant-design/icons";
import { Button, Flex, Form, Input } from "antd";

const App: React.FC = () => {
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };

  return (
    <Flex align="center" justify="center" style={{ height: "100vh" }}>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Iltimos loginni kiriting!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Usernameni kiriting"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Parolni tiklash
          </Button>
        </Form.Item>
      </Form>
    </Flex>
  );
};

export default App;
