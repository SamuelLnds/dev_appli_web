import { defineStore } from 'pinia'
import { login as apiLogin, logout as apiLogout } from '@/api/auth'
import { getAuthToken } from '@/utils/token'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: getAuthToken(),
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
  },

  actions: {
    async login(name, password) {
      const data = await apiLogin(name, password)
      this.token = data.token
      this.user = data.user ?? null
    },

    async logout() {
      await apiLogout()
      this.token = null
      this.user = null
    },

    tryAutoLogin() {
      const token = getAuthToken()
      if (!token) return
      this.token = token
    },
  },
})
