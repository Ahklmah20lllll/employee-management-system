import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", form);
      alert("Registration successful!");
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 shadow-lg rounded">
      <h2 className="text-xl font-semibold mb-4">Register</h2>
      <form onSubmit={submitHandler} className="space-y-3">
        <input type="text" placeholder="Name" value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })} className="border p-2 w-full" />
        <input type="email" placeholder="Email" value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })} className="border p-2 w-full" />
        <input type="password" placeholder="Password" value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })} className="border p-2 w-full" />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 w-full rounded">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
