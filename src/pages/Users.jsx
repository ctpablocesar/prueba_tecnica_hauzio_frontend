import {
  Button,
  Divider,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from '@nextui-org/react'
import { useEffect } from 'react'
import { FaTrash } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import AdminNavbarComponent from '../components/ui/AdminNavbar'
import { useUsersStore } from '../store/users'

const Users = () => {
  const navigate = useNavigate()

  const { users, loading } = useUsersStore((state) => ({
    users: state.users,
    loading: state.loading
  }))

  const { getUsers, deleteUser } = useUsersStore()

  useEffect(() => {
    getUsers()
  }, [getUsers])

  return (
    <>
      <AdminNavbarComponent />
      <div className="w-full h-[90vh] md:p-10 p-5 flex flex-col gap-10">
        <div>
          <h1 className="text-2xl font-bold">Listado de usuarios</h1>
          <p className="text-sm">
            Aquí encontrarás una lista de los usuarios registrados. También
            eliminar o agregar un nuevo registro.
          </p>
          <Divider className="mt-5" />
          <div className="w-full flex justify-end">
            <Button
              className="mt-5"
              color="primary"
              onPress={() => navigate('/users/form')}>
              Agregar
            </Button>
          </div>
        </div>
        {loading ? (
          <div className="w-full h-full flex justify-center items-center">
            <Spinner size="xl" />
          </div>
        ) : (
          <Table aria-label="Example static collection table">
            <TableHeader>
              <TableColumn>Nombre</TableColumn>
              <TableColumn>Correo electrónico</TableColumn>
              <TableColumn>Eliminar</TableColumn>
            </TableHeader>
            <TableBody>
              {users.length > 0 &&
                users.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        color="danger"
                        variant="light"
                        onPress={() => {
                          deleteUser(user._id)
                        }}>
                        <FaTrash size={20} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        )}
      </div>
    </>
  )
}

export default Users
