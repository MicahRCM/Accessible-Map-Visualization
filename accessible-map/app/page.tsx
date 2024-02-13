"use client"
import * as MapSettings from "./settings/mapSettings"
import mapboxgl from "mapbox-gl"
import Legend from "./components/ZipCodeInfoPanel"
import { useEffect, useRef, useState } from "react"
import { JENIDataProperties } from "./types/JENIDataProperties"
import "mapbox-gl/dist/mapbox-gl.css"

export default function LACountyJENIVisualization() {
  const [selectedArea, setSelectedArea] = useState<JENIDataProperties | null>(null)
  const [selectedMetric, setSelectedMetric] = useState<string>("jenipctl")
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<mapboxgl.Map>()

  useEffect(() => {
    if (mapContainerRef.current && !mapRef.current) {
      initializeMap(mapContainerRef.current, setSelectedArea)
    }
  }, [])

  useEffect(() => {
    const map = mapRef.current
    if (!map || !mapRef.current) return
    updateLayerPaintProperties(map, "jeni-layer", selectedMetric)
  }, [selectedMetric])

  const initializeMap = (
    container: HTMLDivElement,
    setSelectedArea: React.Dispatch<React.SetStateAction<JENIDataProperties | null>>
  ) => {
    // Prevents non-empty map container warning from Mapbox
    container.innerHTML = ""
    const map = new mapboxgl.Map({
      accessToken: process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN,
      container: container,
      style: MapSettings.MAPBOX_STYLE_URL,
      center: MapSettings.MAP_CENTER_COORDINATES,
      zoom: MapSettings.MAP_INITIAL_ZOOM_SETTING,
      preserveDrawingBuffer: true,
    })

    map.on("load", () => {
      // Adding sources from MapSettings.
      Object.entries(MapSettings.MAP_SOURCES).forEach(([sourceId, sourceConfig]) => {
        map.addSource(sourceId, sourceConfig)
      })

      // Adding layers from MapSettings.
      Object.values(MapSettings.LAYER_SETTINGS).forEach((layerConfig) => {
        map.addLayer(layerConfig)
      })

      map.addLayer(MapSettings.HIGHLIGHT_LAYER)

      // Updates focused area metadata.
      map.on("click", "jeni-layer", (e) => {
        const properties = e.features?.[0]?.properties
        properties && setSelectedArea(properties as JENIDataProperties)
      })

      map.on("mouseenter", "jeni-layer", () => {
        map.getCanvas().style.cursor = "pointer"
      })
      map.on("mouseleave", "jeni-layer", () => {
        map.getCanvas().style.cursor = ""
      })

      let selectedFeatureObjectId: string | number | null = null
      // Highlights border.
      map.on("click", "jeni-layer", (e) => {
        selectedFeatureObjectId = e.features?.[0]?.properties?.OBJECTID ?? null
        map.setFilter("border-highlight-layer", ["in", "OBJECTID", selectedFeatureObjectId ?? ""])
      })

      // Shows symbols and some area labels.
      const labelLayers = map.getStyle().layers.filter((layer) => layer.type === "symbol")
      labelLayers.forEach((layer) => {
        map.moveLayer(layer.id)
      })

      mapRef.current = map
    })
  }

  const updateLayerPaintProperties = (map: mapboxgl.Map, layerId: string, metric: string) => {
    if (metric === "none") {
      map.setPaintProperty(layerId, "fill-color", "rgba(0, 0, 0, 0)")
      return
    }
    map.setPaintProperty(layerId, "fill-color", [
      "step",
      ["get", selectedMetric],
      ...MapSettings.COLOR_SCHEME,
    ])
  }

  return (
    <div id="map-root">
      <div
        ref={mapContainerRef}
        style={{ height: "100vh", width: "100%" }}
        data-testid="map-container"
        id="map-container"
      />
      <Legend
        area={selectedArea}
        selectedMetric={selectedMetric}
        setSelectedMetric={setSelectedMetric}
      />
    </div>
  )
}
