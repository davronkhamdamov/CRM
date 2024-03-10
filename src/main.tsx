import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ConfigProvider } from "antd";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <ConfigProvider
    // theme={{
    //     token: {
    //         algorithm: theme.darkAlgorithm,
    //     },
    // }}
    >
        <App />
    </ConfigProvider>
);
