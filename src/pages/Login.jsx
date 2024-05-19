import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Input } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import { useAuthStore } from '../store/auth'

const schema = yup.object().shape({
  email: yup
    .string()
    .email('Ingresa un correo electrónico válido')
    .required('Campo obligatorio'),
  password: yup
    .string()
    .min(6, 'La contraseña tiene que ser de por lo menos 6 caracteres')
    .required('Campo obligatorio')
})

const Login = () => {
  const navigate = useNavigate()

  const { login } = useAuthStore()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({ resolver: yupResolver(schema) })

  const [isVisible, setIsVisible] = useState(false)

  const toggleVisibility = () => setIsVisible(!isVisible)

  const sendData = async (data) => {
    const response = await login(data)
    if (response) {
      navigate('/admin')
      reset()
    }
  }

  useEffect(() => {
    reset()
    const token = localStorage.getItem('token')
    if (token != null) {
      navigate('/admin')
    }
  }, [reset, navigate])

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg">
        <div className="flex justify-center items-center">
          <Link to="/">
            <img className="w-[20vw]" src="/images/logo.png" alt="Logo" />
          </Link>
        </div>

        <form
          onSubmit={handleSubmit(sendData)}
          className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8">
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
            {...register('password')}
            label="Contraseña"
            type={isVisible ? 'text' : 'password'}
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={toggleVisibility}>
                {isVisible ? (
                  <FaEyeSlash className="text-gray-500" size={25} />
                ) : (
                  <FaEye className="text-gray-500" size={25} />
                )}
              </button>
            }
          />

          <Button
            type="submit"
            className="block w-full rounded-lg bg-[#6350dd] px-5 py-3 text-sm font-medium text-white">
            Iniciar sesión
          </Button>
        </form>
      </div>
    </div>
  )
}

export default Login
