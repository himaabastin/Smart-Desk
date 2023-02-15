import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

function Otp() {
  const [otp, setOtp] = useState('');

  const handleInputChange = (e) => {
    const { value } = e.target;
    setOtp(value);
  };

  const handleSubmit = async(e) => {
       e.preventDefault();
    try {
      await axios.post("/admin/verify-email", { ...otp });
      console.log("otp",otp);
      // await axios.post("/admin/verify-email",{...otp})
      // navigate("/studentManagement")///////////////////////////////////////////////////////////////
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
      <label>
        Enter OTP:
        <input
          type="text"
          value={otp}
          onChange={handleInputChange}
          pattern="[0-9]*"
          inputMode="numeric"
          maxLength={4}
          required
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

export default Otp;
