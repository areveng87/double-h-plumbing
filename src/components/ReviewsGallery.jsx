import { useEffect, useRef, useState } from 'react'
import './ReviewsGallery.css'

// Real 5-star reviews pulled from Double H Plumbing's Google Business
// profile (4.7 average, 75 reviews at time of writing). Text is the
// reviewers' original English wording, unedited.
const REVIEWS = [
  {
    name: 'Donald Inch',
    meta: '2 reviews',
    text: "I don't remember the plumber's name that came over but he did excellent job it looks good in my garage very clean worker and explained everything to me what he was doing.",
  },
  {
    name: 'Samantha Champagne',
    meta: 'Local Guide · 18 reviews',
    text: "They were friendly, efficient, and fairly priced. Booking was easy and they communicated very well! 10/10 I'll definitely use them again in the future!",
  },
  {
    name: 'Yvette Glisson',
    meta: '8 reviews',
    text: 'Great business, great and honest. They did work completely and timely. Thank you for the great service.',
  },
  {
    name: 'Jake Bedford',
    meta: '3 reviews',
    text: "What can I say, they are the best. Great communication, great value, and always a pleasure to work with. I've used them for the complete remodel on my house, and my business office buildout. They do amazing work. If you need a plumbing company these are your guys!!!",
  },
  {
    name: 'Alijah Babbs',
    meta: 'Local Guide · 17 reviews',
    text: 'This is a 10/10 service. He showed up on time ready to work. Went out of his way and drove from Gainesville to Ocala and back same day and ran a camera in my plumbing to find the problem. Fixed my plumbing and saved our family over $10,000.',
  },
  {
    name: 'Mark Heller',
    meta: '6 reviews',
    text: 'Double H was responsive to our needs. Alan is very personable and explained all aspects of our job. He leveled the site to install our well pressure tank and updated all fitting. We are super happy with the results!',
  },
  {
    name: 'Lori Ross',
    meta: '2 reviews',
    text: "They were here on time, cleaned up after themselves and were very time efficient. I couldn't be more pleased.",
  },
  {
    name: 'Nicci O',
    meta: '10 reviews',
    text: 'Super happy with their work! They installed a shampoo bowl and water purification system for my salon. Quick, professional and overall great work. We will absolutely use them again for any future work.',
  },
]

function initials(name) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

function GoogleMark() {
  return (
    <svg viewBox="0 0 48 48" width="16" height="16" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"
      />
      <path
        fill="#34A853"
        d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"
      />
      <path
        fill="#FBBC05"
        d="M11.69 28.18A13.93 13.93 0 0 1 10.95 24c0-1.45.25-2.86.74-4.18v-5.7H4.34A21.93 21.93 0 0 0 2 24c0 3.55.85 6.91 2.34 9.88z"
      />
      <path
        fill="#EA4335"
        d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z"
      />
    </svg>
  )
}

// A slow, continuous marquee of review cards — no scroll-linking needed,
// it's meant to feel alive on its own. Pauses on hover/focus so the text
// stays readable. The header still fades in on scroll like the other
// sections, for visual consistency with the rest of the page.
export default function ReviewsGallery() {
  const headerRef = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = headerRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.2, rootMargin: '-8% 0px -8% 0px' },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const track = [...REVIEWS, ...REVIEWS]

  return (
    <section className="reviews-gallery">
      <div
        ref={headerRef}
        className={`reviews-gallery__header ${visible ? 'is-visible' : ''}`}
      >
        <span className="reviews-gallery__eyebrow">Google Reviews</span>
        <h2 className="reviews-gallery__title brand-font">
          What Our Customers Say
        </h2>

        <div className="reviews-gallery__rating">
          <span className="reviews-gallery__stars" aria-hidden="true">
            ★★★★★
          </span>
          <span className="reviews-gallery__score">4.7</span>
          <span className="reviews-gallery__count">from 75 Google reviews</span>
        </div>

        <a
          className="reviews-gallery__cta"
          href="https://maps.app.goo.gl/F1cXHE6SQJyX8QQk9"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GoogleMark />
          Read all reviews on Google
        </a>
      </div>

      <div className="reviews-gallery__track-wrap">
        <div className="reviews-gallery__track">
          {track.map((review, i) => (
            <article className="review-card" key={`${review.name}-${i}`}>
              <span className="review-card__quote" aria-hidden="true">
                &ldquo;
              </span>

              <div className="review-card__top">
                <span className="review-card__avatar" aria-hidden="true">
                  {initials(review.name)}
                </span>
                <div className="review-card__who">
                  <span className="review-card__name">{review.name}</span>
                  <span className="review-card__meta">{review.meta}</span>
                </div>
              </div>

              <div className="review-card__stars" aria-hidden="true">
                ★★★★★
              </div>

              <p className="review-card__text">{review.text}</p>

              <div className="review-card__source">
                <GoogleMark />
                Google review
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
