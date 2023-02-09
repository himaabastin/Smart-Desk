
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { GlobalState } from "../../../GlobalState";
import NotFound from "../../../components/mainpages/utilis/NotFound/NotFound";
import Swal from "sweetalert2";

import "./TeacherProfile.css"

function TeacherProfile() {
    const state = useContext(GlobalState);
    const [isTchrLogged, setIsTchrLogged] = state.teacherAPI.isTchrLogged;
    const [isTeacher, setIsTeacher] = state.teacherAPI.isTeacher;
    const [teacherDetails, setteacherDetails] = useState({});

    function LoggedRouter() {
        const GetTeacher = async (e) => {
          try {
            const res = await axios.get("/teacher/refresh_token");
            console.log(res.data.teacherDetails);
            // console.log("set", setAdminDetails(res.data.adminDetails));
            setteacherDetails(res.data.teacherDetails);
          } catch (err) {
            console.log(err.response.data.msg, "error");
    
            // Swal.fire({
            //   text: err.response.data.msg,
            //   confirmButtonColor: "#b8121b",
            // });
          }
        };
    
        useEffect(() => {
          GetTeacher();
        }, []);
  return (
    <div class="teacher-biodata">
        <div class="teacher-picture">
      <img src={teacherDetails.avatar} alt="teacher"/>
    </div>
    <div class="teacher-info">
      <h2>Teacher Information</h2>
      <p>Name: {teacherDetails.name}</p>
      <p>Incharge:{teacherDetails.grade}</p>
      <p>Subject:{teacherDetails.subject}</p>
      <p>Email:{teacherDetails.email}</p>
      <p>Mobile:{teacherDetails.mobile}</p>
     

    </div>
    
  </div>
  
  )
}
return (
    <>
    
      {isTeacher && isTchrLogged ? LoggedRouter() : NotFound()}

    </>
  );
}

export default TeacherProfile
