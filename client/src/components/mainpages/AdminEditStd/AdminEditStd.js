import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { GlobalState } from "../../../GlobalState";
import Swal from "sweetalert2";
import {useNavigate,useParams} from 'react-router-dom'
import "./AdminEditStd.css";

const initialState = {
  stdAdNo: "",
  name: "",
  email: "",
  mobile: "",
  dob: "",
  bloodGroup: "",
  grade: "",
  address: "",
  stdAdNo:"",
};

function AdminEditStd() {
//   const state=useContext(GlobalState)
//   // console.log("globalstate",state);
// const [isLogged,setIsLogged]=state.adminAPI.isLogged
// const [isAdmin,setIsAdmin]=state.adminAPI.isAdmin
  const [student, setStudent] = useState(initialState);
const navigate=useNavigate()
const params=useParams()

let someFunc=async()=>{
  if(params.id){
        let students= await axios.get("/admin/allStudentDetails")
        students.data.allStudentDetails.map(std =>{
          if(std.stdAdNo === params.id ){
          setStudent(std)}
        })
      }else{
        setStudent(initialState)
      }
}

useEffect(()=>{
 someFunc()
},[])

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setStudent({ ...student, [name]: value });
  };
  const handleSubmit=async(e)=>{
    e.preventDefault()
    try {
      // if(!isAdmin && !isLogged) return Swal.fire({text:"You are not allowed to edit"})

      await axios.put(`/admin/adminStdUpdate/${student.stdAdNo}`,{...student})
      navigate("/studentManagement")
    } catch (err) {
      Swal.fire({
        text:err.response.data.msg
      })
    }
  }
  return (
    <div style={{ marginLeft: "225px" }} className="edit_std">
      <h3 style={{color:"black"}}>EDIT STUDENT</h3>
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
          <label htmlFor="dob">Date of Birth</label>
          <input type="text" name="dob" id="dob" onChange={handleChangeInput}/>
        </div>
        <div className="row">
          <label htmlFor="bloodGroup">Blood Group</label>
          <input type="text" name="bloodGroup" id="bloodGroup" onChange={handleChangeInput}/>
        </div>
        <div className="row">
          <label htmlFor="grade">Class</label>
          <input type="text" name="grade" id="grade" onChange={handleChangeInput}/>
        </div>
        <div className="row">
          <label htmlFor="address">Address</label>
          <input type="text" name="address" id="address" onChange={handleChangeInput}/>
        </div>
        <button type="submit">Edit</button>
      </form>
    </div>
  );
}

export default AdminEditStd;
