import { defineStore } from 'pinia';
import { type IUser } from '~/types/IUser';
import { fetchUserByEmail } from '~/apis/fetchUsers';

export const useMyUserLoguedStore = defineStore({
  id: 'myUserLoguedStore',
  state: () => ({
    user: null as IUser | null,
    isLoggedIn: false,
  }),
  actions: {
    async setUserByEmail(email: string) {
      try {
        const userData = await fetchUserByEmail(email);
        this.user = userData;
        this.isLoggedIn = true; 
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    },
    logout() {
      this.user = null;
      this.isLoggedIn = false; 
      localStorage.removeItem('token'); 
      localStorage.removeItem('user'); 
    },
    checkLoginStatus() {
      const user = localStorage.getItem('user');
      this.isLoggedIn = !!user; 
      this.user = user ? JSON.parse(user) : null; 
    },
  },
});

