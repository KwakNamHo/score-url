export type ScanResult = {
  url: string
  score: number
  status: 'safe' | 'warning' | 'danger'
  detail: string
}
