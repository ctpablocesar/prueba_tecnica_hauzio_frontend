import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem
} from '@nextui-org/react'
import { Link, useNavigate } from 'react-router-dom'

const NavbarComponent = () => {
  const navigate = useNavigate()
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
            to="/locations"
            aria-current="page">
            Tiendas
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button
            onPress={() => {
              navigate('/login')
            }}
            className="bg-[#6350dd] text-white"
            variant="flat">
            Iniciar Sesión
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}

export default NavbarComponent
