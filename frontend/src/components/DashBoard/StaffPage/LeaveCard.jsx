import React from 'react'

function LeaveCard({ name, days, startDate, endDate, onAccept, onReject }) {
  return (
    <>
      <div style={{
      border: '1px solid #ccc',
      borderRadius: '8px',
      padding: '30px',
      width: '500px',
      margin: '20px auto',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    }}>
      <h3>{name}</h3>
      <p><strong>No. of Days Leave:</strong> {days}</p>
      <p><strong>Start Date:</strong> {startDate}</p>
      <p><strong>End Date:</strong> {endDate}</p>
      <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
        <button onClick={onAccept} style={{ background: 'green', color: 'white', padding: '8px 16px', border: 'none', borderRadius: '4px' }}>
          Accept
        </button>
        <button onClick={onReject} style={{ background: 'red', color: 'white', padding: '8px 16px', border: 'none', borderRadius: '4px' }}>
          Reject
        </button>
      </div>
    </div>
    
    {/* <div>LeaveCard</div> */}
    </>
  )
}

export default LeaveCard