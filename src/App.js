import { Routes, Route } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import CalendarPage from "./Pages/CalendarPage";
import SelectionPage from "./Pages/SelectionPage";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import isUser from "./modules/isUser";

function App() {

    const AuthLandingPage = isUser(LandingPage, null);
    const AuthCalendarPage = isUser(CalendarPage, true);
    const AuthSelectionPage = isUser(SelectionPage, true);
    const AuthLoginPage = isUser(LoginPage, false);
    const AuthRegisterPage = isUser(RegisterPage, false);

    return (
      <Routes>
          <Route path="/" element={<AuthLandingPage />} />
          <Route path="/calendar" element={<AuthCalendarPage />} />
          <Route path="/selection" element={<AuthSelectionPage />} />
          <Route path="/login" element={<AuthLoginPage />} />
          <Route path="/register" element={<AuthRegisterPage />} />
      </Routes>
  );
};

export default App;
