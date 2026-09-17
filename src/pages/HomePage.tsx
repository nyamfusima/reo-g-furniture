import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { AnimatedSection } from '../components/AnimatedSection'
import { Container } from '../components/Container'
import { Hero } from '../components/Hero'
import { ProductImage } from '../components/ProductImage'
import { SectionHeading } from '../components/SectionHeading'
import { WhatsAppButton } from '../components/WhatsAppButton'
import { products } from '../data/products'
import { btn } from '../lib/ui'
import { MESSAGES } from '../lib/whatsapp'

const rooms = [
  {
    title: 'Bedroom',
    text: 'Wardrobes and drawers that keep clothes and linen in order.',
    href: '/category/bedroom',
    image: '/images/products/wardrobe-large.png',
  },
  {
    title: 'Kitchen',
    text: 'Hutches and sideboards for everyday kitchen storage.',
    href: '/category/kitchen',
    image: '/images/products/kitchen-hutch.png',
  },
  {
    title: 'Living Room',
    text: 'Cabinets for the rooms that collect everything else.',
    href: '/category/living-room',
    image: '/images/products/chest-white-open.png',
  },
]

const reasons = [
  { n: '01', title: 'Locally made', text: 'Furniture for South African homes.' },
  { n: '02', title: 'Custom sizes', text: 'Made to fit the room you have.' },
  { n: '03', title: 'Delivery available', text: 'Arrange delivery with your quote.' },
  { n: '04', title: 'Quality materials', text: 'Built for everyday use.' },
]

export function HomePage() {
  const featured = products.filter((product) => product.featured)

  return (
    <>
      <Hero />

      <section className="pt-12 pb-16 md:pt-16 md:pb-20">
        <Container>
          <AnimatedSection>
            <SectionHeading
              index="01 / Best sellers"
              title="Popular pieces for your home"
              action={
                <Link to="/shop" className={`${btn.ghost} group hidden sm:inline-flex`}>
                  View all
                  <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              }
            />
            <div className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2">
              {featured.slice(0, 4).map((product) => (
                <Link
                  key={product.id}
                  to={`/product/${product.slug}`}
                  className="group w-[80vw] shrink-0 snap-start sm:w-[46%] lg:w-[calc(25%-15px)]"
                >
                  <ProductImage src={product.image} alt={product.name} />
                  <p className="mt-4 text-[15px] font-semibold text-ink">{product.name}</p>
                  <p className="mt-1 text-[13px] text-muted">{product.priceLabel ?? 'Price on request'}</p>
                </Link>
              ))}
            </div>
          </AnimatedSection>
        </Container>
      </section>

      <section className="pb-16 md:pb-24">
        <Container>
          <AnimatedSection>
            <SectionHeading index="02 / Shop by room" title="Choose the space you are furnishing." />
            <div className="mt-10 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
              <Link to={rooms[0].href} className="group overflow-hidden rounded-[24px] bg-product p-8 md:p-10">
                <img src={rooms[0].image} alt={rooms[0].title} loading="lazy" className="mx-auto h-[340px] w-full object-contain md:h-[460px]" />
                <div className="mt-6">
                  <h3 className="text-[28px] font-bold tracking-[-0.03em]">{rooms[0].title}</h3>
                  <p className="mt-2 max-w-md text-[15px] text-muted">{rooms[0].text}</p>
                </div>
              </Link>
              <div className="grid gap-5">
                {rooms.slice(1).map((room) => (
                  <Link key={room.title} to={room.href} className="group overflow-hidden rounded-[24px] bg-product p-6 md:flex md:items-center md:gap-6">
                    <img src={room.image} alt={room.title} loading="lazy" className="mx-auto h-[180px] w-full object-contain md:h-[200px] md:w-[46%]" />
                    <div className="mt-4 md:mt-0">
                      <h3 className="text-[22px] font-bold tracking-[-0.03em]">{room.title}</h3>
                      <p className="mt-2 text-[14px] text-muted">{room.text}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </Container>
      </section>

      <section className="pb-16 md:pb-24">
        <Container>
          <AnimatedSection>
            <div className="grid items-center gap-10 rounded-[28px] bg-panel px-6 py-10 md:grid-cols-2 md:px-12 md:py-14">
              <div>
                <p className="text-[13px] font-medium tracking-[0.18em] text-muted">03 / Custom furniture</p>
                <h2 className="mt-3 text-[32px] leading-tight font-bold tracking-[-0.03em] md:text-[40px]">
                  Furniture made for your space.
                </h2>
                <p className="mt-4 max-w-md text-[15px] leading-7 text-muted">
                  Tell us what you need and we'll help create a piece that fits your room, style and budget.
                </p>
                <WhatsAppButton message={MESSAGES.custom} className="mt-7">
                  Get a Custom Quote
                </WhatsAppButton>
              </div>
              <img
                src="/images/products/kitchen-sideboard-open.png"
                alt="Custom kitchen sideboard"
                loading="lazy"
                className="mx-auto max-h-[360px] w-full object-contain"
              />
            </div>
          </AnimatedSection>
        </Container>
      </section>

      <section className="pb-16 md:pb-24">
        <Container>
          <AnimatedSection>
            <SectionHeading index="04 / Why Reo G" title="A simpler way to furnish a room." />
            <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {reasons.map((item) => (
                <div key={item.n} className="border-t border-line pt-5">
                  <p className="text-[13px] text-reo">{item.n}</p>
                  <h3 className="mt-3 text-[18px] font-semibold">{item.title}</h3>
                  <p className="mt-2 text-[14px] leading-6 text-muted">{item.text}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </Container>
      </section>

      <section className="pb-16 md:pb-24">
        <Container>
          <AnimatedSection>
            <SectionHeading index="05 / From the collection" title="Pieces made to work every day." />
            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {products.slice(0, 2).map((product) => (
                <Link key={product.id} to={`/product/${product.slug}`} className="group rounded-[24px] bg-product p-8">
                  <img src={product.image} alt={product.name} loading="lazy" className="mx-auto h-[280px] w-full object-contain md:h-[340px]" />
                  <p className="mt-6 text-[16px] font-semibold">{product.name}</p>
                </Link>
              ))}
            </div>
          </AnimatedSection>
        </Container>
      </section>

      <section className="pb-16 md:pb-24">
        <Container>
          <AnimatedSection>
            <div className="flex flex-col items-start justify-between gap-6 border-t border-line pt-12 md:flex-row md:items-end">
              <div>
                <p className="text-[13px] font-medium tracking-[0.18em] text-muted">06 / Contact</p>
                <h2 className="mt-3 max-w-lg text-[32px] leading-tight font-bold tracking-[-0.03em] md:text-[40px]">
                  Send a room, a measurement or a piece you like.
                </h2>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <WhatsAppButton message={MESSAGES.quote}>WhatsApp Reo G</WhatsAppButton>
                <Link to="/contact" className={`${btn.secondary} group`}>
                  Enquiry form
                  <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </Container>
      </section>
    </>
  )
}
