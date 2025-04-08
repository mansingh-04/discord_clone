import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import Home from "./start/home.jsx";
import Login from "./login/login.jsx";
import Register from "./login/Register.jsx";
import Dashboard from "./initial/dashboard.jsx";
import ServerSettings from "./components/server-settings";
import UserSettings from "./setting/user-setting.jsx";
import React from "react";

function AppContent() {
  const { darkMode } = useTheme();

  // Apply theme class to body
  React.useEffect(() => {
    document.body.className = darkMode ? '' : 'light-mode';
  }, [darkMode]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/server-settings" element={<ServerSettings />} />
      <Route path="/user-settings" element={<UserSettings />} />
      <Route path="/server/:serverId/settings" element={<ServerSettings />} />
      <Route path="/server/:serverId" element={<Dashboard />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </Router>
  );
}

export default App;
