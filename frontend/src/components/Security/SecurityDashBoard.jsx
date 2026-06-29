import React, { useState, useEffect, useRef } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { toast, Toaster } from "react-hot-toast";
import { ScanLine, Search, LogOut, CheckCircle2, XCircle } from "lucide-react";
import axios from "axios";
import { useAuthStore } from "../../store/useAuthStore";
import { useNavigate } from "react-router-dom";

function SecurityDashBoard() {
    const { logout } = useAuthStore();
    const navigate = useNavigate();
    const [scanResult, setScanResult] = useState(null);
    const [manualId, setManualId] = useState("");
    const [manualType, setManualType] = useState("student");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        let scanner = null;
        try {
            scanner = new Html5QrcodeScanner("reader", {
                qrbox: { width: 250, height: 250 },
                fps: 5,
            });

            scanner.render(onScanSuccess, onScanError);
        } catch (err) {
            console.error("Scanner init error:", err);
        }

        return () => {
            if (scanner) {
                try {
                    scanner.clear().catch((error) => console.error("Failed to clear scanner", error));
                } catch (e) {
                    console.error("Error during scanner cleanup", e);
                }
            }
        };
    }, []);

    const lastScannedText = useRef("");

    const onScanSuccess = async (decodedText) => {
        // Prevent rapid duplicate scans of the exact same QR code
        if (decodedText === lastScannedText.current) return;
        
        lastScannedText.current = decodedText;
        
        // Clear the debounce memory after 5 seconds so they can be scanned again if needed
        setTimeout(() => {
            lastScannedText.current = "";
        }, 5000);

        try {
            const data = JSON.parse(decodedText);
            if (data.id && data.type) {
                await processOutpass(data.id, data.type);
            } else {
                toast.error("Invalid QR Code format.");
            }
        } catch (e) {
            toast.error("Unrecognized QR Code.");
        }
    };

    const onScanError = (err) => {
        // Ignore errors, it just means no QR code is in frame yet
    };

    const handleManualSubmit = async (e) => {
        e.preventDefault();
        if (!manualId.trim()) {
            toast.error("Please enter a valid ID.");
            return;
        }
        await processOutpass(manualId, manualType);
    };

    const processOutpass = async (id, type) => {
        if (isLoading) return;
        setIsLoading(true);
        try {
            const res = await axios.post(
                `${import.meta.env.VITE_BACKEND_BASE_URL || "http://localhost:1242"}/api/security/scan`,
                { outpassId: id, type: type },
                { withCredentials: true }
            );

            if (res.data.success) {
                toast.success(res.data.message);
                setScanResult(res.data.data);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to process outpass.");
            setScanResult(null);
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogout = async () => {
        await logout();
        navigate("/login");
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col pt-16">
            <Toaster position="top-center" />
            
            <header className="bg-white shadow-sm border-b border-slate-200 px-6 py-4 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center">
                        <ScanLine className="w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-slate-800">Gate Security Portal</h1>
                        <p className="text-xs font-medium text-slate-500">Scan & Verify Outpasses</p>
                    </div>
                </div>
                <button 
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                </button>
            </header>

            <main className="flex-grow p-6 grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto w-full">
                {/* Scanner Section */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
                    <div className="p-5 border-b border-slate-100 bg-slate-50/50">
                        <h2 className="font-bold text-slate-800 flex items-center gap-2">
                            <ScanLine className="w-5 h-5 text-indigo-500" />
                            QR Scanner
                        </h2>
                    </div>
                    <div className="p-6 flex-grow flex flex-col items-center justify-center">
                        <div id="reader" className="w-full max-w-sm rounded-xl overflow-hidden border-2 border-indigo-100 shadow-inner"></div>
                        <p className="mt-4 text-sm text-slate-500 text-center font-medium">Position the QR code within the frame to scan.</p>
                    </div>

                    <div className="p-6 bg-slate-50 border-t border-slate-200">
                        <h3 className="text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
                            <Search className="w-4 h-4 text-slate-400" />
                            Manual Entry Fallback
                        </h3>
                        <form onSubmit={handleManualSubmit} className="flex gap-2">
                            <select 
                                value={manualType} 
                                onChange={(e) => setManualType(e.target.value)}
                                className="bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm font-medium focus:ring-2 focus:ring-indigo-500 outline-none"
                            >
                                <option value="student">Student</option>
                                <option value="staff">Staff</option>
                            </select>
                            <input 
                                type="text"
                                placeholder="Enter Pass ID (e.g. S-1A2B3C)..."
                                value={manualId}
                                onChange={(e) => setManualId(e.target.value)}
                                className="flex-grow bg-white border border-slate-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none placeholder-slate-400 font-mono uppercase"
                            />
                            <button 
                                type="submit" 
                                disabled={isLoading}
                                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors cursor-pointer disabled:opacity-70"
                            >
                                Verify
                            </button>
                        </form>
                    </div>
                </div>

                {/* Results Section */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col h-full">
                    <div className="p-5 border-b border-slate-100 bg-slate-50/50">
                        <h2 className="font-bold text-slate-800">Verification Result</h2>
                    </div>
                    
                    <div className="p-8 flex-grow flex items-center justify-center">
                        {!scanResult ? (
                            <div className="text-center text-slate-400">
                                <ScanLine className="w-16 h-16 mx-auto mb-4 opacity-20" />
                                <p className="font-medium text-slate-500">Waiting for scan...</p>
                            </div>
                        ) : (
                            <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl p-6 shadow-lg shadow-indigo-500/5 relative overflow-hidden">
                                {/* Decorator strip */}
                                <div className={`absolute top-0 left-0 w-full h-1.5 ${scanResult.gateStatus === "Checked-Out" ? "bg-amber-500" : "bg-emerald-500"}`} />
                                
                                <div className="flex items-center gap-4 border-b border-slate-100 pb-5 mb-5">
                                    <div className={`w-14 h-14 rounded-full flex items-center justify-center ${scanResult.gateStatus === "Checked-Out" ? "bg-amber-100 text-amber-600" : "bg-emerald-100 text-emerald-600"}`}>
                                        {scanResult.gateStatus === "Checked-Out" ? <LogOut className="w-7 h-7" /> : <CheckCircle2 className="w-7 h-7" />}
                                    </div>
                                    <div>
                                        <div className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">{scanResult.type} Outpass</div>
                                        <h3 className="text-xl font-extrabold text-slate-800">{scanResult.applicantName}</h3>
                                        <p className="text-sm font-medium text-slate-500">{scanResult.department} Dept | {scanResult.designation}</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex justify-between items-center p-3 rounded-lg bg-slate-50 border border-slate-100">
                                        <span className="text-xs font-bold text-slate-500 uppercase">Current Status</span>
                                        <span className={`text-xs font-extrabold px-2.5 py-1 rounded-md tracking-wide uppercase ${scanResult.gateStatus === "Checked-Out" ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"}`}>
                                            {scanResult.gateStatus}
                                        </span>
                                    </div>

                                    {scanResult.checkOutTime && (
                                        <div className="flex justify-between items-center text-sm border-b border-slate-100 pb-2">
                                            <span className="text-slate-500 font-medium">Check-Out Time</span>
                                            <span className="font-bold text-slate-800">{new Date(scanResult.checkOutTime).toLocaleString()}</span>
                                        </div>
                                    )}

                                    {scanResult.checkInTime && (
                                        <div className="flex justify-between items-center text-sm border-b border-slate-100 pb-2">
                                            <span className="text-slate-500 font-medium">Check-In Time</span>
                                            <span className="font-bold text-slate-800">{new Date(scanResult.checkInTime).toLocaleString()}</span>
                                        </div>
                                    )}

                                    {scanResult.actualDuration && (
                                        <div className="flex justify-between items-center text-sm pt-2">
                                            <span className="text-slate-500 font-medium">Total Duration Outside</span>
                                            <span className="font-extrabold text-indigo-600">{scanResult.actualDuration}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}

export default SecurityDashBoard;
