import EventCard from "./EventCard"

function SubscribedEvents({ volEvents, type, setData }) {
  const renderedEvents =
    volEvents &&
    volEvents.map((receivedEvent, key) => {
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
              subscribed
              type={type}
              setData={setData}
            />
          </div>
        </>
      )
    })

  return (
    <>
      <div>
        <p className="text-center text-2xl py-5 font-bold">
          Thank You For Volunteering
        </p>
        <div className="flex items-center justify-center gap-8 pb-8 flex-wrap">
          {renderedEvents}
        </div>
      </div>
    </>
  )
}

export default SubscribedEvents
