export type ChartType = "simplebarchart"

export interface IChartConfig {
  title: string
  chartType: ChartType
  transFormerFunc: (data: any[]) => any[]
  xField: string
  yField: string
}
