import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFormStore } from "../../store/useFormStore.jsx";
import { useAuthStore } from "../../store/useAuthStore.jsx";
import {
    ArrowLeft,
    Calendar,
    Clock,
    User,
    MessageSquare,
    CheckCircle,
    Hourglass,
    Building,
    DoorOpen,
    MapPin,
    Phone,
    Users,
    GraduationCap,
    Ticket,
    Loader2
} from "lucide-react";
import BarcodePopup from "./BarcodePopup.jsx";

function StudentOutpass() {
    const navigate = useNavigate();
    const { formId } = useParams();
    const { outpassData, getOutpassData, isLoadingOutpass } = useFormStore();
    const { userData } = useAuthStore();
    const [showBarcodePopup, setShowBarcodePopup] = useState(false);

    useEffect(() => {
        if (formId) {
            getOutpassData(formId);
        }
    }, [formId, getOutpassData]);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };

    const formatDateTime = (dateString) => {
        return new Date(dateString).toLocaleString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        });
    };

    // Loading state
    if (isLoadingOutpass) {
        return (
            <div className="sm:mt-10 py-10 px-4 flex items-center justify-center">
                <div className="bg-white rounded-2xl shadow-lg p-10 flex flex-col items-center gap-4">
                    <Loader2 className="w-10 h-10 text-indigo-500 animate-spin" />
                    <p className="text-gray-600">Loading outpass details...</p>
                </div>
            </div>
        );
    }

    // No data state
    if (!outpassData) {
        return (
            <div className="sm:mt-10 py-10 px-4 flex items-center justify-center">
                <div className="bg-white rounded-2xl shadow-lg p-10 text-center">
                    <h3 className="text-xl font-semibold text-gray-700">Outpass Not Found</h3>
                    <p className="text-gray-500 mt-2">Unable to find outpass details. </p>
                    <button
                        onClick={() => navigate(-1)}
                        className="mt-4 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    const {
        reason,
        startDate,
        endDate,
        appliedAt,
        wardenApproved,
        outpassDetails,
        barCode,
    } = outpassData;

    const days = (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24) + 1;

    // Timeline steps
    const timelineSteps = [
        { name: "Applied", completed: true },
        { name: "Staff", completed: true },
        { name: "HOD", completed: true },
        {
            name: "Warden",
            completed: wardenApproved === true,
            pending: !wardenApproved,
        },
    ];

    return (
        <div className="sm:mt-10 py-10 px-4 flex items-center justify-center">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 w-full max-w-lg">
                {/* Header */}
                <div className="flex items-center justify-between p-5 border-b border-gray-200">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate(-1)}
                            className="w-10 h-10 flex items-center justify-center rounded-full text-gray-600 hover:bg-gray-100 transition-colors"
                        >
                            <ArrowLeft className="w-6 h-6" />
                        </button>
                        <h2 className="text-xl font-bold text-gray-800">Outpass Status</h2>
                    </div>
                    <div
                        className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${wardenApproved
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                    >
                        {wardenApproved ? (
                            <CheckCircle className="w-5 h-5" />
                        ) : (
                            <Hourglass className="w-5 h-5" />
                        )}
                        <span>{wardenApproved ? "Approved" : "Pending"}</span>
                    </div>
                </div>

                <div className="p-6">
                    {/* Hosteller Badge */}
                    <div className="mb-4 flex justify-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-purple-100 text-purple-800 border border-purple-200">
                            <Building className="w-4 h-4" />
                            Hosteller - {outpassDetails?.hostelBlock} Block, Room {outpassDetails?.roomNumber}
                        </div>
                    </div>

                    {/* Timeline */}
                    <div className="mb-6">
                        <div className="flex items-center">
                            {timelineSteps.map((step, index) => (
                                <React.Fragment key={index}>
                                    <div className="flex flex-col items-center">
                                        <div
                                            className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${step.pending
                                                    ? "border-yellow-400 bg-yellow-100 text-yellow-600"
                                                    : step.completed
                                                        ? "border-indigo-500 bg-indigo-100 text-indigo-500"
                                                        : "border-gray-300 bg-gray-100 text-gray-400"
                                                }`}
                                        >
                                            {step.pending ? (
                                                <Hourglass className="w-5 h-5 animate-pulse" />
                                            ) : (
                                                <CheckCircle className="w-6 h-6" />
                                            )}
                                        </div>
                                        <p
                                            className={`text-xs mt-2 font-semibold text-center ${step.completed ? "text-gray-700" : "text-gray-500"
                                                }`}
                                        >
                                            {step.name}
                                        </p>
                                    </div>
                                    {index < timelineSteps.length - 1 && (
                                        <div
                                            className={`flex-1 h-1 mx-2 ${timelineSteps[index + 1]?.completed ||
                                                    timelineSteps[index + 1]?.pending
                                                    ? "bg-indigo-500"
                                                    : "bg-gray-300"
                                                }`}
                                        />
                                    )}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>

                    {/* Student Details Section */}
                    <div className="bg-indigo-50 rounded-lg p-4 mb-4 border border-indigo-100">
                        <h4 className="text-sm font-semibold text-indigo-800 mb-3 flex items-center gap-2">
                            <User className="w-4 h-4" />
                            Student Details
                        </h4>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                            <div>
                                <p className="text-gray-500">Name</p>
                                <p className="font-semibold text-gray-800">{userData?.name}</p>
                            </div>
                            <div>
                                <p className="text-gray-500">Roll Number</p>
                                <p className="font-semibold text-gray-800">{userData?.rollno}</p>
                            </div>
                            <div className="col-span-2">
                                <p className="text-gray-500 flex items-center gap-1">
                                    <GraduationCap className="w-3 h-3" />
                                    Class
                                </p>
                                <p className="font-semibold text-gray-800">
                                    {userData?.year} Year - {userData?.department} - {userData?.section} Section
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Leave Details Section */}
                    <div className="bg-gray-50 rounded-lg p-4 mb-4 border border-gray-200">
                        <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            Leave Details
                        </h4>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                            <div>
                                <p className="text-gray-500">Start Date</p>
                                <p className="font-semibold text-gray-800">{formatDate(startDate)}</p>
                            </div>
                            <div>
                                <p className="text-gray-500">End Date</p>
                                <p className="font-semibold text-gray-800">{formatDate(endDate)}</p>
                            </div>
                            <div>
                                <p className="text-gray-500">Duration</p>
                                <p className="font-semibold text-gray-800">{days} day{days > 1 ? "s" : ""}</p>
                            </div>
                            <div>
                                <p className="text-gray-500">Applied On</p>
                                <p className="font-semibold text-gray-800 text-xs">{formatDateTime(appliedAt)}</p>
                            </div>
                            <div className="col-span-2">
                                <p className="text-gray-500 flex items-center gap-1">
                                    <MessageSquare className="w-3 h-3" />
                                    Reason
                                </p>
                                <p className="font-semibold text-gray-800">{reason}</p>
                            </div>
                        </div>
                    </div>

                    {/* Outpass Details Section */}
                    <div className="bg-orange-50 rounded-lg p-4 mb-4 border border-orange-200">
                        <h4 className="text-sm font-semibold text-orange-800 mb-3 flex items-center gap-2">
                            <DoorOpen className="w-4 h-4" />
                            Outpass Details
                        </h4>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                            <div>
                                <p className="text-gray-500 flex items-center gap-1">
                                    <Building className="w-3 h-3" />
                                    Hostel Block
                                </p>
                                <p className="font-semibold text-gray-800">{outpassDetails?.hostelBlock} Block</p>
                            </div>
                            <div>
                                <p className="text-gray-500 flex items-center gap-1">
                                    <DoorOpen className="w-3 h-3" />
                                    Room Number
                                </p>
                                <p className="font-semibold text-gray-800">{outpassDetails?.roomNumber}</p>
                            </div>
                            <div className="col-span-2">
                                <p className="text-gray-500 flex items-center gap-1">
                                    <MapPin className="w-3 h-3" />
                                    Place to Visit
                                </p>
                                <p className="font-semibold text-gray-800">{outpassDetails?.place}</p>
                            </div>
                            <div>
                                <p className="text-gray-500 flex items-center gap-1">
                                    <Phone className="w-3 h-3" />
                                    Student Mobile
                                </p>
                                <p className="font-semibold text-gray-800">{outpassDetails?.studentMobile}</p>
                            </div>
                            <div>
                                <p className="text-gray-500 flex items-center gap-1">
                                    <Users className="w-3 h-3" />
                                    Parent Mobile
                                </p>
                                <p className="font-semibold text-gray-800">{outpassDetails?.parentMobile}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer - Barcode Section */}
                <div className="p-5 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
                    {wardenApproved ? (
                        <button
                            onClick={() => setShowBarcodePopup(true)}
                            className="w-full flex items-center justify-center gap-2 bg-green-500 text-white font-semibold py-3 px-4 rounded-lg hover:bg-green-600 transition-colors hover:cursor-pointer"
                        >
                            <Ticket className="w-5 h-5" />
                            View Outpass Pass
                        </button>
                    ) : (
                        <div className="bg-yellow-100 border border-yellow-300 rounded-lg p-4 text-center">
                            <Hourglass className="w-8 h-8 text-yellow-600 mx-auto mb-2 animate-pulse" />
                            <p className="font-semibold text-yellow-800">Warden Approval Pending</p>
                            <p className="text-sm text-yellow-700 mt-1">
                                Please wait for warden to approve your outpass request.
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Barcode Popup */}
            <BarcodePopup
                isOpen={showBarcodePopup}
                onClose={() => setShowBarcodePopup(false)}
                barcodeData={barCode}
                userData={userData}
                leaveData={outpassData}
            />
        </div>
    );
}

export default StudentOutpass;