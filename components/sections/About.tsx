'use client'
import { motion } from 'framer-motion'
import { Download } from 'lucide-react'
import { Tag } from '@/components/ui/Tag'
import { skills } from '@/lib/skills'

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export function About() {
  return (
    <section
      id="sobre"
      aria-labelledby="sobre-titulo"
      className="py-24 px-6"
    >
      <motion.div
        className="max-w-5xl mx-auto"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <h2
          id="sobre-titulo"
          className="font-display text-3xl font-bold text-foreground mb-12"
        >
          Sobre mim
        </h2>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="flex flex-col gap-6">
            <p className="text-muted leading-relaxed">
              Sou desenvolvedor back-end com foco em construir sistemas que escalam. Trabalho
              principalmente com Node.js e TypeScript, mas também tenho experiência sólida com
              Python e FastAPI para serviços mais específicos.
            </p>
            <p className="text-muted leading-relaxed">
              Minha abordagem prioriza código limpo, testes e observabilidade. Gosto de entender
              o problema antes de escrever a primeira linha — e de deixar a arquitetura dizer
              claramente o que o sistema faz.
            </p>
            <a
              href="/CV.pdf"
              download
              className="inline-flex items-center gap-2 w-fit px-5 py-2.5 rounded-full border border-border text-sm font-medium text-foreground hover:bg-border transition-colors mt-2"
            >
              <Download size={15} />
              Baixar currículo
            </a>
          </div>

          <div className="flex flex-col gap-6">
            <div>
              <h3 className="text-sm font-semibold text-muted uppercase tracking-widest mb-4">
                Back-end
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.backend.map((s) => (
                  <Tag key={s} label={s} />
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-muted uppercase tracking-widest mb-4">
                Ferramentas
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.outros.map((s) => (
                  <Tag key={s} label={s} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
