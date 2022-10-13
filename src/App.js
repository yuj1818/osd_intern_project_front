import { Routes, Route } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import CalendarPage from "./Pages/CalendarPage";
import SelectionPage from "./Pages/SelectionPage";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";

function App() {
  return (
      <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/selection" element={<SelectionPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
      </Routes>
  );
};

export default App;
