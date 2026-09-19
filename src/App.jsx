import VideoBackground from './components/VideoBackground.jsx'
import FadeSection from './components/FadeSection.jsx'
import ContactSection from './components/ContactSection.jsx'
import RevealFooter from './components/RevealFooter.jsx'

function App() {
  return (
    <>
      <VideoBackground src="/video/blueprint.mp4" />

      <main className="content">
        <FadeSection
          variant="hero"
          align="center"
          title="Double H Plumbing"
          hint="scroll ↓"
        >
          <p>24/7 Plumbing &amp; Farm Water Systems</p>
        </FadeSection>

        <FadeSection
          eyebrow="Who we are"
          title="Local plumbers you can actually call"
        >
          <p>
            Double H Plumbing handles everything from a leaking valve to a full
            repipe — repairs, drain cleaning, remodels and repipes, done right
            the first time.
          </p>
          <p>
            Locally owned and operated, with competitive pricing and someone
            who actually answers the phone, 24 hours a day, every day.
          </p>
        </FadeSection>

        <FadeSection
          eyebrow="Services"
          title="Repairs, Drains, Remodels &amp; Repipes"
          align="right"
        >
          <p>
            From a stubborn clogged drain to a full bathroom remodel or a
            whole-house repipe, we diagnose it right and fix it right —
            no guesswork, no upsells.
          </p>
        </FadeSection>

        <FadeSection
          eyebrow="Farm &amp; Ag Services"
          title="Full farm water systems, start to finish"
        >
          <p>Here are some of the farm services we offer:</p>
          <ul>
            <li>Arena Irrigation</li>
            <li>Fly Spray Installation</li>
            <li>Water Treatment</li>
            <li>Underground Water Line Install</li>
            <li>Automatic Waterers</li>
            <li>Landscape Irrigation</li>
            <li>RV Hook Up Sites</li>
            <li>Remodels &amp; Replumb</li>
          </ul>
        </FadeSection>

        <FadeSection
          eyebrow="Why Double H"
          title="Quality over quantity"
          align="right"
          variant="callout"
        >
          <p>
            We&rsquo;d rather do one job right than ten jobs fast. That means
            24/7 availability, competitive pricing, and a crew that&rsquo;s
            local, owned and operated — not a call center three states away.
          </p>
        </FadeSection>

        <ContactSection />

        <RevealFooter />
      </main>
    </>
  )
}

export default App
