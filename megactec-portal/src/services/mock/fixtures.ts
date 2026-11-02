import type { Equipment, RepairDetail } from '@/types/repair'

// Entirely synthetic: one demo customer's records, with illustrative status labels.
const washer: Equipment = {
  id: 'demo-equipment-1',
  name: 'Máquina de lavar roupa',
  brand: 'Bosch',
  model: 'Modelo de demonstração A',
  serialNumber: 'DEMO-MLR-001',
}

const dishwasher: Equipment = {
  id: 'demo-equipment-2',
  name: 'Máquina de lavar loiça',
  brand: 'Siemens',
  model: 'Modelo de demonstração B',
  serialNumber: 'DEMO-MLL-002',
}

const oven: Equipment = {
  id: 'demo-equipment-3',
  name: 'Forno elétrico',
  brand: 'Teka',
  model: null,
  serialNumber: null,
}

export const demoRepairs: RepairDetail[] = [
  {
    id: 'demo-repair-1',
    displayNumber: 'DEMO-2026-0042',
    equipment: washer,
    status: { label: 'A aguardar peça', tone: 'warning' },
    isClosed: false,
    openedAt: '2026-10-20T09:30:00Z',
    updatedAt: '2026-10-29T14:20:00Z',
    problemDescription: 'O equipamento não escoa a água no final do programa de lavagem.',
    publicNotes: [
      {
        id: 'demo-note-1',
        text: 'A peça necessária à reparação foi encomendada. A data de conclusão ainda não está disponível.',
        publishedAt: '2026-10-29T14:20:00Z',
      },
      {
        id: 'demo-note-2',
        text: 'O equipamento foi recebido e encaminhado para diagnóstico.',
        publishedAt: '2026-10-20T09:30:00Z',
      },
    ],
  },
  {
    id: 'demo-repair-2',
    displayNumber: 'DEMO-2026-0045',
    equipment: dishwasher,
    status: { label: 'Em diagnóstico', tone: 'info' },
    isClosed: false,
    openedAt: '2026-10-27T10:00:00Z',
    updatedAt: '2026-10-28T11:45:00Z',
    problemDescription: 'A máquina interrompe o programa antes de terminar.',
    publicNotes: [],
  },
  {
    id: 'demo-repair-3',
    displayNumber: 'DEMO-2026-0038',
    equipment: oven,
    status: { label: 'Pronta para entrega', tone: 'success' },
    isClosed: false,
    openedAt: '2026-10-15T14:00:00Z',
    updatedAt: '2026-10-26T16:10:00Z',
    problemDescription: null,
    publicNotes: [
      {
        id: 'demo-note-3',
        text: 'A reparação e os testes foram concluídos. Contacte a Megactec para combinar a entrega do equipamento.',
        publishedAt: '2026-10-26T16:10:00Z',
      },
    ],
  },
  {
    id: 'demo-repair-4',
    displayNumber: 'DEMO-2026-0011',
    equipment: washer,
    status: { label: 'Concluída', tone: 'neutral' },
    isClosed: true,
    openedAt: '2026-03-02T10:00:00Z',
    updatedAt: '2026-03-09T15:00:00Z',
    problemDescription: 'Verificação de ruído durante a centrifugação.',
    publicNotes: [
      {
        id: 'demo-note-4',
        text: 'O equipamento foi entregue após a conclusão da reparação.',
        publishedAt: '2026-03-09T15:00:00Z',
      },
    ],
  },
]
