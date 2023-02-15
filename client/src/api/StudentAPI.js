import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";

function StudentAPI(token) {
  const [isStdLogged, setIsStdLogged] = useState(false);
  const [isStudent, setIsStudent] = useState(false);

  useEffect(() => {
    if (token) {
      const getStudent = async () => {
        try {
          const res = await axios.get("/student/refresh_token")
          console.log("stdAPI",res.data.studentDetails.role);
          
          setIsStdLogged(true);
          res.data.studentDetails.role === "student" ? setIsStudent(true) : setIsStudent(false)
          
        } catch (err) {
          console.log("stdapi",err);
          // console.log(err.response.data.msg);
          // Swal.fire({
          //     text:err.response.data.msg,
          // })
        //   alert(err.response.data.msg);
        }
      };
      getStudent();
    }
  }, [token]);

  return {
    isStdLogged: [isStdLogged, setIsStdLogged],
    isStudent:[isStudent,setIsStudent]
  };
}

export default StudentAPI;
