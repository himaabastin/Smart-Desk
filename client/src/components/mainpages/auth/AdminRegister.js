import React, { useState } from "react";
import "./adminLogin.css";
import axios from "axios";
import Swal from "sweetalert2";
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
      Swal.fire( {
        text:err.response.data.msg,   
        confirmButtonColor: '#b8121b'
    });
    }
  };

  return (
    <div className="login-page">
      <h2 className="heading">ADMIN REGISTER</h2>
      <form onSubmit={registerSubmit}>
      <label className="Label">Name</label>
        <br/>
      <input
          type="text"
          name="name"
          
          placeholder=""
          onChange={onChangeInput}
        />
         <label className="Label">Email</label>
        <br/>
        <input
          type="email"
          name="email"
          
          placeholder=""
          onChange={onChangeInput}
        />
    <label className="Label">Password</label>
        <br/>
        <input
          type="password"
          name="password"
          
          placeholder=""
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
