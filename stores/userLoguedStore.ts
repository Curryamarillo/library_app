import { defineStore } from 'pinia';
import { type IUser } from '~/types/IUser';
import { fetchUserByEmail } from '~/apis/fetchUsers';

export const useMyUserLoguedStore = defineStore({
  id: 'myUserLoguedStore',
  state: () => ({
    user: null as IUser | null,
  }),
  actions: {
    async setUserByEmail(email: string) {
      try {
        const userData = await fetchUserByEmail(email);
        this.user = userData;
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    },
    logout() {
      this.user = null;
    },
  },
});
