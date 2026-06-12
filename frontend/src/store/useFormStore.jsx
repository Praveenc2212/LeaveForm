import { create } from 'zustand';
import { axiosInstence } from '../utils/axiosInstance';
import toast from 'react-hot-toast';

export const useFormStore = create((set) => ({
    leaveForms: [],
    leaveStatus: null,
    isApplying: false,
    isFetching: false,
    isRequestingOutpass: false,
    outpassData: null,
    isLoadingOutpass: false,

    ApplyForm: async (form) => {
        set({ isApplying: true });
        try {
            await axiosInstence.post('/api/form/student/apply-leave-form', form);
            toast.success("Leave applied successfully");

        } catch (error) {
            let err = error.response ? error.response.data.message : "Server is Down, Please try again later";
            console.error(err);
            toast.error(err);

        } finally {
            set({ isApplying: false });
        }
    },
    getStudentLeaveStatus: async () => {
        set({ isFetching: true });
        // let data = null;
        try {
            const apiRes = await axiosInstence.get('/api/form/student/leave-status');
            console.log("Status of the student", apiRes.data.LeaveForm.status);

            set({ leaveStatus: apiRes.data.LeaveForm });
        } catch (error) {
            let err = error.response ? error.response.data.message : "Server is Down, Please try again later";
            console.error(err);
            // toast.error(err);
        } finally {
            set({ isFetching: false });
        }
    },
    getStudentLeaveForms: async () => {
        set({ isFetching: true });
        try {
            const apiRes = await axiosInstence.get('/api/form/student/leave-forms');
            set({ leaveForms: apiRes.data.leaveForms });
            return apiRes.data.leaveForms;
        } catch (error) {
            let err = error.response ? error.response.data.message : "Server is Down, Please try again later";
            console.error(err);
            toast.error(err);
        } finally {
            set({ isFetching: false });
        }
    },
    getFacultyLeaveStatus: async () => {
        set({ isFetching: true });
        try {
            const apiRes = await axiosInstence.get('/api/form/faculty/leave-status');
            return apiRes.data;
        } catch (error) {
            let err = error.response ? error.response.data.message : "Server is Down, Please try again later";
            console.error(err);
            toast.error(err);
        } finally {
            set({ isFetching: false });
        }
    },
    requestOutpass: async (formId, outpassDetails) => {
        set({ isRequestingOutpass: true });
        try {
            const response = await axiosInstence.post(`/api/form/student/request-outpass/${formId}`, {
                outpassDetails: {
                    hostelBlock: outpassDetails.hostelBlock,
                    roomNumber: outpassDetails.roomNumber,
                    place: outpassDetails.place,
                    studentMobile: outpassDetails.studentMobile,
                    parentMobile: outpassDetails.parentMobile,
                }
            });

            if (response.data.success) {
                toast.success("Outpass request submitted successfully!");
                return true;
            } else {
                toast.error(response.data.message || "Failed to request outpass");
                return false;
            }
        } catch (error) {
            const errMsg = error.response?.data?.message || "Failed to request outpass.  Please try again.";
            console.error(errMsg);
            toast.error(errMsg);
            return false;
        } finally {
            set({ isRequestingOutpass: false });
        }
    },

    getOutpassData: async (formId) => {
        set({ isLoadingOutpass: true });
        try {
            const response = await axiosInstence.get(`/api/form/student/outpass/${formId}`);

            if (response.data.success) {
                set({ outpassData: response.data.data });
            } else {
                toast.error(response.data.message || "Failed to fetch outpass data");
                set({ outpassData: null });
            }
        } catch (error) {
            const errMsg = error.response?.data?.message || "Failed to fetch outpass data";
            console.error(errMsg);
            toast.error(errMsg);
            set({ outpassData: null });
        } finally {
            set({ isLoadingOutpass: false });
        }
    },
}));
