import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
     userData: null,
     isLogingIn: false,
     leaveForms: [],
     isAuthenticated: false,
     isCheckingAuth: false,
     redirect_path: "/login",
     setRedirectPath: (path) => set({ redirect_path: path }),
     checkAuth: async () => {
          set({ isCheckingAuth: true });
          try {
               const apiRes = await axios.get(
                    "http://localhost:1247/auth/checkAuthenticated",
                    { withCredentials: true }
               );
               set({
                    userData: apiRes.data.userData,
                    leaveForms: apiRes.data.leaveForms,
                    isAuthenticated: true,
               });
               toast.success(`Welcome Back, ${apiRes.data.userData.name}`);
          } catch (error) {
               let err = error.response
                    ? error.response.data
                    : "Error: Server is Down";
               console.log(err);
               set({ userData: null, isAuthenticated: false });
          } finally {
               set({ isCheckingAuth: false });
          }
     },
     Login: async (data) => {
          set({ isLoging: true });
          try {
               const url = "http://localhost:1247/auth";
               if (data.email.startsWith("7178", 0)) {
                    const apiRes = await axios.post(
                         url + "/student/login",
                         data,
                         { withCredentials: true }
                    );
                    console.log("LeaveForm response:", apiRes.data.leaveData);
                    toast.success(`Welcome Back, ${apiRes.data.userData.name}`);
                    set({
                         userData: apiRes.data.userData,
                         isAuthenticated: true,
                         leaveForms: apiRes.data.leaveData,
                         redirect_path: "/student",
                    });
                    console.log("UserData:", useAuthStore.getState().userData);
               } else {
                    const apiRes = await axios.post(
                         url + "/faculty/login",
                         data
                    );
                    toast.success(`Welcome Back, ${apiRes.data.userData.name}`);
                    set({
                         userData: apiRes.data.userData,
                         isAuthenticated: true,
                         leaveForms: apiRes.data.leaveData,
                         redirect_path: "/faculty",
                    });
               }
               console.log("UserData:", useAuthStore.getState().userData);
               set({ isLoading: false });
          } catch (error) {
               // console.log(error);

               let err = error.response
                    ? error.response.data
                    : "Error: Server is Down";
               console.error(error);
               toast.error(err);
               set({ userData: null, isAuthenticated: false });
          } finally {
               set({ isLogingIn: false });
          }
     },
     ApplyLeave: async (leaveData) => {
          set({ isLoading: true });
          const url = "http://localhost:1247/api";

          try {
               await axios.post(url + "/form/student/apply-leave", leaveData);
               toast.success("Leave Applied Successfully");
          } catch (error) {
               let err = error.response
                    ? error.response.data
                    : "Error: Server is Down";
               console.error(error);
               toast.error(err);
          } finally {
               set({ isLoading: false });
          }
     },
}));
// API endpoints for different roles
//auth/student/login
//auth/faculty/login
//auth/admin/student/signup
//auth/admin/faculty/signup
//auth/admin/class
//api/form/apply { usrId , reason , startdate , enddate , classId }
