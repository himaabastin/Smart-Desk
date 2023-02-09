import { useState,useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";

function TeacherAPI(token){
    const [isTchrLogged,setIsTchrLogged]=useState(false)
    const [isTeacher,setIsTeacher]=useState(false)
    useEffect(()=>{
        if(token){
         const getTeacher=async ()=>{
            try {
                const res=await axios.get("/teacher/refresh_token")
                console.log("teacherAPI",res.data.teacherDetails.role);
    
                setIsTchrLogged(true);
                res.data.teacherDetails.role === "teacher" ?setIsTeacher(true) :setIsTeacher(false)
            } catch (err) {
                console.log("tchrapi",err);
                console.log(err.response.data.msg);
                // Swal.fire({
                //     text:err.response.data.msg,
                // })
            }
         }
         getTeacher()
        }
    },[token])   

    return{
      isTchrLogged:[isTchrLogged,setIsTchrLogged] ,
      isTeacher:[isTeacher,setIsTeacher] 
    }
}

export default TeacherAPI

