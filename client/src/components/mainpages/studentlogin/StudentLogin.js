import axios from "axios";
import React, { useState } from "react";
import Swal from "sweetalert2";

import "./StudentLogin.css";

function StudentLogin() {
  const [student, setStudent] = useState({ email: "", password: "" });
const onChangeInput=(e)=>{
  const {name,value}=e.target;
  setStudent({...student,[name]:value})
}

const loginSubmit=async(e)=>{
  e.preventDefault()
  try {
    await axios.post("/student/studentLogin",{...student})
    localStorage.setItem("studentLogin",true)
    window.location.href="/studentHome"
  } catch (err) {
    Swal.fire({
      text: err.response.data.msg,
      icon: "warning",
      confirmButtonColor:"#b8121b"
    });
  }
}
  return (
    <div className="main-container">
      <div className="Container" style={{ marginLeft: "220px" }}>
        <form onSubmit={loginSubmit}>
          <h2>Student Registration</h2>
          <div className="content">
            <div className="input-box">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                placeholder="Enter email"
                name="email"
                onChange={onChangeInput}
              />
            </div>

            <div className="input-box">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                placeholder="Enter password"
                name="password"
                onChange={onChangeInput}
              />
            </div>
          </div>
          <div className="button-container">
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default StudentLogin;