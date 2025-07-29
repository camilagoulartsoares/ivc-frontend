import React from "react"
import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import Home from "@/pages/index"
import { setupServer } from "msw/node"
import { rest } from "msw"
import { Startup } from "@/types/Startup"

const mockData: Startup[] = [
  {
    id: 1,
    nome_da_startup: "FintechX",
    vertical: "Finanças",
    localizacao: "São Paulo",
    mrr: "R$100.000",
    imagem_de_capa: "fintechx.jpg"
  },
  {
    id: 2,
    nome_da_startup: "HealthNow",
    vertical: "Saúde",
    localizacao: "Rio de Janeiro",
    mrr: "R$80.000",
    imagem_de_capa: "healthnow.jpg"
  }
]

const server = setupServer(
  rest.get("https://api.restful-api.dev/03ac72cf-2cf2-40d2-86ac-be411e3be742/startups", (_, res, ctx) => {
    return res(ctx.json(mockData))
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe("Home page filters", () => {
  it("filtra startups pelo campo de busca", async () => {
    render(<Home />)

    await waitFor(() => {
      expect(screen.getByText("FintechX")).toBeInTheDocument()
      expect(screen.getByText("HealthNow")).toBeInTheDocument()
    })

    const input = screen.getByPlaceholderText("Buscar startups...")
    fireEvent.change(input, { target: { value: "Fintech" } })

    await waitFor(() => {
      expect(screen.getByText("FintechX")).toBeInTheDocument()
      expect(screen.queryByText("HealthNow")).not.toBeInTheDocument()
    })
  })
})
