import { onScopeDispose, ref, shallowRef, watch, type WatchSource } from 'vue'
import { ServiceError, type ServiceErrorCode } from '@/services/repairs'

export type ResourceStatus = 'loading' | 'ready' | ServiceErrorCode

export function useResource<T>(load: () => Promise<T>, dependencies: WatchSource[]) {
  const data = shallowRef<T | null>(null)
  const status = ref<ResourceStatus>('loading')
  let requestId = 0

  async function refresh() {
    const currentRequest = ++requestId
    status.value = 'loading'
    data.value = null
    try {
      const result = await load()
      if (currentRequest !== requestId) return
      data.value = result
      status.value = 'ready'
    } catch (error) {
      if (currentRequest !== requestId) return
      status.value = error instanceof ServiceError ? error.code : 'error'
    }
  }

  watch(dependencies, refresh, { immediate: true })
  onScopeDispose(() => requestId++)

  return { data, status, refresh }
}
