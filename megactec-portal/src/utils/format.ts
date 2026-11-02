const dateFormat = new Intl.DateTimeFormat('pt-PT', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
  timeZone: 'Europe/Lisbon',
})

const dateTimeFormat = new Intl.DateTimeFormat('pt-PT', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  timeZone: 'Europe/Lisbon',
})

export function formatDate(value: string | null, includeTime = false): string {
  if (!value) return 'Não disponível'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return 'Não disponível'
  return (includeTime ? dateTimeFormat : dateFormat).format(date)
}

export function searchText(value: string): string {
  return value
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLocaleLowerCase('pt-PT')
}
