'use client'
import { motion } from 'framer-motion'
import { ProjectCard } from '@/components/ui/ProjectCard'
import { projects } from '@/lib/projects'

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export function Portfolio() {
  return (
    <section
      id="portfolio"
      aria-labelledby="portfolio-titulo"
      className="py-24 px-6 bg-background/40 backdrop-blur-[2px]"
    >
      <motion.div
        className="max-w-5xl mx-auto"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <h2
          id="portfolio-titulo"
          className="font-display text-3xl font-bold text-foreground mb-12"
        >
          Projetos
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </motion.div>
    </section>
  )
}
