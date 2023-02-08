import React,{useState,useEffect,useContext}from 'react'
import axios  from 'axios'
import { GlobalState } from '../../../GlobalState'


const initialState={
    stdAdNo:"",
    name:"",
    email:"",
    mobile:"",
    dob:"",
    bloodGroup:"",
    grade:"",
    address:""
}

function  AdminEditStd() {
    const [student,setStudent]=useState(initialState)
  return (
    <div style={{marginLeft:"250px"}} className='edit_std'>
      <form>
        <div className='row'>
        <label htmlFor='name'>Name</label>
        <input type='text' name='name' id='name'/>
        </div>
        <div className='row'>
        <label htmlFor='email'>Email</label>
        <input type='text' name='email' id='email'/>
        </div>
        <div className='row'>
        <label htmlFor='mobile'>Mobile</label>
        <input type='text' name='mobile' id='mobile'/>
        </div>
        <div className='row'>
        <label htmlFor='dob'>Date of Birth</label>
        <input type='text' name='dob' id='dob'/>
        </div>
        <div className='row'>
        <label htmlFor='bloodGroup'>Blood Group</label>
        <input type='text' name='bloodGroup' id='bloodGroup'/>
        </div>
        <div className='row'>
        <label htmlFor='grade'>Class</label>
        <input type='text' name='grade' id='grade'/>
        </div>
        <div className='row'>
        <label htmlFor='address'>Address</label>
        <input type='text' name='address' id='address'/>
        </div>
      </form>
    </div>
  )
}

export default AdminEditStd
