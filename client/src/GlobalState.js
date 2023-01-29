import {createContext,useEffect } from "react";
import axios from "axios";

export const GlobalState = createContext()
let setToken
export const DataProvider=({children})=>{
    const refreshToken=async ()=>{
        const res =await axios.get('/admin/refresh_token')
        setToken=res.data.accesstoken
    }
    useEffect(()=>{
        const firstLogin=localStorage.getItem('firstLogin')
        if(firstLogin) refreshToken()
    },[])
    return(
        
        <GlobalState.Provider value={"Value in Global State"}>
            {children}
        </GlobalState.Provider>
    )
}