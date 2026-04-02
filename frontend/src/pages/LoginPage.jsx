import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import AuthForm from "../components/auth/AuthForm.jsx";
import { useAuth } from "../context/AuthContext.jsx";

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, loading } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (event) => {
    setFormData((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      await login(formData);
      navigate(location.state?.from?.pathname || "/builder", { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Unable to sign in");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-10">
      <AuthForm
        error={error}
        fields={[
          { name: "email", label: "Email", placeholder: "you@example.com", type: "email" },
          { name: "password", label: "Password", placeholder: "Minimum 6 characters", type: "password" }
        ]}
        footer={
          <p>
            New here?{" "}
            <Link className="font-semibold text-cyan-300 hover:text-cyan-200" to="/register">
              Create an account
            </Link>
          </p>
        }
        formData={formData}
        loading={loading}
        onChange={handleChange}
        onSubmit={handleSubmit}
        submitLabel="Login"
        subtitle="Access your portfolio studio, edit your content, and publish a sharper developer narrative."
        title="Welcome back"
      />
    </div>
  );
};

export default LoginPage;

