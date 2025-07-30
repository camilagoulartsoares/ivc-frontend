import { Html, Head, Main, NextScript } from "next/document"
import React from "react"

export default function Document() {
  return (
    <Html lang="pt-BR">
      <Head>
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600&display=swap"
            rel="stylesheet"
          />
          <link rel="icon" type="image/x-icon" href="/favicon.png" />
        </Head>

        <link rel="icon" type="image/x-icon" href="/favicon.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
