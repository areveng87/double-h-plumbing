import { useEffect, useRef, useState } from 'react'
import './FadeSection.css'

export default function FadeSection({
  eyebrow,
  title,
  children,
  align = 'left',
  variant,
  hint,
  id,
}) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.2, rootMargin: '-8% 0px -8% 0px' },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id={id}
      ref={ref}
      className={[
        'fade-section',
        `fade-section--${align}`,
        variant ? `fade-section--${variant}` : '',
        visible ? 'is-visible' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="fade-section__inner">
        {eyebrow && <span className="fade-section__eyebrow">{eyebrow}</span>}
        {title && <h2 className="fade-section__title brand-font">{title}</h2>}
        {children && <div className="fade-section__body">{children}</div>}
      </div>

      {hint && <div className="fade-section__hint">{hint}</div>}
    </section>
  )
}
