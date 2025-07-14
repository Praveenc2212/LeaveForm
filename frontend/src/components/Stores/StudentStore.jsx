import React from 'react'
import { create } from 'zustand';
import axios from 'axios';
import toast from 'react-hot-toast';
export const StudentStore =create((set)=>({

      studentData:null,
      leaveForms :null,
      isAuthenticated: false,
      isLoading: false,
      isError: false,
      UserLogin: async () => {
        set({ isLoading: true });
        try {
          const response = await axios.get(''); // temp api it will changable
          if (!response.ok) throw new Error('Network response was not ok');
          const data = await response.json();
          set({ studentData: data.userData , leaveForms: data.leaveData ,  isLoading: false, isError: false });
        } catch (error) {
          console.error('Failed to fetch student data:', error);
          set({ isLoading: false, isError: true });
        }
      },
      fetchLeaveForms: async () => {
        set({ isLoading: true });
        try {
          const response = await axios.get(''); // temp api it will changable
          if (!response.ok) throw new Error('Network response was not ok');
          const data = await response.json();
          set({ leaveForms: data.leaveData, isLoading: false, isError: false });
        } catch (error) {
          console.error('Failed to fetch leave forms:', error);
          set({ isLoading: false, isError: true });
        }
      },
      ApplyLeaveForm: async (formData) => {
        set({ isLoading: true });
        try {
          const response = await axios.post('', formData); // temp api it will changable
          if (!response.ok) throw new Error('Network response was not ok');
          const data = await response.json();
          set((state) => ({ 
            leaveForms: [...state.leaveForms, data],
            isLoading: false,
            isError: false,
          }));
        } catch (error) {
          console.error('Failed to submit leave form:', error);
          set({ isLoading: false, isError: true });
        }
      },
      
})) 
