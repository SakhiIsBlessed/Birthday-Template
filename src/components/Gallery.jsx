import { gsap } from "gsap";
import { useCallback, useEffect, useRef, useState } from "react";
import "./Gallery.css";

function Gallery({ isActive }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [photosRevealed, setPhotosRevealed] = useState(false);
  const [activeTab, setActiveTab] = useState("images");
  const [vlogUnlocked, setVlogUnlocked] = useState(false);
  const [vlogPassword, setVlogPassword] = useState("");
  const [vlogError, setVlogError] = useState("");

  const photosRef = useRef([]);
  const lightboxImgRef = useRef(null);

  const photos = [
    { src: "/images/pic1.jpg", alt: "Memory 1" },
    { src: "/images/pic2.jpg", alt: "Memory 2" },
    { src: "/images/pic3.jpg", alt: "Memory 3" },
    { src: "/images/pic4.jpg", alt: "Memory 4" },
    { src: "/images/pic5.jpg", alt: "Memory 5" },
    { src: "/images/pic6.jpg", alt: "Memory 6" },
    {src: "/images/pic7.jpg", alt: "Memory 7" },
    { src: "/images/pic8.jpg", alt: "Memory 8" },
    { src: "/images/pic9.jpg", alt: "Memory 9" },
    { src: "/images/pic10.jpg", alt: "Memory 10" },
    { src: "/images/pic11.jpg", alt: "Memory 11" },
    { src: "/images/pic12.jpg", alt: "Memory 12" },
    { src: "/images/pic13.jpg", alt: "Memory 13" },
    { src: "/images/pic14.jpg", alt: "Memory 14" },
    { src: "/images/pic15.jpg", alt: "Memory 15" },
    { src: "/images/pic16.jpg", alt: "Memory 16" },
    { src: "/images/pic17.jpg", alt: "Memory 17" },
    { src: "/images/pic18.jpg", alt: "Memory 18" },
    {src: "/images/pic19.jpg", alt: "Memory 19" },
    { src: "/images/pic20.jpg", alt: "Memory 20" },
    { src: "/images/pic21.jpg", alt: "Memory 21" },
    { src: "/images/pic22.jpg", alt: "Memory 22" },
    { src: "/images/pic23.jpg", alt: "Memory 23" },
    

  ];

  // Reveal photos with GSAP when page becomes active
  useEffect(() => {
    if (isActive && !photosRevealed) {
      setTimeout(() => setPhotosRevealed(true), 10);

      // Stagger animation for photos
      gsap.fromTo(
        photosRef.current,
        {
          opacity: 0,
          y: 50,
          scale: 0.8,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.12,
          ease: "back.out(1.4)",
          delay: 0.2,
        }
      );
    }
  }, [isActive, photosRevealed]);

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setLightboxOpen(true);

    // Animate lightbox appearance
    if (lightboxImgRef.current) {
      gsap.fromTo(
        lightboxImgRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.4)" }
      );
    }
  };

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  const videos = [
    "/videos/vid1.mp4",
    "/videos/vid2.mp4",
    "/videos/vid3.mp4",
    "/videos/vid4.mp4",
    "/videos/vid5.mp4",
    "/videos/vid6.mp4",
    "/videos/vid7.mp4",
    "/videos/vid8.mp4",
    "/videos/vid9.mp4",
  ];

  const handleVlogUnlock = (event) => {
    event.preventDefault();

    if (vlogPassword.trim().toLowerCase() === "18september") {
      setVlogUnlocked(true);
      setVlogError("");
      return;
    }

    setVlogError("Oops! That password is not correct.");
  };

  // Handle body overflow in effect
  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [lightboxOpen]);

  const showNext = useCallback(() => {
    const newIndex = (currentIndex + 1) % photos.length;

    // Animate transition
    if (lightboxImgRef.current) {
      gsap.to(lightboxImgRef.current, {
        x: -100,
        opacity: 0,
        duration: 0.2,
        ease: "power2.in",
        onComplete: () => {
          setCurrentIndex(newIndex);
          gsap.fromTo(
            lightboxImgRef.current,
            { x: 100, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.3, ease: "power2.out" }
          );
        },
      });
    }
  }, [currentIndex, photos.length]);

  const showPrev = useCallback(() => {
    const newIndex = (currentIndex - 1 + photos.length) % photos.length;

    // Animate transition
    if (lightboxImgRef.current) {
      gsap.to(lightboxImgRef.current, {
        x: 100,
        opacity: 0,
        duration: 0.2,
        ease: "power2.in",
        onComplete: () => {
          setCurrentIndex(newIndex);
          gsap.fromTo(
            lightboxImgRef.current,
            { x: -100, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.3, ease: "power2.out" }
          );
        },
      });
    }
  }, [currentIndex, photos.length]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightboxOpen) return;

      if (e.key === "Escape") {
        closeLightbox();
      } else if (e.key === "ArrowLeft") {
        showPrev();
      } else if (e.key === "ArrowRight") {
        showNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, showNext, showPrev, closeLightbox]);

  return (
    <section className="gallery">
      <h2>📸 Our Beautiful Memories</h2>

      <div className="gallery-toggle">
        <button
          type="button"
          className={activeTab === "images" ? "active" : ""}
          onClick={() => setActiveTab("images")}
        >
          Images
        </button>
        <button
          type="button"
          className={activeTab === "vlog" ? "active" : ""}
          onClick={() => setActiveTab("vlog")}
        >
          Vlog
        </button>
      </div>

      {activeTab === "images" ? (
        <div className="gallery-panel">
          <div className="photos">
            {photos.map((photo, index) => (
              <img
                key={index}
                ref={(el) => (photosRef.current[index] = el)}
                src={photo.src}
                alt={photo.alt}
                onClick={() => openLightbox(index)}
                loading="lazy"
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="gallery-panel">
          {!vlogUnlocked ? (
            <div className="blog-lock">
              <h3>🎬 Birthday Vlog</h3>
              <p>Enter the secret password to unlock the birthday memories in motion.</p>
              <form className="blog-form" onSubmit={handleVlogUnlock}>
                <input
                  type="password"
                  value={vlogPassword}
                  onChange={(e) => setVlogPassword(e.target.value)}
                  placeholder="Enter password"
                  aria-label="Vlog password"
                />
                <button type="submit">Unlock Vlog</button>
                {vlogError && <div className="blog-error">{vlogError}</div>}
              </form>
            </div>
          ) : (
            <div className="vlog-content">
              <div className="vlog-header">
                <h3>✨ Birthday Vlog for Gauriiii</h3>
                <button type="button" onClick={() => setVlogUnlocked(false)}>
                  Lock Again
                </button>
              </div>

              <div className="vlog-grid">
                {videos.map((video, index) => (
                  <div key={video} className="vlog-card">
                    <div className="video-label">Memory {index + 1}</div>
                    <video
                      src={video}
                      controls
                      muted
                      playsInline
                      preload="metadata"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {lightboxOpen && (
        <div className="lightbox" onClick={closeLightbox}>
          <img
            ref={lightboxImgRef}
            src={photos[currentIndex].src}
            alt={photos[currentIndex].alt}
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="lightbox-close"
            onClick={closeLightbox}
            aria-label="Close lightbox"
          >
            ✖
          </button>
          <button
            className="nav-btn nav-prev"
            onClick={(e) => {
              e.stopPropagation();
              showPrev();
            }}
            aria-label="Previous photo"
          >
            ‹
          </button>
          <button
            className="nav-btn nav-next"
            onClick={(e) => {
              e.stopPropagation();
              showNext();
            }}
            aria-label="Next photo"
          >
            ›
          </button>
        </div>
      )}
    </section>
  );
}

export default Gallery;
