import { defineStore } from 'pinia';

interface UserPayloadInterface {
  username: string;
  password: string;
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    authenticated: false,
    loading: false,
  }),
  actions: {
    async authenticateUser({ username, password }: UserPayloadInterface) {
      const { data, pending }: any = await $fetch('http://api.typograph.kz/api/v1/login', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: {
          email: username,
          password,
        },
      });
      this.loading = pending;

      console.log('data', data.value.data.token)
      if (data.value) {
        const token = useCookie('token'); 
        token.value = data?.value?.data.token;
        this.authenticated = true;
        console.log('token.value', token.value)
      }
    },
    logUserOut() {
      const token = useCookie('token');
      this.authenticated = false;
      token.value = null;
    },
  },
});