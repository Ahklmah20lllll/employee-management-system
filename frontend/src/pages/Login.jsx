import React, { useState } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  console.log("Login component rendering");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      if (res.data.success && res.data.token) {
        login(res.data.user); 
        localStorage.setItem("token", res.data.token);

        // Navigate based on user type (you can add role logic later)
        // For now, default to employee dashboard
        navigate("/employee/dashboard");
      } else {
        setError(res.data.message || "Login failed");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div 
      className="flex items-center justify-center min-h-screen bg-gray-100"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#f3f4f6'
      }}
    >
      <form
        className="bg-white p-8 rounded-lg shadow-md w-96"
        onSubmit={handleSubmit}
        style={{
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '0.5rem',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          width: '24rem',
          maxWidth: '90%'
        }}
      >
        <h2 
          className="text-3xl font-bold mb-6 text-center"
          style={{
            fontSize: '1.875rem',
            fontWeight: 'bold',
            marginBottom: '1.5rem',
            textAlign: 'center'
          }}
        >
          Login
        </h2>

        {error && (
          <p 
            className="text-red-500 mb-3"
            style={{
              color: '#ef4444',
              marginBottom: '0.75rem'
            }}
          >
            {error}
          </p>
        )}

        <input
          type="email"
          placeholder="Enter your email"
          className="w-full p-2 border rounded mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            width: '100%',
            padding: '0.5rem',
            border: '1px solid #d1d5db',
            borderRadius: '0.25rem',
            marginBottom: '1rem',
            fontSize: '1rem'
          }}
        />

        <input
          type="password"
          placeholder="Enter your password"
          className="w-full p-2 border rounded mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            width: '100%',
            padding: '0.5rem',
            border: '1px solid #d1d5db',
            borderRadius: '0.25rem',
            marginBottom: '1rem',
            fontSize: '1rem'
          }}
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          style={{
            width: '100%',
            backgroundColor: '#3b82f6',
            color: 'white',
            padding: '0.5rem',
            borderRadius: '0.25rem',
            border: 'none',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: '500'
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
