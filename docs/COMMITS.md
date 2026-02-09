# Convenção de commits e versão

## Formato da mensagem

```
<tipo>(<escopo opcional>): <descrição>

[corpo opcional]

[rodapé opcional]
```

Exemplos válidos:

- `feat: adiciona rota de login`
- `fix: corrige validação do token`
- `docs: atualiza README`
- `chore: atualiza dependências`

## Tipos e impacto na versão

| Tipo       | Uso              | Ao rodar `npm run release` |
|-----------|-------------------|-----------------------------|
| **feat**  | Nova funcionalidade | **minor**: 0.0.1 → 0.1.0   |
| **fix**   | Correção de bug   | **patch**: 0.0.1 → 0.0.2   |
| **docs**, **style**, **refactor**, **perf**, **test**, **build**, **chore** | Outros | Não altera número (ou patch, conforme config) |

Para **major** (1.0.0): use no corpo do commit:

```
feat: quebra contrato da API

BREAKING CHANGE: rota /auth alterada
```

Ou: `npm run release:major` / `npm run release:minor` para forçar o tipo de versão.

## Fluxo

1. **A cada commit**: o hook valida a mensagem (Commitlint) e roda o build nos arquivos staged (lint-staged).
2. **Quando for liberar versão**: rode `npm run release`. O standard-version lê os commits desde a última tag e sobe a versão (patch/minor/major), gera CHANGELOG e cria a tag git.

Versão inicial do projeto: **0.0.1**.

- **Primeiro release** (criar tag 0.0.1 sem alterar versão): `npm run release:first`
- Depois: `npm run release` sobe para 0.0.2 (fix), 0.1.0 (feat) ou 1.0.0 (BREAKING).
