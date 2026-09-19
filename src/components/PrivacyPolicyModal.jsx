import { useEffect } from 'react'
import './PrivacyPolicyModal.css'

export default function PrivacyPolicyModal({ open, onClose }) {
  useEffect(() => {
    if (!open) return

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="privacy-modal__overlay" role="presentation" onClick={onClose}>
      <div
        className="privacy-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="privacy-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="privacy-modal__close"
          onClick={onClose}
          aria-label="Close privacy policy"
        >
          ×
        </button>

        <div className="privacy-modal__body">
          <h2 id="privacy-modal-title">Privacy Policy</h2>
          <p className="privacy-modal__updated">Last updated: September 2026</p>

          <h3>Who we are</h3>
          <p>
            Double H Plumbing (&ldquo;we&rdquo;, &ldquo;us&rdquo;) provides plumbing and
            farm water-system services. You can reach us at{' '}
            <a href="mailto:doublehplumbing@gmail.com">doublehplumbing@gmail.com</a> or{' '}
            <a href="tel:+13523187221">352-318-7221</a>.
          </p>

          <h3>Information we collect</h3>
          <p>
            When you submit the quote request form we collect your name, phone number,
            email address, service address or city, the type of service you need, and
            any details you choose to share about the job.
          </p>

          <h3>How we use it</h3>
          <p>
            We use this information only to respond to your request, schedule service,
            and provide you with a quote. We do not sell or share your information with
            third parties for marketing purposes.
          </p>

          <h3>Retention</h3>
          <p>
            We keep your request only as long as needed to respond to you and to keep a
            record of the jobs we&rsquo;ve quoted or completed.
          </p>

          <h3>Your rights</h3>
          <p>
            You can ask us at any time to access, correct, or delete the information you
            sent us by emailing{' '}
            <a href="mailto:doublehplumbing@gmail.com">doublehplumbing@gmail.com</a>.
          </p>

          <h3>Security</h3>
          <p>
            Form submissions are sent directly to our business email over an encrypted
            connection. We take reasonable steps to protect your information.
          </p>

          <h3>Changes</h3>
          <p>
            We may update this policy from time to time. Changes will be posted on this
            page.
          </p>
        </div>
      </div>
    </div>
  )
}
