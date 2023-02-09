import React, { useState, useEffect } from "react";
import axios from "axios";

import Swal from "sweetalert2";
import {useNavigate,useParams} from 'react-router-dom'
import "./AdminEditTchr.css";

const initialState = {
  teacherId: "",
  name: "",
  email: "",
  mobile: "",
  grade: "",
  subject: "",
};

function AdminEditTchr() {
//   const state=useContext(GlobalState)
//   // console.log("globalstate",state);
// const [isLogged,setIsLogged]=state.adminAPI.isLogged
// const [isAdmin,setIsAdmin]=state.adminAPI.isAdmin
  const [teacher, setTeacher] = useState(initialState);
const navigate=useNavigate()
const params=useParams()

let someFunc=async()=>{
  if(params.id){
        let teachers= await axios.get("/admin/allTeacherDetails")
        teachers.data.allTeacherDetails.map(tchr =>{
          if(tchr.teacherId === params.id ){
          setTeacher(tchr)}
        })
      }else{
        setTeacher(initialState)
      }
}

useEffect(()=>{
 someFunc()
},[])

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setTeacher({ ...teacher, [name]: value });
  };
  const handleSubmit=async(e)=>{
    e.preventDefault()
    try {
      // if(!isAdmin && !isLogged) return Swal.fire({text:"You are not allowed to edit"})

      await axios.put(`/admin/adminTchrUpdate/${teacher.teacherId}`,{...teacher})
      navigate("/teacherManagement")
    } catch (err) {
      Swal.fire({
        text:err.response.data.msg
      })
    }
  }
  return (
    <div  className="edit_std">
      <h3 style={{color:"black"}}>EDIT TEACHER</h3>
      <form onSubmit={handleSubmit}>
     
        <div className="row">
          <label htmlFor="name">Name</label>
          <input type="text" name="name" id="name" onChange={handleChangeInput} />
        </div>
        <div className="row">
          <label htmlFor="email">Email</label>
          <input type="text" name="email" id="email" onChange={handleChangeInput} />
        </div>
        <div className="row">
          <label htmlFor="mobile">Mobile</label>
          <input type="text" name="mobile" id="mobile"  onChange={handleChangeInput}/>
        </div>
        <div className="row">
          <label htmlFor="grade">Grade</label>
          <input type="text" name="grade" id="grade" onChange={handleChangeInput}/>
        </div>
        <div className="row">
          <label htmlFor="subject">Subject</label>
          <input type="text" name="subject" id="subject" onChange={handleChangeInput}/>
        </div>
        <button type="submit">Edit</button>
      </form>
    </div>
  );
}

export default AdminEditTchr;
