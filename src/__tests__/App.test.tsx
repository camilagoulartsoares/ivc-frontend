import React from "react"
import { render } from "@testing-library/react"
import App from "../pages/_app"


describe("App", () => {
  it("renderiza sem erros", () => {
    const DummyComponent = () => <div>Teste</div>

    render(
      <App
        Component={DummyComponent}
        pageProps={{}}
        router={{} as any}
      />
    )
  })
})
