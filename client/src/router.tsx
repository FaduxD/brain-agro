import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Home } from "./pages/home/home";
import { Management } from "./pages/management/management";
import { Dashboard } from "./pages/dashboard/dashboard";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/management" element={<Management />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
