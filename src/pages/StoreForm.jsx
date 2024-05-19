import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Input, Spinner, Textarea } from '@nextui-org/react'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import AdminNavbarComponent from '../components/ui/AdminNavbar'
import { toastAlert } from '../services/alert'
import { useStoresStore } from '../store/stores'

const schema = yup.object().shape({
  title: yup.string().required('Campo obligatorio'),
  description: yup.string().required('Campo obligatorio'),
  image: yup.mixed().required('Campo obligatorio'),
  lat: yup.number().typeError('Dato no válido').required('Campo obligatorio'),
  lng: yup.number().typeError('Dato no válido').required('Campo obligatorio')
})

const StoreForm = () => {
  const navigate = useNavigate()

  const { loading, activeStore } = useStoresStore((state) => ({
    loading: state.loading,
    activeStore: state.activeStore
  }))

  const { addNewStoreLocation, updateStoreLocation } = useStoresStore()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset
  } = useForm({
    resolver: yupResolver(schema)
  })
  const fileInputRef = useRef(null)

  const [fileName, setFileName] = useState()

  const onSubmit = async (data) => {
    const response = activeStore
      ? await updateStoreLocation(data, activeStore._id)
      : await addNewStoreLocation(data)
    console.log(response)
    if (response) {
      navigate('/admin')
    }
  }

  useEffect(() => {
    reset(activeStore)
  }, [activeStore, reset])

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
            <h1 className="text-2xl font-bold text-center">
              {activeStore ? 'Editar' : 'Agregar'} tienda
            </h1>
            <div className="flex justify-end">
              <Button
                onPress={() => {
                  navigate('/admin')
                }}>
                Regresar
              </Button>
            </div>
            <div className="flex flex-col gap-5">
              <Input
                defaultValue={activeStore?.title}
                errorMessage={errors.title?.message}
                isInvalid={errors.title != null}
                label="Titulo"
                {...register('title')}
              />
              <Textarea
                defaultValue={activeStore?.description}
                errorMessage={errors.description?.message}
                isInvalid={errors.description != null}
                label="Descripcion"
                {...register('description')}
              />
              <input
                type="file"
                className="hidden"
                accept="image/*"
                {...register('image')}
                ref={fileInputRef}
                onChange={(e) => {
                  if (e.target.files != null) {
                    if (e.target.files[0].size > 2500000) {
                      toastAlert({
                        title: 'El archivo es muy grande',
                        icon: 'error'
                      })
                    } else {
                      setValue('image', e.target.files[0])
                      setFileName(e.target.files[0].name)
                    }
                  }
                }}
              />
              <Input
                defaultValue={activeStore?.image}
                errorMessage={errors.image?.message}
                isInvalid={errors.image != null}
                label="Imagen"
                readOnly
                onClick={() => {
                  if (fileInputRef.current != null) {
                    fileInputRef.current.click()
                  }
                }}
                value={fileName}
              />
              <div className="flex md:flex-row flex-col gap-3">
                <Input
                  defaultValue={activeStore?.lat}
                  errorMessage={errors.lat?.message}
                  isInvalid={errors.lat != null}
                  label="Latitud"
                  type="number"
                  {...register('lat')}
                />
                <Input
                  defaultValue={activeStore?.lng}
                  errorMessage={errors.lng?.message}
                  isInvalid={errors.lng != null}
                  label="Longitud"
                  type="number"
                  {...register('lng')}
                />
              </div>
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

export default StoreForm
