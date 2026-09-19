import { useEffect, useRef, useState } from 'react'
import './RevealFooter.css'

// Sits directly in the page flow right after the contact form — no gap,
// no overlap: the top edge of the artwork lands exactly where the
// contact form ends. Full page width, natural aspect ratio, so it's
// never cropped or stretched. As it scrolls into view the frame eases
// up into place, like the page tearing open to reveal the blueprint
// underneath.
export default function RevealFooter() {
  const ref = useRef(null)
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true)
          observer.disconnect()
        }
      },
      { threshold: 0 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <footer className="reveal-footer">
      <div
        ref={ref}
        className={`reveal-footer__frame ${revealed ? 'is-revealed' : ''}`}
      >
        <img
          className="reveal-footer__bg"
          src="/footer.png"
          alt=""
          aria-hidden="true"
        />

        <div className="reveal-footer__content">
          <span className="reveal-footer__brand brand-font">Double H Plumbing</span>
          <span className="reveal-footer__tagline">&ldquo;Quality Over Quantity&rdquo;</span>

          <div className="reveal-footer__contact">
            <a className="reveal-footer__phone" href="tel:+13523187221">
              352-318-7221
            </a>
            <a className="reveal-footer__email" href="mailto:doublehplumbing@gmail.com">
              doublehplumbing@gmail.com
            </a>
          </div>

          <div className="reveal-footer__badges">
            <span>24/7 Service</span>
            <span>Local Owned &amp; Operated</span>
          </div>

          <span className="reveal-footer__copy">
            &copy; {new Date().getFullYear()} Double H Plumbing. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  )
}
