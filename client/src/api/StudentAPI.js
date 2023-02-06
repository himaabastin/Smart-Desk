import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";

function StudentAPI(token) {
  const [isLogged, setIsLogged] = useState(false);
  const [isStudent, setIsStudent] = useState(false);

  useEffect(() => {
    if (token) {
      const getStudent = async () => {
        try {
          const res = await axios.get("/student/refresh_token")
          console.log("API",res.data.studentDetails.role);
          
          setIsLogged(true);
          res.data.studentDetails.role === "student" ? setIsStudent(true) : setIsStudent(false)
          
        } catch (err) {
          Swal.fire({
              text:err.response.data.msg,
          })
        //   alert(err.response.data.msg);
        }
      };
      getStudent();
    }
  }, [token]);

  return {
    isLogged: [isLogged, setIsLogged],
    isStudent:[isStudent,setIsStudent]
  };
}

export default StudentAPI;
