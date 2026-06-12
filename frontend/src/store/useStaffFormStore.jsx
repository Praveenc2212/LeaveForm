import { axiosInstence } from "../utils/axiosInstance";
import { create } from "zustand";
import { toast } from "react-hot-toast";

export const useStaffFormStore = create((set, get) => ({
  pendingLeaves: [],
  acceptedLeaves: [], // These are "Reviewed" leaves, awaiting HOD
  finalApprovedLeaves: [], // New state for leaves approved by HOD
  isFetching: false,
  processingId: null,
  processingAction: null,
  isAcceptingAll: false,

  getFacultypending: async () => {
    set({ isFetching: true });
    try {
      const apiRes = await axiosInstence.get('/api/form/staff/leave-pending-forms');
      set({ pendingLeaves: apiRes.data.leaveForms || [] });
    } catch (error) {
      const err = error.response?.data?.message || "Failed to fetch pending requests.";
      console.error(err);
      toast.error(err);
    } finally {
      set({ isFetching: false });
    }
  },

  handleLeaveAction: async (formId, action) => {
    set({ processingId: formId, processingAction: action });
    try {
      const endpoint = action === 'accept' 
        ? `/api/form/staff/accept/${formId}` 
        : `/api/form/staff/reject/${formId}`;
      
      await axiosInstence.post(endpoint);
      
      toast.success(`Request ${action === 'accept' ? 'Reviewed' : 'Rejected'} Successfully`);

      setTimeout(() => {
        set((state) => ({
          pendingLeaves: state.pendingLeaves.filter((leave) => leave._id !== formId),
          processingId: null,
          processingAction: null,
        }));
      }, 300);

    } catch (error) {
      const err = error.response?.data?.message || `Failed to ${action} request.`;
      console.error(err);
      toast.error(err);
      set({ processingId: null, processingAction: null });
    }
  },

  acceptAllLeaves: async () => {
    const { pendingLeaves } = get();
    if (pendingLeaves.length === 0) {
        toast.error("No pending requests to accept.");
        return;
    }
    
    set({ isAcceptingAll: true });
    try {
        await axiosInstence.post('/api/form/staff/accept-all');
        toast.success("All pending requests have been marked as reviewed.");
        setTimeout(() => {
            set({ pendingLeaves: [] });
        }, 300);
    } catch (error) {
        const err = error.response?.data?.message || "Failed to review all requests.";
        console.error(err);
        toast.error(err);
    } finally {
        set({ isAcceptingAll: false });
    }
  },

  getFacultyAcceptedForms: async () => {
    set({ isFetching: true });
    try {
      const apiRes = await axiosInstence.get('/api/form/staff/leave-reviewed-forms');
      set({ acceptedLeaves: apiRes.data.leaveForms || [] });
    } catch (error) {
      const err = error.response?.data?.message || "Server is Down, Please try again later";
      console.error(err);
      toast.error(err);
    } finally {
      set({ isFetching: false });
    }
  },

  // --- NEW FUNCTION ---
  /**
   * Fetches leave forms that have been fully approved by the HOD.
   */
  getApprovedLeaves: async () => {
    set({ isFetching: true });
    try {
      // This endpoint is inferred from the API structure.
      const apiRes = await axiosInstence.get('/api/form/staff/leave-approved-forms');
      set({ finalApprovedLeaves: apiRes.data.leaveForms || [] });
    } catch (error) {
      const err = error.response?.data?.message || "Failed to fetch approved requests.";
      console.error("Fetch Approved Error:", err);
      toast.error(err);
      set({ finalApprovedLeaves: [] });
    } finally {
      set({ isFetching: false });
    }
  },
}));

export default useStaffFormStore;