import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstence } from "../utils/axiosInstance";

const isValidNetwork = import.meta.env.VITE_NETWORK_IP

export const useAuthStore = create((set) => ({
     userData: null,
     isLoggingIn: false,
     isCheckingAuth: false,
     checkAuth: async () => {
          set({ isCheckingAuth: true });
          try {
               const apiRes = await axiosInstence.get('/auth/checkAuthenticated');
               set({ userData: apiRes.data.userData });
               // toast.success(`Welcome Back, ${apiRes.data.userData.name}`);
          } catch (error) {
               if (!error.response) {
                    toast.error((isValidNetwork ? "Network Error," : "Server is Down,") + " Please try again later");
                    set({ userData: null });
                   return;
               }
               let err = error.response.data;
               console.error(err);
               set({ userData: null });
          } finally {
               set({ isCheckingAuth: false });
          }
     },
     Login: async (data) => {
          set({ isLoggingIn: true });
          try {
               const apiRes = await axiosInstence.post("/auth/login", data);
               set({ userData: apiRes.data.userData });
               toast.success(`Welcome Back, ${apiRes.data.userData.name}`);
          } catch (error) {
               let err = error.response ? error.response.data.message : "Server is Down, Please try again later";
               console.error(err);
               toast.error(err);
               set({ userData: null });
          } finally {    
               set({ isLoggingIn: false });
          }
     },
     Logout: async () => {
          set({ isCheckingAuth: true, userData: null });
          try {
               await axiosInstence.post("/auth/logout");
               toast.success("Logout Successful...");
          } catch (error) {
               let err = error.response ? error.response.data.message : "Server is Down, Please try again later";
               console.error(err);
               toast.error(err);
          } finally {
               set({ isCheckingAuth: false });
          }
     },

}));