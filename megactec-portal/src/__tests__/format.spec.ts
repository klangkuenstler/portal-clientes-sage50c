import { describe, expect, it } from 'vitest'
import { formatDate } from '@/utils/format'

describe('Portuguese date presentation', () => {
  it('handles missing and invalid dates without misleading fallback dates', () => {
    expect(formatDate(null)).toBe('Não disponível')
    expect(formatDate('invalid')).toBe('Não disponível')
  })

  it('uses the Lisbon date at a summer UTC day boundary', () => {
    expect(formatDate('2026-07-01T23:30:00Z')).toBe(formatDate('2026-07-02T01:00:00Z'))
    expect(formatDate('2026-07-01T23:30:00Z', true)).toContain('00:30')
  })
})
