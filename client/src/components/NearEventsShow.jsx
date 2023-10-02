import React, { useEffect } from "react"
import Slider from "react-slick"
import EventCard from "./EventCard"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

function NearEventsShow({ orgEvents }) {
  console.log(orgEvents)

  const renderedEvents = orgEvents.map((receivedEvent, key) => {
    console.log(receivedEvent)
    const { _id, eventName, eventDate, eventTime, eventAddress } = receivedEvent
    return (
      <>
        <div key={_id} className="flex items-center justify-center">
          <EventCard
            id={_id}
            eventName={eventName}
            eventDate={eventDate}
            eventTime={eventTime}
            eventAddress={eventAddress}
          />
        </div>
      </>
    )
  })

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
  }

  return (
    <>
      {renderedEvents.length === 0 ? (
        <p className="text-center text-2xl py-5 font-bold">No Events Found</p>
      ) : (
        <p className="text-center text-2xl py-5 font-bold">Nearby Events</p>
      )}

      <div className="mx-5">
        <Slider
          {...settings}
          className="w-full flex items-stretch justify-stretch"
        >
          {renderedEvents}
        </Slider>
      </div>

      {/* <div className="flex gap-4 items-center justify-center">
        {renderedEvents}
      </div> */}
    </>
  )
}

export default NearEventsShow
