'use client'

import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Sidebar from '@/components/layout/sidebar'
import MobileNavigation from '@/components/layout/mobile-navigation'
import HomeView from '@/components/sections/main/home-view'
import SettingsView from '@/components/sections/main/settings-view'
import QrPreview from '@/components/sections/preview/qr-preview'
import MobileQrPreview from '@/components/sections/preview/mobile-qr-preview'

export function QrGenerator() {
  const [isUpiMode, setIsUpiMode] = useState(false)
  const [qrContent, setQrContent] = useState('')
  const [upiId, setUpiId] = useState('')
  const [amount, setAmount] = useState('')
  const [notes, setNotes] = useState('')
  const [activeView, setActiveView] = useState('home')
  const [showQrPreview, setShowQrPreview] = useState(false)

  const toggleQrPreview = () => setShowQrPreview(!showQrPreview)

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gradient-to-br from-blue-50 to-indigo-100 font-sans">
      <Sidebar />
      <div className="flex-grow px-4 lg:px-16 py-6 lg:py-12 overflow-y-auto">
        <AnimatePresence mode="wait">
          {activeView === 'home' && (
            <HomeView
              isUpiMode={isUpiMode}
              setIsUpiMode={setIsUpiMode}
              qrContent={qrContent}
              setQrContent={setQrContent}
              upiId={upiId}
              setUpiId={setUpiId}
              amount={amount}
              setAmount={setAmount}
              notes={notes}
              setNotes={setNotes}
            />
          )}
          {activeView === 'settings' && <SettingsView />}
        </AnimatePresence>
      </div>
      <QrPreview />
      <MobileQrPreview showQrPreview={showQrPreview} />
      <MobileNavigation
        activeView={activeView}
        setActiveView={setActiveView}
        showQrPreview={showQrPreview}
        toggleQrPreview={toggleQrPreview}
      />
    </div>
  )
}
