import { createMockRepairService, type DemoScenario } from './mock/repairs'
import type { RepairService } from './repairs'

// Replace here with an authenticated backend adapter once its contract is agreed.
// A production adapter must enforce customer isolation on the server.
export function getRepairService(scenario: DemoScenario): RepairService {
  return createMockRepairService(scenario)
}
