import { useState } from "react"
import axios from "axios"

function SearchBox({
  latitude,
  longitude,
  setLatitude,
  setLongitude,
  address,
  setAddress,
  setOrgEvents,
}) {
  const handleSubmit = () => {}

  const handleLocationSubmit = () => {}

  const handleGeocodeSubmit = async () => {
    const { data } = await axios.get(
      "https://api.opencagedata.com/geocode/v1/json",
      {
        params: {
          key: "b3f9651669044b0d91bf107b648b109b",
          q: address,
          limit: 1,
        },
      }
    )

    const { lat, lng } = data.results[0].geometry

    const response = await axios.post("http://localhost:3000/events", {
      lat,
      lng,
    })
    setLatitude(lat)
    setLongitude(lng)
    // console.log(response.data, lat, lng)
    setOrgEvents(response.data)
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col pt-2 px-12">
        <div className="flex gap-2 items-end pb-2">
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="add" className="text-md font-bold">
              Type Your Location
            </label>
            <input
              type="text"
              id="add"
              className="rounded-md bg-gray-100 border-2 border-gray-300 focus:ring-black focus:border-black p-2 grow"
              name="add"
              placeholder="Default Location is Sydney, Australia"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <button
            onClick={(e) => {
              handleGeocodeSubmit()
              e.preventDefault()
            }}
            className="bg-white px-3 py-3 rounded-md text-sm font-bold border-2 border-black  md:col-start-1 md:col-span-2 hover:shadow-lg min-w-max"
          >
            Geocode It!!
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 col-span-1">
          <div className="flex flex-col gap-2 md:col-start-1">
            <label htmlFor="lat" className="text-md font-bold">
              Latitude
            </label>
            <input
              type="text"
              id="lat"
              className="rounded-md bg-gray-100 border-2 border-gray-300 focus:ring-black focus:border-black p-2"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
              name="lat"
            />
          </div>
          <div className="flex flex-col gap-2 md:col-start-2 col-span-1">
            <label htmlFor="lng" className="text-md font-bold">
              Longitude
            </label>
            <input
              type="text"
              id="lng"
              className="rounded-md bg-gray-100 border-2 border-gray-300 focus:ring-black focus:border-black p-2"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
              name="lng"
            />
          </div>
        </div>
      </form>
    </>
  )
}

export default SearchBox
