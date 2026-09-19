import { useEffect, useRef, useState } from 'react'
import './ContactSection.css'
import PrivacyPolicyModal from './PrivacyPolicyModal'

const ENDPOINT = '/send-mail.php'

export default function ContactSection() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  // idle | sending | sent | error
  const [status, setStatus] = useState('idle')
  const [showPrivacy, setShowPrivacy] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.15, rootMargin: '-8% 0px -8% 0px' },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()
    const form = event.target
    const nombre = form.nombre.value.trim()
    const telefono = form.telefono.value.trim()
    const email = form.email.value.trim()
    const servicio = form.servicio.value
    const direccion = form.direccion.value.trim()
    const mensaje = form.mensaje.value.trim()
    const website = form.website.value // honeypot, must arrive empty

    setStatus('sending')

    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre,
          telefono,
          email,
          servicio,
          direccion,
          mensaje,
          website,
        }),
      })

      const data = await res.json().catch(() => null)

      if (res.ok && data?.ok) {
        setStatus('sent')
        form.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section
      id="contacto"
      ref={ref}
      className={`contact-section ${visible ? 'is-visible' : ''}`}
    >
      <div className="contact-card">
        <div className="contact-card__info">
          <span className="contact-card__eyebrow">Contact</span>
          <h2 className="contact-card__title brand-font">Get Your Free Estimate</h2>

          <ul className="contact-card__list">
            <li>
              Call us anytime: <a href="tel:+13523187221">352-318-7221</a>
            </li>
            <li>
              <a href="mailto:doublehplumbing@gmail.com">doublehplumbing@gmail.com</a>
            </li>
            <li>24/7 service &mdash; residential, commercial &amp; farm</li>
            <li>Local owned and operated</li>
          </ul>
        </div>

        <form className="contact-card__form" onSubmit={handleSubmit}>
          <div className="contact-card__form-row">
            <label>
              Name
              <input type="text" name="nombre" autoComplete="name" required />
            </label>
            <label>
              Phone
              <input type="tel" name="telefono" autoComplete="tel" required />
            </label>
          </div>

          <div className="contact-card__form-row">
            <label>
              Email
              <input type="email" name="email" autoComplete="email" required />
            </label>
            <label>
              Service Needed
              <select name="servicio" defaultValue="" required>
                <option value="" disabled>
                  Select a service
                </option>
                <option>Repair</option>
                <option>Drain Cleaning</option>
                <option>Remodel</option>
                <option>Repipe</option>
                <option>Farm / Irrigation Service</option>
                <option>Other</option>
              </select>
            </label>
          </div>

          <label>
            Property Address / City
            <input type="text" name="direccion" placeholder="Where is the job?" />
          </label>

          <label>
            Tell us about the job
            <textarea name="mensaje" rows="3" placeholder="Describe the issue or project" />
          </label>

          <label className="contact-card__checkbox">
            <input type="checkbox" name="privacidad" required />
            <span>
              I have read and accept the{' '}
              <a
                href="/privacy-policy"
                onClick={(event) => {
                  event.preventDefault()
                  setShowPrivacy(true)
                }}
              >
                Privacy Policy
              </a>
            </span>
          </label>

          {/* Honeypot anti-spam field: a human never fills this in */}
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            className="contact-card__honeypot"
            aria-hidden="true"
          />

          <button type="submit" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending…' : 'Request a Quote'}
          </button>

          {status === 'sent' && (
            <p className="contact-card__hint contact-card__hint--ok">
              Request sent. We&rsquo;ll get back to you as soon as we can.
            </p>
          )}
          {status === 'error' && (
            <p className="contact-card__hint contact-card__hint--error">
              Something went wrong. Call or email us directly:
              352-318-7221 / doublehplumbing@gmail.com.
            </p>
          )}
        </form>
      </div>

      <PrivacyPolicyModal open={showPrivacy} onClose={() => setShowPrivacy(false)} />
    </section>
  )
}
