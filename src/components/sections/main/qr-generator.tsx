'use client'

import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import Sidebar from '@/components/layout/sidebar'
import MobileNavigation from '@/components/layout/mobile-navigation'
import HomeView from '@/components/sections/main/home-view'
import SettingsView from '@/components/sections/main/settings-view'
import QrPreview from '@/components/sections/preview/qr-preview'
import MobileQrPreview from '@/components/sections/preview/mobile-qr-preview'
import QrCode from '@/components/qr-code'

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

  // QR Code styling options
  const [qrSize, setQrSize] = useState(300)
  const [qrType, setQrType] = useState<'canvas' | 'svg'>('svg')
  const [qrDotType, setQrDotType] = useState<'rounded' | 'dots' | 'classy' | 'classy-rounded' | 'square' | 'extra-rounded'>('rounded')
  const [qrDotColor, setQrDotColor] = useState('#000000')
  const [qrBackgroundColor, setQrBackgroundColor] = useState('#ffffff')
  const [qrCornerSquareType, setQrCornerSquareType] = useState<'dot' | 'square' | 'extra-rounded'>('dot')
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

  return (
    <div className="flex flex-col sm:flex-row h-screen bg-gradient-to-br from-blue-50 to-indigo-100 font-sans">
      <Sidebar />
      <div className="flex-grow px-4 sm:px-16 py-6 sm:py-12 overflow-y-auto">
        <AnimatePresence mode="wait">
          {activeView === 'home' && (
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
            />
          )}
          {activeView === 'settings' && (
            <SettingsView
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
            />
          )}
        </AnimatePresence>
      </div>
      <QrPreview>
        <QrCode
          data={qrData}
          size={qrSize}
          type={qrType}
          dotType={qrDotType}
          dotColor={qrDotColor}
          backgroundColor={qrBackgroundColor}
          cornerSquareType={qrCornerSquareType}
          cornerDotType={qrCornerDotType}
        />
      </QrPreview>
      <MobileQrPreview showQrPreview={showQrPreview}>
        <QrCode
          data={qrData}
          size={qrSize}
          type={qrType}
          dotType={qrDotType}
          dotColor={qrDotColor}
          backgroundColor={qrBackgroundColor}
          cornerSquareType={qrCornerSquareType}
          cornerDotType={qrCornerDotType}
        />
      </MobileQrPreview>
      <MobileNavigation
        activeView={activeView}
        setActiveView={setActiveView}
        showQrPreview={showQrPreview}
        toggleQrPreview={toggleQrPreview}
      />
    </div>
  )
}
