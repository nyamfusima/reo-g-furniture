import { ArrowRight } from 'lucide-react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { AnimatedSection } from '../components/AnimatedSection'
import { Container } from '../components/Container'
import { LeadBanner } from '../components/LeadBanner'
import { btn } from '../lib/ui'

const values = [
  {
    title: 'Useful first',
    text: 'Furniture should make daily life simpler — more storage, clearer rooms, less clutter.',
  },
  {
    title: 'Straightforward buying',
    text: 'Browse the range, add pieces to an enquiry, and confirm price and delivery on WhatsApp.',
  },
  {
    title: 'Made for the room',
    text: 'If a standard size will not fit, ask about custom widths, heights and finishes.',
  },
]

const faqs = [
  {
    q: 'Do you deliver?',
    a: 'Delivery can be arranged with your quote. Share your area when you enquire so we can confirm options and timing.',
  },
  {
    q: 'Can you make a custom size?',
    a: 'Yes. Send the room, measurements and the piece you have in mind. We quote custom sizes and finishes separately.',
  },
  {
    q: 'How do I get a price?',
    a: 'Add furniture to your quote basket or message us on WhatsApp. Current pricing is confirmed per enquiry.',
  },
]

export function AboutPage() {
  useEffect(() => {
    if (window.location.hash === '#faqs') {
      document.getElementById('faqs')?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  return (
    <>
      <section className="border-b border-line">
        <Container className="grid items-center gap-10 py-16 md:py-24 lg:grid-cols-2">
          <div>
            <p className="text-sm font-medium tracking-[0.18em] text-brass uppercase">About Reo G</p>
            <h1 className="mt-3 text-3xl font-bold tracking-[-0.03em] md:text-4xl">
              Furniture made to bring order home.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-muted">
              Reo G Furniture is a South African maker of bedroom, kitchen and living room storage. The range is practical, modern and built around the rooms people actually live in.
            </p>
            <Link to="/shop" className={`${btn.primary} mt-8 group`}>
              Browse furniture
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="overflow-hidden rounded-2xl bg-catalogue p-8 md:p-10">
            <img
              src="/images/products/kitchen-hutch.png"
              alt="Reo G kitchen hutch"
              className="mx-auto max-h-[480px] w-full object-contain"
            />
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container>
          <AnimatedSection>
            <p className="text-sm font-medium tracking-[0.18em] text-brass uppercase">How we work</p>
            <h2 className="mt-3 max-w-xl text-3xl font-bold tracking-[-0.02em]">A simple way to furnish a room.</h2>
            <div className="mt-10 grid gap-10 md:grid-cols-3">
              {values.map((item) => (
                <div key={item.title} className="border-t border-line pt-5">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted">{item.text}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </Container>
      </section>

      <section id="faqs" className="bg-linen py-16 md:py-24">
        <Container>
          <AnimatedSection>
            <p className="text-sm font-medium tracking-[0.18em] text-brass uppercase">FAQs</p>
            <h2 className="mt-3 text-3xl font-bold tracking-[-0.02em]">Questions we hear often.</h2>
            <div className="mt-10 grid gap-8 md:grid-cols-3">
              {faqs.map((item) => (
                <div key={item.q}>
                  <h3 className="text-base font-semibold">{item.q}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted">{item.a}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </Container>
      </section>
      <LeadBanner />
    </>
  )
}
