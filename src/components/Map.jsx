import MarkerClusterGroup from 'dg-react-leaflet-cluster'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import PropTypes from 'prop-types'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'

const customIcon = new L.Icon({
  iconUrl: '/images/location_point.png',
  iconSize: [50, 51],
  iconAnchor: [32, 51]
})

const createClusterCustomIcon = function (cluster) {
  return L.divIcon({
    html: `<span>${cluster.getChildCount()}</span>`,
    className: 'custom-marker-cluster',
    iconSize: L.point(23, 30, true)
  })
}

const Map = ({ points = [], handleMarkerClick, setSelectedPoint }) => {
  return (
    <div className="h-full w-full flex justify-center items-center">
      <MapContainer
        center={[20.723243, -101.221739]}
        zoom={5}
        className="h-full w-full rounded-lg">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <MarkerClusterGroup
          onClick={(e) => console.log('onClick', e)}
          iconCreateFunction={createClusterCustomIcon}
          maxClusterRadius={150}
          spiderfyOnMaxZoom={true}
          showCoverageOnHover={true}>
          {points.map((point) => (
            <Marker
              key={point.id}
              position={point.position}
              icon={customIcon}
              eventHandlers={{
                click: () => handleMarkerClick(point),
                popupclose: () => setSelectedPoint(null)
              }}>
              <Popup>
                <span>{point.title}</span>
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  )
}

Map.propTypes = {
  points: PropTypes.array.isRequired,
  handleMarkerClick: PropTypes.func.isRequired,
  setSelectedPoint: PropTypes.func.isRequired
}

export default Map
