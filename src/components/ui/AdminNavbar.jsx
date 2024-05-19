import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem
} from '@nextui-org/react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/auth'

const AdminNavbarComponent = () => {
  const navigate = useNavigate()
  const { logout } = useAuthStore()
  return (
    <Navbar className="shadow-md m-0">
      <NavbarBrand>
        <Link to="/">
          <img
            className="w-[150px]"
            src="/images/logo.png"
            alt="Logo"
            width={150}
            height={150}
          />
        </Link>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem isActive>
          <Link
            className="text-lg text-[#6350dd]"
            to="/admin"
            aria-current="page">
            Tiendas
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link
            className="text-lg text-[#6350dd]"
            to="/users"
            aria-current="page">
            Usuarios
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button
            className="bg-danger-500 text-white"
            variant="flat"
            onPress={async () => {
              await logout().then(() => navigate('/'))
            }}>
            Cerrar sesión
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}

export default AdminNavbarComponent
