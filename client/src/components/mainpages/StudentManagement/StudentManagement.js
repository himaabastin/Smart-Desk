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
      console.log(allstds.data.allStudentDetails);
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

  return (
    <div style={{ marginLeft: "250px" }}>
      <Link to="/studentRegister">
        <button className="add-std-btn"> Add a student</button>
      </Link>
      {/*studentdetails array map cheyanm enituu ath table akaanm !!!!!  */}
    </div>
  );
}

export default StudentManagement;
