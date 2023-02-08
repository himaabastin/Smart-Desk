import React from 'react'
import { Link } from 'react-router-dom'
import "./Home.css"
function Home() {
  return (
    <div className='banner-area'>
      <div className='banner-text'>
    <h2>SMART DESK</h2>
    <p>Learn Together</p>
    <Link to="/studentLogin"><a>Student</a></Link>
    <Link to="/teacherLogin"><a>Teacher</a></Link>

      </div>
    </div>
  )
}

export default Home
