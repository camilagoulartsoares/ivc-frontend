# Vitrine de Startups | Investidores.vc

Este é um projeto em **Next.js + TypeScript** que consome a API pública da [Investidores.vc](https://investidores.vc) para listar, filtrar e visualizar detalhes de startups brasileiras, no estilo "Netflix de Startups".

## 🚀 Funcionalidades atuais

- Listagem de startups
- Filtros por nome, vertical e localização
- Modal com detalhes da startup
- Integração com a API protegida por API Key
- Estilização customizada com CSS

<!-- ## ✅ Em desenvolvimento

- Login e Cadastro de usuários
- Favoritar startups
- Deletar startups (admin)
- Paginação com carregamento dinâmico
- Sistema de autenticação com JWT -->

## 🧪 Tecnologias

- [Next.js 14+](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Axios](https://axios-http.com/)
- [Investidores.vc API](https://make.investidores.vc)

## 🛠 Como rodar o projeto

```bash
git clone https://github.com/camilagoulartsoares/ivc
cd ivc
npm install
cp .env.local.example .env.local
# Adicione sua API Key ao arquivo
npm run dev
