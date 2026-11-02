// Portal-facing contract. These fields and labels are not a validated Sage schema.
export type StatusTone = 'neutral' | 'info' | 'warning' | 'success'

export interface Equipment {
  id: string
  name: string
  brand: string | null
  model: string | null
  serialNumber: string | null
}

export interface RepairSummary {
  id: string
  displayNumber: string
  equipment: Equipment
  status: { label: string; tone: StatusTone }
  isClosed: boolean
  openedAt: string | null
  updatedAt: string | null
}

export interface RepairDetail extends RepairSummary {
  problemDescription: string | null
  publicNotes: { id: string; text: string; publishedAt: string | null }[]
}
