import { Navigate, Route, Routes } from "react-router-dom";

import ProtectedRoute from "./components/common/ProtectedRoute.jsx";
import BuilderPage from "./pages/BuilderPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import { useAuth } from "./context/AuthContext.jsx";

const App = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Navigate replace to={isAuthenticated ? "/builder" : "/login"} />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/builder" element={<BuilderPage />} />
      </Route>
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  );
};

export default App;
