import React from "react";
import { X, Shield, Clock, User } from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";

function BarcodePopup({ isOpen, onClose, barcodeData, userData, leaveData }) {
	if (!isOpen) return null;

	const formatDate = (dateString) => {
		return new Date(dateString).toLocaleDateString("en-GB", {
			day: "2-digit",
			month: "short",
			year: "numeric"
		});
	};

	return (
		<>
			{/* Backdrop with blur */}
			<div
				className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
				onClick={onClose}
			/>

			{/* Popup Modal */}
			<div 
				onClick={onClose}
				className="fixed inset-0 z-50 flex items-center justify-center p-4"
			>
				<div
					className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden"
					onClick={(e) => e.stopPropagation()}
				>
					{/* Header */}
					<div className="bg-indigo-600 text-white p-4 flex items-center justify-between">
						<div className="flex items-center gap-2">
							<Shield className="w-5 h-5" />
							<h3 className="font-bold text-lg">Leave Pass</h3>
						</div>
						<button
							onClick={onClose}
							className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors"
						>
							<X className="w-5 h-5" />
						</button>
					</div>

					{/* Content */}
					<div className="p-6">
						{/* Student Info */}
						<div className="text-center mb-4">
							<div className="flex items-center justify-center gap-2 text-gray-600 mb-1">
								<User className="w-4 h-4" />
								<span className="font-semibold text-gray-800">{userData?.name}</span>
							</div>
							<p className="text-sm text-gray-500">{userData?.rollno}</p>
						</div>

						{/* Valid Dates */}
						<div className="flex items-center justify-center gap-2 text-sm text-gray-600 mb-6">
							<Clock className="w-4 h-4" />
							<span>
								Valid:  {formatDate(leaveData?.startDate)} - {formatDate(leaveData?.endDate)}
							</span>
						</div>

						{/* Verification Badge & QR Code */}
						<div className="flex flex-col items-center justify-center bg-emerald-50 py-4 px-6 rounded-xl border border-emerald-100 mb-4 shadow-inner">
							<div className="p-2 bg-white rounded-xl shadow-sm border border-slate-200 mb-2">
								<QRCodeCanvas 
									value={JSON.stringify({ id: leaveData?.shortId || leaveData?._id, type: 'student' })} 
									size={100} 
									level="H" 
									includeMargin={true}
								/>
							</div>
							<div className="flex items-center gap-1.5 mt-2">
								<Shield className="w-4 h-4 text-emerald-500 animate-bounce" style={{ animationDuration: "3s" }} />
								<span className="text-xs font-bold text-emerald-700 uppercase tracking-wide">SECURE PASS ACTIVE</span>
							</div>
						</div>

						{/* Pass ID */}
						<div className="bg-gray-50 p-3 rounded-lg border text-center font-mono">
							<p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Pass ID</p>
							<p className="text-sm font-bold text-gray-800 tracking-widest uppercase">{leaveData?.shortId || barcodeData}</p>
						</div>

						{/* Instructions */}
						<div className="mt-6 bg-gray-50 rounded-lg p-3 border">
							<p className="text-xs text-gray-600 text-center">
								Show this QR code to <span className="font-semibold">Security</span> at the gate. 
								<br />
								Keep your <span className="font-semibold">ID Card</span> ready for verification.
							</p>
						</div>
					</div>

					{/* Footer */}
					<div className="bg-gray-50 px-6 py-4 border-t">
						<button
							onClick={onClose}
							className="w-full py-2.5 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
						>
							Close
						</button>
					</div>
				</div>
			</div>
		</>
	);
}

export default BarcodePopup;