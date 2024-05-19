import { Spinner } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import CardLocation from '../components/CardLocation'
import Map from '../components/Map'
import NavbarComponent from '../components/ui/Navbar'
import { useStoresStore } from '../store/stores'

const Locations = () => {
  const { loading, storeLocations } = useStoresStore((state) => ({
    loading: state.loading,
    storeLocations: state.storeLocations
  }))

  const { getStoreLocations } = useStoresStore()

  const [stores, setStores] = useState([])
  const [selectedPoint, setSelectedPoint] = useState(null)

  const handleMarkerClick = (point) => {
    setSelectedPoint(point)
  }

  useEffect(() => {
    if (storeLocations.length > 0) {
      setStores(
        storeLocations.map((store) => ({
          id: store._id,
          title: store.title,
          description: store.description,
          position: [store.lat, store.lng],
          image: `${import.meta.env.VITE_API_URL}/uploads/` + store.image
        }))
      )
    } else {
      setStores([])
    }
  }, [storeLocations])

  useEffect(() => {
    getStoreLocations()
  }, [getStoreLocations])

  return (
    <div className="w-full h-[90vh]">
      <NavbarComponent />
      <div className="flex md:flex-row flex-col-reverse gap-4 p-4 w-full h-full">
        <div className="md:w-3/4 md:h-full w-full h-full flex justify-center items-center rounded-xl shadow-xl p-4">
          {loading ? (
            <Spinner size="xl" />
          ) : (
            <Map
              points={stores.filter((point) =>
                selectedPoint != null ? point.id === selectedPoint?.id : true
              )}
              handleMarkerClick={handleMarkerClick}
              setSelectedPoint={setSelectedPoint}
            />
          )}
        </div>
        <div className="md:w-1/4 md:h-full w-full h-full  rounded-xl shadow-xl p-4 overflow-y-auto">
          {loading ? (
            <div className="w-full h-full flex justify-center items-center">
              <Spinner size="xl" />
            </div>
          ) : (
            <div className="space-y-4">
              {stores
                .filter((point) =>
                  selectedPoint != null ? point.id === selectedPoint?.id : true
                )
                .map((point) => (
                  <CardLocation
                    key={point.id}
                    point={point}
                    selectFunction={() => {
                      setSelectedPoint(selectedPoint === point ? null : point)
                    }}
                  />
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Locations
