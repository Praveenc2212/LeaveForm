import { create } from "zustand";
import { toast } from "react-hot-toast";
import { axiosInstence } from "../utils/axiosInstance";

export const useStaffOutpassStore = create((set, get) => ({
  myOutpasses: [],
  hodPendingOutpasses: [],
  hodReviewedOutpasses: [],
  isFetching: false,
  isSubmitting: false,

  applyOutpass: async (formData) => {
    set({ isSubmitting: true });
    try {
      await axiosInstence.post("/api/form/staff/apply-outpass", formData);
      toast.success("Outpass requested successfully! Sent to HOD for approval.");
      await get().getMyOutpasses();
      return true;
    } catch (error) {
      const err = error.response?.data?.message || "Failed to submit outpass request.";
      console.error(err);
      toast.error(err);
      return false;
    } finally {
      set({ isSubmitting: false });
    }
  },

  getMyOutpasses: async () => {
    set({ isFetching: true });
    try {
      const res = await axiosInstence.get("/api/form/staff/my-outpasses");
      set({ myOutpasses: res.data.outpasses || [] });
    } catch (error) {
      console.error("Failed to fetch my outpasses:", error);
    } finally {
      set({ isFetching: false });
    }
  },

  deleteOutpass: async (id) => {
    try {
      await axiosInstence.delete(`/api/form/staff/delete-outpass/${id}`);
      toast.success("Outpass request removed");
      set((state) => ({
        myOutpasses: state.myOutpasses.filter((op) => op.id !== id),
      }));
    } catch (error) {
      const err = error.response?.data?.message || "Failed to delete outpass request.";
      console.error(err);
      toast.error(err);
    }
  },

  getHodOutpasses: async (status = "pending") => {
    set({ isFetching: true });
    try {
      const res = await axiosInstence.get(`/api/form/hod/staff-outpasses?status=${status}`);
      if (status === "pending") {
        set({ hodPendingOutpasses: res.data.outpasses || [] });
      } else {
        set({ hodReviewedOutpasses: res.data.outpasses || [] });
      }
    } catch (error) {
      console.error("Failed to fetch staff outpasses:", error);
    } finally {
      set({ isFetching: false });
    }
  },

  handleHodOutpassAction: async (id, action) => {
    try {
      await axiosInstence.post(`/api/form/hod/confirm-staff-outpass/${id}`, { action });
      const statusText = action === "approve" ? "authorized" : "declined";
      toast.success(`Staff outpass ${statusText} successfully!`);
      
      // Refresh both lists
      await get().getHodOutpasses("pending");
      await get().getHodOutpasses("reviewed");
    } catch (error) {
      const err = error.response?.data?.message || `Failed to ${action} outpass.`;
      console.error(err);
      toast.error(err);
    }
  },
}));
