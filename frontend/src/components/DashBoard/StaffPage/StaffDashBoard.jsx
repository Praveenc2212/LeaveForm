import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from "../../../assets/logo.png"; // Update path as needed
import profilePic from "../../../assets/Profile.png"; // Update path as needed
import Header from './Header'
const leaveRequests = [
  { id: 1, studentName: 'John Doe', days: 3, startDate: '2025-06-20', endDate: '2025-06-22' },
  { id: 2, studentName: 'Jane Smith', days: 2, startDate: '2025-06-25', endDate: '2025-06-26' },
];

function Staffpage() {
  const navigate = useNavigate();
  return (
    <>
    <div className='p-10  bg-green-500'>
        <Header />
    </div>
    {/* ... */}
    <div style={{ padding: '2rem', minHeight: '100vh', background: 'linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)' }}>
      <h2 style={{ color: '#1976d2', marginBottom: '2rem', fontWeight: 700, letterSpacing: 1 }}>Leave Requests</h2>
      <div
        style={{
          border: 'none',
          borderRadius: '18px',
          padding: '2.5rem',
          width: '420px',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
          background: 'linear-gradient(135deg, #ffffff 60%, #e3f0ff 100%)',
          cursor: 'pointer',
          transition: 'transform 0.2s, box-shadow 0.2s',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
        }}
        onClick={() => navigate('/leaverequests')}
        onMouseOver={e => {
          e.currentTarget.style.transform = 'scale(1.03)';
          e.currentTarget.style.boxShadow = '0 12px 40px 0 rgba(31, 38, 135, 0.22)';
        }}
        onMouseOut={e => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 8px 32px 0 rgba(31, 38, 135, 0.15)';
        }}
        >
        <div style={{
          background: 'linear-gradient(135deg, #1976d2 60%, #64b5f6 100%)',
          borderRadius: '50%',
          width: '70px',
          height: '70px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '1.5rem',
          boxShadow: '0 4px 16px rgba(25, 118, 210, 0.15)'
        }}>
          <span role="img" aria-label="bell" style={{ fontSize: '2.5rem', color: '#fff' }}>🔔</span>
        </div>
        <h3 style={{ margin: 0, fontWeight: 600, color: '#1976d2', fontSize: '1.5rem' }}>Pending Leave Requests</h3>
        <p style={{
          fontSize: '3rem',
          fontWeight: 'bold',
          color: '#1976d2',
          margin: '1rem 0 0.5rem 0',
          letterSpacing: 2,
        }}>
          {leaveRequests.length}
        </p>
        <p style={{ color: '#555', fontSize: '1.1rem', marginBottom: 0 }}>Click to view all requests</p>
        <span style={{
          position: 'absolute',
          top: 18,
          right: 24,
          background: '#ff5252',
          color: '#fff',
          borderRadius: '50%',
          padding: '0.4rem 0.7rem',
          fontWeight: 700,
          fontSize: '1rem',
          boxShadow: '0 2px 8px rgba(255, 82, 82, 0.15)'
        }}>
          {leaveRequests.length}
        </span>
      </div>
    </div>
          </>
  );
}

export default Staffpage;