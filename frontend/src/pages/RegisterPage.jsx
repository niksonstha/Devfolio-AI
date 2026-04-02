import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import AuthForm from "../components/auth/AuthForm.jsx";
import { useAuth } from "../context/AuthContext.jsx";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register, loading } = useAuth();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (event) => {
    setFormData((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      await register(formData);
      navigate("/builder", { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Unable to create account");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-10">
      <AuthForm
        error={error}
        fields={[
          { name: "name", label: "Full name", placeholder: "Ada Lovelace", type: "text" },
          { name: "email", label: "Email", placeholder: "you@example.com", type: "email" },
          { name: "password", label: "Password", placeholder: "Minimum 6 characters", type: "password" }
        ]}
        footer={
          <p>
            Already have an account?{" "}
            <Link className="font-semibold text-cyan-300 hover:text-cyan-200" to="/login">
              Sign in
            </Link>
          </p>
        }
        formData={formData}
        loading={loading}
        onChange={handleChange}
        onSubmit={handleSubmit}
        submitLabel="Create account"
        subtitle="Set up your workspace and start shaping a portfolio that reads like a polished product."
        title="Create your account"
      />
    </div>
  );
};

export default RegisterPage;
