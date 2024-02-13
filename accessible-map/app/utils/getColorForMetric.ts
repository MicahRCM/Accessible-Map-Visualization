export const getColorForMetric = (percentile: number): string => {
  if (percentile <= 20) return "#e6ccff"
  if (percentile <= 40) return "#d9b3ff"
  if (percentile <= 60) return "#cc99ff"
  if (percentile <= 80) return "#bf80ff"
  return "#8821b8"
}
