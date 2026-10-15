# Portal do Cliente — Megactec
## Requisitos funcionais

**Estado:** Proposta de âmbito para o MVP

## 1. Objetivo

O Portal do Cliente da Megactec permitirá aos clientes consultar as suas reparações e acompanhar a evolução do respetivo estado, reduzindo a necessidade de contactar a empresa para obter atualizações.

O portal funcionará como uma interface de consulta integrada com o Sage 50c. Os dados empresariais continuarão a ser geridos no Sage.

## 2. Âmbito

### Incluído no MVP

- Registo e autenticação de clientes.
- Associação da conta do portal a um cliente existente no Sage.
- Dashboard com resumo das reparações.
- Consulta da lista e dos detalhes das reparações.
- Consulta do estado atual, da última atualização e das observações destinadas ao cliente.
- Consulta do equipamento associado à reparação.
- Apresentação da evolução dos estados, quando os dados necessários estiverem disponíveis.
- Notificações por email quando o estado de uma reparação mudar.
- Integração com o Sage 50c para obter os dados necessários.
- Controlo de acesso para proteger os dados de cada cliente.

### Fora do MVP

As seguintes funcionalidades ficam fora do âmbito inicial: autenticação através de Google ou Apple, notificações por SMS, criação de pedidos de assistência, aceitação ou rejeição de orçamentos, pagamentos online, mensagens ou chat no portal e gestão administrativa completa.

## 3. Prioridades

| Prioridade | Significado |
|---|---|
| **Alta** | Necessário para o MVP |
| **Média** | Evolução possível, se houver tempo e condições técnicas |
| **Baixa** | Funcionalidade futura |

## 4. Requisitos funcionais

### 4.1. Autenticação e contas

| Código | Requisito | Prioridade | Ator |
|---|---|---|---|
| RF01 | O sistema deve permitir que um cliente crie uma conta no portal. | Alta | Cliente |
| RF02 | O sistema deve associar a conta a um único cliente existente no Sage. | Alta | Sistema |
| RF03 | O sistema deve permitir que o cliente inicie sessão. | Alta | Cliente |
| RF04 | O sistema deve permitir a recuperação do acesso à conta. | Média | Cliente |
| RF05 | O sistema deve permitir que o cliente termine a sessão. | Alta | Cliente |
| RF06 | O sistema poderá permitir autenticação através de uma conta Google. | Baixa | Cliente |
| RF07 | O sistema poderá permitir autenticação através de uma conta Apple. | Baixa | Cliente |

### 4.2. Dashboard

| Código | Requisito | Prioridade | Ator |
|---|---|---|---|
| RF08 | O sistema deve apresentar um resumo da informação relevante para o cliente. | Alta | Cliente |
| RF09 | O sistema deve apresentar as reparações em curso. | Alta | Cliente |
| RF10 | O sistema deve identificar visualmente o estado atual de cada reparação. | Alta | Cliente |
| RF11 | O sistema deve permitir aceder aos detalhes de uma reparação a partir do dashboard. | Alta | Cliente |
| RF12 | O sistema deve apresentar a data da última atualização relevante. | Alta | Cliente |

### 4.3. Processos de assistência

| Código | Requisito | Prioridade | Ator |
|---|---|---|---|
| RF13 | O sistema deve apresentar a lista de processos de assistência associados ao cliente. | Alta | Cliente |
| RF14 | O sistema deve permitir consultar os detalhes de um processo de assistência. | Alta | Cliente |
| RF15 | O sistema deve apresentar o identificador do pedido de assistência utilizado pela Megactec. | Alta | Cliente |
| RF16 | O sistema deve apresentar a data de abertura do processo, quando disponível. | Média | Cliente |
| RF17 | O sistema deve apresentar o estado atual do processo, obtido a partir do Sage. | Alta | Cliente |
| RF18 | O sistema deve apresentar a data da última atualização do processo, quando disponível. | Média | Cliente |
| RF19 | O sistema deve apresentar a descrição do problema, quando disponível. | Alta | Cliente |
| RF20 | O sistema deve apresentar as observações destinadas ao cliente. | Alta | Cliente |
| RF21 | O sistema deve impedir a apresentação de observações privadas ou informação exclusivamente interna. | Alta | Sistema |
| RF22 | O sistema deve apresentar o equipamento associado ao processo. | Alta | Cliente |

### 4.4. Estados das reparações

| Código | Requisito | Prioridade | Ator |
|---|---|---|---|
| RF23 | O sistema deve obter do Sage o estado atual de cada processo. | Alta | Sistema |
| RF24 | O sistema deve apresentar o estado atual de forma clara. | Alta | Cliente |
| RF25 | O sistema deve mapear os estados internos do Sage para designações compreensíveis no portal. | Alta | Sistema |
| RF26 | O sistema deve apresentar o histórico de estados do processo. | Alta | Cliente |
| RF27 | O sistema deve representar visualmente o estado através de texto e elementos visuais. | Alta | Cliente |
| RF28 | O sistema deve atualizar a informação apresentada quando o estado do processo mudar no Sage. | Alta | Sistema |

As designações apresentadas ao cliente devem ser definidas a partir dos estados efetivamente configurados no Sage da Megactec. Exemplos possíveis incluem «Pedido recebido», «Em reparação», «A aguardar peça» e «Concluído».

### 4.5. Equipamentos

| Código | Requisito | Prioridade | Ator |
|---|---|---|---|
| RF29 | O sistema deve identificar o equipamento associado a uma reparação. | Alta | Cliente |
| RF30 | O sistema deve apresentar a marca, o modelo e o número de série, quando disponíveis. | Alta | Cliente |
| RF31 | O sistema poderá apresentar o código industrial, quando relevante. | Baixa | Cliente |
| RF32 | O sistema poderá apresentar informação de garantia, quando disponível. | Média | Cliente |
| RF33 | O sistema poderá permitir consultar processos anteriores associados ao equipamento. | Média | Cliente |

A gestão dos equipamentos — criação, edição ou eliminação — continuará a ser efetuada no Sage.

### 4.6. Orçamentos

| Código | Requisito | Prioridade | Ator |
|---|---|---|---|
| RF34 | O sistema poderá permitir consultar um orçamento associado a um processo. | Média | Cliente |
| RF35 | O sistema poderá apresentar o valor total do orçamento. | Média | Cliente |
| RF36 | O sistema poderá apresentar o estado do orçamento. | Média | Cliente |

A aceitação ou rejeição de orçamentos, a assinatura digital e os pagamentos não fazem parte do MVP.

### 4.7. Faturas e documentos

| Código | Requisito | Prioridade | Ator |
|---|---|---|---|
| RF37 | O sistema poderá permitir consultar uma fatura associada a um processo. | Média | Cliente |
| RF38 | O sistema poderá permitir visualizar documentos disponibilizados ao cliente. | Média | Cliente |
| RF39 | O sistema poderá permitir descarregar documentos. | Baixa | Cliente |

Se não for possível obter documentos automaticamente através do Sage, a consulta dos dados principais da fatura poderá ser considerada numa fase posterior.

### 4.8. Notificações

| Código | Requisito | Prioridade | Ator |
|---|---|---|---|
| RF40 | O sistema deve apresentar notificações no portal sobre atualizações relevantes. | Alta | Sistema |
| RF41 | O sistema deve enviar um email quando ocorrer uma atualização configurada. | Alta | Sistema |
| RF42 | O sistema deve gerar uma notificação quando o estado de um processo mudar. | Alta | Sistema |
| RF43 | O sistema poderá permitir consultar notificações anteriores. | Média | Cliente |
| RF44 | O sistema poderá enviar notificações por SMS. | Baixa | Sistema |
| RF45 | O sistema poderá permitir configurar preferências de notificação. | Baixa | Cliente |

As notificações por SMS dependem de um serviço externo e ficam fora do MVP.

### 4.9. Contacto

| Código | Requisito | Prioridade | Ator |
|---|---|---|---|
| RF46 | O sistema deve disponibilizar os meios de contacto da Megactec. | Média | Cliente |
| RF47 | O sistema deve permitir aceder à página de contacto da Megactec. | Média | Cliente |

O portal não incluirá um sistema próprio de mensagens. O contacto será encaminhado para [megactec.pt/contact](https://megactec.pt/contact).

### 4.10. Segurança e controlo de acesso

| Código | Requisito | Prioridade | Ator |
|---|---|---|---|
| RF48 | O sistema deve garantir que cada cliente apenas consulta os seus próprios dados. | Alta | Sistema |
| RF49 | O sistema deve garantir que cada cliente apenas consulta os seus próprios processos de assistência. | Alta | Sistema |
| RF50 | O sistema deve garantir que cada cliente apenas consulta os equipamentos a que tem acesso. | Alta | Sistema |
| RF51 | O sistema deve impedir o acesso a documentos pertencentes a outros clientes. | Alta | Sistema |
| RF52 | O sistema deve impedir a exposição de informação interna do Sage. | Alta | Sistema |

### 4.11. Integração com o Sage 50c

| Código | Requisito | Prioridade | Ator |
|---|---|---|---|
| RF53 | O sistema deve obter do Sage os dados necessários para identificar o cliente associado à conta. | Alta | Sistema |
| RF54 | O sistema deve obter os equipamentos associados ao cliente. | Alta | Sistema |
| RF55 | O sistema deve obter os processos de assistência associados ao cliente. | Alta | Sistema |
| RF56 | O sistema deve obter os estados atuais dos processos. | Alta | Sistema |
| RF57 | O sistema deve atualizar a informação do portal de acordo com os dados disponíveis no Sage. | Alta | Sistema |
| RF58 | O sistema deve tratar falhas de comunicação ou indisponibilidade do Sage sem expor informação indevida. | Alta | Sistema |
| RF59 | O sistema poderá obter orçamentos através do Sage, se a integração o permitir. | Média | Sistema |
| RF60 | O sistema poderá obter documentos através do Sage, se a integração o permitir. | Média | Sistema |

A integração deve limitar-se aos dados necessários para o portal, sem exigir a sincronização integral da base de dados do Sage.

## 5. Resumo das prioridades

| Módulo | Alta | Média | Baixa |
|---|---:|---:|---:|
| Autenticação e contas | 4 | 1 | 2 |
| Dashboard | 5 | 0 | 0 |
| Processos de assistência | 8 | 2 | 0 |
| Estados das reparações | 6 | 0 | 0 |
| Equipamentos | 2 | 2 | 1 |
| Orçamentos | 0 | 3 | 0 |
| Faturas e documentos | 0 | 2 | 1 |
| Notificações | 3 | 1 | 2 |
| Contacto | 0 | 2 | 0 |
| Segurança e controlo de acesso | 5 | 0 | 0 |
| Integração com o Sage | 6 | 2 | 0 |
| **Total** | **39** | **15** | **6** |

## 6. Fluxo principal

1. O cliente inicia sessão no portal.
2. Consulta o dashboard e a lista de reparações.
3. Abre uma reparação e consulta o estado, o equipamento e as observações disponíveis.
4. O estado da reparação é alterado no Sage.
5. O portal atualiza a informação apresentada.
6. O cliente recebe uma notificação por email.

## 7. Critério de âmbito

O desenvolvimento deve privilegiar os requisitos de prioridade alta. Os requisitos de prioridade média só deverão ser implementados depois de o fluxo principal estar funcional e testado. Os requisitos de prioridade baixa ficam reservados para evolução futura.

O objetivo do MVP é disponibilizar um portal de acompanhamento de reparações integrado com o Sage 50c, com consulta segura da informação e notificações sobre alterações relevantes.
