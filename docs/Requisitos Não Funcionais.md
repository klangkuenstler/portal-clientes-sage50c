# Portal do Cliente — Megactec

## Documentação de Requisitos Não Funcionais

**Estado:** Proposta de âmbito para o MVP

## 1. Objetivo

Este documento define os **requisitos não funcionais (RNF)** do Portal do Cliente da Megactec.

Enquanto os requisitos funcionais definem **o que o sistema deve fazer**, os requisitos não funcionais definem **como o sistema deve funcionar**, estabelecendo características relacionadas com segurança, desempenho, usabilidade, disponibilidade, compatibilidade, manutenção, escalabilidade e qualidade.

O portal deverá proporcionar uma experiência simples e segura ao cliente, mantendo simultaneamente uma integração fiável com o Sage 50c.

> **Nota:** Os valores apresentados neste documento são metas iniciais e deverão ser validados durante o desenvolvimento e testes do projeto.

---

# 2. Âmbito

Os requisitos não funcionais abrangem principalmente:

- Segurança;
- Privacidade;
- Desempenho;
- Disponibilidade;
- Usabilidade;
- Acessibilidade;
- Responsividade;
- Compatibilidade;
- Fiabilidade;
- Integridade e consistência dos dados;
- Integração com o Sage;
- Manutenção;
- Escalabilidade;
- Observabilidade e registo de erros;
- Qualidade do software.

---

# 3. Convenções

## 3.1 Prioridades

| Classificação | Significado |
|---|---|
| **Alta** | Requisito essencial para a utilização segura e correta do MVP |
| **Média** | Requisito importante, mas com possibilidade de implementação faseada |
| **Baixa** | Requisito complementar ou de evolução futura |

## 3.2 Atores

Os requisitos não funcionais são maioritariamente aplicáveis ao **Sistema**, embora alguns tenham impacto direto no **Cliente**.

| Ator | Descrição |
|---|---|
| **Cliente** | Utilizador final do portal |
| **Sistema** | Portal, backend, base de dados e mecanismos de integração |
| **Sage** | Sistema externo que fornece os dados empresariais |

---

# 4. Requisitos Não Funcionais

## 4.1 Segurança

| Código | Identificação (Nome) | Classificação (Prioridade) | Ator | Objetivo (Descrição) |
|---|---|---|---|---|
| RNF01 | Comunicação segura | Alta | Sistema | Toda a comunicação entre o cliente, portal e backend deverá utilizar HTTPS/TLS. |
| RNF02 | Proteção das credenciais | Alta | Sistema | As credenciais e outros dados de autenticação não deverão ser armazenados de forma insegura. |
| RNF03 | Gestão segura de sessões | Alta | Sistema | As sessões dos utilizadores deverão ser protegidas contra acesso ou reutilização indevida. |
| RNF04 | Controlo de acesso | Alta | Sistema | O sistema deverá validar a autorização do utilizador antes de disponibilizar qualquer informação privada. |
| RNF05 | Isolamento de dados | Alta | Sistema | Um cliente não poderá aceder, direta ou indiretamente, aos dados de outro cliente. |
| RNF06 | Proteção contra ataques comuns | Alta | Sistema | O sistema deverá aplicar medidas de proteção contra vulnerabilidades web comuns, incluindo XSS, CSRF, SQL Injection e controlo inadequado de acesso. |
| RNF07 | Validação de dados | Alta | Sistema | Os dados recebidos do cliente, Sage ou outros sistemas deverão ser validados antes de serem processados. |
| RNF08 | Proteção de documentos | Alta | Sistema | Os documentos privados deverão exigir autorização antes de serem consultados ou descarregados. |
| RNF09 | Princípio do menor privilégio | Alta | Sistema | Cada componente do sistema deverá possuir apenas as permissões necessárias para desempenhar a sua função. |
| RNF10 | Proteção das credenciais de integração | Alta | Sistema | As credenciais utilizadas para comunicar com o Sage ou outros serviços não deverão ser expostas no frontend nem armazenadas diretamente no código-fonte. |

### Notas

A segurança é particularmente importante porque o portal terá acesso a:

- dados pessoais;
- contactos;
- moradas;
- equipamentos;
- números de série;
- processos de assistência;
- orçamentos;
- faturas;
- documentos.

A autenticação não deverá ser considerada suficiente para garantir segurança: cada pedido deverá ser também autorizado relativamente ao cliente a que os dados pertencem.

---

## 4.2 Privacidade e proteção de dados

| Código | Identificação (Nome) | Classificação (Prioridade) | Ator | Objetivo (Descrição) |
|---|---|---|---|---|
| RNF11 | Minimização de dados | Alta | Sistema | O portal deverá armazenar e processar apenas os dados necessários para o seu funcionamento. |
| RNF12 | Proteção de dados pessoais | Alta | Sistema | Os dados pessoais dos clientes deverão ser protegidos contra acesso, alteração ou divulgação não autorizada. |
| RNF13 | Separação de informação interna | Alta | Sistema | Informação exclusivamente destinada ao uso interno da Megactec não deverá ser disponibilizada ao cliente. |
| RNF14 | Retenção de dados | Média | Sistema | Os dados específicos do portal deverão possuir uma política de retenção adequada ao seu propósito. |
| RNF15 | Eliminação de dados | Média | Sistema | O sistema deverá permitir implementar procedimentos de eliminação ou anonimização quando aplicável. |
| RNF16 | Registo de acesso relevante | Média | Sistema | Acesso e operações relevantes sobre informação sensível deverão poder ser registados para efeitos de auditoria. |

### Notas

O portal deverá seguir os princípios aplicáveis de proteção de dados, nomeadamente os princípios de minimização, segurança e limitação da finalidade.

> **Nota:** A política legal de retenção e eliminação deverá ser validada com a Megactec e, quando necessário, com apoio jurídico.

---

## 4.3 Desempenho

| Código | Identificação (Nome) | Classificação (Prioridade) | Ator | Objetivo (Descrição) |
|---|---|---|---|---|
| RNF17 | Tempo de resposta | Alta | Sistema | As operações comuns do portal deverão responder rapidamente em condições normais de utilização. |
| RNF18 | Carregamento inicial | Alta | Cliente | A interface principal deverá carregar de forma suficientemente rápida para permitir uma utilização fluida. |
| RNF19 | Paginação de dados | Média | Sistema | Listagens com grandes quantidades de dados deverão utilizar paginação ou mecanismos equivalentes. |
| RNF20 | Otimização de consultas | Alta | Sistema | As consultas à base de dados deverão ser otimizadas para evitar operações desnecessariamente dispendiosas. |
| RNF21 | Processamento assíncrono | Média | Sistema | Operações demoradas, como sincronizações ou envio de notificações, deverão poder ser executadas sem bloquear a interface do cliente. |

### Meta inicial

Como referência para o MVP:

- operações normais: **≤ 2 segundos**, quando os dados já estão disponíveis no sistema;
- carregamento inicial: **≤ 3 segundos**, em condições normais;
- operações externas ou dependentes do Sage poderão apresentar tempos superiores.

> **Nota:** Estes valores são objetivos de engenharia e não garantias absolutas, uma vez que o tempo de resposta poderá depender do Sage, rede, servidor e outros serviços externos.

---

## 4.4 Disponibilidade e continuidade

| Código | Identificação (Nome) | Classificação (Prioridade) | Ator | Objetivo (Descrição) |
|---|---|---|---|---|
| RNF22 | Disponibilidade do portal | Alta | Sistema | O portal deverá estar disponível para utilização pelos clientes durante o período normal de funcionamento do serviço. |
| RNF23 | Tolerância a indisponibilidade do Sage | Alta | Sistema | O portal deverá lidar de forma controlada com períodos em que o Sage ou o mecanismo de integração não esteja disponível. |
| RNF24 | Mensagens de indisponibilidade | Alta | Cliente | Quando uma operação não puder ser concluída devido à indisponibilidade de um serviço externo, o cliente deverá receber uma mensagem adequada. |
| RNF25 | Recuperação após falha | Média | Sistema | O sistema deverá conseguir retomar as operações normais após uma falha sem corromper os dados. |
| RNF26 | Cópias de segurança | Alta | Sistema | Os dados próprios do portal deverão possuir mecanismos adequados de backup. |

### Notas

Uma indisponibilidade do Sage não deverá necessariamente tornar todo o portal indisponível.

Por exemplo:

```text
Portal
  ↓
Dados locais disponíveis
  ↓
Cliente consegue consultar informação sincronizada

Sage indisponível
  ↓
Sincronização temporariamente indisponível
  ↓
Portal informa que os dados podem não estar atualizados
```

A estratégia final depende do mecanismo de integração escolhido.

---

## 4.5 Usabilidade

| Código | Identificação (Nome) | Classificação (Prioridade) | Ator | Objetivo (Descrição) |
|---|---|---|---|---|
| RNF27 | Interface intuitiva | Alta | Cliente | A interface deverá ser compreensível para utilizadores sem conhecimentos técnicos. |
| RNF28 | Navegação consistente | Alta | Cliente | A estrutura de navegação deverá manter comportamentos e padrões consistentes em todo o portal. |
| RNF29 | Linguagem orientada ao cliente | Alta | Cliente | O portal deverá utilizar terminologia compreensível para o cliente, evitando conceitos técnicos internos do Sage. |
| RNF30 | Feedback das operações | Alta | Cliente | O sistema deverá informar o utilizador sobre o resultado das operações realizadas. |
| RNF31 | Mensagens de erro compreensíveis | Alta | Cliente | Os erros apresentados ao cliente deverão explicar o problema de forma clara e indicar, quando possível, como proceder. |
| RNF32 | Consistência visual | Alta | Cliente | Os elementos visuais, estados, botões, formulários e componentes deverão manter uma aparência consistente. |
| RNF33 | Identificação visual dos estados | Alta | Cliente | Os estados deverão ser facilmente distinguíveis através de texto e elementos visuais, sem depender exclusivamente da cor. |
| RNF34 | Redução de complexidade | Alta | Cliente | A interface deverá ocultar a complexidade interna do Sage e apresentar apenas informação relevante para o cliente. |

### Nota

O portal deverá funcionar como uma **camada de abstração sobre o Sage**.

O cliente não deverá necessitar de compreender conceitos como:

```text
PAT
MR
NE
Imputação personalizada
Movimentos do equipamento
```

quando estes conceitos não forem relevantes para a sua utilização.

---

## 4.6 Responsividade

| Código | Identificação (Nome) | Classificação (Prioridade) | Ator | Objetivo (Descrição) |
|---|---|---|---|---|
| RNF35 | Design responsivo | Alta | Cliente | A interface deverá adaptar-se a diferentes dimensões de ecrã. |
| RNF36 | Suporte para desktop | Alta | Cliente | O portal deverá proporcionar uma experiência otimizada em computadores. |
| RNF37 | Suporte para dispositivos móveis | Alta | Cliente | O portal deverá continuar a ser utilizável em smartphones e tablets. |
| RNF38 | Adaptação dos componentes | Alta | Sistema | Tabelas, cartões, formulários, menus e outros componentes deverão adaptar-se ao espaço disponível. |

### Nota

O projeto será **focado em desktop por motivos de apresentação**, mas deverá ser responsivo e funcional em dispositivos móveis.

---

## 4.7 Acessibilidade

| Código | Identificação (Nome) | Classificação (Prioridade) | Ator | Objetivo (Descrição) |
|---|---|---|---|---|
| RNF39 | Contraste adequado | Alta | Cliente | O texto e os elementos de interface deverão possuir contraste suficiente para facilitar a leitura. |
| RNF40 | Navegação por teclado | Média | Cliente | As principais funcionalidades deverão poder ser utilizadas através do teclado. |
| RNF41 | Texto alternativo | Média | Cliente | Imagens relevantes deverão possuir descrições alternativas adequadas. |
| RNF42 | Não dependência da cor | Alta | Cliente | A informação não deverá ser comunicada exclusivamente através de cor. |
| RNF43 | Estrutura semântica | Média | Sistema | A interface deverá utilizar uma estrutura HTML semanticamente adequada. |

### Nota

Como os estados serão representados por cores, deverá existir também uma indicação textual ou outro elemento visual.

Exemplo:

```text
● A aguardar peça
```

e não apenas:

```text
[amarelo]
```

---

## 4.8 Compatibilidade

| Código | Identificação (Nome) | Classificação (Prioridade) | Ator | Objetivo (Descrição) |
|---|---|---|---|---|
| RNF44 | Compatibilidade com navegadores modernos | Alta | Cliente | O portal deverá funcionar corretamente nos principais navegadores modernos. |
| RNF45 | Compatibilidade com Chrome | Alta | Cliente | Garantir o funcionamento correto no Google Chrome. |
| RNF46 | Compatibilidade com Firefox | Média | Cliente | Garantir o funcionamento correto no Mozilla Firefox. |
| RNF47 | Compatibilidade com Edge | Média | Cliente | Garantir o funcionamento correto no Microsoft Edge. |
| RNF48 | Compatibilidade com Safari | Média | Cliente | Garantir o funcionamento correto no Safari, especialmente em dispositivos Apple. |
| RNF49 | Compatibilidade com diferentes resoluções | Alta | Cliente | O portal deverá manter a sua funcionalidade em diferentes resoluções de ecrã. |

### Nota

Não é necessário garantir suporte para navegadores obsoletos ou sem suporte oficial.

---

## 4.9 Integridade e consistência dos dados

| Código | Identificação (Nome) | Classificação (Prioridade) | Ator | Objetivo (Descrição) |
|---|---|---|---|---|
| RNF50 | Integridade dos dados | Alta | Sistema | Os dados apresentados no portal deverão manter a integridade relativamente à fonte de origem. |
| RNF51 | Fonte de dados Sage | Alta | Sistema | Os dados empresariais apresentados deverão ter como referência os dados existentes no Sage. |
| RNF52 | Identificação única | Alta | Sistema | Clientes, equipamentos e processos deverão possuir identificadores que permitam distingui-los inequivocamente. |
| RNF53 | Consistência de relações | Alta | Sistema | As relações Cliente → Equipamento → Processo deverão ser preservadas durante a sincronização. |
| RNF54 | Prevenção de duplicação | Alta | Sistema | O processo de sincronização deverá evitar a criação indevida de registos duplicados. |
| RNF55 | Consistência temporal | Alta | Sistema | Alterações aos estados e restantes dados deverão manter uma sequência temporal coerente. |

### Nota

O portal não deverá assumir que a sua base de dados é a fonte principal dos dados empresariais.

A relação conceptual deverá manter-se:

```text
Cliente Sage
    ↓
Equipamento Sage
    ↓
PAT Sage
    ↓
Estado / Documentos
```

---

## 4.10 Integração com o Sage

| Código | Identificação (Nome) | Classificação (Prioridade) | Ator | Objetivo (Descrição) |
|---|---|---|---|---|
| RNF56 | Fiabilidade da integração | Alta | Sistema | A comunicação com o Sage deverá ser implementada de forma robusta e previsível. |
| RNF57 | Tratamento de erros de integração | Alta | Sistema | Erros de comunicação com o Sage deverão ser detetados e tratados sem provocar corrupção de dados. |
| RNF58 | Sincronização segura | Alta | Sistema | A sincronização deverá utilizar mecanismos seguros de autenticação e comunicação. |
| RNF59 | Registo de falhas de sincronização | Alta | Sistema | As falhas de sincronização deverão ser registadas para permitir diagnóstico. |
| RNF60 | Reprocessamento | Média | Sistema | Operações de sincronização que falhem de forma temporária deverão poder ser reprocessadas. |
| RNF61 | Independência da interface | Alta | Sistema | A interface do cliente não deverá depender diretamente da implementação interna da integração com o Sage. |

### Nota

Esta separação é importante arquiteturalmente:

```text
Frontend
   ↓
Backend / API do Portal
   ↓
Camada de integração
   ↓
Sage
```

O frontend não deverá comunicar diretamente com o Sage.

---

## 4.11 Manutenibilidade

| Código | Identificação (Nome) | Classificação (Prioridade) | Ator | Objetivo (Descrição) |
|---|---|---|---|---|
| RNF62 | Código modular | Alta | Sistema | O software deverá ser organizado em componentes e módulos com responsabilidades bem definidas. |
| RNF63 | Separação de responsabilidades | Alta | Sistema | A apresentação, lógica de negócio, persistência e integração deverão estar adequadamente separadas. |
| RNF64 | Configuração externa | Alta | Sistema | Configurações como credenciais, URLs e parâmetros de integração não deverão estar hardcoded no código. |
| RNF65 | Documentação técnica | Alta | Sistema | Os principais componentes e decisões técnicas deverão estar documentados. |
| RNF66 | Legibilidade do código | Alta | Sistema | O código deverá seguir convenções consistentes e ser compreensível para outros programadores. |
| RNF67 | Facilidade de alteração | Média | Sistema | A arquitetura deverá permitir alterar componentes sem exigir alterações desnecessárias noutras partes do sistema. |

### Nota

A arquitetura deverá permitir, por exemplo, substituir ou alterar o mecanismo de integração com o Sage sem reconstruir completamente a interface do portal.

---

## 4.12 Escalabilidade

| Código | Identificação (Nome) | Classificação (Prioridade) | Ator | Objetivo (Descrição) |
|---|---|---|---|---|
| RNF68 | Suporte ao crescimento de utilizadores | Média | Sistema | A arquitetura deverá permitir aumentar o número de clientes sem necessidade de reestruturação completa. |
| RNF69 | Suporte ao crescimento de dados | Média | Sistema | O sistema deverá conseguir lidar com o crescimento do número de equipamentos, processos e documentos. |
| RNF70 | Separação de componentes | Média | Sistema | Os componentes deverão poder ser escalados de forma independente quando necessário. |

### Nota

Não é necessário otimizar o MVP para milhares ou milhões de utilizadores, mas a arquitetura não deverá criar limitações artificiais ao crescimento da Megactec.

---

## 4.13 Observabilidade e tratamento de erros

| Código | Identificação (Nome) | Classificação (Prioridade) | Ator | Objetivo (Descrição) |
|---|---|---|---|---|
| RNF71 | Registo de erros | Alta | Sistema | Os erros relevantes do sistema deverão ser registados para diagnóstico. |
| RNF72 | Registo de sincronizações | Alta | Sistema | As operações de sincronização deverão gerar informação suficiente para identificar sucesso ou falha. |
| RNF73 | Identificação de erros | Média | Sistema | Os erros deverão possuir informação que permita identificar a sua origem e contexto. |
| RNF74 | Separação de mensagens internas | Alta | Sistema | Informação técnica sensível não deverá ser apresentada diretamente ao cliente. |
| RNF75 | Monitorização | Média | Sistema | Deverá ser possível verificar o estado geral dos principais serviços do portal. |

### Nota

O cliente deverá receber:

```text
Não foi possível atualizar os dados.
Tente novamente mais tarde.
```

e não:

```text
SQLSTATE[HY000]: ...
Connection refused to ...
```

---

## 4.14 Testabilidade e qualidade

| Código | Identificação (Nome) | Classificação (Prioridade) | Ator | Objetivo (Descrição) |
|---|---|---|---|---|
| RNF76 | Testabilidade | Alta | Sistema | Os componentes principais deverão poder ser testados de forma isolada. |
| RNF77 | Testes de autenticação | Alta | Sistema | Os mecanismos de autenticação e autorização deverão possuir testes adequados. |
| RNF78 | Testes de integração | Alta | Sistema | A integração com o Sage deverá ser testada com diferentes cenários de sucesso e falha. |
| RNF79 | Testes de segurança | Alta | Sistema | O sistema deverá ser testado contra vulnerabilidades e acessos não autorizados. |
| RNF80 | Testes de responsividade | Média | Sistema | A interface deverá ser testada em diferentes tamanhos de ecrã. |
| RNF81 | Testes de compatibilidade | Média | Sistema | O portal deverá ser testado nos navegadores suportados. |

---

## 4.15 Interface e identidade visual

| Código | Identificação (Nome) | Classificação (Prioridade) | Ator | Objetivo (Descrição) |
|---|---|---|---|---|
| RNF82 | Identidade visual Megactec | Alta | Cliente | O portal deverá manter uma identidade visual coerente com a marca Megactec. |
| RNF83 | Design moderno | Alta | Cliente | A interface deverá apresentar um design moderno, limpo e adequado a um portal de cliente. |
| RNF84 | Consistência de componentes | Alta | Cliente | Botões, cartões, tabelas, formulários e outros componentes deverão seguir um sistema visual consistente. |
| RNF85 | Hierarquia visual | Alta | Cliente | A informação deverá ser organizada através de uma hierarquia visual clara. |
| RNF86 | Foco em desktop | Alta | Cliente | A versão principal da interface deverá ser otimizada para utilização em desktop. |
| RNF87 | Adaptação mobile | Alta | Cliente | A interface deverá manter a funcionalidade em dispositivos móveis. |

### Nota

O design deverá privilegiar:

- simplicidade;
- clareza;
- informação relevante;
- estados facilmente identificáveis;
- poucos passos para consultar uma reparação;
- coerência com a marca Megactec.

---

# 5. Requisitos de qualidade recomendados para o MVP

Como metas iniciais de qualidade:

| Área | Meta |
|---|---|
| HTTPS | 100% das comunicações externas |
| Isolamento de clientes | 100% |
| Operações normais | ≤ 2 s em condições normais |
| Carregamento inicial | ≤ 3 s em condições normais |
| Interface | Responsiva |
| Desktop | Prioridade principal |
| Mobile | Funcional |
| Browsers | Chrome, Firefox, Edge e Safari modernos |
| Dados empresariais | Fonte principal: Sage |
| Erros internos | Não apresentados ao cliente |
| Credenciais | Nunca expostas no frontend |
| Documentos | Acesso autenticado e autorizado |
| Código | Modular e documentado |
| Integração | Com tratamento de erros |
| Backups | Sim |

---

# 6. Arquitetura de qualidade pretendida

A aplicação deverá procurar seguir uma arquitetura semelhante a:

```text
┌───────────────────────────────────────────────┐
│                  CLIENTE                      │
│                                               │
│   Desktop / Tablet / Smartphone               │
└───────────────────────┬───────────────────────┘
                        │ HTTPS
                        ▼
┌───────────────────────────────────────────────┐
│                 FRONTEND                      │
│                                               │
│   Interface / Componentes / Navegação         │
└───────────────────────┬───────────────────────┘
                        │ HTTPS / API
                        ▼
┌───────────────────────────────────────────────┐
│                  BACKEND                      │
│                                               │
│   Autenticação                                │
│   Autorização                                 │
│   Regras de negócio                           │
│   Notificações                                │
│   Gestão de documentos                        │
└───────────────┬───────────────────┬───────────┘
                │                   │
                ▼                   ▼
┌────────────────────────┐   ┌──────────────────┐
│ Base de dados Portal   │   │ Integração Sage  │
│                        │   │                  │
│ Contas                 │   │ API / mecanismo  │
│ Associações            │   │ disponível       │
│ Notificações           │   │                  │
│ Configuração           │   └────────┬─────────┘
└────────────────────────┘            │
                                      ▼
                             ┌──────────────────┐
                             │     Sage 50c     │
                             │                  │
                             │ Clientes         │
                             │ Equipamentos     │
                             │ PAT              │
                             │ Estados          │
                             │ Orçamentos       │
                             │ Faturas          │
                             └──────────────────┘
```

---

# 7. Decisões técnicas ainda em aberto

As seguintes decisões deverão ser tomadas durante a fase de análise e desenho técnico:

- [ ] Tecnologia do frontend.
- [ ] Tecnologia do backend.
- [ ] Sistema de base de dados do portal.
- [ ] Mecanismo de autenticação.
- [ ] Implementação de Google Login.
- [ ] Implementação de Apple Login.
- [ ] Mecanismo de integração com o Sage 50c.
- [ ] Estratégia de sincronização.
- [ ] Frequência de sincronização.
- [ ] Estratégia de cache.
- [ ] Serviço de envio de email.
- [ ] Serviço de envio de SMS.
- [ ] Armazenamento de documentos.
- [ ] Sistema de backups.
- [ ] Sistema de logging.
- [ ] Sistema de monitorização.
- [ ] Estratégia de deployment.
- [ ] Ambiente de desenvolvimento, testes e produção.

---

# 8. Critérios gerais de aceitação

O MVP deverá ser considerado tecnicamente aceitável quando:

1. O cliente consegue autenticar-se de forma segura.
2. O cliente apenas consegue consultar os seus próprios dados.
3. Os dados empresariais apresentados correspondem aos dados disponibilizados pelo Sage.
4. Os processos de assistência são apresentados de forma compreensível.
5. Os estados são apresentados de forma clara e consistente.
6. Informação interna do Sage não é exposta.
7. Orçamentos e faturas são apresentados apenas quando disponíveis.
8. A aplicação funciona em desktop e dispositivos móveis.
9. As operações comuns apresentam tempos de resposta adequados.
10. Os erros são tratados sem exposição de informação técnica sensível.
11. A indisponibilidade do Sage é tratada de forma controlada.
12. A integração pode ser monitorizada e os erros podem ser diagnosticados.
13. O sistema possui mecanismos adequados de backup e recuperação.
14. O código encontra-se organizado de forma modular e documentada.
15. Os principais componentes possuem testes adequados.

---

# 9. Questões em aberto

Antes da versão final dos requisitos não funcionais, deverá ser confirmado:

- [ ] Qual o ambiente de alojamento do portal.
- [ ] Qual o servidor utilizado para o backend.
- [ ] Qual a base de dados escolhida.
- [ ] Qual o mecanismo de integração efetivamente disponível no Sage 50c.
- [ ] Se a integração funciona em tempo real ou por sincronização periódica.
- [ ] Qual o volume esperado de clientes.
- [ ] Qual o volume esperado de processos e documentos.
- [ ] Qual a política de backups da Megactec.
- [ ] Qual o período de retenção de dados.
- [ ] Qual o fornecedor de SMS.
- [ ] Qual o fornecedor de email transacional.
- [ ] Quais os requisitos legais específicos aplicáveis à retenção de dados.
- [ ] Qual a estratégia final para armazenamento de documentos.
- [ ] Quais os níveis de disponibilidade pretendidos em produção.

---

# 10. Notas para o desenvolvimento do projeto

## 10.1 Não confundir requisitos funcionais e não funcionais

Exemplo funcional:

> **RF26 — Consulta do estado atual:** o cliente consegue consultar o estado da reparação.

Exemplo não funcional:

> **RNF29 — Linguagem orientada ao cliente:** o estado deverá ser apresentado utilizando uma designação compreensível para o cliente.

---

## 10.2 O Sage não deve determinar a experiência do cliente

O facto de uma informação existir no Sage não significa que deva ser apresentada diretamente.

O portal deverá funcionar como uma camada de transformação:

```text
Dados internos do Sage
        ↓
Regras de negócio
        ↓
Filtragem / transformação
        ↓
Informação adequada ao cliente
```

---

## 10.3 A base de dados do portal não deve ser uma cópia integral do Sage

A aplicação poderá possuir uma base de dados própria, mas deverá armazenar apenas a informação necessária ao funcionamento do portal.

O princípio recomendado é:

```text
Sage
  = fonte dos dados empresariais

Portal DB
  = dados necessários à aplicação
  + autenticação
  + associações
  + notificações
  + configuração
  + informação técnica de integração
```

---

## 10.4 Prioridade do projeto

Para o projeto académico, a prioridade deverá ser:

```text
1. Segurança
2. Integração correta com Sage
3. Integridade dos dados
4. Usabilidade
5. Desempenho
6. Responsividade
7. Escalabilidade
8. Funcionalidades adicionais
```

A implementação de funcionalidades adicionais não deverá comprometer os requisitos fundamentais do sistema.
