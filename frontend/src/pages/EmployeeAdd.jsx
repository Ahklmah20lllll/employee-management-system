import React, { useState } from "react";
import api from "../utils/api";

const EmployeeAdd = () => {
  const [form, setForm] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    contact: "",
    designation: "",
    department: "",
    address: "",
  });

  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFile = (e) => {
    setImage(e.target.files[0]);
  };

  const submitForm = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    Object.keys(form).forEach((key) => fd.append(key, form[key]));
    fd.append("image", image);

    await api.post("/employee/create", fd);

    alert("Employee created!");
  };

  return (
    <form onSubmit={submitForm}>
      <input name="fname" placeholder="First Name" onChange={handleChange} />
      <input name="lname" placeholder="Last Name" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="password" placeholder="Password" onChange={handleChange} />
      <input name="contact" placeholder="Contact" onChange={handleChange} />
      <input name="designation" placeholder="Designation" onChange={handleChange} />
      <input name="department" placeholder="Department" onChange={handleChange} />
      <textarea name="address" placeholder="Address" onChange={handleChange} />
      <input type="file" onChange={handleFile} />

      <button type="submit">Create</button>
    </form>
  );
};

export default EmployeeAdd;
