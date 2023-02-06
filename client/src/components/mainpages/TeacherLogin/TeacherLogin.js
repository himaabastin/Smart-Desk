import axios from 'axios'
import React,{useState} from 'react'
import Swal from 'sweetalert2'


import './TeacherLogin.css'
function TeacherLogin() {
  const [teacher,setTeacher]=useState({email:"",password:""})
  const onChangeInput=(e)=>{
    const{name,value}=e.target
    setTeacher({...teacher,[name]:value})
  }

  const loginSubmit=async(e)=>{
    e.preventDefault()
    try {
      await axios.post("/teacher/teacherLogin",{...teacher})
      localStorage.setItem("teacherLogin",true)
      window.location.href="/teacherHome"
    } catch (err) {
      console.log("tchrlogin",err);
      Swal.fire({
        text:err.response.data.msg,
        icon:"warning",
        confirmButtonColor:"#b8121b"
      })
    }
  }
  return (
    <div className="body">
 <div className="box">
      <form className="form" onSubmit={loginSubmit}>
      <h2>Teacher Login</h2>
      <div className="inputBox">
      <input 
          type="email"
          name="email"
          onChange={onChangeInput}
          placeholder=""
        />
         <span>Email</span>
        <i></i>
     
        <input 
          type="password"
          name="password"
          onChange={onChangeInput}
          placeholder=""
        />
         <span>Password</span>
        <i></i>
       </div>
        <div className="row">
          
          <button type="submit" className="button" >Login</button>
        </div>
      </form>
    </div>
    </div>
  )
}

export default TeacherLogin
