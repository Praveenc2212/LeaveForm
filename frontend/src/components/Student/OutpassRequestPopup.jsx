import React, { useState } from "react";
import { X, Building, DoorOpen, MapPin, Phone, Users, Loader2 } from "lucide-react";

const HOSTEL_BLOCKS = [
	{ value: "A", label: "A Block" },
	{ value: "B", label: "B Block" },
	{ value: "C", label: "C Block" },
	{ value: "D", label: "D Block" },
	{ value: "E", label: "E Block" },
	{ value: "G", label: "G Block" },
	{ value: "H", label: "H Block" },
	{ value: "I", label: "I Block" },
	{ value: "J", label: "J Block" },
	{ value: "K", label: "K Block" },
];

function OutpassRequestPopup({ isOpen, onClose, onSubmit, isLoading }) {
	const [formData, setFormData] = useState({
		hostelBlock: "",
		roomNumber: "",
		place: "",
		studentMobile: "",
		parentMobile:  "",
	});

	const [errors, setErrors] = useState({});

	// Handle input change
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));

		// Clear error when user types
		if (errors[name]) {
			setErrors((prev) => ({ ...prev, [name]: "" }));
		}
	};

	// Validate form
	const validateForm = () => {
		const newErrors = {};

		if (! formData.hostelBlock) {
			newErrors.hostelBlock = "Please select your hostel block";
		}

		if (!formData.roomNumber.trim()) {
			newErrors.roomNumber = "Room number is required";
		}

		if (!formData.place.trim()) {
			newErrors.place = "Place to visit is required";
		}

		if (!formData.studentMobile.trim()) {
			newErrors.studentMobile = "Your mobile number is required";
		} else if (!/^[6-9]\d{9}$/.test(formData.studentMobile)) {
			newErrors.studentMobile = "Enter valid 10-digit mobile number";
		}

		if (!formData.parentMobile.trim()) {
			newErrors.parentMobile = "Parent mobile number is required";
		} else if (!/^[6-9]\d{9}$/.test(formData.parentMobile)) {
			newErrors.parentMobile = "Enter valid 10-digit mobile number";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	// Handle submit
	const handleSubmit = () => {
		if (validateForm()) {
			onSubmit(formData);
		}
	};

	// Check if form is valid for enabling button
	const isFormValid =
		formData.hostelBlock &&
		formData.roomNumber.trim() &&
		formData.place.trim() &&
		formData.studentMobile.trim() &&
		formData.parentMobile.trim();

	if (! isOpen) return null;

	return (
		<>
			{/* Backdrop */}
			<div
				className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
				onClick={onClose}
			/>

			{/* Modal */}
			<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
				<div
					className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto"
					onClick={(e) => e.stopPropagation()}
				>
					{/* Header */}
					<div className="bg-orange-500/70 text-white p-4 rounded-t-2xl flex items-center justify-between">
						<div className="flex items-center gap-2">
							<DoorOpen className="w-5 h-5" />
							<h3 className="font-bold text-lg">Request Outpass</h3>
						</div>
						<button
							onClick={onClose}
							className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors"
						>
							<X className="w-5 h-5" />
						</button>
					</div>

					{/* Form Content */}
					<div className="p-5 space-y-4">
						{/* Info Banner */}
						{/* <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
							<p className="text-sm text-blue-800">
								Please fill in your hostel details to request an outpass.
							</p>
						</div> */}

						{/* Hostel Block */}
						<div>
							<label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
								<Building className="w-4 h-4" />
								Hostel Block
							</label>
							<select
								name="hostelBlock"
								value={formData.hostelBlock}
								onChange={handleChange}
								className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all ${
									errors.hostelBlock ? "border-red-400 bg-red-50" : "border-gray-300"
								}`}
							>
								<option value="">Select Block</option>
								{HOSTEL_BLOCKS.map((block) => (
									<option key={block.value} value={block.value}>
										{block.label}
									</option>
								))}
							</select>
							{errors.hostelBlock && (
								<p className="text-red-500 text-xs mt-1">{errors.hostelBlock}</p>
							)}
						</div>

						{/* Room Number */}
						<div>
							<label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
								<DoorOpen className="w-4 h-4" />
								Room Number
							</label>
							<input
								type="text"
								name="roomNumber"
								value={formData.roomNumber}
								onChange={handleChange}
								placeholder="e.g., C-404, H-326"
								className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all ${
									errors.roomNumber ? "border-red-400 bg-red-50" : "border-gray-300"
								}`}
							/>
							{errors.roomNumber && (
								<p className="text-red-500 text-xs mt-1">{errors.roomNumber}</p>
							)}
						</div>

						{/* Place to Visit */}
						<div>
							<label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
								<MapPin className="w-4 h-4" />
								Place
							</label>
							<input
								type="text"
								name="place"
								value={formData.place}
								onChange={handleChange}
								placeholder="e.g., Hosur, Coimbatore"
								className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all ${
									errors.place ? "border-red-400 bg-red-50" : "border-gray-300"
								}`}
							/>
							{errors.place && (
								<p className="text-red-500 text-xs mt-1">{errors.place}</p>
							)}
						</div>

						{/* Student Mobile */}
						<div>
							<label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
								<Phone className="w-4 h-4" />
								Student Mobile Number
							</label>
							<input
								type="tel"
								name="studentMobile"
								value={formData.studentMobile}
								onChange={handleChange}
								placeholder="10-digit mobile number"
								maxLength={10}
								className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all ${
									errors.studentMobile ? "border-red-400 bg-red-50" :  "border-gray-300"
								}`}
							/>
							{errors.studentMobile && (
								<p className="text-red-500 text-xs mt-1">{errors.studentMobile}</p>
							)}
						</div>

						{/* Parent Mobile */}
						<div>
							<label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
								<Users className="w-4 h-4" />
								Parent Mobile Number
							</label>
							<input
								type="tel"
								name="parentMobile"
								value={formData.parentMobile}
								onChange={handleChange}
								placeholder="10-digit mobile number"
								maxLength={10}
								className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all ${
									errors.parentMobile ? "border-red-400 bg-red-50" : "border-gray-300"
								}`}
							/>
							{errors.parentMobile && (
								<p className="text-red-500 text-xs mt-1">{errors.parentMobile}</p>
							)}
						</div>
					</div>

					{/* Footer */}
					<div className="p-5 border-t border-gray-200 bg-gray-50 rounded-b-2xl flex gap-3">
						<button
							onClick={onClose}
							className="flex-1 py-2.5 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
						>
							Cancel
						</button>
						<button
							onClick={handleSubmit}
							disabled={!isFormValid || isLoading}
							className="flex-1 py-2.5 bg-orange-400 text-white font-semibold rounded-lg hover:bg-orange-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
						>
							{isLoading ?  (
								<>
									<Loader2 className="w-5 h-5 animate-spin" />
									Requesting...
								</>
							) : (
								<>
									<DoorOpen className="w-5 h-5" />
									Request
								</>
							)}
						</button>
					</div>
				</div>
			</div>
		</>
	);
}

export default OutpassRequestPopup;