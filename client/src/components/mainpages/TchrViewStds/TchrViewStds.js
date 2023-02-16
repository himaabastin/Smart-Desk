import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import NotFound from "../utilis/NotFound/NotFound";
import { GlobalState } from "../../../GlobalState";
import "./TchrViewStds.css";

const TchrViewStds = () => {
  const state = useContext(GlobalState);
  const [isTchrLogged, setIsTchrLogged] = state.teacherAPI.isTchrLogged;
  const [isTeacher, setIsTeacher] = state.teacherAPI.isTeacher;
  const [stdsDetails, setstdsDetails] = useState([]);
  const [tchrDetails, setTchrDetails] = useState([]);

  function LoggedRouter() {
    const GetStudents = async (e) => {
      try {
        const res = await axios.get("/teacher/refresh_token");
        setstdsDetails(res.data.students);
        setTchrDetails(res.data.teacherDetails);
      } catch (err) {
        console.log(err.response.data.msg, "error");

        // Swal.fire({
        //   text: err.response.data.msg,
        //   confirmButtonColor: "#b8121b",
        // });
      }
    };

    useEffect(() => {
      GetStudents();
    }, []);
    return (
      <div className="table-container">
        {/* <h3>Class Teacher:{tchrDetails.name}</h3> */}

        <h1 className="stdHeading">Class:{tchrDetails.grade}</h1>
        <table className="user-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Ad.No</th>

              <th>Name</th>
              <th>DOB</th>

              <th>Email</th>
              <th>Mobile</th>

              <th>BloodGroup</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {stdsDetails.map((student) => (
              <tr key={student._id}>
                <img
                  src={`http://localhost:3000/public/images/${student.avatar}`}
                  alt={student.name}
                />
                <td>{student.stdAdNo}</td>

                <td>{student.name}</td>

                <td>{student.dob}</td>
                <td>{student.email}</td>
                <td>{student.mobile}</td>

                <td>{student.bloodGroup}</td>
                <td>{student.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  return <>{isTeacher && isTchrLogged ? LoggedRouter() : NotFound()}</>;
};

export default TchrViewStds;
