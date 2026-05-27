'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { ThemeToggle } from '@/components/ui/ThemeToggle'

const navLinks = [
  { href: '/#sobre', label: 'Sobre' },
  { href: '/#portfolio', label: 'Portfólio' },
  { href: '/blog', label: 'Blog' },
]

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(total > 0 ? (window.scrollY / total) * 100 : 0)
      setScrolled(window.scrollY > 80)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const sectionIds = ['sobre', 'portfolio']
    const observers = sectionIds.map((id) => {
      const el = document.getElementById(id)
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id)
        },
        { threshold: 0.35 },
      )
      obs.observe(el)
      return obs
    })
    return () => observers.forEach((obs) => obs?.disconnect())
  }, [pathname])

  const isActive = (href: string) => {
    if (href === '/blog') return pathname.startsWith('/blog')
    const section = href.replace('/#', '')
    return activeSection === section
  }

  const isFloating = scrolled && !menuOpen

  return (
    <header className="sticky top-0 z-50" aria-label="Navegação principal">
      {/* Barra de progresso — só no modo docked */}
      <AnimatePresence>
        {!scrolled && (
          <motion.div
            key="progress"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="absolute top-0 left-0 h-0.5 bg-accent transition-[width] duration-150 ease-out z-10"
            style={{ width: `${scrollProgress}%` }}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Wrapper que alterna entre barra completa e pill flutuante */}
      <div
        className={`transition-all duration-300 ease-out ${
          isFloating
            ? 'flex justify-center py-3'
            : 'border-b border-border bg-background/80 backdrop-blur-sm'
        }`}
      >
        <nav
          className={`flex items-center justify-between transition-all duration-300 ease-out ${
            isFloating
              ? 'rounded-full border border-border bg-background/85 backdrop-blur-md shadow-lg h-12 px-3 gap-1'
              : 'max-w-5xl mx-auto px-6 h-16 w-full gap-1'
          }`}
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group"
            aria-label="Ir para o início"
          >
            <span
              className="w-8 h-8 rounded-md flex items-center justify-center text-white text-xs font-bold font-display shrink-0 group-hover:scale-110 transition-transform duration-200"
              style={{ background: 'linear-gradient(135deg, var(--accent), #8b5cf6)' }}
              aria-hidden="true"
            >
              RA
            </span>
            <AnimatePresence>
              {!isFloating && (
                <motion.span
                  key="logo-text"
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className="font-display font-semibold text-foreground overflow-hidden whitespace-nowrap"
                >
                  Ricardo<span className="text-accent">.dev</span>
                </motion.span>
              )}
            </AnimatePresence>
          </Link>

          {/* Controles direita */}
          <div className="flex items-center gap-1">
            {/* Nav desktop */}
            <ul className="hidden sm:flex items-center gap-1 mr-2" role="list">
              {navLinks.map((link, i) => (
                <li key={link.href} className="flex items-center">
                  {i > 0 && !isFloating && (
                    <span className="text-border text-xs mr-1 select-none" aria-hidden="true">
                      /
                    </span>
                  )}
                  <Link
                    href={link.href}
                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-150 ${
                      isActive(link.href)
                        ? 'text-accent bg-accent/10'
                        : 'text-muted hover:text-foreground hover:bg-border'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <ThemeToggle />

            {/* Hambúrguer — apenas mobile */}
            <button
              className="sm:hidden p-2 rounded-md text-muted hover:text-foreground hover:bg-border transition-colors"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>
      </div>

      {/* Menu mobile */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            key="mobile-menu"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.16, ease: 'easeOut' }}
            className="sm:hidden border-t border-border bg-background px-4 py-3 flex flex-col gap-1"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`px-3 py-2.5 rounded-md text-sm transition-colors ${
                  isActive(link.href)
                    ? 'text-accent font-medium bg-accent/10'
                    : 'text-muted hover:text-foreground hover:bg-border'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
