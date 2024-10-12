'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Download } from 'lucide-react'

interface MobileQrPreviewProps {
  showQrPreview: boolean
}

export default function MobileQrPreview({ showQrPreview }: MobileQrPreviewProps) {
  return (
    <AnimatePresence>
      {showQrPreview && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="lg:hidden fixed inset-x-0 bottom-16 bg-white rounded-t-3xl shadow-lg p-4"
        >
          <div className="bg-blue-900 w-full aspect-square rounded-2xl mb-4 flex items-center justify-center">
            <span className="text-white text-lg font-medium">QR Code Preview</span>
          </div>
          <div className="flex justify-between">
            <Button className="flex-1 mr-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full py-2">
              <Download className="h-5 w-5 mr-2" />
              JPG
            </Button>
            <Button className="flex-1 ml-2 bg-orange-500 hover:bg-orange-600 text-white rounded-full py-2">
              <Download className="h-5 w-5 mr-2" />
              SVG/EPS
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}