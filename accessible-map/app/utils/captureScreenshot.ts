import html2canvas from "html2canvas"

export const captureScreenshot = async () => {
  const mapElement = document.getElementById("map-root")
  if (!mapElement) return
  const canvas = await html2canvas(mapElement)
  const imageURL = canvas.toDataURL("image/png")
  return imageURL
}
