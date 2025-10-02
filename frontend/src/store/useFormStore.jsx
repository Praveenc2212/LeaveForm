import { create } from 'zustand';
import { axiosInstence } from '../utils/axiosInstance';
import toast from 'react-hot-toast';

export const useFormStore = create((set) => ({
    leaveForms: [],
    leaveStatus : null,
    isApplying: false,
    isFetching: false,
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
            
             set({ leaveStatus :  apiRes.data.LeaveForm });
        } catch (error) {
            let err = error.response ? error.response.data.message : "Server is Down, Please try again later";
            console.error(err);
            // toast.error(err);
        } finally {
            set({ isFetching: false });
        }
        // return data;
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
}));
