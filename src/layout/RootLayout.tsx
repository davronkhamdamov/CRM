import { useContext, useState } from "react";
import {
    PieChartOutlined,
    UserOutlined,
    SettingOutlined,
} from "@ant-design/icons";
import { Flex, Layout, Menu } from "antd";

import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { JSX } from "react/jsx-runtime";
import ProfileAvatar from "../components/ProfileAvatar";
import { MdPayments } from "react-icons/md";
import { ThemeProvider } from "../App";
import { FaDollarSign, FaSuitcaseMedical, FaUserDoctor } from "react-icons/fa6";
import { GrServices } from "react-icons/gr";
import { CiBoxList } from "react-icons/ci";
import { SlLogout } from "react-icons/sl";

const { Sider } = Layout;

function getItem(label: string, key: string, icon: JSX.Element) {
    return {
        key,
        icon,
        label,
    };
}

const RootLayout = () => {
    const { theme } = useContext(ThemeProvider);
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);
    const { pathname } = useLocation();

    const items = [
        getItem("Statistika", "statistic", <PieChartOutlined />),
        getItem(
            "To'lov",
            "payment",
            <FaDollarSign color={theme === "dark" ? "#f2f2f2" : "#000"} />
        ),
        getItem("Bemorlar", "patient", <UserOutlined />),
        getItem("Shifokorlar", "doctors", <FaUserDoctor />),
        getItem("To'lov turlari", "payment-type", <MdPayments />),
        getItem("Xizmatlar", "services", <GrServices />),
        getItem("Davolashlar", "treatment", <FaSuitcaseMedical />),
        getItem("Sozlamalar", "settings", <SettingOutlined />),
        getItem("Xisobot", "hisobot", <CiBoxList />),
        getItem("Log out", "auth", <SlLogout />),
    ];

    return (
        <Layout hasSider>
            <Sider
                breakpoint="lg"
                theme={"light" === theme || "dark" === theme ? theme : "dark"}
                collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
                style={{
                    minHeight: "100vh",
                }}
            >
                <Flex
                    align="center"
                    justify="center"
                    style={{ height: "60px" }}
                >
                    <ProfileAvatar />
                </Flex>
                <Menu
                    theme={
                        "light" === theme || "dark" === theme ? theme : "dark"
                    }
                    mode="inline"
                    defaultSelectedKeys={[pathname.split("/")[2]]}
                    items={items}
                    onClick={(e) => {
                        navigate(e.key);
                    }}
                />
            </Sider>
            <Layout>
                <Outlet />
            </Layout>
        </Layout>
    );
};
export default RootLayout;
