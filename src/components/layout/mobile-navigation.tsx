'use client'

import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Home, QrCode, Settings } from 'lucide-react'

interface MobileNavigationProps {
  activeView: string
  setActiveView: (view: string) => void
  showQrPreview: boolean
  toggleQrPreview: () => void
}

export default function MobileNavigation({
  activeView,
  setActiveView,
  showQrPreview,
  toggleQrPreview
}: MobileNavigationProps) {
  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="sm:hidden fixed inset-x-0 bottom-0 bg-white shadow-lg"
    >
      <div className="flex justify-around items-center h-16">
        <Button variant="ghost" onClick={() => setActiveView('home')}>
          <Home className={`h-6 w-6 ${activeView === 'home' ? 'text-blue-600' : 'text-gray-400'}`} />
        </Button>
        <Button variant="ghost" onClick={toggleQrPreview}>
          <QrCode className={`h-6 w-6 ${showQrPreview ? 'text-blue-600' : 'text-gray-400'}`} />
        </Button>
        <Button variant="ghost" onClick={() => setActiveView('settings')}>
          <Settings className={`h-6 w-6 ${activeView === 'settings' ? 'text-blue-600' : 'text-gray-400'}`} />
        </Button>
      </div>
    </motion.div>
  )
}
