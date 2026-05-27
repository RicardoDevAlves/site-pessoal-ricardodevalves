export interface Project {
  title: string
  description: string
  stack: string[]
  githubUrl?: string
  demoUrl?: string
  featured: boolean
}

export const projects: Project[] = [
  {
    title: 'API de Gestão Financeira',
    description:
      'API REST robusta para controle de transações, categorias e relatórios financeiros. Autenticação JWT, rate limiting e documentação OpenAPI.',
    stack: ['Node.js', 'TypeScript', 'PostgreSQL', 'Docker', 'Redis'],
    githubUrl: 'https://github.com/ricardodevalves',
    featured: true,
  },
  {
    title: 'Microserviço de Autenticação',
    description:
      'Serviço dedicado a autenticação e autorização com suporte a OAuth2, 2FA via TOTP e auditoria de acessos.',
    stack: ['Python', 'FastAPI', 'PostgreSQL', 'JWT'],
    githubUrl: 'https://github.com/ricardodevalves',
    featured: true,
  },
  {
    title: 'CLI de Deploy Automatizado',
    description:
      'Ferramenta de linha de comando para automatizar deploys em ambientes Linux, com rollback automático e notificações via webhook.',
    stack: ['Node.js', 'TypeScript', 'Shell Script', 'Docker'],
    githubUrl: 'https://github.com/ricardodevalves',
    featured: true,
  },
  {
    title: 'Worker de Processamento de Filas',
    description:
      'Sistema de workers concorrentes para processamento assíncrono de jobs com BullMQ, monitoramento e retry com backoff exponencial.',
    stack: ['Node.js', 'Redis', 'BullMQ', 'TypeScript'],
    githubUrl: 'https://github.com/ricardodevalves',
    featured: false,
  },
]
