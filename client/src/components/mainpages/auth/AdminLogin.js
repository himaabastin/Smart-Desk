import React, { useState } from "react";
import "./adminLogin.css";
import axios from "axios";
import Swal from 'sweetalert2'

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
      // alert(err.response.data.msg);
      Swal.fire( {
        text:err.response.data.msg,   
        confirmButtonColor: '#b8121b'
    }); 
     
     
    }
  };
   
    

  return (
    <body className="body">
 <div className="box">
      <form className="form" onSubmit={loginSubmit}>
      <h2>Admin Login</h2>
      <div className="inputBox">
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
          
          <button type="submit" className="button" >Login</button>
        </div>
      </form>
    </div>
    </body>
   
  );
};

export default AdminLogin;
