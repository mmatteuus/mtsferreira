# Módulo de Gestão de O.S

Este módulo adiciona uma área simples de gestão de ordens de serviço (demo), usando armazenamento local no navegador.

## Acesso

- Página protegida em `/os`.
- Faça login em `/login` com usuário `admin` e senha `admin`.

## Funcionalidades

- Listagem com busca, filtros (status, cliente e período) e exportar CSV.
- Nova O.S com numeração sequencial automática.
- Detalhes/edição: status, prioridade, técnico, equipamento, descrição.
- Finanças: itens/serviços (quantidade x unitário), desconto, outros e total.
- Timeline: registro de notas e mudanças de status.
- Anexos: upload de arquivos (base64) atrelados à O.S.
- Impressão: `/os/:id/print` com layout de impressão e botão “Imprimir”.

## Observações

- Persistência local via `localStorage`, adequada para demonstração/desenvolvimento.
- Para produção, recomenda-se backend (API + banco) e autenticação real.

