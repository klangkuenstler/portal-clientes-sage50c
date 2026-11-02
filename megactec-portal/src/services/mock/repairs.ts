import { ServiceError, type RepairService } from '@/services/repairs'
import { demoRepairs } from './fixtures'

export type DemoScenario = 'normal' | 'empty' | 'error' | 'unauthorised' | 'unavailable'

export function createMockRepairService(scenario: DemoScenario, delayMs = 350): RepairService {
  async function records() {
    await new Promise((resolve) => setTimeout(resolve, delayMs))
    if (scenario === 'error' || scenario === 'unauthorised' || scenario === 'unavailable') {
      throw new ServiceError(scenario)
    }
    return scenario === 'empty' ? [] : structuredClone(demoRepairs)
  }

  return {
    async list() {
      return (await records()).map((repair) => ({
        id: repair.id,
        displayNumber: repair.displayNumber,
        equipment: repair.equipment,
        status: repair.status,
        isClosed: repair.isClosed,
        openedAt: repair.openedAt,
        updatedAt: repair.updatedAt,
      }))
    },
    async get(id) {
      const repair = (await records()).find((item) => item.id === id)
      if (!repair) throw new ServiceError('not-found')
      return repair
    },
  }
}
