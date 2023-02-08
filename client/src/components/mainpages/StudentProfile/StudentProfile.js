
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { GlobalState } from "../../../GlobalState";
import NotFound from "../../../components/mainpages/utilis/NotFound/NotFound";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import "./StudentProfile.css"

function StudentProfile() {
    const state = useContext(GlobalState);
    const [isStdLogged, setIsStdLogged] = state.studentAPI.isStdLogged;
    const [isStudent, setIsStudent] = state.studentAPI.isStudent;
    const [studentDetails, setstudentDetails] = useState({});

    function LoggedRouter() {
        const GetStudent = async (e) => {
          try {
            const res = await axios.get("/student/refresh_token");
            console.log(res.data.studentDetails);
            // console.log("set", setAdminDetails(res.data.adminDetails));
            setstudentDetails(res.data.studentDetails);
          } catch (err) {
            console.log(err.response.data.msg, "error");
    
            Swal.fire({
              text: err.response.data.msg,
              confirmButtonColor: "#b8121b",
            });
          }
        };
    
        useEffect(() => {
          GetStudent();
        }, []);
  return (
    <div class="student-biodata">
        <div class="student-picture">
      <img src={studentDetails.avatar} alt="Student"/>
    </div>
    <div class="student-info">
      <h2>Student Information</h2>
      <p>Name: {studentDetails.name}</p>
      <p>DOB:{studentDetails.dob}</p>
      <p>Class:{studentDetails.grade}</p>
      <p>Email:{studentDetails.email}</p>
      <p>Mobile:{studentDetails.mobile}</p>
      <p>BloodGroup:{studentDetails.bloodGroup}</p>
      <p>Address:{studentDetails.address}</p>

    </div>
    
  </div>
  
  )
}
return (
    <>
    
      {isStudent && isStdLogged ? LoggedRouter() : NotFound()}

    </>
  );
}

export default StudentProfile
