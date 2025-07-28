import React from "react"
import { render } from "@testing-library/react"
import App from "../pages/_app"
import Home from "../pages/index"

describe("App", () => {
  it("renderiza a página Home sem erros", () => {
    render(
      <App
        Component={Home}
        pageProps={{}}
        router={{} as any}
      />
    )
  })
})
