export type Founder = {
  nome: string
  foto: string
  cargo: string
  email: string
}

export type Startup = {
  id: number
  nome_da_startup: string
  imagem_de_capa: string
  descricao: string
  mercado: string
  problema: string
  solucao: string
  vertical: string
  localizacao: string
  fundadores: Founder[]
  site: string
  cresimento_mom: number
  mrr: number
}
