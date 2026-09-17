import { Facebook, Instagram, Mail, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'
import { BUSINESS, MESSAGES } from '../lib/whatsapp'
import { BrandLogo } from './BrandLogo'
import { Container } from './Container'
import { WhatsAppButton } from './WhatsAppButton'

const shopLinks = [
  { label: 'Shop all', to: '/shop' },
  { label: 'Bedroom', to: '/category/bedroom' },
  { label: 'Kitchen', to: '/category/kitchen' },
  { label: 'Living Room', to: '/category/living-room' },
]

const companyLinks = [
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

export function Footer() {
  return (
    <footer className="bg-navy text-white">
      <Container className="grid gap-12 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <BrandLogo inverse size="footer" />
          <p className="mt-5 max-w-sm text-sm leading-7 text-white/55">
            Bedroom furniture, kitchen cupboards and living room storage made for real South African homes.
          </p>
          <WhatsAppButton message={MESSAGES.quote} className="mt-6">
            WhatsApp us
          </WhatsAppButton>
        </div>

        <div>
          <h3 className="text-[13px] font-semibold tracking-[0.16em] text-white/70 uppercase">Shop</h3>
          <div className="mt-4 grid gap-2.5 text-sm text-white/55">
            {shopLinks.map((link) => (
              <Link key={link.to} to={link.to} className="transition-colors hover:text-white">
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-[13px] font-semibold tracking-[0.16em] text-white/70 uppercase">Company</h3>
          <div className="mt-4 grid gap-2.5 text-sm text-white/55">
            {companyLinks.map((link) => (
              <Link key={link.to} to={link.to} className="transition-colors hover:text-white">
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-[13px] font-semibold tracking-[0.16em] text-white/70 uppercase">Contact</h3>
          <div className="mt-4 grid gap-3 text-sm text-white/55">
            <a href={`tel:${BUSINESS.phoneDisplay.replace(/\s/g, '')}`} className="inline-flex items-center gap-2 hover:text-white">
              <Phone size={16} /> {BUSINESS.phoneDisplay}
            </a>
            <a href={`mailto:${BUSINESS.email}`} className="inline-flex items-center gap-2 hover:text-white">
              <Mail size={16} /> {BUSINESS.email}
            </a>
          </div>
          <div className="mt-6 flex gap-3">
            {[
              { Icon: Facebook, label: 'Facebook' },
              { Icon: Instagram, label: 'Instagram' },
            ].map(({ Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="grid h-10 w-10 place-items-center rounded-[12px] border border-white/15 text-white/65 transition-colors hover:text-white"
              >
                <Icon size={17} />
              </a>
            ))}
          </div>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-2 py-5 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Reo G Furniture. All rights reserved.</p>
          <p>South Africa · Delivery and custom orders on request</p>
        </Container>
      </div>
    </footer>
  )
}
