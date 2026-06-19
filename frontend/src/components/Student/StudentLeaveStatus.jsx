import React, { useEffect, useState } from "react";
import { useFormStore } from "../../store/useFormStore.jsx";
import { useNavigate } from "react-router-dom";
import {
	ArrowLeft,
	Calendar,
	Clock,
	User,
	MessageSquare,
	CheckCircle,
	XCircle,
	Hourglass,
	SquareArrowDown,
	DoorOpen,
	Loader2,
	Home,
	Building,
	Ticket
} from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore.jsx";
import BarcodePopup from "./BarcodePopup.jsx";
import OutpassRequestPopup from "./OutpassRequestPopup.jsx";

// Status Card Component
function LeaveStatusCard({
	leaveData,
	userData,
	onRequestOutpass,
	outpassStatus,
	isRequesting,
	onViewBarcode
}) {
	const navigate = useNavigate();

	const { reason, startDate, endDate, status, appliedAt, wardenApproved } = leaveData;
	const days = (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24) + 1;

	const isHosteller = userData?.studentType === "HOSTELLER";

	const formatDate = (dateString) => {
		return new Date(dateString).toLocaleDateString("en-GB");
	};

	const formatDateTime = (dateString) => {
		return new Date(dateString).toLocaleString("en-GB", {
			day: "2-digit",
			month: "2-digit",
			year: "numeric",
			hour: "2-digit",
			minute: "2-digit",
			hour12: true
		});
	};

	const getStatusInfo = (status) => {
		switch (status) {
			case "Pending":
				return { icon: <Hourglass />, color: "bg-yellow-100 text-yellow-800", text: "Pending" };
			case "Reviewed":
				return { icon: <CheckCircle />, color: "bg-blue-100 text-blue-800", text: "Reviewed" };
			case "Approved":
				return { icon: <CheckCircle />, color: "bg-green-100 text-green-800", text: "Approved" };
			case "Tutor Rejected":
				return { icon: <XCircle />, color: "bg-red-100 text-red-800", text: "Tutor Rejected" };
			case "HOD Rejected":
				return { icon: <XCircle />, color: "bg-red-100 text-red-800", text: "HOD Rejected" };
			default:
				return { icon: <Hourglass />, color: "bg-gray-100 text-gray-800", text: "Unknown" };
		}
	};

	const statusInfo = getStatusInfo(status);

	const getTimelineSteps = () => {
		const baseSteps = [
			{ name: "Applied", completed: true, rejected: false },
			{
				name: "Staff",
				completed: ["Reviewed", "Tutor Rejected", "HOD Rejected", "Approved"].includes(status),
				rejected: status === "Tutor Rejected"
			},
			{
				name: "HOD",
				completed: ["HOD Rejected", "Approved"].includes(status),
				rejected: status === "HOD Rejected"
			}
		];

		if (isHosteller && status === "Approved") {
			baseSteps.push({
				name: "Warden",
				completed: wardenApproved === true,
				rejected: false,
				pending: outpassStatus === "pending"
			});
		}

		return baseSteps;
	};

	const timelineSteps = getTimelineSteps();

	const renderActionButtons = () => {
		if (status !== "Approved") {
			return null;
		}

		return (
			<div className="space-y-3">
				<button
					onClick={onViewBarcode}
					className="w-full flex items-center justify-center gap-2 bg-indigo-500 text-white font-semibold py-2.5 px-4 rounded-lg hover:bg-indigo-600 hover:cursor-pointer transition-colors"
				>
					<Ticket className="w-5 h-5" />
					View Pass
				</button>

				{isHosteller && (
					<>
						{wardenApproved ? (
							<button
								onClick={() => navigate(`/student/outpass/${leaveData._id}`)}
								className="w-full flex items-center justify-center gap-2 bg-green-500 text-white font-semibold py-2.5 px-4 rounded-lg hover:bg-green-600 transition-colors"
							>
								<DoorOpen className="w-5 h-5" />
								View Outpass
							</button>
						) : outpassStatus === "pending" ? (
							<button
								onClick={() => navigate(`/student/outpass/${leaveData._id}`)}
								className="w-full flex items-center justify-center gap-2 bg-yellow-100 text-yellow-800 font-semibold py-2.5 px-4 rounded-lg hover:bg-yellow-200 transition-colors"
							>
								<Hourglass className="w-5 h-5" />
								View Outpass Status
							</button>
						) : (
							<>
								<div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
									<p className="text-sm text-blue-800">
										<span className="font-semibold">Note:  </span>
										Required warden approval for Outpass.
									</p>
								</div>
								<button
									onClick={onRequestOutpass}
									disabled={isRequesting}
									className="w-full flex items-center justify-center gap-2 bg-orange-500 text-white font-semibold py-2.5 px-4 rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:cursor-pointer"
								>
									{isRequesting ? (
										<>
											<Loader2 className="w-5 h-5 animate-spin" />
											Requesting...
										</>
									) : (
										<>
											<DoorOpen className="w-5 h-5" />
											Request Outpass
										</>
									)}
								</button>
							</>
						)}
					</>
				)}
			</div>
		);
	};

	return (
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
					<h2 className="text-xl font-bold text-gray-800">Leave Status</h2>
				</div>
				<div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${statusInfo.color}`}>
					{React.cloneElement(statusInfo.icon, { className: "w-5 h-5" })}
					<span>{statusInfo.text}</span>
				</div>
			</div>

			<div className="p-6">
				{/* Student Type Badge */}
				<div className="mb-4 flex justify-center">
					<div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${isHosteller
							? "bg-purple-100 text-purple-800 border border-purple-200"
							: "bg-teal-100 text-teal-800 border border-teal-200"
						}`}>
						{isHosteller ? (
							<>
								<Building className="w-4 h-4" />
								Hosteller
							</>
						) : (
							<>
								<Home className="w-4 h-4" />
								Day Scholar
							</>
						)}
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
											} ${step.rejected ? "bg-red-100 text-red-600 border-red-400" : ""}`}
									>
										{step.rejected ? (
											<XCircle className="w-6 h-6" />
										) : step.pending ? (
											<Hourglass className="w-5 h-5 animate-pulse" />
										) : (
											<CheckCircle className="w-6 h-6" />
										)}
									</div>
									<p className={`text-xs mt-2 font-semibold text-center max-w-16 ${step.completed ? "text-gray-700" : "text-gray-500"
										}`}>
										{step.name}
									</p>
								</div>
								{index < timelineSteps.length - 1 && (
									<div className={`flex-1 h-1 mx-2 ${timelineSteps[index + 1]?.completed || timelineSteps[index + 1]?.pending
											? "bg-indigo-500"
											: "bg-gray-300"
										}`} />
								)}
							</React.Fragment>
						))}
					</div>
				</div>

				{/* Leave Details */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-4 rounded-lg border">
					<div className="flex items-center gap-3">
						<User className="w-5 h-5 text-gray-500" />
						<div>
							<p className="text-sm text-gray-500">Student Name</p>
							<p className="font-semibold text-gray-800">
								{userData.name} <span className="font-normal text-gray-600">({userData.rollno})</span>
							</p>
						</div>
					</div>
					<div className="flex items-center gap-3">
						<SquareArrowDown className="w-5 h-5 text-gray-500" />
						<div>
							<p className="text-sm text-gray-500">Applied On</p>
							<p className="font-semibold text-gray-800 text-sm">{formatDateTime(appliedAt)}</p>
						</div>
					</div>
					<div className="flex items-center gap-3">
						<Calendar className="w-5 h-5 text-gray-500" />
						<div>
							<p className="text-sm text-gray-500">Leave Dates</p>
							<p className="font-semibold text-gray-800 text-sm">
								{formatDate(startDate)} to {formatDate(endDate)}
							</p>
						</div>
					</div>
					<div className="flex items-center gap-3 text-sm">
						<Clock className="w-5 h-5 text-gray-500" />
						<div>
							<p className="text-sm text-gray-500">Duration</p>
							<p className="font-semibold text-gray-800">
								{days} day{days > 1 ? "s" : ""}
							</p>
						</div>
					</div>
					<div className="flex items-start gap-3 md:col-span-2">
						<MessageSquare className="w-5 h-5 text-gray-500 mt-0.5" />
						<div>
							<p className="text-sm text-gray-500">Reason</p>
							<p className="font-semibold text-gray-800">{reason}</p>
						</div>
					</div>

					{isHosteller && status === "Approved" && (
						<div className="flex items-center gap-3 md:col-span-2 pt-0 border-t border-gray-200">
							<DoorOpen className="w-5 h-5 text-gray-500" />
							<div>
								<p className="text-sm text-gray-500">Outpass Status</p>
								<p className={`font-semibold ${wardenApproved
										? "text-green-600"
										: outpassStatus === "pending"
											? "text-yellow-600"
											: "text-orange-600"
									}`}>
									{wardenApproved
										? "✅ Approved by Warden"
										: outpassStatus === "pending"
											? "Pending Warden Approval"
											: "Outpass Pending"
									}
								</p>
							</div>
						</div>
					)}
				</div>
			</div>

			{/* Footer */}
			<div className="p-5 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
				{renderActionButtons()}
			</div>
		</div>
	);
}

// Main Component
function StudentLeaveStatus() {
	const { leaveStatus, getStudentLeaveStatus, requestOutpass, isRequestingOutpass } = useFormStore();
	const { userData } = useAuthStore();
	const navigate = useNavigate();

	const [outpassStatus, setOutpassStatus] = useState("none");
	const [showBarcodePopup, setShowBarcodePopup] = useState(false);
	const [showOutpassPopup, setShowOutpassPopup] = useState(false);

	useEffect(() => {
		getStudentLeaveStatus();
	}, [getStudentLeaveStatus]);

	useEffect(() => {
		if (leaveStatus?.wardenApproved) {
			setOutpassStatus("approved");
		} else if (leaveStatus?.outpassRequested) {
			setOutpassStatus("pending");
		} else {
			setOutpassStatus("none");
		}
	}, [leaveStatus]);

	// Handle Request Outpass button click - show popup
	const handleRequestOutpassClick = () => {
		setShowOutpassPopup(true);
	};

	// Handle outpass form submit
	const handleOutpassSubmit = async (formData) => {
		const success = await requestOutpass(leaveStatus._id, formData);
		if (success) {
			setShowOutpassPopup(false);
			// Navigate to outpass page
			navigate(`/student/outpass/${leaveStatus._id}`);
		}
	};

	// Handle view barcode
	const handleViewBarcode = () => {
		setShowBarcodePopup(true);
	};

	return (
		<div className="sm:mt-10 py-10 px-4 flex items-center justify-center">
			{leaveStatus ? (
				<>
					<LeaveStatusCard
						leaveData={leaveStatus}
						userData={userData}
						onRequestOutpass={handleRequestOutpassClick}
						outpassStatus={outpassStatus}
						isRequesting={isRequestingOutpass}
						onViewBarcode={handleViewBarcode}
					/>

					{/* Barcode Popup */}
					<BarcodePopup
						isOpen={showBarcodePopup}
						onClose={() => setShowBarcodePopup(false)}
						barcodeData={leaveStatus?.barCode}
						userData={userData}
						leaveData={leaveStatus}
					/>

					{/* Outpass Request Popup */}
					<OutpassRequestPopup
						isOpen={showOutpassPopup}
						onClose={() => setShowOutpassPopup(false)}
						onSubmit={handleOutpassSubmit}
						isLoading={isRequestingOutpass}
					/>
				</>
			) : (
				<div className="text-center p-10 bg-white rounded-lg shadow-md">
					<h3 className="text-xl font-semibold text-gray-700">No Recent Leave Data</h3>
					<p className="text-gray-500 mt-2">You haven't applied for any leaves recently.</p>
				</div>
			)}
		</div>
	);
}

export default StudentLeaveStatus;