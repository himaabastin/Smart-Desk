import React, { useState } from "react";
import "./adminLogin.css";
import axios from "axios";

const AdminRegister = () => {
  const [admin, setAdmin] = useState({ email: "", password: "" });
  const onChangeInput = (e) => {
    const { name, value } = e.target;
    // console.log(e.target.name, e.target.value, "tezt");
    setAdmin({ ...admin, [name]: value });
  };
  const registerSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/admin/adminRegister", { ...admin });
      localStorage.setItem("firstLogin", true);
      window.location.href = "/adminHome";
    } catch (err) {
      // console.log(err.response.data.msg, "error");
      alert(err.response.data.msg);
    }
  };

  return (
    <div className="login-page">
      <h2 className="heading">ADMIN REGISTER</h2>
      <form onSubmit={registerSubmit}>
      <input
          type="text"
          name="name"
          required
          placeholder="Name"
          onChange={onChangeInput}
        />
        <input
          type="email"
          name="email"
          required
          placeholder="Email"
          onChange={onChangeInput}
        />

        <input
          type="password"
          name="password"
          required
          placeholder="Password"
          onChange={onChangeInput}
        />

        <div className="row">
          <button type="submit">REGISTER</button>
        </div>
      </form>
    </div>
  );
};

export default AdminRegister;
