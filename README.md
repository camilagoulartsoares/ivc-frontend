<!-- ## ✅ Testes

Este projeto possui testes automatizados utilizando:

- [Jest](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro)

Os testes cobrem o comportamento da aplicação como:

- Renderização do componente principal `<App />` com a página inicial (`Home`)
- Execução sem erros de renderização
- Integração futura com filtros, listagem de startups e comportamento interativo

Para executar os testes localmente:

```bash
npm test -->


## 🚀 Tecnologias utilizadas
Este projeto foi desenvolvido com as seguintes tecnologias:

React

Next.js

🖥️ Funcionalidades
A plataforma implementa recursos interativos e dinâmicos, focados em navegação fluida e boa experiência do usuário:

🔎 Filtros
Filtros aplicados localmente, sem novas requisições à API:

Filtro por nome da startup: campo de busca em tempo real.

Filtro por localização: seleção por cidade.

Filtro por vertical: seleção por setor (ex: Fintech, Edtech).

Esses filtros permitem refinar a visualização de startups de maneira prática e intuitiva.

📄 Paginação
A listagem de startups é paginada, garantindo desempenho e usabilidade:

Os cards são divididos em páginas com botões de navegação.

A paginação respeita os filtros ativos, mantendo os resultados consistentes.

❤️ Favoritar Startups
Funcionalidade que permite o usuário salvar suas startups favoritas:

Ícone de coração no canto superior esquerdo do card.

Ao clicar, o coração muda de cor (cinza → vermelho).

Os favoritos são salvos no localStorage, persistindo mesmo ao recarregar a página.

A funcionalidade é local e independente de login.

🧪 Testes
Este projeto utiliza testes automatizados com:

Jest

React Testing Library

Os testes cobrem:

Renderização do componente principal

Comportamento básico da página inicial

Integrações futuras com filtros e cards

▶️ Rodando os testes
bash
Copiar
Editar
npm test
