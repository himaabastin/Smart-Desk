import React, {createContext,useEffect,useState } from "react";
import axios from "axios";
import AdminAPI from "./api/AdminAPI";
import StudentAPI from "./api/StudentAPI";

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
   
    useEffect(()=>{
        const firstLogin=localStorage.getItem('firstLogin')
        const studentLogin=localStorage.getItem('studentLogin')
        if(firstLogin){
            refreshToken()

        }
         if(studentLogin){
            studentRefreshToken()

         }
    },[])
   

    const state={
        token:[token,setToken],
        adminAPI:AdminAPI(token),
        studentAPI:StudentAPI(token)
    }

    // console.log("sample state",state);
    return(
        
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    )
}