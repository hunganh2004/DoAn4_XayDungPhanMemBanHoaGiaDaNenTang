import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ConfigProvider } from "antd";
import viVN from "antd/locale/vi_VN";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import theme from "./theme/theme";
import "./App.css";

export default function App() {
  return (
    <ConfigProvider locale={viVN} theme={theme}>
      <Router>
        <div style={{ display: "flex", minHeight: "100vh" }}>
          <Sidebar />
          <div style={{ flex: 1 }}>
            <Navbar />
            <div style={{ padding: 24}}>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/users" element={<Users />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    </ConfigProvider>
  )
}