import {
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure
} from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import AdminNavbarComponent from '../components/ui/AdminNavbar'
import { useStoresStore } from '../store/stores'

const Stores = () => {
  const navigate = useNavigate()

  const { storeLocations, loading } = useStoresStore((state) => ({
    storeLocations: state.storeLocations,
    loading: state.loading
  }))

  const {
    getStoreLocations,
    deleteStoreLocation,
    setActiveStore,
    clearActiveStore
  } = useStoresStore()

  const [text, setText] = useState(null)
  const [image, setImage] = useState(null)

  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  useEffect(() => {
    getStoreLocations()
    clearActiveStore()
  }, [clearActiveStore, getStoreLocations])

  // eslint-disable-next-line react/prop-types
  const EyeButton = ({ text, image }) => (
    <Button
      color="primary"
      variant="light"
      onPress={() => {
        setText(text)
        setImage(image)
        onOpen()
      }}>
      <FaEye size={20} />
    </Button>
  )

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
          <ModalBody>
            {text != null ? (
              <p>{text}</p>
            ) : (
              <img
                src={`${import.meta.env.VITE_API_URL}/uploads/${image}`}
                alt="Store image"
                className="w-full"
              />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
      <AdminNavbarComponent />
      <div className="w-full h-[90vh] md:p-10 p-5 flex flex-col gap-10">
        <div>
          <h1 className="text-2xl font-bold">Listado de tiendas</h1>
          <p className="text-sm">
            Aquí encontrarás una lista de las tiendas registradas. También
            puedes editar, eliminar o agregar un nuevo registro.
          </p>
          <Divider className="mt-5" />
          <div className="w-full flex justify-end">
            <Button
              className="mt-5"
              color="primary"
              onPress={() => navigate('/admin/form')}>
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
              <TableColumn>Titulo</TableColumn>
              <TableColumn>Latitud</TableColumn>
              <TableColumn>Longitud</TableColumn>
              <TableColumn>Descripción</TableColumn>
              <TableColumn>Imagen</TableColumn>
              <TableColumn>Acciones</TableColumn>
            </TableHeader>
            <TableBody>
              {storeLocations.length > 0 &&
                storeLocations.map((store) => (
                  <TableRow key={store._id}>
                    <TableCell>{store.title}</TableCell>
                    <TableCell>{store.lat}</TableCell>
                    <TableCell>{store.lng}</TableCell>
                    <TableCell>
                      <EyeButton text={store.description} image={null} />
                    </TableCell>
                    <TableCell>
                      <EyeButton text={null} image={store.image} />
                    </TableCell>
                    <TableCell>
                      <div className="w-fit">
                        <Button
                          size="sm"
                          color="success"
                          variant="light"
                          onPress={() => {
                            setActiveStore(store)
                            navigate('/admin/form')
                          }}>
                          <FaEdit size={20} />
                        </Button>
                        <Button
                          size="sm"
                          color="danger"
                          variant="light"
                          onPress={() => {
                            deleteStoreLocation(store._id)
                          }}>
                          <FaTrash size={20} />
                        </Button>
                      </div>
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

export default Stores
