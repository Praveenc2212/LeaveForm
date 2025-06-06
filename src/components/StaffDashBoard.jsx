import React from 'react'
import {FaCheck, FaTimesCircle} from 'react-icons/fa';
import './StaffDashBoard.css';
const StaffDashBoard = ({reason, taken, date, total}) => {
  return (
    <div className='leave-card'>
  <div className='leave-info'>
    <h3 className='leave-reason'>Reason: {reason}</h3>
    <p className='leave-taken'>Taken: {taken}</p>
    <p className='leave-date'>Date: {date}</p>
    <p className='leave-total'>Total: {total}</p>
  </div>

  <div className='leave-buttons'>
    <button>
      <FaCheck style={{ color: 'green' }} /> Accept
    </button>
    <button>
      <FaTimesCircle style={{ color: 'red' }} /> Reject
    </button>
  </div>
</div>


  )
}

export default StaffDashBoard