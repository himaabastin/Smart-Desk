import React,{useEffect, useState} from 'react'
import "./TimeTableTchr.css"
import axios from 'axios'

function TimeTableTchr() {
  // Define the days of the week and time 
  const [timeTable,setTimeTable]=useState([])
  const [day,setDay]=useState([])
  const  fetchTimeTable=async(e)=>{
    try {
      let table=await axios.get("/teacher/refresh_token")
      let fetchdays=await axios.get("/teacher/getDay")
     setDay(fetchdays.data);
      console.log("hi",table.data.timeTable);
      setTimeTable(table.data.timeTable)
    } catch (err) {
      
    }
  }
  useEffect(()=>{
    fetchTimeTable()
  },[])
  
  const days = [day]
  const times = [
    '9:00 AM - 10:00 AM',
    '10:00 AM - 11:00 AM',
    '11:00 AM - 12:00 PM',
    '12:00 PM - 1:00 PM',
    '1:00 PM - 2:00 PM',
    '2:00 PM - 3:00 PM',
    '3:00 PM - 4:00 PM',
  ];

  // Create a state variable to hold the table data
  const [tableData, setTableData] = useState(() => {
    // Initialize an empty 2D array with the days as rows and times as columns
    const initialTableData = Array.from(Array(days.length), () =>
      Array.from(Array(times.length), () => '')
    );
    // Add the days of the week and time slots to the table data
    for (let i = 0; i < days.length; i++) {
      initialTableData[i].unshift(days[i]);
    }
    initialTableData.unshift(['', ...times]);
    return initialTableData;
  });

  // Handle changes to the table data
  // const handleTableChange = (event, row, col) => {
  //   const newData = [...tableData];
  //   if (col > 0) {
  //     newData[row][col] = event.target.value;
  //   }
  //   setTableData(newData);
  // };

  // Render the table
  return (
    <div className="timetable">
      <table>
        <thead>
          {tableData[0].map((cell, colIndex) => (
            <th key={colIndex}>{cell}</th>
          ))}
        </thead>
        <tbody>
          {tableData.slice(1).map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, colIndex) => (
                <td key={`${rowIndex}-${colIndex}`}>
                   {colIndex === 0 ? days[rowIndex] :"subjects"
          }
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TimeTableTchr
