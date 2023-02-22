import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function Otp() {
  const navigate=useNavigate()
  const [verify, setVerify] = useState({otp:"",studentId:""});
  

  const handleInputChange = (e) => {
    const {name,value}=e.target;
    setVerify({...verify,[name]:value})
  };

  const handleSubmit = async(e) => {
       e.preventDefault();
    try {
      await axios.post("/admin/verify-email", { ...verify });
      console.log("otp",verify);
      // await axios.post("/admin/verify-email",{...otp})
      navigate("/studentManagement")
    } catch (err) {
      Swal.fire({
        text: err.response.data.msg,
        icon: "warning",
        confirmButtonColor:"#b8121b"
      });
    }

  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='otp'>
        Enter OTP:
        <input
          type="text"
          name='otp'
          onChange={handleInputChange}
          pattern="[0-9]*"
          inputMode="numeric"
          maxLength={4}
          required
        />
      </label>
      <label htmlFor='studentId'>
      StudentID
        <input
          type="text"
  name='studentId'
          onChange={handleInputChange}
        
    
          
          required
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

export default Otp;