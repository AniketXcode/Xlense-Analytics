import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import AdminPanel from "./pages/AdminPanel";
import LandingPage from "./pages/LandingPage";
import History from "./pages/History";
import NotFound from "./pages/NotFound";
import UploadSuccess from "./pages/UploadSuccess";

function App() {

  return (
    <BrowserRouter>
    
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/history" element={<History />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/upload-success" element={<UploadSuccess />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
