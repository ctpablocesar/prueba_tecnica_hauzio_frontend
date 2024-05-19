import { create } from 'zustand'
import { toastAlert } from '../services/alert'
import axiosInstance from '../services/axiosInstance'

export const useUsersStore = create((set, get) => ({
  loading: false,
  users: [],
  getUsers: async () => {
    set({ loading: true })
    return await axiosInstance
      .get('/users')
      .then(({ data }) => {
        console.log(data)
        set({ users: data })
      })
      .catch((response) => console.log(response))
      .finally(() => set({ loading: false }))
  },
  addNewUser: async (user) => {
    set({ loading: true })
    return await axiosInstance
      .post('/users', user)
      .then(({ data }) => {
        const users = get().users
        set({ users: [...users, data.user], loading: false })
        toastAlert({ title: 'Usuario guardado', icon: 'success' })
        return true
      })
      .catch((response) => {
        console.log(response)
        toastAlert({
          title: response.response.data.message,
          icon: 'error'
        })
        return false
      })
      .finally(() => set({ loading: false }))
  },
  deleteUser: async (id) => {
    set({ loading: true })
    return await axiosInstance
      .delete(`/users/${id}`)
      .then(() => {
        toastAlert({ title: 'Usuario eliminado', icon: 'success' })
        const users = get().users
        const newUsers = users.filter((item) => item._id !== id)
        set({ users: newUsers })
      })
      .catch((response) => {
        console.log(response)
        toastAlert({
          title: response.response.data.message,
          icon: 'error'
        })
        return false
      })
      .finally(() => set({ loading: false }))
  }
}))
