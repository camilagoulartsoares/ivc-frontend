import { render, screen } from "@testing-library/react"
import App from "../pages/_app"
import type { AppProps } from "next/app"

jest.mock("../services/api", () => ({
  api: {
    get: jest.fn(() => Promise.resolve({ data: { message: "ok" } })),
  },
}))

describe("App", () => {
  it("renderiza sem erros", () => {
    const Component = () => <div>Home</div>
    render(<App Component={Component} pageProps={{}} />)
    expect(screen.getByText("Home")).toBeInTheDocument()
  })
})
