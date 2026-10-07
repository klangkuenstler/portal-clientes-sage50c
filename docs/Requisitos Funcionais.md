# Portal do Cliente — Megactec

## Documentação de Requisitos Funcionais

**Projeto:** Portal do Cliente integrado com Sage 50c  
**Empresa:** Megactec  
**Versão:** 0.1 — Documento de trabalho  
**Data:** 07/10/2026

---

## 1. Objetivo do documento

Este documento define os requisitos funcionais iniciais para o desenvolvimento do Portal do Cliente da Megactec.

O portal tem como objetivo permitir que os clientes consultem, num único local, informação relacionada com os seus equipamentos, processos de assistência, estados das reparações, orçamentos, documentos e notificações.

O **Sage 50c é considerado o sistema de origem dos dados empresariais**. O portal deverá apresentar uma visão simplificada e orientada ao cliente, não sendo uma cópia direta da interface ou da estrutura interna do Sage.

> **Nota:** Os requisitos deste documento são preliminares. Alguns requisitos dependem da análise da instalação Sage 50c da Megactec, da API/mecanismo de integração disponível e dos estados efetivamente configurados na empresa.

---

## 2. Âmbito do MVP

### Incluído

- Registo e autenticação de clientes
- Associação da conta do portal ao cliente existente no Sage
- Login através de Google e Apple
- Dashboard do cliente
- Consulta de equipamentos
- Consulta do histórico de assistência
- Consulta de processos de assistência
- Consulta dos estados das reparações
- Timeline do processo
- Consulta de orçamentos
- Consulta de documentos e faturas
- Notificações
- Contacto com a Megactec
- Controlo de acesso e isolamento dos dados
- Sincronização de informação relevante com o Sage

### Fora do âmbito inicial

- Criação de pedidos de assistência através do portal
- Adição de equipamentos pelo cliente
- Alteração dos dados do cliente pelo cliente
- Alteração dos dados dos equipamentos
- Aceitação/rejeição de orçamentos no portal
- Consulta de peças utilizadas na folha de obra
- Consulta de observações privadas
- Consulta do técnico responsável
- Gestão interna de processos pela Megactec

> **Nota:** Estes pontos podem ser considerados funcionalidades futuras.

---

# 3. Modelo conceptual

A informação apresentada ao cliente deverá seguir, conceptualmente, a seguinte relação:

```text
Cliente
   │
   └── Equipamento
          │
          └── Processo de Assistência / PAT
                  │
                  ├── Estado
                  ├── Observações públicas
                  ├── Orçamento
                  └── Documentos
```

No Sage, um equipamento pode apresentar vários movimentos/documentos, por exemplo:

```text
PAT → MR → NE → Fatura
```

O portal não deverá apresentar estes movimentos internos como entidades independentes ao cliente.

Deverá apresentar, sempre que possível, um **único processo de assistência**, agregando a informação relevante.

> **Nota:** A estrutura exata de documentos e relações deverá ser confirmada durante a análise da integração com o Sage.

---

# 4. Convenções

## 4.1 Prioridades

| Classificação | Significado |
|---|---|
| **Alta** | Funcionalidade essencial para o funcionamento do MVP |
| **Média** | Funcionalidade importante, mas que pode ser adiada |
| **Baixa** | Funcionalidade complementar ou futura |

## 4.2 Atores

| Ator | Descrição |
|---|---|
| **Cliente** | Utilizador final do portal |
| **Sistema** | Portal/backend e respetivos mecanismos automáticos |
| **Sage** | Sistema externo utilizado pela Megactec como fonte dos dados empresariais |

---

# 5. Requisitos Funcionais

## 5.1 Autenticação e contas

| Código | Identificação (Nome) | Classificação (Prioridade) | Ator | Objetivo (Descrição) |
|---|---|---|---|---|
| RF01 | Registo de cliente | Alta | Cliente | Permitir ao cliente criar uma conta no portal através do seu número de telemóvel. |
| RF02 | Associação da conta ao cliente Sage | Alta | Sistema | Associar a conta criada ao respetivo cliente existente no Sage através do email e/ou número de telefone. |
| RF03 | Autenticação por código | Alta | Cliente | Permitir ao cliente autenticar-se através de um código de verificação enviado para o número de telemóvel. |
| RF04 | Login com Google | Média | Cliente | Permitir ao cliente utilizar uma conta Google para autenticação no portal. |
| RF05 | Login com Apple | Média | Cliente | Permitir ao cliente utilizar uma conta Apple para autenticação no portal. |
| RF06 | Recuperação de acesso | Alta | Cliente | Permitir ao cliente recuperar o acesso à sua conta através de um mecanismo de verificação. |
| RF07 | Encerramento de sessão | Alta | Cliente | Permitir ao cliente terminar a sessão no portal. |

### Notas

- Cada conta do portal corresponde a **um único cliente Sage**.
- A associação deverá utilizar informação que permita identificar inequivocamente o cliente.
- O login social não deve permitir contornar a associação ao cliente Sage.
- O mecanismo final de validação deverá ser definido durante a implementação.

---

## 5.2 Dashboard

| Código | Identificação (Nome) | Classificação (Prioridade) | Ator | Objetivo (Descrição) |
|---|---|---|---|---|
| RF08 | Visualização do dashboard | Alta | Cliente | Apresentar ao cliente um resumo da sua informação relevante após a autenticação. |
| RF09 | Listagem de processos | Alta | Cliente | Apresentar os processos de assistência associados ao cliente. |
| RF10 | Identificação visual do estado | Alta | Cliente | Apresentar cada processo com uma indicação visual e colorida correspondente ao seu estado atual. |
| RF11 | Visualização de processos ativos | Alta | Cliente | Permitir ao cliente identificar rapidamente os processos que se encontram atualmente em curso. |
| RF12 | Visualização de orçamentos | Alta | Cliente | Apresentar no dashboard os orçamentos disponíveis associados ao cliente. |
| RF13 | Visualização de notificações | Média | Cliente | Apresentar no dashboard notificações e atualizações relevantes relacionadas com os processos do cliente. |

### Nota

O dashboard deverá privilegiar informação útil para o cliente e evitar a exposição de conceitos internos do Sage.

---

## 5.3 Equipamentos

| Código | Identificação (Nome) | Classificação (Prioridade) | Ator | Objetivo (Descrição) |
|---|---|---|---|---|
| RF14 | Listagem de equipamentos | Alta | Cliente | Apresentar os equipamentos associados ao cliente no Sage. |
| RF15 | Consulta de equipamento | Alta | Cliente | Permitir ao cliente consultar os dados de um equipamento. |
| RF16 | Consulta de dados técnicos | Alta | Cliente | Apresentar marca, modelo, número de série e código industrial do equipamento. |
| RF17 | Consulta de informação de garantia | Alta | Cliente | Apresentar o estado de garantia e informação relacionada com a aquisição do equipamento. |
| RF18 | Consulta de documento de compra | Média | Cliente | Apresentar a referência do documento associado à compra do equipamento, caso esta informação esteja disponível para o cliente. |
| RF19 | Consulta do histórico do equipamento | Alta | Cliente | Apresentar os processos de assistência associados ao equipamento, ordenados cronologicamente. |

### Notas

- Os equipamentos são **exclusivamente provenientes do Sage**.
- O cliente não poderá criar, editar ou eliminar equipamentos através do portal.
- O equipamento deverá manter a associação existente no Sage com o respetivo cliente.
- A informação do equipamento observada na instalação da Megactec inclui, entre outros, marca, modelo, código industrial, número de série, garantia, data de compra, documento de compra e lojista.
- Nem todos estes campos têm obrigatoriamente de ser apresentados ao cliente.

---

## 5.4 Processos de assistência

No contexto do portal, um **processo de assistência** corresponde a um Pedido de Assistência Técnica (PAT) associado a um equipamento.

| Código | Identificação (Nome) | Classificação (Prioridade) | Ator | Objetivo (Descrição) |
|---|---|---|---|---|
| RF20 | Listagem de processos de assistência | Alta | Cliente | Permitir ao cliente consultar os seus processos de assistência, incluindo processos concluídos. |
| RF21 | Consulta de processo | Alta | Cliente | Permitir ao cliente consultar os detalhes de um processo de assistência. |
| RF22 | Identificação do processo | Alta | Cliente | Apresentar o processo através de um identificador amigável correspondente ao número do Pedido de Assistência Técnica no Sage. |
| RF23 | Referência do processo Sage | Média | Sistema | Manter a correspondência entre o identificador apresentado no portal e o tipo, série e número do documento no Sage. |
| RF24 | Consulta do equipamento associado | Alta | Cliente | Apresentar o equipamento associado ao processo de assistência. |
| RF25 | Consulta da data de abertura | Alta | Cliente | Apresentar a data em que o processo de assistência foi registado. |
| RF26 | Consulta do estado atual | Alta | Cliente | Apresentar o estado atual do processo proveniente do Sage. |
| RF27 | Consulta do histórico de estados | Alta | Cliente | Apresentar a evolução do processo através de uma linha temporal. |
| RF28 | Consulta da última atualização | Alta | Cliente | Apresentar a data da última atualização relevante do processo. |
| RF29 | Consulta da descrição do problema | Alta | Cliente | Apresentar a descrição do problema associado ao processo, caso esteja disponível. |
| RF30 | Consulta do diagnóstico | Alta | Cliente | Apresentar o diagnóstico registado nas observações destinadas ao cliente. |
| RF31 | Consulta de observações públicas | Alta | Cliente | Apresentar as observações comuns destinadas à consulta do cliente. |
| RF32 | Ocultação de observações privadas | Alta | Sistema | Impedir que observações privadas ou informação exclusivamente interna sejam disponibilizadas ao cliente. |

### Notas

- O cliente **não cria um processo de assistência através do portal**.
- Um pedido continua a ser criado pelos meios utilizados atualmente pela Megactec.
- O portal funciona como camada de consulta sobre a informação existente no Sage.
- O número apresentado ao cliente deverá ser amigável, mas deverá permitir localizar inequivocamente o processo interno.
- O processo deverá estar associado ao equipamento e, indiretamente, ao cliente.
- As peças e outros artigos registados na folha de obra não devem ser expostos diretamente ao cliente.
- O técnico responsável não será apresentado no MVP.

---

## 5.5 Estados e ciclo de vida

| Código | Identificação (Nome) | Classificação (Prioridade) | Ator | Objetivo (Descrição) |
|---|---|---|---|---|
| RF33 | Deteção de alteração de estado | Alta | Sistema | Detetar alterações ao estado dos processos de assistência no Sage. |
| RF34 | Atualização do estado no portal | Alta | Sistema | Atualizar o estado apresentado ao cliente após uma alteração no Sage. |
| RF35 | Apresentação dos estados | Alta | Cliente | Apresentar ao cliente o estado atual do processo de assistência. |
| RF36 | Timeline da reparação | Alta | Cliente | Apresentar cronologicamente a evolução do processo através dos seus estados. |
| RF37 | Classificação visual dos estados | Alta | Sistema | Associar cada estado a uma representação visual adequada, incluindo cor e descrição. |
| RF38 | Notificação associada ao estado | Alta | Sistema | Permitir que determinados estados desencadeiem notificações ao cliente. |

### Notas

- Os estados deverão, preferencialmente, seguir os estados já configurados no Sage da Megactec.
- É necessário levantar a lista completa de estados existentes antes de finalizar este requisito.
- Alguns estados poderão ser internos e não deverão necessariamente ser apresentados com a mesma designação ao cliente.
- Poderá existir uma tabela de mapeamento:

```text
Estado Sage → Estado apresentado ao cliente → Cor → Notificação
```

- Exemplo já observado:

```text
A RECEBER
ENTREGUE / CONCLUÍDO
```

- O portal não deverá inventar estados que não tenham correspondência no sistema de origem.

---

## 5.6 Orçamentos

| Código | Identificação (Nome) | Classificação (Prioridade) | Ator | Objetivo (Descrição) |
|---|---|---|---|---|
| RF39 | Listagem de orçamentos | Alta | Cliente | Permitir ao cliente consultar os seus orçamentos. |
| RF40 | Consulta de orçamento | Alta | Cliente | Permitir ao cliente consultar os detalhes de um orçamento. |
| RF41 | Consulta dos itens do orçamento | Alta | Cliente | Apresentar os elementos que constituem o orçamento. |
| RF42 | Consulta de mão de obra | Alta | Cliente | Apresentar o valor de mão de obra incluído no orçamento, quando aplicável. |
| RF43 | Consulta do IVA | Média | Cliente | Apresentar o valor de IVA associado ao orçamento. |
| RF44 | Consulta do valor total | Alta | Cliente | Apresentar o valor total do orçamento. |
| RF45 | Consulta do estado do orçamento | Alta | Cliente | Apresentar o estado atual do orçamento. |

### Notas

- O cliente poderá **consultar** orçamentos.
- A aceitação ou rejeição do orçamento pelo portal está fora do MVP.
- A informação apresentada deverá corresponder aos dados disponibilizados pelo Sage.
- A apresentação deverá evitar expor informação interna ou preços de custo.

---

## 5.7 Documentos e faturas

| Código | Identificação (Nome) | Classificação (Prioridade) | Ator | Objetivo (Descrição) |
|---|---|---|---|---|
| RF46 | Listagem de documentos | Alta | Cliente | Permitir ao cliente consultar os documentos disponibilizados na sua conta. |
| RF47 | Consulta de documento | Alta | Cliente | Permitir ao cliente consultar um documento associado aos seus processos. |
| RF48 | Visualização de documento PDF | Alta | Cliente | Permitir ao cliente visualizar documentos disponibilizados em formato PDF. |
| RF49 | Download de documento | Alta | Cliente | Permitir ao cliente descarregar documentos disponibilizados no portal. |
| RF50 | Consulta de faturas | Alta | Cliente | Permitir ao cliente consultar as suas faturas. |
| RF51 | Associação de documentos ao processo | Alta | Sistema | Associar ao processo de assistência os documentos relevantes existentes no Sage. |

### Notas

- O cliente deverá conseguir consultar as faturas disponibilizadas.
- O documento poderá ser apresentado através de visualização ou download.
- Documentos internos do Sage não deverão ser expostos automaticamente.
- Uma sequência interna como `PAT → MR → NE → Fatura` deverá, quando adequado, ser apresentada no portal como um único processo de assistência com os documentos relevantes associados.

---

## 5.8 Notificações

| Código | Identificação (Nome) | Classificação (Prioridade) | Ator | Objetivo (Descrição) |
|---|---|---|---|---|
| RF52 | Geração de notificação | Alta | Sistema | Gerar uma notificação quando ocorrer um evento configurado para informar o cliente. |
| RF53 | Notificação por email | Alta | Sistema | Enviar ao cliente uma notificação por email relativa a uma atualização relevante. |
| RF54 | Notificação por SMS | Média | Sistema | Enviar ao cliente uma notificação por SMS relativa a uma atualização relevante. |
| RF55 | Notificação no portal | Alta | Sistema | Disponibilizar no portal uma notificação relativa a uma atualização do processo. |
| RF56 | Consulta de notificações | Alta | Cliente | Permitir ao cliente consultar as notificações recebidas. |
| RF57 | Preferências de notificação | Média | Cliente | Permitir ao cliente selecionar os canais através dos quais pretende receber notificações. |
| RF58 | Notificação de processo a aguardar peça | Alta | Sistema | Notificar o cliente quando o processo passar para o estado correspondente a aguardar uma peça. |

### Notas

- Os canais definidos para o MVP são:
  - Email
  - SMS
  - Notificação no próprio portal
- Nem todas as alterações de estado têm obrigatoriamente de gerar uma notificação.
- Deverá existir uma configuração que permita determinar quais os estados/eventos que geram notificações.
- O conteúdo da notificação deverá ser adequado ao cliente e não deverá expor informação interna.

---

## 5.9 Contacto com a Megactec

| Código | Identificação (Nome) | Classificação (Prioridade) | Ator | Objetivo (Descrição) |
|---|---|---|---|---|
| RF59 | Consulta dos meios de contacto | Alta | Cliente | Permitir ao cliente consultar os meios de contacto da Megactec. |
| RF60 | Contacto telefónico | Alta | Cliente | Disponibilizar o número de telefone da Megactec para contacto. |
| RF61 | Envio de mensagem | Média | Cliente | Permitir ao cliente enviar uma mensagem à Megactec através do portal. |
| RF62 | Encaminhamento de mensagem | Alta | Sistema | Enviar a mensagem submetida pelo cliente para `geral@megactec.pt`, juntamente com os dados necessários para identificar o cliente. |

### Notas

- O portal não será responsável pela criação de pedidos de assistência.
- O contacto através do portal será uma alternativa ao formulário existente em `megactec.pt/contact`.
- A mensagem deverá incluir informação suficiente para identificar o cliente.
- O email de destino definido atualmente é `geral@megactec.pt`.

---

## 5.10 Segurança e controlo de acesso

| Código | Identificação (Nome) | Classificação (Prioridade) | Ator | Objetivo (Descrição) |
|---|---|---|---|---|
| RF63 | Isolamento dos dados dos clientes | Alta | Sistema | Garantir que cada cliente apenas consegue consultar os dados associados à sua própria conta. |
| RF64 | Associação única de conta | Alta | Sistema | Garantir que cada conta do portal está associada a um único cliente Sage. |
| RF65 | Controlo de acesso aos processos | Alta | Sistema | Garantir que cada cliente apenas consegue consultar os seus próprios processos de assistência. |
| RF66 | Controlo de acesso aos equipamentos | Alta | Sistema | Garantir que cada cliente apenas consegue consultar os equipamentos associados à sua conta. |
| RF67 | Controlo de acesso aos documentos | Alta | Sistema | Garantir que os documentos de um cliente não podem ser consultados por outros clientes. |
| RF68 | Proteção da informação interna | Alta | Sistema | Impedir a exposição de informação interna do Sage ao cliente. |

### Nota

A segurança é especialmente importante porque o portal terá acesso a dados de clientes, processos, equipamentos, orçamentos e documentos.

---

## 5.11 Integração e sincronização com o Sage

| Código | Identificação (Nome) | Classificação (Prioridade) | Ator | Objetivo (Descrição) |
|---|---|---|---|---|
| RF69 | Sincronização de dados | Alta | Sistema | Obter do Sage os dados necessários para disponibilização no portal. |
| RF70 | Sincronização de clientes | Alta | Sistema | Sincronizar os clientes relevantes do Sage com as respetivas contas do portal. |
| RF71 | Sincronização de equipamentos | Alta | Sistema | Sincronizar os equipamentos associados aos clientes a partir do Sage. |
| RF72 | Sincronização de processos | Alta | Sistema | Sincronizar os pedidos de assistência e respetivos estados a partir do Sage. |
| RF73 | Sincronização de orçamentos | Alta | Sistema | Sincronizar os orçamentos disponibilizados ao cliente a partir do Sage. |
| RF74 | Sincronização de documentos | Alta | Sistema | Sincronizar os documentos disponibilizados ao cliente a partir do Sage. |
| RF75 | Atualização dos dados sincronizados | Alta | Sistema | Atualizar os dados do portal quando ocorrerem alterações no Sage. |

### Notas

O Sage deverá ser considerado a **fonte principal dos dados empresariais**.

O portal poderá possuir uma base de dados própria para:

- contas de utilizador;
- autenticação;
- associação entre conta e cliente Sage;
- preferências;
- notificações;
- sessões;
- informação técnica necessária à integração.

Não se pretende duplicar indiscriminadamente toda a base de dados do Sage.

---

# 6. Informação que não deve ser exposta ao cliente

Com base na análise da folha de obra e dos movimentos do equipamento, a informação interna do Sage deverá ser filtrada.

### Não apresentar no MVP

- Observações privadas
- Informação exclusivamente interna
- Peças utilizadas diretamente da folha de obra
- Preços de custo
- Movimentos internos do Sage
- Informação técnica interna não destinada ao cliente
- Identificação do técnico responsável

### Apresentar quando aplicável

- Estado da reparação
- Equipamento
- Descrição do problema
- Observações comuns destinadas ao cliente
- Diagnóstico destinado ao cliente
- Orçamentos
- Faturas
- Documentos disponibilizados ao cliente
- Histórico de assistência

> **Nota:** A distinção entre informação pública e privada deverá ser validada na configuração real do Sage da Megactec.

---

# 7. Relação entre Sage e Portal

A arquitetura funcional pretendida é:

```text
                    ┌─────────────────────┐
                    │      Sage 50c       │
                    │                     │
                    │ Clientes            │
                    │ Equipamentos        │
                    │ PAT                 │
                    │ Estados             │
                    │ Orçamentos          │
                    │ Documentos          │
                    └──────────┬──────────┘
                               │
                         Integração
                               │
                               ▼
                    ┌─────────────────────┐
                    │       Backend       │
                    │                     │
                    │ Sincronização       │
                    │ Autenticação        │
                    │ Regras de acesso    │
                    │ Notificações        │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   Portal Cliente    │
                    │                     │
                    │ Dashboard           │
                    │ Equipamentos        │
                    │ Processos           │
                    │ Orçamentos          │
                    │ Documentos          │
                    │ Notificações        │
                    └─────────────────────┘
```

---

# 8. Decisões de produto

| Tema | Decisão atual |
|---|---|
| Objetivo | Portal de consulta para clientes |
| Fonte principal dos dados empresariais | Sage 50c |
| Criação de pedidos no portal | Não |
| Criação de equipamentos no portal | Não |
| Edição dos dados do cliente | Não |
| Edição dos equipamentos | Não |
| Aceitação de orçamentos | Não no MVP |
| Histórico de reparações | Sim |
| Estados | Baseados nos estados do Sage |
| Timeline | Sim |
| Orçamentos | Consulta |
| Faturas | Consulta/download |
| Peças utilizadas | Não |
| Observações privadas | Não |
| Observações comuns | Sim, quando destinadas ao cliente |
| Técnico responsável | Não |
| Notificações | Sim |
| Email | Sim |
| SMS | Sim |
| Notificação no portal | Sim |
| Contacto | Sim |
| Criação de pedido de contacto | Email para Megactec |
| Conta | Uma conta por cliente |
| Google Login | Sim |
| Apple Login | Sim |
| Design | Estilo Megactec + moderno/minimalista |
| Plataforma principal | Desktop |
| Responsividade | Sim |
| Identificador do processo | Coincidente com o número interno |
| Equipamentos | Exclusivamente provenientes do Sage |

---

# 9. Questões em aberto

As seguintes questões devem ser resolvidas antes da especificação final:

- [ ] Levantar todos os estados atualmente configurados no Sage da Megactec.
- [ ] Determinar quais estados são apresentados ao cliente.
- [ ] Definir o nome amigável de cada estado.
- [ ] Definir a cor associada a cada estado.
- [ ] Definir quais estados geram notificações.
- [ ] Confirmar como a API/mecanismo de integração do Sage disponibiliza os PAT.
- [ ] Confirmar como são relacionados Cliente → Equipamento → PAT.
- [ ] Confirmar como são obtidos orçamentos através da integração.
- [ ] Confirmar como são obtidas as faturas/PDF.
- [ ] Confirmar como são identificadas as observações públicas e privadas.
- [ ] Definir o mecanismo de sincronização Sage → Portal.
- [ ] Definir a frequência de sincronização, caso não exista sincronização por eventos.
- [ ] Definir o processo de associação de uma nova conta a um cliente Sage.
- [ ] Definir o mecanismo de envio de SMS.
- [ ] Definir o mecanismo de autenticação Google/Apple.
- [ ] Definir o tratamento de clientes sem email ou número de telefone válido.

---

# 10. Evolução futura

Funcionalidades que poderão ser consideradas numa versão posterior:

- Criação de pedidos de assistência
- Aceitação/rejeição de orçamentos
- Upload de documentos pelo cliente
- Adição de equipamentos
- Atualização de dados pessoais através de pedido à Megactec
- Histórico detalhado de intervenções
- Agendamento de assistência
- Pagamento online
- Chat com a Megactec
- Integração com WhatsApp
- Área de administração para funcionários da Megactec
