
import React,{useEffect,useState} from 'react'
import { Link } from 'react-router-dom'
import './TeacherManagement.css'
import axios from 'axios'
import Swal from 'sweetalert2'


function TeacherManagement() {
  const [allTeachers,setAllTeachers]=useState([])
  const allTeacherDetails=async(e)=>{
    try {
      let allTchrs=await axios.get("/admin/allTeacherDetails")
      setAllTeachers(allTchrs.data.allTeacherDetails)
    } catch (err) {
      Swal.fire({
        text: err.response.data.msg,
        confirmButtonColor: "#b8121b",
      });
    }
  }

  useEffect(()=>{
    allTeacherDetails()
  },[])
  return (
    <div style={{ marginLeft: "250px" }}>
    
         <div>
         
        <Link to="/teacherRegister">
          <button className="add-std-btn"> Add a Teacher</button>
        </Link>
      </div>

      <div className='students'>
        {allTeachers.map((teacher)=>{
          return(
            <div className='student_card' key={teacher._id}>
              <img src={teacher.avatar} alt=''/>
              <div className='student_box'>
              <h2 title={teacher.name} style={{color:"black"}}>{teacher.name}</h2>
              <span>Subject: {teacher.subject}</span>
              <p>Grade: {teacher.grade}</p>
              <p>Email: {teacher.email}</p>
                <p>Mobile: {teacher.mobile}</p>

                <div className="row_btn">
                  <button style={{ background: "#243f8a" }}>Edit</button>
                  <button style={{ background: "#cf1928" }}>Block</button>
                </div>
              </div>
            </div>
          )
        })}

      </div>
    </div>
  )
}

export default TeacherManagement
