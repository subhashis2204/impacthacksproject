import EventCard from "./EventCard"

function CreatedEvents({ orgEvents }) {
  console.log(orgEvents)
  const renderedEvents =
    orgEvents &&
    orgEvents.map((receivedEvent, key) => {
      console.log(receivedEvent)
      const { _id, eventName, eventDate, eventTime, eventAddress } =
        receivedEvent
      return (
        <>
          <div key={_id} className="flex items-center justify-center">
            <EventCard
              id={_id}
              eventName={eventName}
              eventDate={eventDate}
              eventTime={eventTime}
              eventAddress={eventAddress}
              subscribed={false}
            />
          </div>
        </>
      )
    })
  return (
    <div>
      <div className="flex flex-col items-center pb-2">
        <p className="text-center text-2xl py-5 font-bold">
          Here Are Your List of Events
        </p>
        <button className="bg-green-500 px-3 py-2 rounded text-white">
          Create Event
        </button>
      </div>
      <div className="flex items-center justify-center gap-8 pb-8 flex-wrap">
        {renderedEvents}
      </div>
    </div>
  )
}

export default CreatedEvents
