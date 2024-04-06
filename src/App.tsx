import { RouterProvider } from "react-router-dom";
import route from "./router/route";
import { createContext, useEffect, useState } from "react";
import { themeMode } from "./types/type";
import { Alert, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import Marquee from 'react-fast-marquee';

export const ThemeProvider = createContext<{
    theme: themeMode;
    setTheme: (i: themeMode) => void;
}>({
    theme: "light",
    setTheme: (i): void => {
        i;
    },
});

export const LoadingProvider = createContext<{
    isLoadingCnx: boolean;
    setLoadingCnx: (i: boolean) => void;
}>({
    isLoadingCnx: false,
    setLoadingCnx(i) {
        i;
    },
});

const App = () => {
    const getCurrentTheme = () =>
        window.matchMedia("(prefers-color-scheme: dark)").matches;
    const [theme, setTheme] = useState<themeMode>("light");
    const [isLoadingCnx, setLoadingCnx] = useState<boolean>(false);
    useEffect(() => {
        const storedTheme = localStorage.getItem("theme");
        if (storedTheme === "system") {
            setTheme(getCurrentTheme() ? "dark" : "light");
        } else if (storedTheme === "dark" || storedTheme === "light") {
            setTheme(storedTheme);
        } else {
            setTheme("light");
            localStorage.setItem("theme", "light");
        }
    }, [theme]);
    return (
        <ThemeProvider.Provider value={{ theme, setTheme }}>
            <LoadingProvider.Provider value={{ isLoadingCnx, setLoadingCnx }}>
                <Alert
                    banner
                    message={
                        <Marquee pauseOnHover gradient={false}>
                            Bu sayt sinov rejimida ishlamoqda agar xatoliklar bo'lsa <a style={{ margin: "0 5px" }} href="https://t.me/pro_username">menga</a> xabar bering!?
                        </Marquee>
                    }
                />
                <RouterProvider router={route} />
                <Spin
                    indicator={
                        <LoadingOutlined style={{ fontSize: 30 }} spin />
                    }
                    style={{ zIndex: 1000000 }}
                    spinning={isLoadingCnx}
                    fullscreen
                />
            </LoadingProvider.Provider>
        </ThemeProvider.Provider>
    );
};
export default App;
