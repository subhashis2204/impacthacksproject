import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api"

function MapComponent({ latitude, longitude }) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDVniXgo3FK0CBN8vZ4ds3CfIdFhqbJkk0",
  })
  //   const { lat, lng } = location
  if (!isLoaded) return <div>Loading...</div>
  return (
    <>
      <GoogleMap
        mapContainerStyle={{
          width: "50%",
          height: "90vh",
          margin: "10px 0 0 10px",
        }}
        zoom={12}
        center={{ lat: latitude, lng: longitude }}
      >
        <Marker position={{ lat: latitude, lng: longitude }} />
      </GoogleMap>
    </>
  )
}

export default MapComponent
