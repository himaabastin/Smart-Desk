import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./StudentManagement.css";
import axios from "axios";
import Swal from "sweetalert2";

function StudentManagement() {
  const [allStudents, setAllStudents] = useState([]);
  const allStudentDetails = async (e) => {
    try {
      let allstds = await axios.get("/admin/allStudentDetails");
      // console.log(allstds.data.allStudentDetails);
      setAllStudents(allstds.data.allStudentDetails);
    } catch (err) {
      Swal.fire({
        text: err.response.data.msg,
        confirmButtonColor: "#b8121b",
      });
    }
  };

  useEffect(() => {
    allStudentDetails();
  }, []);
const studentId=(id)=>{
console.log("stdId",id);
}
  return (
    <div style={{ marginLeft: "250px" }}>
      <div>
        <Link to="/studentRegister">
          <button className="add-std-btn"> Add a student</button>
        </Link>
      </div>

      <div className="students">
        {allStudents.map((student) => {
          return (
            <div className="student_card" key={student._id}>
              <img src={student.avatar} alt="" />
              <div className="student_box">
                <h2 title={student.name} style={{ color: "black" }}>
                  
                  {student.name}
                </h2>
                <span>Class: {student.grade}</span>
               
                <p>Email: {student.email}</p>
                <p>Mobile: {student.mobile}</p>
                <p>DOB: {student.dob}</p>
                <p>BloodGroup: {student.bloodgroup}</p>
                <p>Address: {student.address}</p>
                <p style={{visibility:"hidden"}}>{student._id}</p>
                <div className="row_btn">
                  <Link to='/adminEditStd/:id'> 
                  <button style={{ background: "#243f8a" }}>Edit</button>
                  
                  </Link>
                  <a href={`/adminEditStd/${student.stdAdNo}`} style={{color:"red"}}>EDITTT</a>
                  <button style={{ background: "#cf1928" }}>Block</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default StudentManagement;
