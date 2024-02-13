const legendCategories = [
  { label: "Highest", color: "#8821b8" },
  { label: "High", color: "#bf80ff" },
  { label: "Moderate", color: "#cc99ff" },
  { label: "Low", color: "#d9b3ff" },
  { label: "Lowest", color: "#e6ccff" },
]

const PercentileKeys = () => {
  return (
    <div className="legend-container bg-white p-4 rounded-lg">
      <div className="font-bold"> Key </div>
      {legendCategories.map((category) => (
        <div key={category.label} className="flex items-center mt-1">
          <div
            className="w-6 h-6 rounded-full mr-2"
            style={{ backgroundColor: category?.color }}
          ></div>
          <div>{category.label}</div>
        </div>
      ))}
    </div>
  )
}

export default PercentileKeys
