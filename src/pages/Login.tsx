import React from "react";
import {
  EyeTwoTone,
  EyeInvisibleOutlined,
  UserOutlined,
  LockOutlined,
} from "@ant-design/icons";
import { Button, Flex, Form, Input } from "antd";
import { Link } from "react-router-dom";

const App: React.FC = () => {
  const onFinish = (values: any) => {
    fetch(import.meta.env.VITE_APP_URL + "/auth/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(values)
    }).then(res => res.json())
      .then(data => {
        if (data.status === "ok") {
          localStorage.setItem("auth", data.result.access_token)
          location = data.result.role
        }
      })
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
          name="login"
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
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Iltimos parolni kiriting!",
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="Parolni kiriting"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>
        <Form.Item>
          <Link className="login-form-forgot" to="forget-password">
            Parolni unutdingizimi?
          </Link>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Tizimga kirish
          </Button>
        </Form.Item>
      </Form>
    </Flex>
  );
};

export default App;
