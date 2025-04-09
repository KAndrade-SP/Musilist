import React, { useEffect, useRef, useState } from 'react'
import { BackgroundImage, BannerContent, HiddenImage, MediaBannerWrapper } from './MediaBanner.styles'

interface MediaBannerProps {
  image: string
  children: React.ReactNode
}

const MediaBanner: React.FC<MediaBannerProps> = ({ image, children }) => {
  const [dominantColor, setDominantColor] = useState<string | null>(null)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const img = imgRef.current
    if (!img) return

    const handleLoad = () => {
      try {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        if (!ctx || !img) return

        canvas.width = img.naturalWidth
        canvas.height = img.naturalHeight
        ctx.drawImage(img, 0, 0)

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        const data = imageData.data

        let r = 0,
          g = 0,
          b = 0,
          count = 0
        for (let i = 0; i < data.length; i += 4 * 100) {
          r += data[i]
          g += data[i + 1]
          b += data[i + 2]
          count++
        }

        r = Math.floor(r / count)
        g = Math.floor(g / count)
        b = Math.floor(b / count)

        setDominantColor(`rgb(${r}, ${g}, ${b}, 0.7)`)
      } catch (err) {
        console.error('Error extracting color manually:', err)
      }
    }

    if (img.complete) {
      handleLoad()
    } else {
      img.onload = handleLoad
    }
  }, [image])

  return (
    <MediaBannerWrapper $backgroundColor={dominantColor || '#111'}>
      <HiddenImage ref={imgRef} src={image} crossOrigin="anonymous" alt="hidden for color extraction" />
      <BackgroundImage $image={image} $dominantColor={dominantColor} />
      <BannerContent>{children}</BannerContent>
    </MediaBannerWrapper>
  )
}

export default MediaBanner
