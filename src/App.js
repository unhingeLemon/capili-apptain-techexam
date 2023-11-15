import SendbirdProvider from "@sendbird/uikit-react/SendbirdProvider";
import "@sendbird/uikit-react/dist/index.css";
import CustomizedApp from "./CustomizedApp";
import { useLocation } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// PAGES:
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import ChatPage from "./pages/ChatPage";

import "./App.css";
const APP_ID = "889A4AFB-55EC-4B5D-93FE-B72BC1729840";
const USER_ID = "1";
function App() {
  // const { state } = useLocation();
  const isAuthenticated = false;

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/chat" element={<ChatPage />} />

          <Route path="*" element={<p>There's nothing here: 404!</p>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
