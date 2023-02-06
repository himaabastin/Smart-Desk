import React, {createContext,useEffect,useState } from "react";
import axios from "axios";
import AdminAPI from "./api/AdminAPI";
import StudentAPI from "./api/StudentAPI";
import TeacherAPI from "./api/TeacherAPI";
export const GlobalState = createContext()
export const DataProvider=({children})=>{
    const [token,setToken]=useState(false)

    const refreshToken=async ()=>{
        const res =await axios.get('/admin/refresh_token')
        
        setToken(res.data.accesstoken)
    }

    const studentRefreshToken=async ()=>{
        const res=await axios.get("/student/refresh_token")
        setToken(res.data.accesstoken)
    }

    const teacherRefreshToken=async ()=>{
        const res=await axios.get("/teacher/refresh_token")
        setToken(res.data.accesstoken)
    }
   
    useEffect(()=>{
        const firstLogin=localStorage.getItem('firstLogin')
        const studentLogin=localStorage.getItem('studentLogin')
        const teacherLogin=localStorage.getItem('teacherLogin')
        if(firstLogin){
            refreshToken()

        }
         if(studentLogin){
            studentRefreshToken()

         }

         if(teacherLogin){
            teacherRefreshToken()
         }
    },[])
   

    const state={
        token:[token,setToken],
        adminAPI:AdminAPI(token),
        studentAPI:StudentAPI(token),
        teacherAPI:TeacherAPI(token)
    }

    // console.log("sample state",state);
    return(
        
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    )
}