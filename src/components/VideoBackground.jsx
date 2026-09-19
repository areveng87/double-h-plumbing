import { useEffect, useRef } from 'react'
import './VideoBackground.css'

export default function VideoBackground({ src }) {
  const videoRef = useRef(null)
  const rafRef = useRef(null)
  const durationRef = useRef(0)
  const currentRef = useRef(0)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const clamp = (n, min, max) => Math.min(Math.max(n, min), max)

    const setDurationFrom = (value) => {
      if (Number.isFinite(value) && value > 0) durationRef.current = value
    }

    const onLoadedMetadata = () => {
      setDurationFrom(video.duration)
      if (!Number.isFinite(video.duration) || video.duration === Infinity) {
        try {
          video.currentTime = 1e7
        } catch {
          /* retried once more data arrives */
        }
      }
    }
    const onDurationChange = () => setDurationFrom(video.duration)

    video.addEventListener('loadedmetadata', onLoadedMetadata)
    video.addEventListener('durationchange', onDurationChange)

    video.preload = 'auto'
    video.load()
    if (video.readyState >= 1) onLoadedMetadata()

    const tick = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight
      const scrolled = clamp(window.scrollY, 0, total)
      const p = total > 0 ? scrolled / total : 0

      const duration = durationRef.current
      if (duration > 0) {
        const targetTime = clamp(p * duration, 0, duration)
        const next = currentRef.current + (targetTime - currentRef.current) * 0.35
        currentRef.current = Math.abs(targetTime - next) < 0.01 ? targetTime : next

        if (Math.abs(video.currentTime - currentRef.current) > 0.008) {
          try {
            video.currentTime = currentRef.current
          } catch {
            /* seek in progress: retried next frame */
          }
        }
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)

    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current)
      video.removeEventListener('loadedmetadata', onLoadedMetadata)
      video.removeEventListener('durationchange', onDurationChange)
    }
  }, [])

  return (
    <div className="video-bg">
      <video
        ref={videoRef}
        className="video-bg__el"
        src={src}
        muted
        playsInline
        preload="auto"
        disableRemotePlayback
      />
      <div className="video-bg__scrim" />
    </div>
  )
}
