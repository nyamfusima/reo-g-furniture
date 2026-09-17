import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Outlet, useLocation } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { buildWhatsAppUrl, MESSAGES } from '../lib/whatsapp'
import { Footer } from './Footer'
import { Header } from './Header'
import { WhatsAppIcon } from './icons/WhatsAppIcon'

export function Layout() {
  const location = useLocation()
  const reduceMotion = useReducedMotion()
  const { notice } = useCart()

  return (
    <div className="min-h-screen bg-page text-ink">
      <Header />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>
      <Footer />

      <AnimatePresence>
        {notice && (
          <motion.div
            role="status"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="fixed bottom-24 left-1/2 z-40 -translate-x-1/2 rounded-xl bg-navy px-4 py-2.5 text-sm font-medium text-white"
          >
            {notice}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.a
        href={buildWhatsAppUrl(MESSAGES.help)}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        initial={reduceMotion ? false : { opacity: 0, scale: 0.6 }}
        animate={{
          opacity: 1,
          scale: 1,
          boxShadow: reduceMotion
            ? '0 10px 24px -8px rgba(37, 211, 102, 0.55)'
            : ['0 10px 24px -8px rgba(37, 211, 102, 0.45)', '0 10px 30px -6px rgba(37, 211, 102, 0.7)', '0 10px 24px -8px rgba(37, 211, 102, 0.45)'],
        }}
        transition={reduceMotion ? { duration: 0.3 } : { boxShadow: { duration: 2.4, repeat: Infinity, ease: 'easeInOut' }, scale: { duration: 0.3 }, opacity: { duration: 0.3 } }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.96 }}
        className="group fixed right-4 bottom-4 z-40 grid h-12 w-12 place-items-center rounded-full bg-whatsapp text-white lg:right-6 lg:bottom-6"
      >
        <WhatsAppIcon size={22} className="transition-transform duration-300 group-hover:scale-110" />
      </motion.a>
    </div>
  )
}
