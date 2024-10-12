'use client'

import { useEffect, useRef } from 'react'
import QRCodeStyling, { Options } from 'qr-code-styling'

interface QrCodeProps {
  data: string
  size: number
  type: 'canvas' | 'svg'
  dotType: 'rounded' | 'dots' | 'classy' | 'classy-rounded' | 'square' | 'extra-rounded'
  dotColor: string
  backgroundColor: string
  cornerSquareType: 'dot' | 'square' | 'extra-rounded'
  cornerDotType: 'dot' | 'square'
}

export default function QrCode({
  data,
  size,
  type,
  dotType,
  dotColor,
  backgroundColor,
  cornerSquareType,
  cornerDotType
}: QrCodeProps) {
  const ref = useRef<HTMLDivElement>(null)
  const qrCodeRef = useRef<QRCodeStyling | null>(null)

  useEffect(() => {
    if (!qrCodeRef.current) {
      qrCodeRef.current = new QRCodeStyling({
        width: size,
        height: size,
        type: type,
        data: data,
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
        }
      })
    }

    if (ref.current && qrCodeRef.current) {
      ref.current.innerHTML = ''
      qrCodeRef.current.append(ref.current)
    }
  }, [])

  useEffect(() => {
    if (qrCodeRef.current) {
      const options: Partial<Options> = {
        width: size,
        height: size,
        type: type,
        data: data,
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
        }
      }
      qrCodeRef.current.update(options)
    }
  }, [data, size, type, dotType, dotColor, backgroundColor, cornerSquareType, cornerDotType])

  return <div ref={ref} />
}
