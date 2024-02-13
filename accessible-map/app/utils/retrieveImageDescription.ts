import axios from "axios"

export const getImageDescription = async (data: { imageUrl: string }) => {
  const response = await axios.post("/api/getVisualizationDescription", data, {
    headers: {
      "Content-Type": "application/json",
    },
  })
  return response
}
