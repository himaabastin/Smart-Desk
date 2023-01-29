import React, { useState } from "react";
import "./adminLogin.css";
import axios from "axios";
// import Swal from 'sweetalert2'

const AdminLogin = () => {
  const [admin, setAdmin] = useState({ email: "", password: "" });
  const onChangeInput = (e) => {
    const { name, value } = e.target;
    // console.log(e.target.name, e.target.value, "tezt");
    setAdmin({ ...admin, [name]: value });
  };
  const loginSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/admin/adminLogin", { ...admin });
      localStorage.setItem("firstLogin", true);
      window.location.href = "/adminHome";
    } catch (err) {
      // console.log(err.response.data.msg, "error");
      alert(err.response.data.msg);
    }
  };

  return (
    <div className="login-page">
      <h2 className="heading">ADMIN LOGIN</h2>
      <form onSubmit={loginSubmit}>
        <input className="inputStyle"
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
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default AdminLogin;
