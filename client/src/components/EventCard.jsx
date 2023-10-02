import axios from "axios"
import { FaMapMarkerAlt } from "react-icons/fa"
import { useAuth0 } from "@auth0/auth0-react"

function EventCard({
  id,
  eventName,
  eventAddress,
  eventDate,
  eventTime,
  subscribed,
  type,
  setData,
}) {
  const { user, isAuthenticated } = useAuth0()

  const handleSubscribeEvent = async () => {
    if (isAuthenticated) {
      const response = await axios.post(
        "http://localhost:3000/vol/event/signup",
        {
          username: user.email,
          eventId: id,
        }
      )

      console.log(response.data)

      await axios
        .get("http://localhost:3000/vol", { username: user.name })
        .then((res) => {
          console.log(res.data)
          setData(res.data)
        })

      console.log(user.email, id)
    }
  }

  return (
    <>
      <div className="p-2 w-[300px] bg-pink-200 rounded-md flex flex-col">
        <img
          src={`https://picsum.photos/seed/${id}/300/200`}
          alt=""
          className="rounded-md"
        />
        <div className="grow"></div>
        <div className="p-1 text-center">
          <p className="font-bold text-xl py-2">{eventName}</p>
          <div className="flex items-center gap-2 justify-center pr-8">
            <FaMapMarkerAlt />
            <p>{eventAddress}</p>
          </div>
          <p className="py-2 px-2 mt-2 bg-purple-600 text-white rounded-md">
            {Math.round(Math.random() * 10) + 5} Volunteers Signed Up
          </p>
          {subscribed == false && type == "volunteer" && (
            <button
              className="mt-2 bg-blue-400 w-full px-2 py-2 rounded-md text-md text-white"
              onClick={handleSubscribeEvent}
            >
              Sign Up
            </button>
          )}
        </div>
      </div>
    </>
  )
}

export default EventCard
