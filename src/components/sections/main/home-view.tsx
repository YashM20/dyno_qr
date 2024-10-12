'use client'

import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Upload } from 'lucide-react'

interface HomeViewProps {
  isUpiMode: boolean
  setIsUpiMode: (mode: boolean) => void
  qrContent: string
  setQrContent: (content: string) => void
  upiId: string
  setUpiId: (id: string) => void
  amount: string
  setAmount: (amount: string) => void
  notes: string
  setNotes: (notes: string) => void
}

export default function HomeView({
  isUpiMode,
  setIsUpiMode,
  qrContent,
  setQrContent,
  upiId,
  setUpiId,
  amount,
  setAmount,
  notes,
  setNotes
}: HomeViewProps) {
  return (
    <motion.div
      key="home"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-6 lg:mb-8">
        <h1 className="text-3xl lg:text-5xl font-bold text-blue-900 mb-4 lg:mb-0">Enter your text</h1>
        <div className="flex items-center space-x-2">
          <Label htmlFor="qr-mode" className="text-blue-900 font-medium">UPI QR Code</Label>
          <Switch
            id="qr-mode"
            checked={isUpiMode}
            onCheckedChange={setIsUpiMode}
          />
        </div>
      </div>
      <p className="text-blue-600 mb-6 lg:mb-8 text-base lg:text-lg font-light">Your QR code will be generated automatically</p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        key={isUpiMode ? 'upi' : 'simple'}
      >
        {isUpiMode ? (
          <div className="space-y-4">
            <Input
              className="w-full text-lg lg:text-xl p-4 lg:p-6 rounded-xl lg:rounded-2xl border-2 border-gray-200 focus:border-blue-500 transition-colors"
              placeholder="UPI ID"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
            />
            <Input
              className="w-full text-lg lg:text-xl p-4 lg:p-6 rounded-xl lg:rounded-2xl border-2 border-gray-200 focus:border-blue-500 transition-colors"
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <Input
              className="w-full text-lg lg:text-xl p-4 lg:p-6 rounded-xl lg:rounded-2xl border-2 border-gray-200 focus:border-blue-500 transition-colors"
              placeholder="Transaction Notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        ) : (
          <Input
            className="w-full text-lg lg:text-xl p-4 lg:p-6 rounded-xl lg:rounded-2xl border-2 border-gray-200 focus:border-blue-500 transition-colors"
            placeholder="Enter your text or URL"
            value={qrContent}
            onChange={(e) => setQrContent(e.target.value)}
          />
        )}
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="border-2 border-dashed border-blue-300 rounded-xl lg:rounded-2xl p-4 lg:p-8 text-center mt-6 lg:mt-12 cursor-pointer"
      >
        <Button variant="ghost" className="bg-blue-500 hover:bg-blue-600 text-white rounded-full px-6 lg:px-8 py-3 lg:py-4 text-base lg:text-lg transition-colors">
          <Upload className="h-5 w-5 lg:h-6 lg:w-6 mr-2 lg:mr-3" />
          Upload any file
        </Button>
      </motion.div>
    </motion.div>
  )
}
