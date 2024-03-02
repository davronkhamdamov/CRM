import { RouterProvider } from "react-router-dom";
import route from "./router/route";
import { createContext, useEffect, useState } from "react";
import { themeMode } from "./types/type";

export const ThemeProvider = createContext<{
    theme: themeMode;
    setTheme: (i: themeMode) => void;
}>({
    theme: "light",
    setTheme: (i): void => {
        i;
    },
});

const App = () => {
    const getCurrentTheme = () =>
        window.matchMedia("(prefers-color-scheme: dark)").matches;
    const [theme, setTheme] = useState<themeMode>("light");
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
            <RouterProvider router={route} />;
        </ThemeProvider.Provider>
    );
};
export default App;
