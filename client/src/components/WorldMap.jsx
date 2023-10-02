import { useEffect } from "react"
import * as d3 from "d3"
import * as topojson from "topojson-client"

const EarthMap = () => {
  useEffect(() => {
    const width = 960
    const height = 600

    // Load world map data (GeoJSON)
    d3.json("https://unpkg.com/world-atlas@2.1.0/world/110m.json").then(
      (data) => {
        const countries = topojson.feature(data, data.objects.countries)

        const projection = d3
          .geoNaturalEarth1()
          .fitSize([width, height], countries)

        const path = d3.geoPath().projection(projection)

        const svg = d3
          .select("#earth-map")
          .attr("width", width)
          .attr("height", height)

        svg
          .selectAll("path")
          .data(countries.features)
          .enter()
          .append("path")
          .attr("d", path)
          .on("click", handleClick)

        function handleClick(country) {
          const center = path.centroid(country)
          svg
            .append("circle")
            .attr("cx", center[0])
            .attr("cy", center[1])
            .attr("r", 5)
            .style("fill", "red")
            .style("stroke", "black")
            .style("stroke-width", 1)
            .style("cursor", "pointer")
        }
      }
    )
  }, [])

  return <svg id="earth-map"></svg>
}

export default EarthMap
