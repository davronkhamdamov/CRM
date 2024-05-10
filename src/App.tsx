import { RouterProvider } from "react-router-dom";
import route from "./router/route";
import { createContext, useEffect, useState } from "react";
import { themeMode } from "./types/type";
import { ConfigProvider, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

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
    <ConfigProvider
      theme={{
        components: {
          Layout: {
            colorBgBase: "red",
          },
          Table: {
            borderColor: theme == "dark" ? "#444" : "#f2f2f2",
            headerBg: theme == "dark" ? "#393E46" : "#fafafa",
            headerColor: theme == "dark" ? "#f2f2f2" : "rgba(0, 0, 0, 0.88)",
          },
          Input: {
            colorBgContainer: theme == "dark" ? "#333" : "#f9f9f9",
          },
          Select: {
            optionSelectedBg: theme == "dark" ? "#333" : "#f9f9f9",
          },
          Tag: {
            colorErrorBg: theme == "dark" ? "#ff00055" : "",
            colorSuccessBg: theme == "dark" ? "#00ff0033" : "",
            colorInfoBg: theme == "dark" ? "#00FFFF14" : "",
            colorInfo: theme == "dark" ? "blue" : "#1668dc",
          },
        },
        token: {
          colorBgBase: theme == "dark" ? "#001529" : "#f5f5f5",
          colorText: theme == "dark" ? "#fff" : "rgba(0, 0, 0, 0.88)",
          colorBorder: theme == "dark" ? "#aaa" : "#d9d9d9",
          colorTextPlaceholder: theme == "dark" ? "#f9f9f9" : "#d9d9d9",
        },
      }}
    >
      <ThemeProvider.Provider value={{ theme, setTheme }}>
        <LoadingProvider.Provider value={{ isLoadingCnx, setLoadingCnx }}>
          <RouterProvider router={route} />
          <Spin
            indicator={<LoadingOutlined style={{ fontSize: 30 }} spin />}
            style={{ zIndex: 1000000 }}
            spinning={isLoadingCnx}
            fullscreen
          />
        </LoadingProvider.Provider>
      </ThemeProvider.Provider>
    </ConfigProvider>
  );
};
export default App;
