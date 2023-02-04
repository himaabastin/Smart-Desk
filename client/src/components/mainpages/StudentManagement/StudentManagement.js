import React from 'react'
import {Link} from "react-router-dom";
import DataGrid from 'react-data-grid'
import './StudentManagement.css'

function StudentManagement() {
    const columns = [
        { key: 'id', name: 'ID' },
        { key: 'title', name: 'Title' }
      ];
      
      const rows = [
        { id: 0, title: 'Example' },
        { id: 1, title: 'Demo' }
      ];
      
  return (
    <div style={{marginLeft:"250px"}}>
        <Link to="/studentRegister">
        <button className='add-std-btn'> Add a student</button>
        
        </Link>
        <div style={{border:"black"}}>
        <DataGrid columns={columns}  rows={rows} />;

        </div>
    </div>
  )
}

export default StudentManagement
