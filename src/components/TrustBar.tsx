const items = [
  { title: 'Locally made', text: 'Furniture for South African homes' },
  { title: 'Custom sizes', text: 'Made to fit the room you have' },
  { title: 'Delivery available', text: 'Arrange delivery with your quote' },
  { title: 'Quality materials', text: 'Practical pieces for everyday use' },
]

export function TrustBar() {
  return (
    <div className="grid gap-8 border-t border-line pt-10 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <div key={item.title}>
          <p className="text-sm font-semibold text-ink">{item.title}</p>
          <p className="mt-1 text-sm leading-6 text-muted">{item.text}</p>
        </div>
      ))}
    </div>
  )
}
