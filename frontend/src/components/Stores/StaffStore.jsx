import {create} from 'zustand';
import axios from 'axios';
import toast from 'react-hot-toast';
export const StaffStore = create((set) => ({
      staffData: null,
      leaveForms: null,
      isAuthenticated: false, 
      isLoading: false,
      isError: false,
      UserLogin: async () => {
        set({ isLoading: true });
        try {
          const response = await axios.get('/api/staff'); // Replace with actual API endpoint
          if (!response.ok) throw new Error('Network response was not ok');
          const data = await response.json();
          set({ staffData: data.userData, leaveForms: data.leaveData, isLoading: false, isError: false });
        } catch (error) {
          console.error('Failed to fetch staff data:', error);
          set({ isLoading: false, isError: true });
        }
      },
}));