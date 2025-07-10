import LeaveCard from "../../DashBoard/Student/LeaveCard";
import Header from "../Header"

function StudentDashBoard() {
  return (//from-orange-100
    <div className="min-h-screen bg-gradient-to-br bg-white  font-sans p-4">
      {/* Header with Logo and Profile */}
      {/* <Header/> */}
      {/* Dashboard Content */}
      <div className="gap-6 ">
        <LeaveCard Reason={"Sick"} StartDate={"22/06/2025"} EndDate={"24/06/2025"} />
        {/* Add more LeaveCard or other components here */}
      </div>
    </div>
  );
}

export default StudentDashBoard;
