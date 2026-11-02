import { afterEach, beforeEach, describe, it, expect, vi } from 'vitest'
import { flushPromises, mount, type VueWrapper } from '@vue/test-utils'
import { createPinia } from 'pinia'
import App from '../App.vue'
import router from '@/router'
import { useDemoStore } from '@/stores/demo'

let wrapper: VueWrapper

async function settleRequest() {
  await flushPromises()
  await vi.advanceTimersByTimeAsync(400)
  await flushPromises()
}

async function openPage(path: string) {
  await router.push(path)
  await router.isReady()
  wrapper = mount(App, { global: { plugins: [createPinia(), router] } })
}

beforeEach(() => {
  vi.useFakeTimers()
  vi.spyOn(window, 'scrollTo').mockImplementation(() => {})
})

afterEach(() => {
  wrapper?.unmount()
  vi.useRealTimers()
  vi.restoreAllMocks()
})

describe('repair tracking demo', () => {
  it('shows loading, the demo disclosure, and a navigable repair detail', async () => {
    await openPage('/')
    expect(wrapper.text()).toContain('A carregar reparações')
    expect(wrapper.text()).toContain('sem ligação ao Sage')
    await settleRequest()

    await wrapper.get('a[href="/reparacoes/demo-repair-1"]').trigger('click')
    await vi.dynamicImportSettled()
    await settleRequest()

    expect(wrapper.get('h1').text()).toBe('DEMO-2026-0042')
    expect(wrapper.text()).toContain('A aguardar peça')
    expect(wrapper.text()).toContain('DEMO-MLR-001')
    expect(wrapper.text()).toContain('A peça necessária à reparação foi encomendada.')
  })

  it('combines accent-insensitive search with process filters and can reset them', async () => {
    await openPage('/reparacoes')
    await settleRequest()
    await wrapper.get('#repair-search').setValue('maquina')
    await wrapper.get('#repair-filter').setValue('closed')
    await flushPromises()

    expect(wrapper.text()).toContain('1 reparação encontrada')
    expect(wrapper.text()).toContain('DEMO-2026-0011')
    expect(wrapper.text()).not.toContain('DEMO-2026-0042')

    await wrapper.get('#repair-search').setValue('inexistente')
    expect(wrapper.text()).toContain('Nenhuma reparação encontrada')
    const reset = wrapper.findAll('button').find((button) => button.text() === 'Limpar filtros')!
    await reset.trigger('click')
    await flushPromises()
    expect(wrapper.text()).toContain('4 reparações encontradas')
  })

  it('clears displayed records on denied access and recovers when the scenario changes', async () => {
    await openPage('/reparacoes/demo-repair-1')
    await settleRequest()
    expect(wrapper.text()).toContain('DEMO-MLR-001')

    useDemoStore().scenario = 'unauthorised'
    await flushPromises()
    expect(wrapper.text()).not.toContain('DEMO-MLR-001')
    await settleRequest()
    expect(wrapper.text()).toContain('Acesso não autorizado')

    useDemoStore().scenario = 'normal'
    await settleRequest()
    expect(wrapper.text()).toContain('DEMO-MLR-001')
  })

  it('handles empty, error, and unavailable scenarios without showing sample records', async () => {
    await openPage('/reparacoes')
    for (const [scenario, text] of [
      ['empty', 'Ainda não existem reparações'],
      ['error', 'Não foi possível carregar os dados'],
      ['unavailable', 'Serviço temporariamente indisponível'],
    ] as const) {
      useDemoStore().scenario = scenario
      await settleRequest()
      expect(wrapper.text()).toContain(text)
      expect(wrapper.text()).not.toContain('DEMO-2026-0042')
    }
    const retry = wrapper
      .findAll('button')
      .find((button) => button.text().includes('Tentar novamente'))!
    await retry.trigger('click')
    expect(wrapper.text()).toContain('A carregar reparações')
    await settleRequest()
    expect(wrapper.text()).toContain('Serviço temporariamente indisponível')
  })

  it('reloads reused detail routes and handles missing optional data and unknown IDs', async () => {
    await openPage('/reparacoes/demo-repair-2')
    await settleRequest()
    expect(wrapper.text()).toContain('Ainda não existem notas públicas')
    await router.push('/reparacoes/demo-repair-3')
    await settleRequest()
    expect(wrapper.get('h1').text()).toBe('DEMO-2026-0038')
    expect(wrapper.text()).toContain('A descrição do problema não está disponível.')
    expect(wrapper.text()).not.toContain('DEMO-MLL-002')
    await router.push('/reparacoes/not-a-demo-record')
    await settleRequest()
    expect(wrapper.text()).toContain('Reparação não encontrada')
    expect(wrapper.text()).not.toContain('DEMO-2026-0038')
  })

  it('offers a way back from unknown routes', async () => {
    await openPage('/pagina-inexistente')
    expect(wrapper.get('h1').text()).toBe('Página não encontrada')
    expect(wrapper.get('main a').attributes('href')).toBe('/')
  })
})
