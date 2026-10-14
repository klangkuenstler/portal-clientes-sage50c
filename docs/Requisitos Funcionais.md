# Portal do Cliente — Megactec
## Requisitos Funcionais — Revisão de âmbito para equipa de 2 pessoas

**Versão:** 0.2  
**Data:** 08/10/2026

---

## 1. Objetivo da revisão

A primeira versão dos requisitos tinha um âmbito demasiado grande para um projeto desenvolvido por apenas duas pessoas.

Esta versão reduz o MVP e concentra o projeto no problema principal identificado na Megactec:

> **Informar o cliente sobre o estado da sua reparação sem depender de chamadas telefónicas.**

O portal deverá ser, sobretudo, uma **camada de consulta sobre o Sage 50c**, e não uma substituição do Sage.

---

## 2. Princípios de âmbito

1. O Sage continua a ser a fonte dos dados empresariais.
2. O cliente consulta informação; não gere diretamente dados no Sage.
3. O processo de assistência é a entidade central do portal.
4. Funcionalidades que exigem serviços externos adicionais devem ser secundárias.
5. O MVP deve ser pequeno o suficiente para ser concluído, testado e apresentado por duas pessoas.
6. Funcionalidades futuras podem continuar documentadas sem serem implementadas.

---

## 3. Classificação de prioridade

| Prioridade | Significado |
|---|---|
| **Alta — MVP** | Obrigatório para considerar o projeto concluído |
| **Média — Fase 2** | Implementar se houver tempo |
| **Baixa — Futuro** | Não deve bloquear o projeto |

---

# 4. MVP recomendado

O MVP deverá conter:

- registo e login;
- associação da conta ao cliente Sage;
- dashboard;
- lista de reparações;
- detalhe da reparação;
- equipamento associado;
- estado atual;
- última atualização;
- observações destinadas ao cliente;
- histórico/evolução dos estados;
- notificações no portal;
- notificações por email;
- controlo de acesso;
- integração com o Sage.

### Não obrigatório no MVP

- Google Login;
- Apple Login;
- SMS;
- aceitação/rejeição de orçamentos;
- criação de pedidos de assistência;
- pagamentos;
- chat;
- WhatsApp;
- área administrativa completa.

---

# 5. Requisitos Funcionais

## 5.1 Autenticação e contas

| Código | Identificação (Nome)       | Prioridade | Ator    | Objetivo (Descrição)                                                        |
| ------ | -------------------------- | ---------- | ------- | --------------------------------------------------------------------------- |
| RF01   | Registo de conta           | Alta       | Cliente | Permitir ao cliente criar uma conta no portal.                              |
| RF02   | Associação ao cliente Sage | Alta       | Sistema | Associar cada conta a um único cliente existente no Sage.                   |
| RF03   | Login                      | Alta       | Cliente | Permitir ao cliente autenticar-se no portal.                                |
| RF04   | Recuperação de acesso      | Média      | Cliente | Permitir recuperar o acesso à conta através de um mecanismo de recuperação. |
| RF05   | Encerramento de sessão     | Alta       | Cliente | Permitir terminar a sessão.                                                 |
| RF06   | Login Google               | Baixa      | Cliente | Permitir autenticação através de Google.                                    |
| RF07   | Login Apple                | Baixa      | Cliente | Permitir autenticação através de Apple.                                     |

### Decisão

Para duas pessoas, o MVP deverá ter **um único mecanismo principal de autenticação**. Google e Apple ficam como evolução futura.

---

## 5.2 Dashboard

| Código | Identificação (Nome) | Prioridade | Ator | Objetivo (Descrição) |
|---|---|---|---|---|
| RF08 | Dashboard do cliente | Alta | Cliente | Apresentar um resumo da informação relevante do cliente. |
| RF09 | Processos em curso | Alta | Cliente | Apresentar as reparações atualmente em curso. |
| RF10 | Estado visual | Alta | Cliente | Apresentar visualmente o estado atual de cada reparação. |
| RF11 | Acesso ao processo | Alta | Cliente | Permitir abrir uma reparação a partir do dashboard. |
| RF12 | Última atualização | Alta | Cliente | Apresentar a data da última atualização relevante. |

O dashboard não precisa de ser complexo. Deve privilegiar as reparações em curso e o seu estado.

---

## 5.3 Processos de assistência

Esta é a **funcionalidade central do projeto**.

| Código | Identificação (Nome) | Prioridade | Ator | Objetivo (Descrição) |
|---|---|---|---|---|
| RF13 | Lista de processos | Alta | Cliente | Permitir consultar os processos de assistência do cliente. |
| RF14 | Consulta de processo | Alta | Cliente | Permitir consultar os detalhes de um processo. |
| RF15 | Identificador do processo | Alta | Cliente | Apresentar o número do Pedido de Assistência Técnica utilizado pela Megactec. |
| RF16 | Data de abertura | Alta | Cliente | Apresentar a data de abertura do processo. |
| RF17 | Estado atual | Alta | Cliente | Apresentar o estado atual proveniente do Sage. |
| RF18 | Última atualização | Alta | Cliente | Apresentar a data da última atualização. |
| RF19 | Descrição do problema | Alta | Cliente | Apresentar a descrição do problema, quando disponível. |
| RF20 | Observações públicas | Alta | Cliente | Apresentar as observações comuns destinadas ao cliente. |
| RF21 | Ocultação de informação privada | Alta | Sistema | Impedir a apresentação de observações privadas ou informação exclusivamente interna. |
| RF22 | Equipamento associado | Alta | Cliente | Apresentar o equipamento associado ao processo. |

### Decisão

O Sage pode possuir vários movimentos/documentos para a mesma reparação:

```text
PAT → MR → NE → Fatura
```

No portal, o cliente deverá ver principalmente:

```text
Processo #6937
Forno TEKA
Em reparação
```

Isto evita transformar os movimentos internos do Sage em funcionalidades independentes.

---

## 5.4 Estados das reparações

Os estados são o **principal valor do portal**, porque informar os clientes sobre estes estados é atualmente uma tarefa que dá bastante trabalho à Megactec.

| Código | Identificação (Nome) | Prioridade | Ator | Objetivo (Descrição) |
|---|---|---|---|---|
| RF23 | Obtenção do estado | Alta | Sistema | Obter o estado atual do processo a partir do Sage. |
| RF24 | Apresentação do estado | Alta | Cliente | Apresentar claramente o estado atual. |
| RF25 | Mapeamento dos estados | Alta | Sistema | Associar estados internos do Sage às designações apresentadas ao cliente. |
| RF26 | Histórico de estados | Média | Cliente | Apresentar a evolução dos estados ao longo do processo. |
| RF27 | Identificação visual | Alta | Cliente | Representar o estado através de texto e elementos visuais. |
| RF28 | Atualização do estado | Alta | Sistema | Atualizar o portal quando o estado do processo mudar. |

### Nota

Deverá ser levantada a lista real de estados configurados no Sage da Megactec.

A lógica recomendada é:

```text
Estado Sage
    ↓
Mapeamento
    ↓
Estado apresentado ao cliente
    ↓
Notificação
```

Exemplo:

| Sage | Portal |
|---|---|
| A RECEBER | Pedido recebido |
| EM REPARAÇÃO | Em reparação |
| AGUARDA PEÇA | A aguardar peça |
| ENTREGUE / CONCLUÍDO | Concluído |

---

## 5.5 Equipamentos

O equipamento deve ser uma **informação associada ao processo**, e não um módulo complexo.

| Código | Identificação (Nome) | Prioridade | Ator | Objetivo (Descrição) |
|---|---|---|---|---|
| RF29 | Identificação do equipamento | Alta | Cliente | Apresentar o equipamento associado ao processo. |
| RF30 | Dados principais | Alta | Cliente | Apresentar marca, modelo e número de série quando disponíveis. |
| RF31 | Código industrial | Baixa | Cliente | Apresentar o código industrial quando relevante. |
| RF32 | Informação de garantia | Média | Cliente | Apresentar informação de garantia quando disponível. |
| RF33 | Histórico do equipamento | Média | Cliente | Permitir consultar processos anteriores associados ao equipamento. |

### Decisão

Não implementar no MVP:

- criar equipamentos;
- editar equipamentos;
- eliminar equipamentos.

Os equipamentos continuam a ser geridos no Sage.

---

## 5.6 Orçamentos

| Código | Identificação (Nome) | Prioridade | Ator | Objetivo (Descrição) |
|---|---|---|---|---|
| RF34 | Consulta de orçamento | Média | Cliente | Permitir consultar um orçamento associado ao processo. |
| RF35 | Valor do orçamento | Média | Cliente | Apresentar o valor total do orçamento. |
| RF36 | Estado do orçamento | Média | Cliente | Apresentar o estado do orçamento. |

### Decisão

Não implementar no MVP:

- aceitar orçamento;
- rejeitar orçamento;
- pagamento;
- assinatura digital.

Se a consulta do orçamento for difícil devido à integração com o Sage, pode ser adiada sem comprometer o conceito principal.

---

## 5.7 Faturas e documentos

| Código | Identificação (Nome) | Prioridade | Ator | Objetivo (Descrição) |
|---|---|---|---|---|
| RF37 | Consulta de fatura | Média | Cliente | Permitir consultar uma fatura associada ao processo. |
| RF38 | Visualização de documento | Média | Cliente | Permitir visualizar um documento disponibilizado. |
| RF39 | Download de documento | Baixa | Cliente | Permitir descarregar um documento. |

### Decisão

Se a obtenção automática dos PDFs através do Sage for complicada, o MVP pode limitar-se à apresentação dos dados principais da fatura.

---

## 5.8 Notificações

Este módulo deve resolver diretamente o problema identificado na Megactec.

| Código | Identificação (Nome) | Prioridade | Ator | Objetivo (Descrição) |
|---|---|---|---|---|
| RF40 | Notificação no portal | Alta | Sistema | Apresentar uma notificação quando ocorrer uma atualização relevante. |
| RF41 | Notificação por email | Alta | Sistema | Enviar um email quando ocorrer uma atualização configurada. |
| RF42 | Notificação de alteração de estado | Alta | Sistema | Gerar uma notificação quando o estado de um processo mudar. |
| RF43 | Consulta de notificações | Média | Cliente | Permitir consultar notificações anteriores. |
| RF44 | Notificação por SMS | Baixa | Sistema | Enviar uma notificação por SMS. |
| RF45 | Preferências de notificação | Baixa | Cliente | Permitir configurar os canais de notificação. |

### Decisão

Para duas pessoas:

```text
Estado alterado no Sage
        ↓
Portal atualizado
        ↓
Notificação no portal
        +
Email
```

SMS fica para uma fase posterior porque acrescenta uma dependência externa e custos.

---

## 5.9 Contacto

| Código | Identificação (Nome) | Prioridade | Ator | Objetivo (Descrição) |
|---|---|---|---|---|
| RF46 | Contacto da Megactec | Média | Cliente | Disponibilizar telefone, email e outros meios de contacto. |
| RF47 | Redirecionamento para contacto | Média | Cliente | Permitir aceder à página `megactec.pt/contact`. |

### Decisão

Não criar um sistema de mensagens dentro do portal.

O portal deverá simplesmente encaminhar o cliente para o mecanismo de contacto existente.

---

## 5.10 Segurança e controlo de acesso

Estes requisitos continuam obrigatórios.

| Código | Identificação (Nome) | Prioridade | Ator | Objetivo (Descrição) |
|---|---|---|---|---|
| RF48 | Isolamento dos dados | Alta | Sistema | Garantir que cada cliente apenas consulta os seus próprios dados. |
| RF49 | Acesso aos processos | Alta | Sistema | Garantir que cada cliente apenas consulta os seus processos. |
| RF50 | Acesso aos equipamentos | Alta | Sistema | Garantir que cada cliente apenas consulta os seus equipamentos. |
| RF51 | Acesso aos documentos | Alta | Sistema | Garantir que documentos de outros clientes não podem ser consultados. |
| RF52 | Proteção de informação interna | Alta | Sistema | Impedir a exposição de informação interna do Sage. |

---

## 5.11 Integração com o Sage

A integração deve ser limitada ao necessário para o MVP.

| Código | Identificação (Nome) | Prioridade | Ator | Objetivo (Descrição) |
|---|---|---|---|---|
| RF53 | Obtenção de dados do cliente | Alta | Sage/Sistema | Obter os dados necessários para identificar o cliente. |
| RF54 | Obtenção de equipamentos | Alta | Sage/Sistema | Obter os equipamentos associados ao cliente. |
| RF55 | Obtenção de processos | Alta | Sage/Sistema | Obter os processos de assistência associados ao cliente. |
| RF56 | Obtenção do estado | Alta | Sage/Sistema | Obter o estado atual dos processos. |
| RF57 | Atualização dos dados | Alta | Sistema | Atualizar os dados apresentados no portal de acordo com o Sage. |
| RF58 | Tratamento de falhas | Alta | Sistema | Tratar situações em que o Sage não esteja disponível ou não devolva informação. |
| RF59 | Orçamentos via Sage | Média | Sage/Sistema | Obter orçamentos quando a integração o permitir de forma simples. |
| RF60 | Documentos via Sage | Média | Sage/Sistema | Obter documentos quando a integração o permitir de forma simples. |

### Decisão importante

Não usar como requisito:

> “Sincronizar toda a base de dados do Sage.”

Usar:

> **“Obter apenas a informação necessária para o funcionamento do portal.”**

Isto reduz bastante o âmbito técnico.

---

# 6. Resumo das prioridades

| Módulo | Alta / MVP | Média | Baixa |
|---|---:|---:|---:|
| Autenticação | 5 | 0 | 2 |
| Dashboard | 5 | 0 | 0 |
| Processos | 10 | 0 | 0 |
| Estados | 5 | 1 | 0 |
| Equipamentos | 2 | 2 | 1 |
| Orçamentos | 0 | 3 | 0 |
| Faturas/documentos | 0 | 2 | 1 |
| Notificações | 3 | 1 | 2 |
| Contacto | 0 | 2 | 0 |
| Segurança | 5 | 0 | 0 |
| Integração Sage | 6 | 2 | 0 |
| **Total** | **41** | **13** | **6** |

---

# 7. O que foi retirado do MVP

## Google Login — Baixa

É útil, mas não é necessário para demonstrar o conceito.

## Apple Login — Baixa

Tem complexidade adicional e não contribui diretamente para a integração com o Sage.

## SMS — Baixa

Requer fornecedor externo, API, custos e tratamento de falhas.

## Sistema de mensagens interno — removido

Já existe o contacto em `megactec.pt/contact`.

## Aceitação/rejeição de orçamentos — removido

Transformaria o portal num sistema transacional.

## Criação de pedidos de assistência — removido

O objetivo principal é acompanhar reparações já registadas no Sage.

## Gestão de equipamentos — reduzida

O portal apenas consulta os equipamentos.

## Área administrativa — removida

A gestão interna continua a ser feita no Sage.

---

# 8. Fluxo principal para a apresentação

Recomenda-se que a demonstração académica seja centrada num único fluxo:

```text
1. Cliente abre o portal
          ↓
2. Faz login
          ↓
3. Dashboard
          ↓
4. Lista de reparações
          ↓
5. Abre a reparação #10413
          ↓
6. Consulta equipamento
          ↓
7. Consulta estado atual
          ↓
8. Consulta histórico/observações
          ↓
9. Estado é alterado no Sage
          ↓
10. Portal apresenta novo estado
          ↓
11. Cliente recebe email
```

Isto demonstra:

- frontend;
- backend;
- autenticação;
- base de dados;
- integração com o Sage;
- regras de negócio;
- controlo de acesso;
- notificações;
- resolução de um problema real da Megactec.

---

# 9. MVP mínimo de emergência

Se o prazo ficar apertado, o projeto pode ser reduzido ainda mais:

```text
Login
  ↓
Dashboard
  ↓
Lista de reparações
  ↓
Detalhe da reparação
  ├── Equipamento
  ├── Estado
  ├── Última atualização
  └── Observações
  ↓
Notificação no portal
  +
Email
```

Com:

- integração Sage;
- isolamento dos dados;
- interface responsiva;
- segurança básica.

Este conjunto já é suficiente para demonstrar o conceito do produto.

---

# 10. Critério para aceitar novas funcionalidades

Durante o desenvolvimento, qualquer nova funcionalidade deve responder:

1. Resolve o problema principal?
2. É necessária para demonstrar a integração com o Sage?
3. É necessária para o MVP?
4. Não introduz uma dependência externa significativa?
5. Pode ser implementada e testada pelas duas pessoas dentro do prazo?

Se a resposta for maioritariamente **não**, a funcionalidade deve ir para a lista de evolução futura.

---

# 11. Evolução futura

Estas funcionalidades podem permanecer no documento do projeto, mas não devem comprometer o MVP:

- Google Login;
- Apple Login;
- SMS;
- preferências avançadas de notificações;
- criação de pedidos de assistência;
- aceitação/rejeição de orçamentos;
- pagamentos online;
- upload de documentos;
- agendamento de assistência;
- chat;
- integração WhatsApp;
- área administrativa;
- gestão de funcionários.

---

# 12. Conclusão

A principal alteração desta revisão é **reduzir o produto àquilo que realmente demonstra valor**.

O projeto passa a ser definido como:

> **Um portal de acompanhamento de reparações para clientes da Megactec, integrado com o Sage 50c, que permite consultar o estado e a evolução das reparações e receber notificações sobre alterações relevantes.**

Para uma equipa de duas pessoas, esta abordagem é significativamente mais realista do que tentar implementar um portal completo com todas as funcionalidades desde a primeira versão.
