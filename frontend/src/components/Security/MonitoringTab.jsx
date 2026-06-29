import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Loader2, DoorOpen, Users, User, ShieldCheck } from "lucide-react";

function MonitoringTab({ filterType = "all", filterDepartment = null }) {
    const [students, setStudents] = useState([]);
    const [staff, setStaff] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchActivePasses();
    }, []);

    const fetchActivePasses = async () => {
        setIsLoading(true);
        try {
            const res = await axios.get(
                `${import.meta.env.VITE_BACKEND_BASE_URL || "http://localhost:1242"}/api/security/active-passes`,
                { withCredentials: true }
            );
            if (res.data.success) {
                setStudents(res.data.students || []);
                setStaff(res.data.staff || []);
            }
        } catch (error) {
            console.error("Error fetching active passes:", error);
            toast.error("Failed to load monitoring data");
        } finally {
            setIsLoading(false);
        }
    };

    // Filter logic
    const filteredStudents = students.filter(s => {
        if (filterType === "staff") return false;
        if (filterDepartment && s.classId?.department !== filterDepartment) return false;
        return true;
    });

    const filteredStaff = staff.filter(s => {
        if (filterType === "student") return false;
        if (filterDepartment && s.staffId?.department !== filterDepartment) return false;
        return true;
    });

    if (isLoading) {
        return (
            <div className="flex items-center justify-center p-12">
                <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
            </div>
        );
    }

    const totalActive = filteredStudents.length + filteredStaff.length;

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-5 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
                        <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-slate-800">Campus Monitoring</h2>
                        <p className="text-xs font-medium text-slate-500">Individuals currently checked-out</p>
                    </div>
                </div>
                <div className="bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-lg text-sm font-bold flex items-center gap-2 border border-indigo-100">
                    <DoorOpen className="w-4 h-4" />
                    {totalActive} Active Passes
                </div>
            </div>

            <div className="p-0 overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs text-slate-500 uppercase bg-slate-50/80 border-b border-slate-200">
                        <tr>
                            <th className="px-6 py-4 font-bold">Name & ID</th>
                            <th className="px-6 py-4 font-bold">Type</th>
                            <th className="px-6 py-4 font-bold">Department</th>
                            <th className="px-6 py-4 font-bold">Check-Out Time</th>
                            <th className="px-6 py-4 font-bold">Duration Elapsed</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {totalActive === 0 ? (
                            <tr>
                                <td colSpan="5" className="px-6 py-12 text-center text-slate-500">
                                    No one is currently outside the campus.
                                </td>
                            </tr>
                        ) : (
                            <>
                                {filteredStudents.map((s) => (
                                    <tr key={s._id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="font-bold text-slate-800">{s.applicantId?.name}</div>
                                            <div className="text-xs text-slate-500">{s.applicantId?.rollNo}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold bg-teal-50 text-teal-700 border border-teal-100">
                                                <Users className="w-3.5 h-3.5" /> Student
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 font-medium text-slate-600">{s.classId?.department}</td>
                                        <td className="px-6 py-4 text-slate-600 font-medium">
                                            {s.checkOutTime ? new Date(s.checkOutTime).toLocaleString() : "N/A"}
                                        </td>
                                        <td className="px-6 py-4">
                                            {s.checkOutTime ? (
                                                <span className="font-mono text-xs font-bold text-indigo-600">
                                                    {Math.round((new Date() - new Date(s.checkOutTime)) / (1000 * 60))} mins
                                                </span>
                                            ) : "-"}
                                        </td>
                                    </tr>
                                ))}
                                {filteredStaff.map((s) => (
                                    <tr key={s._id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="font-bold text-slate-800">{s.staffId?.name}</div>
                                            <div className="text-xs text-slate-500">{s.staffId?.designation}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold bg-purple-50 text-purple-700 border border-purple-100">
                                                <User className="w-3.5 h-3.5" /> Staff
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 font-medium text-slate-600">{s.staffId?.department}</td>
                                        <td className="px-6 py-4 text-slate-600 font-medium">
                                            {s.checkOutTime ? new Date(s.checkOutTime).toLocaleString() : "N/A"}
                                        </td>
                                        <td className="px-6 py-4">
                                            {s.checkOutTime ? (
                                                <span className="font-mono text-xs font-bold text-indigo-600">
                                                    {Math.round((new Date() - new Date(s.checkOutTime)) / (1000 * 60))} mins
                                                </span>
                                            ) : "-"}
                                        </td>
                                    </tr>
                                ))}
                            </>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default MonitoringTab;
