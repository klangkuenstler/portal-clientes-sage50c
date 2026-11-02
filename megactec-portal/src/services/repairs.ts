import type { RepairDetail, RepairSummary } from '@/types/repair'

export type ServiceErrorCode = 'error' | 'unauthorised' | 'unavailable' | 'not-found'

export class ServiceError extends Error {
  constructor(public readonly code: ServiceErrorCode) {
    super(code)
    this.name = 'ServiceError'
  }
}

export interface RepairService {
  list(): Promise<RepairSummary[]>
  get(id: string): Promise<RepairDetail>
}
