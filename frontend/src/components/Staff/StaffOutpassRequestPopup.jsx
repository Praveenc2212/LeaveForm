import React, { useState } from "react";
import { X, MapPin, Phone, Calendar, FileText, Loader2, DoorOpen, Clock } from "lucide-react";

function StaffOutpassRequestPopup({ isOpen, onClose, onSubmit, isLoading }) {
  const [formData, setFormData] = useState({
    place: "",
    startDate: "",
    endDate: "",
    mobile: "",
    reason: "",
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

    if (!formData.place.trim()) {
      newErrors.place = "Place to visit is required";
    }

    if (!formData.startDate) {
      newErrors.startDate = "Exit date and time is required";
    }

    if (!formData.endDate) {
      newErrors.endDate = "Return date and time is required";
    } else if (formData.startDate && new Date(formData.endDate) <= new Date(formData.startDate)) {
      newErrors.endDate = "Return time must be after exit time";
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^[6-9]\d{9}$/.test(formData.mobile)) {
      newErrors.mobile = "Enter a valid 10-digit mobile number";
    }

    if (!formData.reason.trim()) {
      newErrors.reason = "Reason for outpass is required";
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
    formData.place.trim() &&
    formData.startDate &&
    formData.endDate &&
    formData.mobile.trim() &&
    formData.reason.trim();

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 mt-0"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div 
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <div
          className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto font-sans"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-400 text-white p-5 rounded-t-2xl flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-2.5">
              <DoorOpen className="w-5 h-5" />
              <h3 className="font-bold text-lg tracking-wide">Request Staff Outpass</h3>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form Content */}
          <div className="p-6 space-y-4">
            
            {/* Destination/Place */}
            <div>
              <label className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                <MapPin className="w-4 h-4 text-orange-500" />
                Place to Visit
              </label>
              <input
                type="text"
                name="place"
                value={formData.place}
                onChange={handleChange}
                placeholder="e.g., City Center, Bank, Meeting"
                className={`w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all text-sm ${
                  errors.place ? "border-red-400 bg-red-50/30" : "border-gray-200"
                }`}
              />
              {errors.place && (
                <p className="text-red-500 text-xs mt-1 font-semibold">{errors.place}</p>
              )}
            </div>

            {/* Exit Date & Time */}
            <div>
              <label className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                <Calendar className="w-4 h-4 text-orange-500" />
                Exit Date & Time
              </label>
              <input
                type="datetime-local"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className={`w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all text-sm text-gray-700 ${
                  errors.startDate ? "border-red-400 bg-red-50/30" : "border-gray-200"
                }`}
              />
              {errors.startDate && (
                <p className="text-red-500 text-xs mt-1 font-semibold">{errors.startDate}</p>
              )}
            </div>

            {/* Return Date & Time */}
            <div>
              <label className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                <Clock className="w-4 h-4 text-orange-500" />
                Return Date & Time
              </label>
              <input
                type="datetime-local"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className={`w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all text-sm text-gray-700 ${
                  errors.endDate ? "border-red-400 bg-red-50/30" : "border-gray-200"
                }`}
              />
              {errors.endDate && (
                <p className="text-red-500 text-xs mt-1 font-semibold">{errors.endDate}</p>
              )}
            </div>

            {/* Mobile Number */}
            <div>
              <label className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                <Phone className="w-4 h-4 text-orange-500" />
                Contact Mobile Number
              </label>
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="10-digit mobile number"
                maxLength={10}
                className={`w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all text-sm ${
                  errors.mobile ? "border-red-400 bg-red-50/30" : "border-gray-200"
                }`}
              />
              {errors.mobile && (
                <p className="text-red-500 text-xs mt-1 font-semibold">{errors.mobile}</p>
              )}
            </div>

            {/* Reason */}
            <div>
              <label className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
              <FileText className="w-4 h-4 text-orange-500" />
                Reason for Leaving
              </label>
              <textarea
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                rows={3}
                placeholder="Please state your reason for requesting outpass..."
                className={`w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all text-sm resize-none ${
                  errors.reason ? "border-red-400 bg-red-50/30" : "border-gray-200"
                }`}
              />
              {errors.reason && (
                <p className="text-red-500 text-xs mt-1 font-semibold">{errors.reason}</p>
              )}
            </div>

          </div>

          {/* Footer Action Buttons */}
          <div className="p-6 border-t border-gray-100 bg-gray-50/50 rounded-b-2xl flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 active:scale-95 transition-all text-xs tracking-wider uppercase cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={!isFormValid || isLoading}
              className="flex-1 py-3 bg-gradient-to-r from-orange-500 to-orange-400 text-white font-bold rounded-xl hover:from-orange-600 hover:to-orange-500 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-xs tracking-wider uppercase cursor-pointer shadow-md shadow-orange-500/10"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <DoorOpen className="w-4 h-4" />
                  Submit Request
                </>
              )}
            </button>
          </div>

        </div>
      </div>
    </>
  );
}

export default StaffOutpassRequestPopup;
