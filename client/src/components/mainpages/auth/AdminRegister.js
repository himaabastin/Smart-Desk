import React, { useState } from "react";
import "./adminLogin.css";
import axios from "axios";
import Swal from "sweetalert2";
const AdminRegister = () => {
  const [admin, setAdmin] = useState({ name:"",email: "", password: "" });
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
    <body className="body">
 <div className="box">
      <form className="form" onSubmit={registerSubmit}>
      <h2>Admin Register</h2>
      <div className="inputBox">
      <input 
          type="text"
          name="name"
         
          placeholder=""
          onChange={onChangeInput}
        />
         <span>Name</span>
        <i></i>

      <input 
          type="email"
          name="email"
         
          placeholder=""
          onChange={onChangeInput}
        />
         <span>Email</span>
        <i></i>
     
        <input 
          type="password"
          name="password"
         
          placeholder=""
          onChange={onChangeInput}
        />
         <span>Password</span>
        <i></i>
       </div>
        <div className="row">
          
          <button type="submit" className="button" >Register</button>
        </div>
      </form>
    </div>
    </body>
  );
};

export default AdminRegister;
