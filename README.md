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

🔍 Funcionalidades de Filtro e Paginação
Esta aplicação implementa filtros e paginação de forma dinâmica e responsiva, com foco em uma boa experiência de navegação:

🔎 Filtros implementados
Filtro por nome da startup: campo de busca que filtra os cards em tempo real conforme o usuário digita.

Filtro por localização: dropdown que permite selecionar uma cidade específica.

Filtro por vertical: dropdown com as áreas de atuação (ex: Fintech, Edtech) para filtrar startups por setor.

Todos os filtros são aplicados localmente, ou seja, sem novas requisições à API — melhorando performance e usabilidade.

📄 Paginação
A listagem de startups é paginada, permitindo uma navegação mais leve e fluida mesmo com muitos registros.

Os cards são divididos por páginas, com botões de navegação para avançar ou voltar entre elas.

A paginação também respeita os filtros aplicados, mantendo os resultados consistentes.