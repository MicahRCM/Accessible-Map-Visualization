import { JENIDataProperties } from "../types/JENIDataProperties"
import { getColorForMetric } from "../utils/getColorForMetric"
import ZipcodeMetadata from "./ZipcodeMetadata"
import PercentileKeys from "./PercentileKeys"
import AccessibleVisualizationPanel from "./AccessibleVisualizationPanel"

type MetricKeys = "jenipctl" | "systempctl" | "driverspctl" | "riskpctl"
type Metric = MetricKeys | "none"
type RankKeys = "jenicategory" | "systemcategory" | "driverscategory" | "riskcategory"

const metricOptions: {
  metricKey: MetricKeys
  label: string
  rankKey: RankKeys
}[] = [
  { metricKey: "jenipctl", label: "Justice Equity Need Index", rankKey: "jenicategory" },
  { metricKey: "systempctl", label: "System Involvement", rankKey: "systemcategory" },
  { metricKey: "driverspctl", label: "Inequity Drivers", rankKey: "driverscategory" },
  { metricKey: "riskpctl", label: "Criminalization Risk", rankKey: "riskcategory" },
]

const ZipCodeInfoPanel = ({
  area,
  selectedMetric,
  setSelectedMetric,
}: {
  area: JENIDataProperties | null
  selectedMetric: string
  setSelectedMetric: (metric: Metric) => void
}) => {
  if (!area) return null

  const formatPercentile = (value: number) => value.toFixed(1)

  return (
    <div className="legend-parent-container absolute bottom-5 left-5 bg-white p-4 rounded-lg max-h-[90vh] w-[28em] overflow-auto">
      <div className="font-bold text-xl mb-4" data-testid="selected-area-zip">
        Zip Code: {area.zip}
      </div>
      <div className="grid grid-cols-1 gap-2">
        <div> Percentiles </div>
        {metricOptions.map((option) => {
          const value = area[option.metricKey]
          const rank = area[option.rankKey]
          const isSelected = option.metricKey === selectedMetric
          const optionClasses = isSelected
            ? "flex items-center p-2 rounded bg-gray-200"
            : "flex items-center p-2 rounded transition-colors duration-150 ease-in-out hover:bg-gray-100 cursor-pointer" // non-selected metrics

          return (
            <div
              key={option.metricKey}
              data-testid={`metric-option-${option.metricKey}`}
              className={optionClasses}
              onClick={() => setSelectedMetric(option.metricKey)}
            >
              <div
                className="w-6 h-6 flex-shrink-0 rounded-full mr-2"
                style={{ backgroundColor: getColorForMetric(value) }}
              ></div>
              <div className="text-sm font-semibold flex-grow">{option.label}:&nbsp;</div>
              <div className="text-sm">{formatPercentile(value)}</div>
              &nbsp;
              <div className="text-sm font-medium text-gray-600">({rank})</div>
            </div>
          )
        })}
        <button className="mb-2 hover:text-sky-400" onClick={() => setSelectedMetric("none")}>
          {" "}
          Clear (Select None){" "}
        </button>
      </div>
      <hr></hr>
      <ZipcodeMetadata {...area} />
      <div className="flex flex-col md:flex-row">
        <PercentileKeys />
        <AccessibleVisualizationPanel />
      </div>
    </div>
  )
}

export default ZipCodeInfoPanel
