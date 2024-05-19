import { create } from 'zustand'
import { toastAlert } from '../services/alert'
import axiosInstance from '../services/axiosInstance'

export const useStoresStore = create((set, get) => ({
  storeLocations: [],
  loading: false,
  activeStore: null,
  getStoreLocations: async () => {
    set({ loading: true })
    await axiosInstance
      .get('/storeLocations')
      .then((response) => {
        set({ storeLocations: response.data })
      })
      .finally(() => set({ loading: false }))
  },
  addNewStoreLocation: async (data) => {
    set({ loading: true })
    const formdata = new FormData()
    formdata.append('title', data.title)
    formdata.append('description', data.description)
    formdata.append('image', data.image)
    formdata.append('lat', data.lat)
    formdata.append('lng', data.lng)
    return await axiosInstance
      .post('/storeLocations', formdata, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      .then(({ data }) => {
        toastAlert({
          title: 'Ubicación guardada',
          type: 'success'
        })
        const info = get().storeLocations
        set({ storeLocations: [...info, data] })
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
  deleteStoreLocation: async (id) => {
    set({ loading: true })
    return await axiosInstance
      .delete(`/storeLocations/${id}`)
      .then(() => {
        toastAlert({
          title: 'Ubicación eliminada',
          icon: 'success'
        })
        const info = get().storeLocations
        const newInfo = info.filter((item) => item._id !== id)
        set({ storeLocations: newInfo })
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
  setActiveStore: (data) => set({ activeStore: data }),
  clearActiveStore: () => set({ activeStore: null }),
  updateStoreLocation: async (data, id) => {
    set({ loading: true })
    const formdata = new FormData()
    formdata.append('title', data.title)
    formdata.append('description', data.description)
    if (typeof data.image !== 'string') formdata.append('image', data.image)
    formdata.append('lat', data.lat)
    formdata.append('lng', data.lng)
    return await axiosInstance
      .put(`/storeLocations/${id}`, formdata, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      .then(({ data }) => {
        toastAlert({
          title: 'Ubicación actualizada',
          type: 'success'
        })
        const info = get().storeLocations
        set({
          storeLocations: info.map((value) => (value._id === id ? data : value))
        })
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
  }
}))
