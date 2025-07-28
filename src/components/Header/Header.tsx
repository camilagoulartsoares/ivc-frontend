import { useState } from "react"

export function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <header className="bg-black text-white px-6 py-4 shadow-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src="/logo.svg" alt="IVC Logo" className="w-8 h-8" />
          <span className="text-xl font-bold">IVC Startups</span>
        </div>

        <nav className="flex items-center gap-6 text-sm">
          <a href="#" className="hover:text-blue-400 transition">Favoritos</a>
          {isLoggedIn ? (
            <button
              onClick={() => setIsLoggedIn(false)}
              className="hover:text-red-400 transition"
            >
              Sair
            </button>
          ) : (
            <>
              <button
                onClick={() => setIsLoggedIn(true)}
                className="hover:text-green-400 transition"
              >
                Entrar
              </button>
              <button className="bg-blue-600 px-4 py-1 rounded hover:bg-blue-700 transition">
                Cadastrar
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
