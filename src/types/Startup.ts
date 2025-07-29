export interface Fundador {
  nome: string
  foto: string
  cargo: string
  email: string
}

export interface Startup {
  id: number
  nome_da_startup: string
  imagem_de_capa: string
  descricao: string
  mercado: string
  problema: string
  solucao: string
  vertical: string
  localizacao: string
  fundadores: Fundador[]
  site: string
  cresimento_mom: number
  mrr: number
}
