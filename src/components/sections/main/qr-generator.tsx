'use client'

import { useState, useEffect, Suspense } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Sidebar from '@/components/layout/sidebar'
import HomeView from '@/components/sections/main/home-view'
import QrPreview from '@/components/sections/preview/qr-preview'
import dynamic from 'next/dynamic'
import { QrCodeProps } from '@/components/qr-code'
import { Button } from "@/components/ui/button"
import { QrCode as QrCodeIcon } from 'lucide-react'

const QrCode = dynamic<QrCodeProps>(() => import('@/components/qr-code').then(mod => mod.QrCode), { ssr: false })

export function QrGenerator() {
  const [isUpiMode, setIsUpiMode] = useState(false)
  const [qrContent, setQrContent] = useState('')
  const [upiId, setUpiId] = useState('')
  const [payeeName, setPayeeName] = useState('')
  const [amount, setAmount] = useState('')
  const [currency, setCurrency] = useState('INR')
  const [transactionRef, setTransactionRef] = useState('')
  const [transactionNote, setTransactionNote] = useState('')
  const [activeView, setActiveView] = useState('home')
  const [showQrPreview, setShowQrPreview] = useState(false)
  const [qrData, setQrData] = useState('')
  const [qrImageUrl, setQrImageUrl] = useState('')
  const [qrErrorCorrectionLevel, setQrErrorCorrectionLevel] = useState<'L' | 'M' | 'Q' | 'H'>('M')

  // QR Code styling options
  const [qrSize, setQrSize] = useState(300)
  const [qrType, setQrType] = useState<'canvas' | 'svg'>('svg')
  const [qrDotType, setQrDotType] = useState<'rounded' | 'dots' | 'classy' | 'classy-rounded' | 'square' | 'extra-rounded'>('square')
  const [qrDotColor, setQrDotColor] = useState('#000000')
  const [qrBackgroundColor, setQrBackgroundColor] = useState('#ffffff')
  const [qrCornerSquareType, setQrCornerSquareType] = useState<'dot' | 'square' | 'extra-rounded'>('extra-rounded')
  const [qrCornerDotType, setQrCornerDotType] = useState<'dot' | 'square'>('dot')

  const toggleQrPreview = () => setShowQrPreview(!showQrPreview)

  useEffect(() => {
    if (isUpiMode) {
      const upiString = `upi://pay?pa=${upiId}&pn=${payeeName}&am=${amount}&cu=${currency}&tr=${transactionRef}&tn=${transactionNote}`
      setQrData(upiString)
    } else {
      setQrData(qrContent)
    }
  }, [isUpiMode, qrContent, upiId, payeeName, amount, currency, transactionRef, transactionNote])

  const qrCodeElement = (
    <QrCode
      data={qrData}
      size={qrSize}
      type={qrType}
      dotType={qrDotType}
      dotColor={qrDotColor}
      backgroundColor={qrBackgroundColor}
      cornerSquareType={qrCornerSquareType}
      cornerDotType={qrCornerDotType}
      imageUrl={qrImageUrl}
      errorCorrectionLevel={qrErrorCorrectionLevel}
    />
  )

  return (
    <div className="flex flex-col sm:flex-row h-screen bg-gradient-to-br from-blue-50 to-indigo-100 font-sans">
      <Sidebar />
      <div className="flex-grow flex flex-col sm:flex-row overflow-hidden">
        <div className="flex-grow px-4 sm:px-16 py-6 sm:py-12 overflow-y-auto">
          <HomeView
            isUpiMode={isUpiMode}
            setIsUpiMode={setIsUpiMode}
            qrContent={qrContent}
            setQrContent={setQrContent}
            upiId={upiId}
            setUpiId={setUpiId}
            payeeName={payeeName}
            setPayeeName={setPayeeName}
            amount={amount}
            setAmount={setAmount}
            currency={currency}
            setCurrency={setCurrency}
            transactionRef={transactionRef}
            setTransactionRef={setTransactionRef}
            transactionNote={transactionNote}
            setTransactionNote={setTransactionNote}
            qrSize={qrSize}
            setQrSize={setQrSize}
            qrType={qrType}
            setQrType={setQrType}
            qrDotType={qrDotType}
            setQrDotType={setQrDotType}
            qrDotColor={qrDotColor}
            setQrDotColor={setQrDotColor}
            qrBackgroundColor={qrBackgroundColor}
            setQrBackgroundColor={setQrBackgroundColor}
            qrCornerSquareType={qrCornerSquareType}
            setQrCornerSquareType={setQrCornerSquareType}
            qrCornerDotType={qrCornerDotType}
            setQrCornerDotType={setQrCornerDotType}
            qrImageUrl={qrImageUrl}
            setQrImageUrl={setQrImageUrl}
            qrErrorCorrectionLevel={qrErrorCorrectionLevel}
            setQrErrorCorrectionLevel={setQrErrorCorrectionLevel}
          />
        </div>
        <div className="hidden sm:block w-96">
          <QrPreview qrCode={qrCodeElement}>
            <Suspense fallback={<div>Loading...</div>}>
              {qrCodeElement}
            </Suspense>
          </QrPreview>
        </div>
      </div>
      <Button
        onClick={toggleQrPreview}
        className="sm:hidden fixed bottom-4 right-4 z-50 rounded-full p-4 bg-blue-600 text-white"
      >
        <QrCodeIcon className="h-6 w-6" />
      </Button>
      <AnimatePresence>
        {showQrPreview && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="sm:hidden fixed inset-x-0 bottom-0 bg-blue-900 rounded-t-3xl shadow-lg"
          >
            <QrPreview qrCode={qrCodeElement}>
              <Suspense fallback={<div>Loading...</div>}>
                {qrCodeElement}
              </Suspense>
            </QrPreview>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
