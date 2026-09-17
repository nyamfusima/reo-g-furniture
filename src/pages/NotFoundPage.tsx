import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import { AnimatedSection } from '../components/AnimatedSection'
import { Container } from '../components/Container'
import { btn } from '../lib/ui'

export function NotFoundPage() {
  return (
    <section className="py-24 md:py-28">
      <Container className="max-w-2xl text-center">
        <AnimatedSection>
          <p className="text-sm font-medium tracking-[0.18em] text-brass uppercase">404</p>
          <h1 className="mt-4 text-3xl font-bold tracking-[-0.03em] md:text-4xl">That page is not in the showroom.</h1>
          <p className="mt-4 text-muted">Use the shop to browse the current furniture range.</p>
          <Link to="/" className={`${btn.primary} mt-7`}>
            <ArrowLeft size={16} /> Back home
          </Link>
        </AnimatedSection>
      </Container>
    </section>
  )
}
