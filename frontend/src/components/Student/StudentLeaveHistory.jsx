import React from "react";
import StudentLeaveCard from "./StudentLeaveCard";
const historyLeaves = [
  {
    Reason: "Sick",
    StartDate: "10/05/2025",
    EndDate: "12/05/2025"
  },
  {
    Reason: "Family Function",
    StartDate: "15/04/2025",
    EndDate: "16/04/2025"
  },
  {
    Reason: "Medical",
    StartDate: "20/03/2025",
    EndDate: "22/03/2025"
  },
  {
    Reason: "Medical",
    StartDate: "20/03/2025",
    EndDate: "22/03/2025"
  },
  {
    Reason: "Medical",
    StartDate: "20/03/2025",
    EndDate: "22/03/2025"
  }
];
function StudentLeaveHistory() {
  return (
    <div className="bg-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg shadow-black/30 p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Leave History</h1>

        <div
          className="h-96 overflow-y-auto pr-2"
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: '#B2C8D2FF transparent'
          }}
        >
          {historyLeaves.map((leave, idx) => (
            <StudentLeaveCard
              key={idx}
              Reason={leave.Reason}
              StartDate={leave.StartDate}
              EndDate={leave.EndDate}
            />
          ))}

          <style>
            {`
            div::-webkit-scrollbar {
              width: 6px;
            }
            div::-webkit-scrollbar-thumb {
              background-color: rgba(100, 100, 100, 0.2);
              border-radius: 4px;
            }
            div::-webkit-scrollbar-track {
              background: transparent;
            }
          `}
          </style>
        </div>
      </div>
    </div>
  );

}

export default StudentLeaveHistory;
/*
{
    "success": true,
    "message": "Leave forms fetched successfully.",
    "leaveForms": [
        {
            "_id": "6873d2b61e97e2553fab4139",
            "startDate": "2025-07-17T00:00:00.000Z",
            "endDate": "2025-07-21T00:00:00.000Z",
            "reason": "Native Function",
            "status": "Pending" // for this just say Accepted or Rejected enough 
        }
    ]
}

display No.. of days Leave 
use below logic...

*/


/*

const startDate = new Date(form.startDate); // example: 2025-07-19T00:00:00.000Z

const day = startDate.getDate(); // 19
const month = startDate.getMonth() + 1; // 7 (July, +1 because months are 0-indexed)
const year = startDate.getFullYear(); // 2025
or
const monthName = startDate.toLocaleString('default', { month: 'long' }); // "July"

const formatted = `${day}/${month}/${year}`; // "19/7/2025"

const formattedWithMonthName = `${day} ${monthName} ${year}`; // "19 July 2025"

number of days:
const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
console.log(days);

*/