'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useDebounce } from '@/hooks/useDebounce'
import { useState, useEffect } from 'react'
import { QrCode, CreditCard } from 'lucide-react'
import { useTheme } from 'next-themes'

interface HomeViewProps {
  isUpiMode: boolean
  setIsUpiMode: (value: boolean) => void
  qrContent: string
  setQrContent: (value: string) => void
  upiId: string
  setUpiId: (value: string) => void
  payeeName: string
  setPayeeName: (value: string) => void
  amount: string
  setAmount: (value: string) => void
  currency: string
  setCurrency: (value: string) => void
  transactionRef: string
  setTransactionRef: (value: string) => void
  transactionNote: string
  setTransactionNote: (value: string) => void
}

export default function HomeView({
  isUpiMode,
  setIsUpiMode,
  qrContent,
  setQrContent,
  upiId,
  setUpiId,
  payeeName,
  setPayeeName,
  amount,
  setAmount,
  currency,
  setCurrency,
  transactionRef,
  setTransactionRef,
  transactionNote,
  setTransactionNote
}: HomeViewProps) {
  const [localQrContent, setLocalQrContent] = useState(qrContent)
  const [localUpiId, setLocalUpiId] = useState(upiId)
  const [localPayeeName, setLocalPayeeName] = useState(payeeName)
  const [localAmount, setLocalAmount] = useState(amount)
  const [localTransactionNote, setLocalTransactionNote] = useState(transactionNote)

  const debouncedQrContent = useDebounce(localQrContent, 300)
  const debouncedUpiId = useDebounce(localUpiId, 300)
  const debouncedPayeeName = useDebounce(localPayeeName, 300)
  const debouncedAmount = useDebounce(localAmount, 300)
  const debouncedTransactionNote = useDebounce(localTransactionNote, 300)

  useEffect(() => {
    setQrContent(debouncedQrContent)
  }, [debouncedQrContent, setQrContent])

  useEffect(() => {
    setUpiId(debouncedUpiId)
  }, [debouncedUpiId, setUpiId])

  useEffect(() => {
    setPayeeName(debouncedPayeeName)
  }, [debouncedPayeeName, setPayeeName])

  useEffect(() => {
    setAmount(debouncedAmount)
  }, [debouncedAmount, setAmount])

  useEffect(() => {
    setTransactionNote(debouncedTransactionNote)
  }, [debouncedTransactionNote, setTransactionNote])

  const handleQrContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalQrContent(e.target.value)
  }

  const handleUpiIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalUpiId(e.target.value)
  }

  const handlePayeeNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalPayeeName(e.target.value)
  }

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalAmount(e.target.value)
  }

  const handleTransactionNoteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalTransactionNote(e.target.value)
  }

  const { theme } = useTheme()

  return (
    <motion.div
      key="home"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="space-y-2">
        <h1 className="text-3xl sm:text-5xl font-bold text-blue-900 mb-4">QR Code Generator</h1>
        <p className="text-blue-600 mb-6 sm:mb-8 text-base sm:text-lg">Your QR code will be generated automatically</p>
      </div>

      <div className="flex space-x-4 mb-6">
        <Button
          onClick={() => setIsUpiMode(false)}
          className={`flex-1 ${!isUpiMode ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'} transition-colors`}
        >
          <QrCode className="mr-2 h-5 w-5" />
          Simple QR
        </Button>
        <Button
          onClick={() => setIsUpiMode(true)}
          className={`flex-1 ${isUpiMode ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'} transition-colors`}
        >
          <CreditCard className="mr-2 h-5 w-5" />
          UPI QR
        </Button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={isUpiMode ? 'upi' : 'simple'}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          {isUpiMode ? (
            <div className="space-y-4">
              <Input
                className="w-full text-lg sm:text-xl p-4 sm:p-6 rounded-xl sm:rounded-2xl border-2 border-gray-200 focus:border-blue-500 transition-colors"
                placeholder="UPI ID"
                value={localUpiId}
                onChange={handleUpiIdChange}
              />
              <Input
                className="w-full text-lg sm:text-xl p-4 sm:p-6 rounded-xl sm:rounded-2xl border-2 border-gray-200 focus:border-blue-500 transition-colors"
                placeholder="Payee Name"
                value={localPayeeName}
                onChange={handlePayeeNameChange}
              />
              <Input
                className="w-full text-lg sm:text-xl p-4 sm:p-6 rounded-xl sm:rounded-2xl border-2 border-gray-200 focus:border-blue-500 transition-colors"
                type="number"
                placeholder="Amount"
                value={localAmount}
                onChange={handleAmountChange}
              />
              <Input
                className="w-full text-lg sm:text-xl p-4 sm:p-6 rounded-xl sm:rounded-2xl border-2 border-gray-200 focus:border-blue-500 transition-colors"
                placeholder="Transaction Notes"
                value={localTransactionNote}
                onChange={handleTransactionNoteChange}
              />
            </div>
          ) : (
            <Input
              className="w-full text-lg sm:text-xl p-4 sm:p-6 rounded-xl sm:rounded-2xl border-2 border-gray-200 focus:border-blue-500 transition-colors"
              placeholder="Enter your text or URL"
              value={localQrContent}
              onChange={handleQrContentChange}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  )
}
