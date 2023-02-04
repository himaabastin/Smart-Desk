import React from 'react'
import './StudentRegister.css'
const StudentRegister = () => {
  return (
    <div className='main-container'>

   
   <div className='Container' style={{marginLeft:"220px"}}>
    <form action="">
        <h2>Student Registration</h2>
        <div className='content'>
            <div className='input-box'>
                <label htmlFor='name'>Full Name</label>
                <input type="text" placeholder='Enter full name' name='name' required/>
            </div>

            <div className='input-box'>
                <label htmlFor='email'>Email</label>
                <input type="email" placeholder='Enter email' name='email' required/>
            </div>

            <div className='input-box'>
                <label htmlFor='mobile'>Mobile</label>
                <input type="tel" placeholder='Enter mobile number' name='mobile' required/>
            </div>

            <div className='input-box'>
                <label htmlFor='grade'>Grade</label>
                <input type="number" placeholder='Enter grade/class' name='grade' required/>
            </div>

            <div className='input-box'>
                <label htmlFor='password'>Password</label>
                <input type="password" placeholder='Enter password' name='password' required/>
            </div>

        </div>
        <div className='button-container'>
          <button>Register</button>
        </div>
    </form>

   </div>
   </div>
  )
}

export default StudentRegister
