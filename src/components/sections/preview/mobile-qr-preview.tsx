'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Download } from 'lucide-react'
import downloadQr from '@/lib/downloadQr'

export interface MobileQrPreviewProps {
  showQrPreview: boolean
  children: React.ReactNode
}

export default function MobileQrPreview({ showQrPreview, children }: MobileQrPreviewProps) {
  const handleDownload = (format: 'svg' | 'png' | 'jpeg' | 'webp') => {
    downloadQr(format, 'mobile-qr-code-element');
  };

  return (
    <AnimatePresence>
      {showQrPreview && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="sm:hidden fixed inset-x-0 bottom-16 bg-blue-900 rounded-t-3xl shadow-lg p-4"
        >
          <div
            className="bg-white w-full aspect-square rounded-2xl mb-4 flex items-center justify-center qr-code-element"
            id="mobile-qr-code-element"
          >
            {children}
          </div>

          <div className="grid grid-cols-2 gap-2">
            {['svg', 'png', 'jpeg', 'webp'].map((format, index) => (
              <Button
                key={format}
                onClick={() => handleDownload(format as 'svg' | 'png' | 'jpeg' | 'webp')}
                className={`${index % 2 === 0 ? 'bg-blue-500 hover:bg-blue-600' : 'bg-orange-500 hover:bg-orange-600'} text-white rounded-full py-2 text-xs sm:text-sm`}
              >
                <Download className="h-4 w-4 mr-1" />
                {format.toUpperCase()}
              </Button>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
