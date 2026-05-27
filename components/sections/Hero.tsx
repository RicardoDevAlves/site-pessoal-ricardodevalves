'use client'
import { motion, useAnimation } from 'framer-motion'
import { useEffect } from 'react'
import { Mail, ArrowDown } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

const fadeInUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
}

const fadeInRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.65, delay: 0.15 } },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

function IconGithub({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  )
}

function IconLinkedin({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}


export function Hero() {
  const textControls = useAnimation()
  const photoControls = useAnimation()

  useEffect(() => {
    textControls.start('visible')
    photoControls.start('visible')
  }, [textControls, photoControls])

  return (
    <section
      id="hero"
      aria-label="Apresentação"
      className="min-h-[calc(100vh-4rem)] flex items-center py-16 px-6"
    >
      <div className="max-w-5xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* Coluna esquerda — texto */}
        <motion.div variants={stagger} initial="hidden" animate={textControls}>

          <motion.p
            variants={fadeInUp}
            className="inline-flex items-center gap-2 text-accent text-xs font-medium tracking-widest uppercase mb-8"
          >
            <span className="inline-block w-6 h-px bg-accent" aria-hidden="true" />
            Olá, eu sou
          </motion.p>

          <motion.h1 variants={fadeInUp} className="font-display leading-[0.95] mb-6">
            <span className="block text-5xl sm:text-6xl lg:text-7xl font-light text-foreground">
              Ricardo
            </span>
            <span className="block text-5xl sm:text-6xl lg:text-7xl font-black text-foreground">
              <span className="text-accent">Dev</span>{' '}
              <span>Alves</span>
            </span>
          </motion.h1>

          <motion.div variants={fadeInUp} className="flex items-center gap-3 mb-6">
            <span className="font-display text-lg sm:text-xl font-medium text-muted">
              Desenvolvedor Back-end
            </span>
          </motion.div>

          <motion.p
            variants={fadeInUp}
            className="text-muted text-base leading-relaxed max-w-md mb-10"
          >
            Construo APIs escaláveis e sistemas robustos com Node.js, Python e PostgreSQL.
            Apaixonado por performance, boas práticas e código que dura.
          </motion.p>

          <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-4">
            <Link
              href="/#portfolio"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-white text-sm font-semibold hover:bg-accent/85 transition-colors"
            >
              Ver projetos
              <ArrowDown size={15} />
            </Link>

            <div className="flex items-center gap-2">
              <a
                href="https://github.com/ricardodevalves"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="p-2.5 rounded-full border border-border text-muted hover:text-accent hover:border-accent transition-colors"
              >
                <IconGithub />
              </a>
              <a
                href="https://linkedin.com/in/ricardodevalves"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="p-2.5 rounded-full border border-border text-muted hover:text-accent hover:border-accent transition-colors"
              >
                <IconLinkedin />
              </a>
              <a
                href="mailto:motoric750@gmail.com"
                aria-label="E-mail"
                className="p-2.5 rounded-full border border-border text-muted hover:text-accent hover:border-accent transition-colors"
              >
                <Mail size={18} />
              </a>
            </div>
          </motion.div>
        </motion.div>

        {/* Coluna direita — foto */}
        <motion.div
          variants={fadeInRight}
          initial="hidden"
          animate={photoControls}
          className="flex justify-center lg:justify-end"
        >
          <div className="relative">
            {/* Blur decorativo atrás */}
            <div
              className="absolute inset-0 rounded-full blur-3xl opacity-20 scale-110"
              style={{ background: 'linear-gradient(135deg, var(--accent), #8b5cf6)' }}
              aria-hidden="true"
            />

            {/* Anel gradiente */}
            <div
              className="relative p-0.75 rounded-full"
              style={{ background: 'linear-gradient(135deg, var(--accent), #8b5cf6)' }}
            >
              {/* Container da foto */}
              <div
                className="w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden"
                style={{ position: 'relative' }}
              >
                <Image
                  src="/foto.jpg"
                  alt="Ricardo Dev Alves na sua moto"
                  fill
                  sizes="(max-width: 640px) 256px, (max-width: 1024px) 288px, 320px"
                  className="object-cover object-top"
                  priority
                />
              </div>
            </div>

            {/* Pontos decorativos */}
            <div
              className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full blur-2xl opacity-30"
              style={{ background: 'var(--accent)' }}
              aria-hidden="true"
            />
            <div
              className="absolute -top-4 -left-4 w-20 h-20 rounded-full blur-2xl opacity-20"
              style={{ background: '#8b5cf6' }}
              aria-hidden="true"
            />
          </div>
        </motion.div>

      </div>
    </section>
  )
}
