import React from 'react'
import LeaveCard from './LeaveCard'

function LeaveRequests() {
  return (
    <div>LeaveRequests

      <LeaveCard  name="Paveen" days="5" startDate="12.21.2025" onAccept="false" onReject="yes" />
    </div>



  )
}

export default LeaveRequests