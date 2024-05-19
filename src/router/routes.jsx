import { Button } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { HashRouter, Link, Route, Routes } from 'react-router-dom'
import App from '../pages/App'
import Locations from '../pages/Locations'
import Login from '../pages/Login'
import StoreForm from '../pages/StoreForm'
import Stores from '../pages/Stores'
import UserForm from '../pages/UserForm'
import Users from '../pages/Users'
import { useAuthStore } from '../store/auth'
import { useStoresStore } from '../store/stores'
import { useUsersStore } from '../store/users'
import { ProtectedRoute } from './ProtectedRoute'

export const Router = () => {
  const authLoading = useAuthStore((state) => state.loading)
  const usersLoading = useUsersStore((state) => state.loading)
  const storesLoading = useStoresStore((state) => state.loading)

  const [token, setToken] = useState(null)

  const routes = [
    {
      path: '/',
      element: <App />
    },
    {
      path: '/locations',
      element: <Locations />
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/admin',
      element: (
        <ProtectedRoute token={token}>
          <Stores />
        </ProtectedRoute>
      )
    },
    {
      path: '/admin/form',
      element: (
        <ProtectedRoute token={token}>
          <StoreForm />
        </ProtectedRoute>
      )
    },
    {
      path: '/users',
      element: (
        <ProtectedRoute token={token}>
          <Users />
        </ProtectedRoute>
      )
    },
    {
      path: '/users/form',
      element: (
        <ProtectedRoute token={token}>
          <UserForm />
        </ProtectedRoute>
      )
    },
    {
      path: '*',
      element: (
        <div className="w-screen h-screen flex flex-col gap-5 justify-center items-center">
          <h1 className="text-3xl">404 - Ruta no encontrada</h1>
          <Button>
            <Link to="/">Ir al inicio</Link>
          </Button>
        </div>
      )
    }
  ]

  useEffect(() => {
    setToken(localStorage.getItem('token'))
  }, [authLoading, usersLoading, storesLoading])

  return (
    <HashRouter>
      <Routes>
        {routes.map((route) => (
          <Route element={route.element} key={route.path} path={route.path} />
        ))}
      </Routes>
    </HashRouter>
  )
}
