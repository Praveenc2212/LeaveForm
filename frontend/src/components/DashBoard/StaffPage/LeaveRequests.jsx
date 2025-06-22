import React from 'react'
import { useNavigate } from 'react-router-dom';
import LeaveCard from './LeaveCard'
import Header from '../Header'
function LeaveRequests() {
  const navigate = useNavigate();
  return (
    <div>
      <Header/>
      <div>
         <button
          onClick={() => navigate("/staff")}
          style={{
            marginTop: '1rem',
            padding: '0.5rem 1.2rem',
            backgroundColor: '#1976d2',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 'bold',
            cursor: 'pointer',
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
          }}
          >
            ⬅ Back
          </button>
      </div>
      <center>
      <h1>LeaveRequests</h1>
      </center>
      <LeaveCard  name="Paveen" days="5" startDate="12.21.2025" onAccept="false" onReject="yes" />
    </div>



  )
}

export default LeaveRequests