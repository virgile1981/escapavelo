'use client'

import { JustifiedGalleryProps } from '@/types/common'
import { useState, useEffect } from 'react'
import styles from '@/styles/justifiedGallery.module.css'
import Image from 'next/image'

const JustifiedGallery: React.FC<JustifiedGalleryProps> = ({ images, baseUrl }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const openModal = (index: number) => {
    setCurrentImageIndex(index)
    setIsModalOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const closeModal = () => {
    setIsModalOpen(false)
    document.body.style.overflow = 'auto'
  }

  const nextImage = () => {
    if (currentImageIndex < images.length - 1) setCurrentImageIndex(currentImageIndex + 1)
  }

  const previousImage = () => {
    if (currentImageIndex > 0) setCurrentImageIndex(currentImageIndex - 1)
  }

  const handleKeydown = (event: KeyboardEvent) => {
    if (!isModalOpen) return
    switch (event.key) {
      case 'Escape':
        closeModal()
        break
      case 'ArrowRight':
        nextImage()
        break
      case 'ArrowLeft':
        previousImage()
        break
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeydown)
    return () => {
      document.removeEventListener('keydown', handleKeydown)
      document.body.style.overflow = 'auto'
    }
  })

  const getItemClass = (index: number) => {
    if (index === 0) return 'size-large'
    if (index % 5 === 0) return 'size-wide'
    if (index % 7 === 0) return 'size-tall'
    return 'size-normal'
  }

  return (
    <>
      {/* Gallery Grid */}
      <div className={styles['gallery-grid']}>
        {images.map((image, index) => (
          <div
            key={index}
            className={`${styles['gallery-item']} ${getItemClass(index)}`}
            onClick={() => openModal(index)}
          >
            <Image
              src={`${baseUrl}/uploads/${image.resizedUrl}`}
              height={150} width={300}
              alt={`Photo ${index + 1}`}
              className={styles['gallery-image']}
              loading="lazy"
            />
            <div className={styles['gallery-overlay']}>
              <div className={styles['overlay-content']}>
                <svg className="expand-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className={styles['modal-overlay']} onClick={closeModal}>
          <div className={styles['modal-content']} onClick={(e) => e.stopPropagation()}>
            <button className={styles['modal-close']} onClick={closeModal}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <button
              className={styles['modal-nav'] + ' ' + styles['modal-prev']}
              onClick={previousImage}
              disabled={currentImageIndex === 0}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <polyline points="15,18 9,12 15,6" />
              </svg>
            </button>

            <div className={styles['modal-image-container']}>
              <Image
                src={`${baseUrl}/uploads/${images[currentImageIndex].url}`}
                height={100} width={600}
                alt={`Photo ${currentImageIndex + 1}`}
                className="modal-image"
              />
            </div>

            <button
              className={styles['modal-nav'] + ' ' + styles['modal-next']}
              onClick={nextImage}
              disabled={currentImageIndex === images.length - 1}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <polyline points="9,18 15,12 9,6" />
              </svg>
            </button>

            <div className={styles['modal-info']}>
              <p className={styles['modal-counter']}>
                {currentImageIndex + 1} / {images.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default JustifiedGallery
