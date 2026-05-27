import type { Metadata } from 'next'
import { Sora, Inter } from 'next/font/google'
import { Providers } from '@/components/layout/Providers'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { NetworkBackground } from '@/components/ui/NetworkBackground'
import './globals.css'

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Ricardo Alves — Desenvolvedor Back-end',
  description:
    'Portfólio de Ricardo Alves, desenvolvedor back-end especializado em Node.js, TypeScript e PostgreSQL.',
  openGraph: {
    title: 'Ricardo Alves — Desenvolvedor Back-end',
    description:
      'Portfólio de Ricardo Alves, desenvolvedor back-end especializado em Node.js, TypeScript e PostgreSQL.',
    locale: 'pt_BR',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${sora.variable} ${inter.variable}`}
      suppressHydrationWarning
      data-scroll-behavior="smooth"
    >
      <body className="min-h-screen flex flex-col antialiased">
        <Providers>
          <NetworkBackground />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
