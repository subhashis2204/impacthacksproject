import Navbar from "./components/Navbar"
import "./index.css"
import MapComponent from "./components/MapComponent"
import { useEffect, useState } from "react"
import SearchBox from "./components/SearchBox"
import NearEventsShow from "./components/NearEventsShow"
import EventCard from "./components/EventCard"
import axios from "axios"
import SubscribedEvents from "./components/SubscribedEvents"
import { useAuth0 } from "@auth0/auth0-react"
import CreatedEvents from "./components/CreatedEvents"

function App() {
  const [username, setUsername] = useState("")
  const [type, setType] = useState("")
  const [data, setData] = useState([])

  const [address, setAddress] = useState("")
  const [latitude, setLatitude] = useState(-33.8698439)
  const [longitude, setLongitude] = useState(151.2082848)
  const [orgEvents, setOrgEvents] = useState([])
  const [volEvents, setVolEvents] = useState([])

  const { user, isAuthenticated, isLoading } = useAuth0()

  const handleLoading = async () => {
    await axios
      .post("http://localhost:3000/login", { username: user.name })
      .then((res) => {
        console.log(res.data.role)
        setUsername(res.data.username)
        setType(res.data.role)
      })

    console.log(username, type)
    if (type == "volunteer") {
      await axios
        .get("http://localhost:3000/vol", { params: { username } })
        .then((res) => {
          console.log(res.data)
          setData(res.data)
          setVolEvents(res.data.volEvents)
        })
    }
    if (type == "org") {
      console.log("hello")
      await axios
        .get("http://localhost:3000/orgs", { params: { username } })
        .then((res) => {
          console.log(res.data)
          setData(res.data)
          setVolEvents(res.data.orgEvents)
        })
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      console.log(user)
      handleLoading()
    }
  }, [])

  return (
    <>
      <div className="flex flex-col">
        <Navbar />
        <div className="flex">
          <MapComponent latitude={latitude} longitude={longitude} />
          <div className="flex flex-col p-2 w-1/2">
            <SearchBox
              address={address}
              setAddress={setAddress}
              latitude={latitude}
              setLatitude={setLatitude}
              longitude={longitude}
              setLongitude={setLongitude}
              setOrgEvents={setOrgEvents}
            />
            <NearEventsShow orgEvents={orgEvents} />
          </div>
        </div>
        {type == "volunteer" && (
          <SubscribedEvents
            volEvents={volEvents}
            type={type}
            setData={setData}
          />
        )}
        {type == "org" && (
          <CreatedEvents orgEvents={volEvents} type={type} setData={setData} />
        )}
      </div>
    </>
  )
}

export default App
