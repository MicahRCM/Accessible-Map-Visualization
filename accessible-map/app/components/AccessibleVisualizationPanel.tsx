import { useState } from "react"
import { captureScreenshot } from "../utils/captureScreenshot"
import { getImageDescription } from "../utils/retrieveImageDescription"

const AccessibleVisualizationPanel = () => {
  const [mapDescription, setMapDescription] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleDescribeMap = async () => {
    setIsLoading(true)
    const imageUrl = await captureScreenshot()
    // Resets loading state if no image URL.
    if (!imageUrl) {
      setIsLoading(false)
      return
    }
    // Calling image description utility function
    const description = await getImageDescription({ imageUrl })
    setMapDescription(description.data.response)
    setIsLoading(false)
  }

  return (
    <div className="description-container flex flex-col items-start ml-4 mt-4 md:mt-0">
      <button
        onClick={handleDescribeMap}
        className="mb-2 bg-purple-500 hover:bg-purple-700 text-white py-2 px-4 rounded cursor-pointer mt-4"
        disabled={isLoading}
      >
        {isLoading ? "Generating Description..." : "Generate Visual Description"}{" "}
      </button>
      {mapDescription && (
        <div className="map-description mt-1 text-sm p-4 bg-gray-100 rounded-lg overflow-y-auto max-h-32">
          <strong>Description:</strong>
          <p>{mapDescription}</p>
        </div>
      )}
    </div>
  )
}

export default AccessibleVisualizationPanel
