# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.0.2](https://github.com/FelpHendeson/flpAuthCore/compare/v0.0.1...v0.0.2) (2026-04-07)


### ⚠ BREAKING CHANGES

* **auth:** User payloads now use `userId` instead of `id`.
Database primary key column is now `user_id`.

### ✨ Funcionalidades

* Estrutura de Pastas e Amadurecimento Arquitetural do Projeto ([1fce1a2](https://github.com/FelpHendeson/flpAuthCore/commit/1fce1a2bd8c275663745ca70435f60e8f9749087))
* Integração do Prisma para gerenciamento de usuários ([615a203](https://github.com/FelpHendeson/flpAuthCore/commit/615a203a6123e437d8c6f4c747702024ccc3601b))


### ♻️ Refatoração

* **auth:** Standardize user identifier naming and Codex conventions ([206ebc5](https://github.com/FelpHendeson/flpAuthCore/commit/206ebc55a08984736f0831aef386dabacdad86b7))
* Substituindo a instância Fastify por uma instância de app para inicialização do servidor ([7202a1d](https://github.com/FelpHendeson/flpAuthCore/commit/7202a1dea540a81e94e4bea202f9229a3c2340e2))


### 🔧 Manutenção

* Atualizando o parâmetro header-max-length na configuração do commitlint para 200 ([5f846fc](https://github.com/FelpHendeson/flpAuthCore/commit/5f846fc334784d66a27a751471a27d024411d27b))
* **release:** Add patch release script and pre-1.0 versioning policy ([ef3d809](https://github.com/FelpHendeson/flpAuthCore/commit/ef3d80960688ea1791c22fa427ddc8a104f52d78))

### 0.0.1 (2026-02-09)


### ✨ Funcionalidades

* Adiciona servidor fastify básico ([d8f4636](https://github.com/FelpHendeson/flpAuthCore/commit/d8f463680ba4fb9e935cc60ef33601ea445bdde2))


### 🔧 Manutenção

* Adiciona husky, commitlint e controle de versão ([ad7bef9](https://github.com/FelpHendeson/flpAuthCore/commit/ad7bef93980685054852cc3617b11f2bac3abde4))
* Configura build com tsup e typescript ([1352a49](https://github.com/FelpHendeson/flpAuthCore/commit/1352a492d2b8fbc62f04587545a3a2ad18b03e68))
