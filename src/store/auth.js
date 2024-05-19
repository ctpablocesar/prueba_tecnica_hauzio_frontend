import { create } from 'zustand'
import { toastAlert } from '../services/alert'
import axiosInstance from '../services/axiosInstance'

export const useAuthStore = create((set) => ({
  loading: false,
  login: async (data) => {
    set({ loading: true })
    return await axiosInstance
      .post('/auth', data)
      .then((response) => {
        localStorage.setItem('token', response.data.token)
        toastAlert({
          title: 'Bienvenido',
          type: 'success'
        })
        return true
      })
      .catch(({ response }) => {
        toastAlert({
          title: response.data.message,
          icon: 'error'
        })
        return false
      })
      .finally(() => set({ loading: false }))
  },
  logout: async () => {
    set({ loading: true })
    toastAlert({ title: 'Sesión cerrada', type: 'success' })
    localStorage.removeItem('token')
    set({ loading: false })
  }
}))
