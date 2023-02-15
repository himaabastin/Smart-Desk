import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate ,} from "react-router-dom";
import "./StudentRegister.css";

const StudentRegister = () => {
  const [student, setStudent] = useState({
    stdAdNo:"",
    name: "",
    email: "",
    mobile: "",
    grade: "",
    password: "",
  });
  
const navigate=useNavigate()

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setStudent({ ...student, [name]: value });
  };

  const registerSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/admin/studentRegister", { ...student });
      // await axios.post("/admin/verify-email",{})
      navigate("/studentManagement")///////////////////////////////////////////////////////////////
    } catch (err) {
      Swal.fire({
        text: err.response.data.msg,
        icon: "warning",
        confirmButtonColor:"#b8121b"
      });
    }
  };
  return (
    <div className="main-container">
      <div className="Container" style={{ marginLeft: "220px" }}>
        <form onSubmit={registerSubmit}>
          <h2>Student Registration</h2>
          <div className="content">
          <div className="input-box">
              <label htmlFor="stdAdNo">Admission Number</label>
              <input
                type="text"
                placeholder="stdAdNo"
                name="stdAdNo"
                onChange={onChangeInput}
              />
            </div>
            <div className="input-box">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                placeholder="Enter full name"
                name="name"
                onChange={onChangeInput}
              />
            </div>

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
              <label htmlFor="mobile">Mobile</label>
              <input
                type="tel"
                placeholder="Enter mobile number"
                name="mobile"
                onChange={onChangeInput}
              />
            </div>

            <div className="input-box">
              <label htmlFor="grade">Grade</label>
              <input
                type="number"
                placeholder="Enter grade/class"
                name="grade"
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
            <button type="submit">Register</button>
            
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentRegister;
