import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";
export const useAuthStore = create((set) => ({
    userData: null,
    LeaveForms: null,
    isAuthenticated: false,
    isCheckingAuth : false,  
    redirect_path: '/login',
    setRedirectPath: (path) => set({ redirect_path: path }),
    checkAuth: async () => {
        set({ isCheckingAuth: true });
        try {
            const apiRes = await axios.get("/auth/check");
            set({ userData : apiRes.data, isAuthenticated: true });
            const role = apiRes.data.designation  ;
            if (role === 'student') set({ redirect_path: '/student' });
            else if (role === 'staff') set({ redirect_path: '/staff' });
            else if (role === 'hod') set({ redirect_path: '/hod' });   
        } catch (error) {
            let err = error.response ?
                error.response.data :
                "Error: Server is Down"
            console.log(err);
            set({ userData: null, isAuthenticated: false });
        } finally {
            set({ isCheckingAuth: false });
        } 
    },
    login: async (logData) => { 
        set({ isLogingIn: true }); 
        try {
            const apiRes = await axios.post("/auth/login", logData);
            toast.success(`Welcome Back, ${apiRes.data.fullname}`);
            set({ userData: apiRes.data, isAuthenticated: true });
            const role = apiRes.data.role;
            if (role === 'student') set({ redirect_path: '/student' });
            else if (role === 'staff') set({ redirect_path: '/staff' });
            else if (role === 'hod') set({ redirect_path: '/hod' });
        }catch (error) {
            let err = error.response ?
                error.response.data :
                "Error: Server is Down"
            console.error(error);
            toast.error(err);
            set({ userData: null, isAuthenticated: false });

        } finally {
            set({ isLogingIn: false });
        }
    },
    logout: async () => {
        set({ isCheckingAuth: true });
        try {
            const apiRes = await axios.post("/auth/logout");
            toast.success(apiRes.data);
            set({ userData: null, isAuthenticated: false });
        } catch (error) {
            const err = error.response ?
                error.response.data :
                "Server is Down";
            console.error(err);
            toast.error(err);
        } finally {
            setTimeout(() => {
                set({ isCheckingAuth: false });
            }, 500)
        }
    }
}))

// import React from 'react'
// function AuthStore() {
//   return (
//     <div>AuthStore</div>
//   )
// }
// export default AuthStore