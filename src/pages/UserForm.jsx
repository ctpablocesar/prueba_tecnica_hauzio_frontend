import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Input, Spinner } from '@nextui-org/react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import AdminNavbarComponent from '../components/ui/AdminNavbar'
import { useUsersStore } from '../store/users'

const schema = yup.object().shape({
  name: yup.string().required('Campo obligatorio'),
  email: yup
    .string()
    .email('Ingresa un correo electrónico válido')
    .required('Campo obligatorio'),
  password: yup
    .string()
    .min(6, 'La contraseña tiene que ser de por lo menos 6 caracteres')
    .required('Campo obligatorio')
})

const UserForm = () => {
  const navigate = useNavigate()

  const loading = useUsersStore((state) => state.loading)

  const { addNewUser } = useUsersStore()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmit = async (data) => {
    const response = await addNewUser(data)
    console.log(response)
    if (response) {
      navigate('/users')
    }
  }

  return (
    <>
      <AdminNavbarComponent />
      <div className="w-full h-[90vh] md:p-10 p-5 flex flex-col gap-10">
        {loading ? (
          <div className="w-full h-full flex justify-center">
            <Spinner size="xl" />
          </div>
        ) : (
          <form
            className="flex flex-col gap-4 shadow-2xl p-5 rounded-xl"
            onSubmit={handleSubmit(onSubmit)}>
            <h1 className="text-2xl font-bold text-center">Agregar usuario</h1>
            <div className="flex justify-end">
              <Button
                onPress={() => {
                  navigate('/users')
                }}>
                Regresar
              </Button>
            </div>
            <div className="flex flex-col gap-5">
              <Input
                errorMessage={errors.name?.message}
                isInvalid={errors.name != null}
                label="Nombre"
                {...register('name')}
              />
              <Input
                errorMessage={errors.email?.message}
                isInvalid={errors.email != null}
                label="Correo electrónico"
                type="email"
                {...register('email')}
              />
              <Input
                errorMessage={errors.password?.message}
                isInvalid={errors.password != null}
                label="Contraseña"
                type="password"
                {...register('password')}
              />
            </div>
            <div className="flex justify-center">
              <button className="bg-blue-500 text-white p-2 rounded-md">
                Guardar
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  )
}

export default UserForm
