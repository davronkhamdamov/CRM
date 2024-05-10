import React, { useContext } from "react";
import type { MenuProps } from "antd";
import { Avatar, Dropdown, Space } from "antd";
import { MdDevices, MdOutlineDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";
import { ThemeProvider } from "../App";

const ProfileAvatar: React.FC = () => {
  const { setTheme, theme } = useContext(ThemeProvider);

  const items: MenuProps["items"] = [
    {
      label: <a href="/settings">Profile</a>,
      key: "0",
    },
    {
      label: <a>Mode</a>,
      key: "1",
      style: { width: "100px" },
      theme: "light" === theme || "dark" === theme ? theme : "dark",
      onClick: (e) => {
        if (e.key === "light" || e.key === "dark" || e.key === "system") {
          localStorage.setItem("theme", e.key);
          setTheme(e.key);
        }
      },
      children: [
        {
          key: "light",
          label: "Yorug mavzu",
          icon: <CiLight />,
        },
        {
          key: "dark",
          label: "Tungi mavzu (beta)",
          icon: <MdOutlineDarkMode />,
        },
        {
          type: "divider",
        },
        {
          key: "system",
          label: "Sistema mavzusi",
          icon: <MdDevices />,
        },
      ],
    },
  ];
  const localTheme = localStorage.getItem("theme");
  return (
    <Dropdown
      menu={{
        items,
        selectable: true,
        defaultSelectedKeys: [
          localTheme === "dark" ||
          localTheme === "light" ||
          localTheme === "system"
            ? localTheme
            : theme,
        ],
      }}
      trigger={["click"]}
    >
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          <Avatar
            style={{
              backgroundColor: "red",
              verticalAlign: "middle",
            }}
            size="large"
            gap={3}
          >
            D
          </Avatar>
        </Space>
      </a>
    </Dropdown>
  );
};

export default ProfileAvatar;
