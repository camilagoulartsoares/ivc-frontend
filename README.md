# 📊 Vitrine de Startups

Plataforma interativa que apresenta startups em um layout estilo vitrine (como a Netflix), com filtros dinâmicos, favoritos e funcionalidades exclusivas para usuários autenticados.

## 🚀 Tecnologias utilizadas

Este projeto foi desenvolvido com as seguintes tecnologias:

- React
- Next.js
- Axios
- CSS Modules
- Jest
- React Testing Library

## 🖥️ Funcionalidades

A plataforma implementa recursos interativos e dinâmicos, com foco em navegação fluida e boa experiência do usuário:

### 🔎 Filtros

Filtros aplicados localmente (sem novas requisições à API):

- **Por nome da startup:** busca em tempo real.
- **Por localização:** seleção por cidade.
- **Por vertical:** seleção por setor (ex: Fintech, Edtech).
- **Favoritas:** exibe apenas startups marcadas como favoritas.

Esses filtros podem ser combinados para refinar os resultados de forma prática e intuitiva.

### 📄 Paginação

A listagem de startups é paginada:

- Cards são exibidos por página com botões de navegação.
- A paginação respeita os filtros aplicados.

### ❤️ Favoritar Startups

- Ícone de coração no canto superior esquerdo de cada card.
- Ao clicar, o coração muda de cor (cinza → vermelho).
- Os favoritos são salvos no `localStorage` e persistem após o recarregamento da página.
- Funcionalidade local, **não depende de login**.

### 🔐 Funcionalidades para Usuários Logados

Usuários autenticados têm acesso a funcionalidades exclusivas:

- **Criar startup**: botão acessível no header, com verificação de autenticação.
- **Editar startup**: disponível em cards próprios do usuário.
- **Deletar startup**: com modal de confirmação, também restrito ao dono da startup.

### 💬 Chatbot com Integração Backend

Usuários autenticados podem interagir com um chatbot inteligente integrado ao backend (NestJS):

- Permite tirar dúvidas e buscar startups por palavras-chave.
- Sugestões de perguntas aparecem logo no início da conversa.
- Filtro de pesquisa com base nas mensagens digitadas.
- Respostas dinâmicas consumidas da API em tempo real.

## 🧪 Testes

Este projeto possui testes automatizados utilizando:

- [Jest](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro)

### 🧫 O que os testes cobrem

- Renderização do componente principal (`<App />`) com a página inicial.
- Comportamento básico da tela inicial (`Home`).
- Integrações futuras com filtros e listagem de startups.

### ▶️ Como rodar os testes localmente

```bash
npm test
