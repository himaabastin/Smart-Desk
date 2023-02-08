import React,{useState} from 'react'
import axios from 'axios';
import Swal from 'sweetalert2';
import './TeacherRegister.css'
function TeacherRegister() {
    const [teacher, setTeacher] = useState({ teacherId:"",name:"",email: "", password: "" });
    const onChangeInput = (e) => {
      const { name, value } = e.target;
      // console.log(e.target.name, e.target.value, "tezt");
      setTeacher({ ...teacher, [name]: value });
    };
    const registerSubmit = async (e) => {
      e.preventDefault();
      try {
        await axios.post("/admin/teacherRegister", { ...teacher });
        localStorage.setItem("teacherLogin", true);
        window.location.href = "/teacherManagement";
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
        <h2>Teacher Register</h2>
        <div className="inputBox">

        <input 
            type="text"
            name="teacherId"
            onChange={onChangeInput}
            placeholder="Teacher's Id"
           
          />
           <span>Teacher's Id</span>
          <i></i>
        <input 
            type="text"
            name="name"
            onChange={onChangeInput}
            placeholder="Teacher's name"
           
          />
           <span>Name</span>
          <i></i>
  
        <input 
            type="email"
            name="email"
            onChange={onChangeInput}
            placeholder="Teacher's email"
        
          />
           <span>Email</span>
          <i></i>
       
          <input 
            type="password"
            name="password"
            onChange={onChangeInput}
            placeholder="password"
         
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

export default TeacherRegister
