import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export function CategoryCard({
  title,
  description,
  href,
  image,
}: {
  title: string
  description: string
  href: string
  image: string
}) {
  return (
    <Link to={href} className="group block">
      <div className="overflow-hidden rounded-2xl bg-catalogue p-8 md:p-10">
        <div className="aspect-[4/5]">
          <img
            src={image}
            alt=""
            className="h-full w-full object-contain object-center transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
        </div>
      </div>
      <div className="pt-5">
        <h3 className="text-xl font-semibold tracking-[-0.02em] text-ink">{title}</h3>
        <p className="mt-2 text-sm leading-6 text-muted">{description}</p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-charcoal">
          Shop {title.split(' ')[0].toLowerCase()}
          <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  )
}
