'use client'

import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Download } from 'lucide-react'
import downloadQr from '@/lib/downloadQr'
import { QrCode as QrCodeComponent } from '@/components/qr-code'

interface QrPreviewProps {
  qrCode: React.ReactElement<typeof QrCodeComponent>
  children: React.ReactNode
}

export default function QrPreview({ qrCode, children }: QrPreviewProps) {
  const handleDownload = (format: 'svg' | 'png' | 'jpeg' | 'webp') => {
    downloadQr(format, 'qr-code-element');
  };

  return (
    <div className="flex w-full md:w-96 items-center h-full">
      <Card className="flex flex-col bg-blue-900 text-white rounded-r-3xl overflow-hidden h-full w-full">
        <CardContent className="p-4 md:p-8 flex flex-col h-full">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white w-full aspect-square rounded-xl md:rounded-2xl mb-4 flex items-center justify-center qr-code-element"
            id="qr-code-element"
          >
            {children}
          </motion.div>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.5 }}
            className="grid grid-cols-2 gap-2 md:gap-4 mt-auto"
          >
            {['svg', 'png', 'jpeg', 'webp'].map((format, index) => (
              <Button
                key={format}
                onClick={() => handleDownload(format as 'svg' | 'png' | 'jpeg' | 'webp')}
                className={`${index % 2 === 0 ? 'bg-blue-500 hover:bg-blue-600' : 'bg-orange-500 hover:bg-orange-600'} rounded-full py-2 text-xs md:text-base transition-colors`}
              >
                <Download className="h-4 w-4 md:h-5 md:w-5 mr-1 md:mr-2" />
                {format.toUpperCase()}
              </Button>
            ))}
          </motion.div>
        </CardContent>
      </Card>
    </div>
  )
}
