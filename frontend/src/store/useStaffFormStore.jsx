import {axiosInstence} from "../utils/axiosInstance";
import { create } from "zustand";
import { toast } from "react-hot-toast";
 
export const useStaffFormStore = create((set) => ({
  leaveForms: [],
  pendingLeaves : [],
  acceptedLeaves :[],
  isFetching: false,
  getFacultypending: async () => {
    set({ isFetching: true });
    try {
      const apiRes = await axiosInstence.get('/api/form/staff/leave-pending-forms');
      set({ pendingLeaves: apiRes.data.leaveForms });  
    } catch (error) {
      let err = error.response ? error.response.data.message : "Server is Down, Please try again later";
      console.error(err);
      toast.error(err);
    } finally {
      set({ isFetching: false });
    }
  },
  setFacultyAccepteTheForm: async (formId) => {
    set({ isFetching: true });
    try {
      const apiRes = await axiosInstence.post(/api/form/staff/accept/${ formId });
      // set({ leaveForms: apiRes.data.leaveForms });
    } catch (error) {
      let err = error.response ? error.response.data.message : "Server is Down, Please try again later";
      console.error(err);
      toast.error("Server is Down, Please try again later");
    } finally {
      set({ isFetching: false });
    }
  },
  getFacultyAcceptedForms: async ()=>{
    set({ isFetching: true });
    try {
      const apiRes = await axiosInstence.get('/api/form/staff/leave-reviewed-forms');
      set({ acceptedLeaves : apiRes.data.leaveForms });
    } catch (error) {
      let err = error.response ? error.response.data.message : "Server is Down, Please try again later";
      console.error(err);
      toast.error(err);
    } finally {
      set({ isFetching: false });
    }
  },
  getFacultyOngoingForms: async () => {
    set({ isFetching: true });
    try {
      const apiRes = await axiosInstence.get('/api/form/staff/leave-ongoing-forms');
      set({ leaveForms: apiRes.data.leaveForms });
    } catch (error) {
      let err = error.response ? error.response.data.message : "Server is Down, Please try again later";
      console.error(err);
      toast.error(err);
    } finally {
      set({ isFetching: false });
    }
  },
}));
 

export default useStaffFormStore;