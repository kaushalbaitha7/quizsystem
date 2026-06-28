import { BrowserRouter, Routes, Route } from "react-router-dom";

import Registration from "./pages/Registration";
import Instructions from "./pages/Instructions";
import Quiz from "./pages/Quiz";
import Result from "./pages/Result";

import AdminLogin from "./pages/AdminLogin";
import Admin from "./pages/Admin";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Registration />} />
        <Route path="/instructions" element={<Instructions />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/result" element={<Result />} />

        {/* Admin */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/dashboard" element={<Admin />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;