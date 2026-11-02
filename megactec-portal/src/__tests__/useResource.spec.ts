import { effectScope, ref, nextTick } from 'vue'
import { describe, expect, it } from 'vitest'
import { useResource } from '@/composables/useResource'
import { ServiceError } from '@/services/repairs'

describe('resource request lifecycle', () => {
  it('does not restore stale data when an earlier request finishes after an access denial', async () => {
    let completeFirst!: (value: string[]) => void
    const first = new Promise<string[]>((resolve) => {
      completeFirst = resolve
    })
    const scenario = ref('normal')
    const scope = effectScope()
    const resource = scope.run(() =>
      useResource(
        () =>
          scenario.value === 'normal' ? first : Promise.reject(new ServiceError('unauthorised')),
        [scenario],
      ),
    )!

    try {
      scenario.value = 'unauthorised'
      await nextTick()
      await Promise.resolve()
      expect(resource.status.value).toBe('unauthorised')

      completeFirst(['outdated record'])
      await first
      expect(resource.data.value).toBeNull()
      expect(resource.status.value).toBe('unauthorised')
    } finally {
      scope.stop()
    }
  })

  it('ignores pending results after the owning scope is disposed', async () => {
    let complete!: (value: string) => void
    const pending = new Promise<string>((resolve) => {
      complete = resolve
    })
    const scope = effectScope()
    const resource = scope.run(() => useResource(() => pending, [ref(0)]))!
    scope.stop()
    complete('late result')
    await pending
    expect(resource.data.value).toBeNull()
  })
})
