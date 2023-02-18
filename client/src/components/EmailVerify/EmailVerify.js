import React,{useState,useEffect, Fragment} from 'react'
import "./EmailVerify.css"
import success_icon from '../../images/success-icon.png'
import { Link,useParams } from 'react-router-dom'
import axios from 'axios'

function EmailVerify() {
  const [validUrl,setValidUrl]=useState(false)
  const param=useParams()
  useEffect(()=>{
    const verifyEmailUrl=async()=>{
      try {
        // const url=`http://localhost:500/student/${param.id}/verify/${param.token}`
        const {data}=await axios.get(`student/${param.id}/verify/${param.token}`)
        console.log(data);
        setValidUrl(true)
      } catch (err) {
        console.log(err);
        setValidUrl(false)
      }
    }
    verifyEmailUrl()
  },[param])
  return (
<Fragment>
  {validUrl?(
    <div className='emailContainer'>
      <img src={success_icon} alt="success_img" className='success_img'/>
      <h1>Email verified successfully</h1> 
      <Link to="/studentLogin">
        <button className='green_btn'>Login</button>
      </Link>
    </div>
  ):(
    <h1>404 | NotFound</h1>
  )}
</Fragment>
  )
}

export default EmailVerify
