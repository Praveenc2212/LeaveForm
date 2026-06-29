import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Clock, CheckCircle2, User, UserCheck } from 'lucide-react';
import { toast } from 'react-hot-toast';

const TodaysHistoryTab = ({ filterDepartment }) => {
    const [history, setHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchHistory = async () => {
            setIsLoading(true);
            try {
                let url = `${import.meta.env.VITE_BACKEND_BASE_URL || "http://localhost:1242"}/api/security/todays-history`;
                if (filterDepartment) {
                    url += `?department=${encodeURIComponent(filterDepartment)}`;
                }

                const res = await axios.get(url, { withCredentials: true });
                if (res.data.success) {
                    // Combine and map students and staff
                    const students = res.data.students.map(s => ({
                        ...s,
                        type: 'Student',
                        name: s.applicantId?.name || 'Unknown',
                        identifier: s.applicantId?.rollNo || 'N/A',
                        department: s.classId?.department || 'N/A'
                    }));

                    const staff = res.data.staff.map(s => ({
                        ...s,
                        type: 'Staff',
                        name: s.staffId?.name || 'Unknown',
                        identifier: s.staffId?.designation || 'N/A',
                        department: s.staffId?.department || 'N/A'
                    }));

                    const combined = [...students, ...staff];
                    
                    // Sort descending by check-out time
                    combined.sort((a, b) => new Date(b.checkOutTime) - new Date(a.checkOutTime));
                    setHistory(combined);
                }
            } catch (error) {
                console.error("Failed to fetch today's history:", error);
                toast.error("Failed to fetch today's history.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchHistory();
        
        // Refresh every minute to keep statuses updated
        const interval = setInterval(fetchHistory, 60000);
        return () => clearInterval(interval);
    }, [filterDepartment]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64 bg-white rounded-2xl shadow-sm border border-slate-100">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    if (history.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-64 bg-white rounded-2xl shadow-sm border border-slate-100 text-slate-500">
                <Clock className="w-12 h-12 mb-3 text-slate-300" />
                <h3 className="text-lg font-bold text-slate-700">No History Today</h3>
                <p className="text-sm mt-1">No one has checked out of campus today.</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50 border-b border-slate-200">
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Applicant</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Department</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Check-Out</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Check-In</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Duration</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {history.map((record) => (
                            <tr key={record._id} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2 rounded-full ${record.type === 'Student' ? 'bg-blue-100 text-blue-600' : 'bg-purple-100 text-purple-600'}`}>
                                            {record.type === 'Student' ? <User className="w-4 h-4" /> : <UserCheck className="w-4 h-4" />}
                                        </div>
                                        <div>
                                            <div className="font-bold text-slate-800">{record.name}</div>
                                            <div className="text-xs text-slate-500">{record.type} &bull; {record.identifier}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="text-sm font-medium text-slate-600">{record.department}</span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {record.gateStatus === 'Completed' ? (
                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold bg-emerald-100 text-emerald-700">
                                            <CheckCircle2 className="w-3.5 h-3.5" />
                                            Returned
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold bg-amber-100 text-amber-700">
                                            <Clock className="w-3.5 h-3.5" />
                                            Outside
                                        </span>
                                    )}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 font-medium">
                                    {record.checkOutTime ? new Date(record.checkOutTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'N/A'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 font-medium">
                                    {record.checkInTime ? new Date(record.checkInTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '-'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-indigo-600">
                                    {record.actualDuration || '-'}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TodaysHistoryTab;
