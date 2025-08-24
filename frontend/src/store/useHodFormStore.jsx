import {axiosInstence} from "../utils/axiosInstance";
import { create } from "zustand";
import { toast } from "react-hot-toast";
 
export const useHodFormStore = create((set) => ({
  leaveForms: [],
  pendingLeaves : [],
  approvedLeaveForms :null,
  acceptedLeaves :[],
  isFetching: false,
  getHodpending: async () => {
    set({ isFetching: true });
    try {
      const apiRes = await axiosInstence.get('/api/form/hod/leave-pending-forms');
      set({ pendingLeaves: apiRes.data.leaveForms });
      console.log("Pending Leaves p:", apiRes.data.leaveForms);
      
      // toast.success("Pending Leave Requests Fetched Successfully");
      set({isFetching : false});
    } catch (error) {
      let err = error.response ? error.response.data.message : "Server is Down, Please try again later";
      console.error(err);
      toast.error(err);
    } finally {
      set({ isFetching: false });
    }
  },

  setHodAccepteTheForm: async (formId) => { // working fine
    set({ isFetching: true });
    try {
      const apiRes = await axiosInstence.post(`/api/form/hod/accept/${formId}`);
      // set({ leaveForms: apiRes.data.leaveForms });
    } catch (error) {
      let err = error.response ? error.response.data.message : "Server is Down, Please try again later";
      console.error(err);
      toast.error("Server is Down, Please try again later");
    } finally {
      set({ isFetching: false });
    }
  },
  // getHodAcceptedForms: async ()=>{
  //   set({ isFetching: true });
  //   try {
  //     const apiRes = await axiosInstence.get('/api/form/staff/leave-reviewed-forms');
  //     set({ acceptedLeaves : apiRes.data.leaveForms });
  //   } catch (error) {
  //     let err = error.response ? error.response.data.message : "Server is Down, Please try again later";
  //     console.error(err);
  //     toast.error(err);
  //   } finally {
  //     set({ isFetching: false });
  //   }
  // },
  setHodRejectTheForm : async (formId) => {
    set({ isFetching: true });
    try {
      const apiRes = await axiosInstence.post(`/api/form/hod/reject/${formId}`);
      // set({ leaveForms: apiRes.data.leaveForms });
    } catch (error) {
      let err = error.response ? error.response.data.message : "Server is Down, Please try again later";
      console.error(err);
      toast.error("Server is Down, Please try again later");
    } finally {
      set({ isFetching: false });
    }
  },
  getHodOngoingForms: async () => {
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
  getApprovedLeaveForms : async ()=>{
    set({isFetching : true });
    try{
        const apiRes = await axiosInstence.get('/api/form/hod/leave-approved-forms');
        // approvedLeaves = apiRes.data;
        console.log("Approved Leaves p:", apiRes.data.leaveForms);
        set({ approvedLeaveForms : apiRes.data.leaveForms });
        // toast.success("Approved Leave Forms Fetched Successfully");
        // set({ approvedLeaveForms : apiRes.data  });
    }
    catch(error){
      console.error( error );    
      toast.error(error);
    }
    finally{
      set({isFetching : false });
    }
  }
}));
 

export default useHodFormStore;