import { use } from "react";
import LeaveCard from "../../DashBoard/Student/LeaveCard";
import Header from "../Header"
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from "react-router-dom";
function StudentDashBoard() {
  const navigate = useNavigate();
  return (//from-orange-100
    <div className="min-h-screen bg-gradient-to-br font-sans p-4">
        
      <div className="gap-6">
        <LeaveCard Reason={"Sick"} StartDate={"22/06/2025"} EndDate={"24/06/2025"} />
      </div>
    </div>
  );
}

export default StudentDashBoard;
