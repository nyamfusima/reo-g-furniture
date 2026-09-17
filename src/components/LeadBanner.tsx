import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { MESSAGES } from '../lib/whatsapp'
import { AnimatedSection } from './AnimatedSection'
import { Container } from './Container'
import { WhatsAppButton } from './WhatsAppButton'

export function LeadBanner() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <AnimatedSection>
          <div className="grid items-center gap-10 rounded-2xl bg-charcoal px-6 py-10 text-white md:grid-cols-[1.2fr_0.8fr] md:px-12 md:py-14">
            <div>
              <p className="text-sm font-medium tracking-[0.18em] text-brass uppercase">Custom furniture</p>
              <h2 className="mt-3 text-3xl font-bold tracking-[-0.02em] md:text-4xl">Need something made for your space?</h2>
              <p className="mt-4 max-w-xl text-base leading-7 text-white/65">
                Send the room, measurements and finish you have in mind. We can quote custom sizes and custom finishes for bedrooms, kitchens and living rooms.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row md:justify-end">
              <WhatsAppButton message={MESSAGES.custom}>WhatsApp a quote</WhatsAppButton>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 px-5 py-3 text-sm font-semibold text-white transition duration-300 hover:border-white/40"
              >
                Enquiry form <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </AnimatedSection>
      </Container>
    </section>
  )
}
