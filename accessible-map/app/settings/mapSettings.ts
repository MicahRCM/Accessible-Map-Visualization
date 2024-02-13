import { AnyLayer, LngLatLike, AnySourceData } from "mapbox-gl"

export const MAPBOX_STYLE_URL = "mapbox://styles/mapbox/navigation-day-v1"
export const MAP_CENTER_COORDINATES: LngLatLike = [-118.5437, 34.258]
export const MAP_INITIAL_ZOOM_SETTING = 8.5
export const COLOR_SCHEME = ["#e6ccff", 20, "#d9b3ff", 40, "#cc99ff", 60, "#bf80ff", 80, "#8821b8"]

export const MAP_SOURCES: { [key: string]: AnySourceData } = {
  "la-county-boundary": {
    type: "geojson",
    data: "LA_County_Boundary_Feature_Layer.geojson",
  },
  "jeni-data": {
    type: "geojson",
    data: "Justice_Equity_Need_Index_(zip_code).geojson",
  },
}

export const LAYER_SETTINGS: { [key: string]: AnyLayer } = {
  "jeni-layer": {
    id: "jeni-layer",
    type: "fill",
    source: "jeni-data",
    paint: {
      "fill-color": ["step", ["get", "jenipctl"], ...COLOR_SCHEME],
      "fill-opacity": 1,
    },
  },
  "jeni-borders": {
    id: "jeni-borders",
    source: "jeni-data",
    type: "line",
    layout: {},
    paint: {
      "line-color": "#000000",
      "line-width": 0.6,
    },
  },
  "la-county-borders": {
    id: "la-county-borders",
    type: "line",
    source: "la-county-boundary",
    layout: {},
    paint: {
      "line-color": "#000000",
      "line-width": 0.6,
    },
  },
}

export const HIGHLIGHT_LAYER: AnyLayer = {
  id: "border-highlight-layer",
  type: "line",
  source: "jeni-data",
  layout: {},
  paint: {
    "line-color": "#ffffff",
    "line-width": 2,
    "line-opacity": 1,
  },
  filter: ["in", "OBJECTID", ""], // Initial filter to show nothing
}
