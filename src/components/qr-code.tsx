'use client'

import { useEffect, useRef, useState } from 'react'
import { Options, FileExtension } from 'qr-code-styling'
import dynamic from 'next/dynamic'
import QRCodeStyling from 'qr-code-styling'
// const QRCodeStyling = dynamic(() => import('qr-code-styling').default, { ssr: false })
// const Options = dynamic(() => import('qr-code-styling').then(mod => mod.Options), { ssr: false })
// const FileExtension = dynamic(() => import('qr-code-styling').then(mod => mod.FileExtension), { ssr: false })

export interface QrCodeProps {
  data: string
  size: number
  type: 'canvas' | 'svg'
  dotType: 'rounded' | 'dots' | 'classy' | 'classy-rounded' | 'square' | 'extra-rounded'
  dotColor: string
  backgroundColor: string
  cornerSquareType: 'dot' | 'square' | 'extra-rounded'
  cornerDotType: 'dot' | 'square'
  imageUrl?: string
  imageSize?: number
  errorCorrectionLevel?: 'L' | 'M' | 'Q' | 'H'
}

export function QrCode({
  data,
  size,
  type,
  dotType,
  dotColor,
  backgroundColor,
  cornerSquareType,
  cornerDotType,
  imageUrl,
  imageSize = 0.4,
  errorCorrectionLevel = 'M'
}: QrCodeProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [qrCode, setQrCode] = useState<QRCodeStyling | null>(null)

  useEffect(() => {
    if (!qrCode) {
      const newQrCode = new QRCodeStyling(getQrOptions())
      setQrCode(newQrCode)
    }
  }, [])

  useEffect(() => {
    if (qrCode && ref.current) {
      ref.current.innerHTML = ''
      qrCode.append(ref.current)
    }
  }, [qrCode])

  useEffect(() => {
    if (qrCode) {
      qrCode.update(getQrOptions())
    }
  }, [data, size, type, dotType, dotColor, backgroundColor, cornerSquareType, cornerDotType, imageUrl, imageSize, errorCorrectionLevel])

  const getQrOptions = (): Options => ({
    // dynamic width and height
    width: size,
    height: size,
    // default width and height
    // width: "100%",
    // height: "100%",
    type: type,
    data: data,
    image: imageUrl,
    dotsOptions: {
      color: dotColor,
      type: dotType
    },
    backgroundOptions: {
      color: backgroundColor,
    },
    cornersSquareOptions: {
      type: cornerSquareType
    },
    cornersDotOptions: {
      type: cornerDotType
    },
    imageOptions: imageUrl ? {
      hideBackgroundDots: true,
      imageSize: imageSize,
      crossOrigin: 'anonymous',
    } : {},
    qrOptions: {
      errorCorrectionLevel: errorCorrectionLevel
    }
  })

  const download = (fileExtension: FileExtension) => {
    qrCode?.download({ extension: fileExtension })
  }

  return (
    <div ref={ref} className="qr-code-element [&>canvas]:w-full [&>canvas]:h-full" />
  )
}
