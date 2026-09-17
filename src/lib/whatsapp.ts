export const BUSINESS = {
  name: 'Reo G Furniture',
  whatsapp: '27711234567', // TODO: replace with the real WhatsApp number
  phoneDisplay: '+27 71 123 4567', // TODO
  email: 'hello@reogfurniture.co.za', // TODO
  location: 'South Africa',
}

export const MESSAGES = {
  quote: 'Hi Reo G Furniture, I would like a quote.',
  custom: "Hi Reo G Furniture, I'd like a quote for custom furniture.",
  help: 'Hi Reo G Furniture, I need help choosing furniture.',
  product: (name: string) =>
    `Hi Reo G Furniture, I'm interested in the ${name}. Please send me more information.`,
}

export const buildWhatsAppUrl = (message: string) =>
  `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(message)}`

export const openWhatsApp = (message: string) => {
  window.open(buildWhatsAppUrl(message), '_blank', 'noopener,noreferrer')
}
