import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";
export const useAuthStore = create((set) => ({
  userData:  {
    id: "6873cd980069d5c88a1e5d47",
    name: "Harini",
    email: "717823p118@kce.ac.in",
    rollno: "717823P118",
    classId: "6873cb680069d5c88a1e5d35",
    department: "CSE",
    year: "III",
    section: "A",
  },
  isLogingIn: false,
  leaveForms: [],
  isLoading: false,
  isAuthenticated: false,
  isCheckingAuth: false,
  redirect_path: "/login",
  setRedirectPath: (path) => set({ redirect_path: path }),
  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      set({ isLoading: true });
      const url = "http://localhost:1247";
      const apiRes = await axios.get(url + "/auth/check");
      set({ userData: apiRes.data, isAuthenticated: true });
      set({ isLoading: false });
      toast.success(`Welcome Back, ${apiRes.data.name}`);
      const role = apiRes.data.designation;
      if (role === "student") set({ redirect_path: "/student" });
      else if (role === "staff") set({ redirect_path: "/staff" });
      else if (role === "hod") set({ redirect_path: "/hod" });
    } catch (error) {
      let err = error.response ? error.response.data : "Error: Server is Down";
      console.log(err);
      set({ isLoading: false });
      set({ userData: null, isAuthenticated: false });
    } finally {
      set({ isCheckingAuth: false });
      set({ isLoading: true });
    }
  },
  Login: async (data) => {
    set({ isLoging: true });
    try {
      const url = "http://localhost:1247/auth";
      if (data.email.startsWith("7178", 0)) {
        const apiRes = await axios.post(url + "/student/login", data);
        // console.log("UserData response:", apiRes.data.userData);
        // console.log("LeaveForm response:", apiRes.data.leaveData);
        toast.success(`Welcome Back, ${apiRes.data.userData.name}`);
        set({
          userData: apiRes.data.userData,
          isAuthenticated: true,
          leaveForms: apiRes.data.leaveData,
          redirect_path: "/student",
        });
        // console.log("UserData:", userData);
      } else {
        const apiRes = await axios.post(url + "/faculty/login", userData);
        toast.success(`Welcome Back, ${apiRes.data.userData.name}`);
        set({
          userData: apiRes.data.userData,
          isAuthenticated: true,
          leaveForms: apiRes.data.leaveData,
          redirect_path: "/faculty",
        });
      }
      set({ isLoading: false });
    } catch (error) {
      // console.log(error);

      let err = error.response ? error.response.data : "Error: Server is Down";
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
      let err = error.response ? error.response.data : "Error: Server is Down";
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
