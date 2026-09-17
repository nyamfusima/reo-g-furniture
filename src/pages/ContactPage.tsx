import { Mail, MapPin, Phone, Send } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { AnimatedSection } from '../components/AnimatedSection'
import { Container } from '../components/Container'
import { WhatsAppButton } from '../components/WhatsAppButton'
import { BUSINESS, MESSAGES, openWhatsApp } from '../lib/whatsapp'
import { btn, field } from '../lib/ui'

export function ContactPage() {
  const [form, setForm] = useState({ name: '', phone: '', room: 'Bedroom', message: '' })

  const submit = (event: FormEvent) => {
    event.preventDefault()
    const message = `Hi Reo G Furniture, my name is ${form.name || 'a customer'}. I am enquiring about ${form.room}. ${form.message}${form.phone ? ` My contact number is ${form.phone}.` : ''}`
    openWhatsApp(message)
  }

  return (
    <section className="py-16 md:py-24">
      <Container className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <AnimatedSection>
          <p className="text-sm font-medium tracking-[0.18em] text-brass uppercase">Contact</p>
          <h1 className="mt-3 text-3xl font-bold tracking-[-0.03em] md:text-4xl">Tell us what you need for your space.</h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-muted">
            Send the room, product type and measurements. This form opens WhatsApp with the enquiry already written.
          </p>
          <div className="mt-8 grid gap-4 text-sm">
            <div className="flex items-center gap-3 text-ink">
              <Phone size={18} className="text-brass" /> {BUSINESS.phoneDisplay}
            </div>
            <div className="flex items-center gap-3 text-ink">
              <Mail size={18} className="text-brass" /> {BUSINESS.email}
            </div>
            <div className="flex items-center gap-3 text-ink">
              <MapPin size={18} className="text-brass" /> {BUSINESS.location}
            </div>
          </div>
          <WhatsAppButton message={MESSAGES.quote} className="mt-8">
            Chat on WhatsApp
          </WhatsAppButton>
        </AnimatedSection>

        <AnimatedSection delay={0.1} as="form" onSubmit={submit} className="rounded-2xl border border-line bg-white p-6 md:p-8">
          <h2 className="text-2xl font-semibold tracking-[-0.02em]">Request a quote</h2>
          <p className="mt-2 text-sm text-muted">Nothing is stored on this site. The last step opens WhatsApp.</p>
          <div className="mt-7 grid gap-5 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-medium">
              Name
              <input
                required
                value={form.name}
                onChange={(event) => setForm({ ...form, name: event.target.value })}
                className={field}
                placeholder="Your name"
              />
            </label>
            <label className="grid gap-2 text-sm font-medium">
              Phone
              <input
                value={form.phone}
                onChange={(event) => setForm({ ...form, phone: event.target.value })}
                className={field}
                placeholder="Your phone number"
              />
            </label>
            <label className="grid gap-2 text-sm font-medium sm:col-span-2">
              Room / category
              <select
                value={form.room}
                onChange={(event) => setForm({ ...form, room: event.target.value })}
                className={field}
              >
                <option>Bedroom</option>
                <option>Kitchen</option>
                <option>Living room</option>
                <option>Custom furniture</option>
              </select>
            </label>
            <label className="grid gap-2 text-sm font-medium sm:col-span-2">
              What do you need?
              <textarea
                required
                rows={6}
                value={form.message}
                onChange={(event) => setForm({ ...form, message: event.target.value })}
                className={`${field} resize-none`}
                placeholder="Product, size, colour, delivery area..."
              />
            </label>
          </div>
          <button type="submit" className={`${btn.gradient} mt-6 w-full`}>
            <Send size={16} /> Continue on WhatsApp
          </button>
        </AnimatedSection>
      </Container>
    </section>
  )
}
