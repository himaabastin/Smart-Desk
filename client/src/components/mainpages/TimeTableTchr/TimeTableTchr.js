import React, { useEffect, useState } from "react";
import "./TimeTableTchr.css";
import axios from "axios";
const TimeTableTchr = () => {
  const [timeTable, setTimeTable] = useState([]);
  const fetchTimeTable = async () => {
    const teacher = await axios.get("teacher/refresh_token");
    const tTable = teacher.data.timeTable;
    console.log(tTable);
    setTimeTable(tTable);
  };

  useEffect(() => {
    fetchTimeTable();
  }, []);
  const sortedTable = timeTable.sort((a, b) => {
    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    return daysOfWeek.indexOf(a.day) - daysOfWeek.indexOf(b.day);
  });
  return (
    <div className="timetable-container">
<button className="update-button">Update</button>
      <table>
        <thead>
          <tr>
            <th>Day</th>
            <th> 1</th>
            <th> 2</th>
            <th>3</th>
            <th> 4</th>
            <th> 5</th>
            <th>6</th>
          </tr>
        </thead>
        <tbody>
          {/* {timeTable.map((day)=>)} */}
          {sortedTable.map((day) => (
            <tr key={day._id}>
              <td>{day.day}</td>
              <td>{day.subjects[0]}</td>
              <td>{day.subjects[1]}</td>
              <td>{day.subjects[2]}</td>
              <td>{day.subjects[3]}</td>
              <td>{day.subjects[4]}</td>
              <td>{day.subjects[5]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TimeTableTchr;
