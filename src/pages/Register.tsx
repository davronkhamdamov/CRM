import { Button, Flex, Input } from "antd";
import { useState } from "react";
import InputMask from "react-input-mask";
import { Typography } from "antd";
const { Title, Paragraph } = Typography;
import type { GetProps } from "antd";

type OTPProps = GetProps<typeof Input.OTP>;

const Register = () => {
  const [phone, setPhone] = useState<string>("+998");
  const [registered, setRegistered] = useState(true);
  const [loading, setLoading] = useState(false);
  const generateOtp = () => {
    setLoading(true);
    fetch(
      import.meta.env.VITE_APP_URL +
        "/auth/generate-otp?email=davronx036@gmail.com",
      {
        method: "POST",
      }
    )
      .then((res) => res.json())
      .then(() => {
        setLoading(true);
        setRegistered(false);
      });
  };

  const onChange: OTPProps["onChange"] = (text) => {
    setLoading(true);
    fetch(
      import.meta.env.VITE_APP_URL +
        "/auth/verify-otp?email=davronx036@gmail.com&otp=" +
        text,
      {
        method: "POST",
      }
    )
      .then((res) => res.json())
      .then(() => {
        setLoading(true);
      });
  };

  const sharedProps: OTPProps = {
    onChange,
  };
  return (
    <Flex
      style={{
        width: "100%",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {registered ? (
        <Flex align="center" justify="center">
          <Flex vertical style={{ width: "100%", maxWidth: "1000px" }} gap={10}>
            <Title> Ro'yhatdan o'tish</Title>
            <label htmlFor="phone">
              <Paragraph>Telefon raqamingiz</Paragraph>
            </label>
            <InputMask
              style={{
                width: "100%",
                height: "40px",
                padding: "20px",
                borderRadius: "10px",
                border: "1px solid #ccc",
                fontSize: "18px",
                letterSpacing: "1px",
                marginBottom: "10px",
              }}
              mask="+999 (99) 999 99 99"
              maskChar="_"
              id="phone"
              name="phone"
              value={phone}
              placeholder="Telefon raqamingizni kiriting"
              onChange={(e) => {
                const value = e.target.value;
                setPhone(value);
              }}
            />
            <Button
              size="large"
              type="primary"
              onClick={generateOtp}
              disabled={loading}
              loading={loading}
            >
              Kodni sms orqali olish
            </Button>
          </Flex>
        </Flex>
      ) : (
        <Flex vertical gap={10} style={{ width: "250px" }}>
          <Title level={5}>Sizga jo'natilgan kodni kiriting</Title>
          <Input.OTP
            disabled={!loading}
            formatter={(str) => str.toUpperCase()}
            {...sharedProps}
            size="large"
            type="tel"
          />
        </Flex>
      )}
    </Flex>
  );
};

export default Register;
