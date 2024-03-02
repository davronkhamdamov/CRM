import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ConfigProvider, theme } from "antd";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <ConfigProvider
        theme={{
            token: {
                algorithm: theme.darkAlgorithm,
            },
        }}
    >
        <App />
    </ConfigProvider>
);
