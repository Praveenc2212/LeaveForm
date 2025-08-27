import { create } from "zustand";
import { toast } from "react-hot-toast";
import { axiosInstence } from "../utils/axiosInstance";

export const useHodFormStore = create((set, get) => ({
    // --- STATE ---
    pendingLeaves: [],      // Stores leave requests awaiting HOD action (status: "Reviewed")
    approvedLeaves: [],     // Stores leave requests approved by the HOD (status: "Approved")
    isFetching: false,      // True when fetching data from the API
    processingId: null,     // The _id of the leave form being accepted or rejected
    processingAction: null, // The action being performed ('accept' or 'reject')
    isAcceptingAll: false,  // True when the "accept all" operation is in progress

    // --- ACTIONS ---

    /**
     * Fetches leave requests that have been reviewed by staff and are pending HOD approval.
     */
    getPendingLeaves: async () => {
        set({ isFetching: true });
        try {
            const apiRes = await axiosInstence.get('/api/form/hod/leave-pending-forms');
            // Ensure we always have an array, even if the API returns nothing
            set({ pendingLeaves: apiRes.data.leaveForms || [] });
        } catch (error) {
            const err = error.response?.data?.message || "Failed to fetch pending requests.";
            console.error("HOD Pending Fetch Error:", err);
            toast.error(err);
            set({ pendingLeaves: [] }); // Clear data on error
        } finally {
            set({ isFetching: false });
        }
    },

    /**
     * Fetches leave requests that have been fully approved by the HOD.
     */
    getApprovedLeaves: async () => {
        set({ isFetching: true });
        try {
            const apiRes = await axiosInstence.get('/api/form/hod/leave-approved-forms');
            set({ approvedLeaves: apiRes.data.leaveForms || [] });
        } catch (error) {
            const err = error.response?.data?.message || "Failed to fetch approved requests.";
            console.error("HOD Approved Fetch Error:", err);
            toast.error(err);
            set({ approvedLeaves: [] }); // Clear data on error
        } finally {
            set({ isFetching: false });
        }
    },

    /**
     * Handles the acceptance or rejection of a single leave request.
     * @param {string} formId - The ID of the leave form.
     * @param {'accept' | 'reject'} action - The action to perform.
     */
    handleLeaveAction: async (formId, action) => {
        set({ processingId: formId, processingAction: action });
        try {
            const endpoint = `/api/form/hod/${action}/${formId}`;
            await axiosInstence.post(endpoint);

            const successMessage = action === 'accept' ? 'Request Accepted' : 'Request Rejected';
            toast.success(`${successMessage} Successfully`);

            // Optimistically remove the processed leave from the pending list
            setTimeout(() => {
                set((state) => ({
                    pendingLeaves: state.pendingLeaves.filter((leave) => leave._id !== formId),
                    processingId: null,      // Clear processing state
                    processingAction: null,
                }));
            }, 300);

        } catch (error) {
            const err = error.response?.data?.message || `Failed to ${action} request.`;
            console.error(`HOD ${action} Error:`, err);
            toast.error(err);
            // Clear processing state on error
            set({ processingId: null, processingAction: null });
        }
    },

    /**
     * Accepts all currently pending leave requests in a single action.
     */
    acceptAllLeaves: async () => {
        const { pendingLeaves } = get();
        if (pendingLeaves.length === 0) {
            toast.error("No pending requests to accept.");
            return;
        }
        
        set({ isAcceptingAll: true });
        try {
            await axiosInstence.post('/api/form/hod/accept-all');
            toast.success("All pending requests have been accepted successfully.");

            // Optimistically clear the pending list
            setTimeout(() => {
                set({ pendingLeaves: [] });
            }, 300);

        } catch (error) {
            const err = error.response?.data?.message || "Failed to accept all requests.";
            console.error("HOD Accept All Error:", err);
            toast.error(err);
        } finally {
            set({ isAcceptingAll: false });
        }
    },
}));
