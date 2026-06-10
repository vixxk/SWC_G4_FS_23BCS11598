import { useState, useEffect, useRef } from 'react'

export default function ImageCarousel({ images = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const timerRef = useRef(null)

  useEffect(() => {
    if (isPlaying && images.length > 0) {
      timerRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
      }, 3000)
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [isPlaying, images.length])

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  if (!images || images.length === 0) {
    return <div className="carousel-empty">No images available</div>
  }

  return (
    <div
      className="carousel-container"
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(true)}
    >
      {!isPlaying && (
        <div className="carousel-status-badge">
          <svg viewBox="0 0 24 24" fill="currentColor" width="10" height="10">
            <rect x="6" y="4" width="4" height="16" />
            <rect x="14" y="4" width="4" height="16" />
          </svg>
          <span>Paused</span>
        </div>
      )}

      <div className="carousel-wrapper">
        {images.map((img, idx) => (
          <div
            key={idx}
            className={`carousel-slide ${idx === currentIndex ? 'active' : ''}`}
            style={{
              transform: `translateX(${(idx - currentIndex) * 100}%)`,
              opacity: idx === currentIndex ? 1 : 0,
              pointerEvents: idx === currentIndex ? 'auto' : 'none',
            }}
          >
            <img src={img.url || img} alt={img.title || `Slide ${idx + 1}`} className="carousel-image" />
            {(img.title || img.description) && (
              <div className="carousel-caption">
                {img.title && <h3>{img.title}</h3>}
                {img.description && <p>{img.description}</p>}
              </div>
            )}
          </div>
        ))}
      </div>

      <button className="carousel-btn prev" onClick={handlePrev} aria-label="Previous slide">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>
      <button className="carousel-btn next" onClick={handleNext} aria-label="Next slide">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      <div className="carousel-dots">
        {images.map((_, idx) => (
          <button
            key={idx}
            className={`carousel-dot ${idx === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(idx)}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
