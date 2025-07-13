import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";
export const useAuthStore = create((set) => ({
    userData: null,
    LeaveForms: null,
    isLoading: false,
    isAuthenticated: false,
    isCheckingAuth : false,
    redirect_path: '/login',
    setRedirectPath: (path) => set({ redirect_path: path }),
    checkAuth: async () => {
        set({ isCheckingAuth: true });


        try {

            set({isLoading: true});
            const url = "http://localhost:1247";
            const apiRes = await axios.get(url+"/auth/check");
            set({ userData : apiRes.data, isAuthenticated: true });
            set({ isLoading: false });
            toast.success(`Welcome Back, ${apiRes.data.name}`);
            const role = apiRes.data.designation  ;
            if (role === 'student') set({ redirect_path: '/student' });
            else if (role === 'staff') set({ redirect_path: '/staff' });
            else if (role === 'hod') set({ redirect_path: '/hod' });   
        } catch (error) {
            let err = error.response ?
            error.response.data : 
            "Error: Server is Down"
            console.log(err);
            set({ isLoading: false });
            set({ userData: null, isAuthenticated: false });
        } finally {

            set({ isCheckingAuth: false });
            set({isLoading: true});
        } 
    },
    login: async (logData) => { 
        set({ isLoging: true }); 
        try {
            // API endpoints for different roles
            //auth/student/login
            //auth/faculty/login
            //auth/admin/student/signup
            //auth/admin/faculty/signup
            //auth/admin/class
            //api/form/apply { usrId , reason , startdaataa, enddate , classId }
            const url ="http://localhost:1247/api";
            const emailStart = logData.email;
            if(emailStart.startWith("7178" , 0 )) {
                const apiRes = await axios.post(url+"/auth/student/login", logData);
                toast.success(`Welcome Back, ${apiRes.data.name}`);
                set({ userData: apiRes.data, isAuthenticated: true });
                set({ redirect_path: '/student' });
            }
            else{
                const apiRes = await axios.post(url+"/auth/faculty/login", logData);
                toast.success(`Welcome Back, ${apiRes.data.name}`);
                set({ userData: apiRes.data, isAuthenticated: true });
            }
              set({isLoading: false});
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
    ApplyLeave : async(leaveData) =>{
        set({ isLoading: true });
        const url ="http://localhost:1247/api";
        try {
            const apiRes = await axios.post(url+"/form/student/apply-leave", leaveData);
            toast.success("Leave Applied Successfully");
        } catch (error) {
            let err = error.response ?
                error.response.data :
                "Error: Server is Down"
            console.error(error);
            toast.error(err);
        } finally {
            set({ isLoading: false });
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