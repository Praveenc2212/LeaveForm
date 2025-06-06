import React from 'react'
import './StudentHistory.css'
const StudentHistory = ({ reason, date }) => {
  return (
    <div className="leave-card">
      <h3 className="leave-reason">Reason:{reason}</h3>
      <p className="leave-date">Date: {date}</p>
    </div>
  )
}

export default StudentHistory
