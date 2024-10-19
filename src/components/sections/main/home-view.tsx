'use client'

import { useState, useEffect, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { QrCode, CreditCard, Settings } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useDebounce } from '@/hooks/useDebounce'

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
  qrSize: number
  setQrSize: (value: number) => void
  qrType: 'canvas' | 'svg'
  setQrType: (value: 'canvas' | 'svg') => void
  qrDotType: 'rounded' | 'dots' | 'classy' | 'classy-rounded' | 'square' | 'extra-rounded'
  setQrDotType: (value: 'rounded' | 'dots' | 'classy' | 'classy-rounded' | 'square' | 'extra-rounded') => void
  qrDotColor: string
  setQrDotColor: (value: string) => void
  qrBackgroundColor: string
  setQrBackgroundColor: (value: string) => void
  qrCornerSquareType: 'dot' | 'square' | 'extra-rounded'
  setQrCornerSquareType: (value: 'dot' | 'square' | 'extra-rounded') => void
  qrCornerDotType: 'dot' | 'square'
  setQrCornerDotType: (value: 'dot' | 'square') => void
  qrImageUrl: string
  setQrImageUrl: (value: string) => void
  qrErrorCorrectionLevel: 'L' | 'M' | 'Q' | 'H'
  setQrErrorCorrectionLevel: (value: 'L' | 'M' | 'Q' | 'H') => void
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
  setTransactionNote,
  qrSize,
  setQrSize,
  qrType,
  setQrType,
  qrDotType,
  setQrDotType,
  qrDotColor,
  setQrDotColor,
  qrBackgroundColor,
  setQrBackgroundColor,
  qrCornerSquareType,
  setQrCornerSquareType,
  qrCornerDotType,
  setQrCornerDotType,
  qrImageUrl,
  setQrImageUrl,
  qrErrorCorrectionLevel,
  setQrErrorCorrectionLevel
}: HomeViewProps) {
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false)

  // Local state for all fields
  const [localQrContent, setLocalQrContent] = useState(qrContent)
  const [localUpiId, setLocalUpiId] = useState(upiId)
  const [localPayeeName, setLocalPayeeName] = useState(payeeName)
  const [localAmount, setLocalAmount] = useState(amount)
  const [localCurrency, setLocalCurrency] = useState(currency)
  const [localTransactionRef, setLocalTransactionRef] = useState(transactionRef)
  const [localTransactionNote, setLocalTransactionNote] = useState(transactionNote)
  const [localQrSize, setLocalQrSize] = useState(qrSize)
  const [localQrDotColor, setLocalQrDotColor] = useState(qrDotColor)
  const [localQrBackgroundColor, setLocalQrBackgroundColor] = useState(qrBackgroundColor)
  const [localQrImageUrl, setLocalQrImageUrl] = useState(qrImageUrl)
  const [localQrType, setLocalQrType] = useState(qrType)
  const [localQrDotType, setLocalQrDotType] = useState(qrDotType)
  const [localQrCornerSquareType, setLocalQrCornerSquareType] = useState(qrCornerSquareType)
  const [localQrCornerDotType, setLocalQrCornerDotType] = useState(qrCornerDotType)
  const [localQrErrorCorrectionLevel, setLocalQrErrorCorrectionLevel] = useState(qrErrorCorrectionLevel)

  // Debounced values
  const debouncedQrContent = useDebounce(localQrContent, 300)
  const debouncedUpiId = useDebounce(localUpiId, 300)
  const debouncedPayeeName = useDebounce(localPayeeName, 300)
  const debouncedAmount = useDebounce(localAmount, 300)
  const debouncedCurrency = useDebounce(localCurrency, 300)
  const debouncedTransactionRef = useDebounce(localTransactionRef, 300)
  const debouncedTransactionNote = useDebounce(localTransactionNote, 300)
  const debouncedQrSize = useDebounce(localQrSize, 300)
  const debouncedQrImageUrl = useDebounce(localQrImageUrl, 300)
  const debouncedQrType = useDebounce(localQrType, 300)
  const debouncedQrDotType = useDebounce(localQrDotType, 300)
  const debouncedQrCornerSquareType = useDebounce(localQrCornerSquareType, 300)
  const debouncedQrCornerDotType = useDebounce(localQrCornerDotType, 300)

  // Update parent state with debounced values
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
    setCurrency(debouncedCurrency)
  }, [debouncedCurrency, setCurrency])

  useEffect(() => {
    setTransactionRef(debouncedTransactionRef)
  }, [debouncedTransactionRef, setTransactionRef])

  useEffect(() => {
    setTransactionNote(debouncedTransactionNote)
  }, [debouncedTransactionNote, setTransactionNote])

  useEffect(() => {
    setQrSize(debouncedQrSize)
  }, [debouncedQrSize, setQrSize])

  useEffect(() => {
    setQrImageUrl(debouncedQrImageUrl)
  }, [debouncedQrImageUrl, setQrImageUrl])

  useEffect(() => {
    setQrType(debouncedQrType)
  }, [debouncedQrType, setQrType])

  useEffect(() => {
    setQrDotType(debouncedQrDotType)
  }, [debouncedQrDotType, setQrDotType])

  useEffect(() => {
    setQrCornerSquareType(debouncedQrCornerSquareType)
  }, [debouncedQrCornerSquareType, setQrCornerSquareType])

  useEffect(() => {
    setQrCornerDotType(debouncedQrCornerDotType)
  }, [debouncedQrCornerDotType, setQrCornerDotType])

  useEffect(() => {
    setQrErrorCorrectionLevel(localQrErrorCorrectionLevel)
  }, [localQrErrorCorrectionLevel, setQrErrorCorrectionLevel])

  // Color change handlers
  const handleDotColorChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalQrDotColor(e.target.value)
  }, [])

  const handleDotColorComplete = useCallback(() => {
    setQrDotColor(localQrDotColor)
  }, [localQrDotColor, setQrDotColor])

  const handleBackgroundColorChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalQrBackgroundColor(e.target.value)
  }, [])

  const handleBackgroundColorComplete = useCallback(() => {
    setQrBackgroundColor(localQrBackgroundColor)
  }, [localQrBackgroundColor, setQrBackgroundColor])

  return (
    <motion.div
      key="home"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-bold text-blue-900 mb-4">Generate QR Code</h2>

      <Tabs defaultValue={isUpiMode ? "upi" : "simple"} onValueChange={(value) => setIsUpiMode(value === "upi")}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="simple">
            <QrCode className="mr-2 h-5 w-5" />
            Simple QR
          </TabsTrigger>
          <TabsTrigger value="upi">
            <CreditCard className="mr-2 h-5 w-5" />
            UPI QR
          </TabsTrigger>
        </TabsList>
        <TabsContent value="simple">
          <Card>
            <CardHeader>
              <CardTitle>Simple QR Code</CardTitle>
              <CardDescription>Enter the content for your QR code.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Label htmlFor="qr-content">QR Code Content</Label>
                <Input
                  id="qr-content"
                  value={localQrContent}
                  onChange={(e) => setLocalQrContent(e.target.value)}
                  placeholder="Enter URL or text"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="upi">
          <Card>
            <CardHeader>
              <CardTitle>UPI QR Code</CardTitle>
              <CardDescription>Enter the UPI payment details.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="upi-id">UPI ID</Label>
                  <Input
                    id="upi-id"
                    value={localUpiId}
                    onChange={(e) => setLocalUpiId(e.target.value)}
                    placeholder="Enter UPI ID"
                  />
                </div>
                <div>
                  <Label htmlFor="payee-name">Payee Name</Label>
                  <Input
                    id="payee-name"
                    value={localPayeeName}
                    onChange={(e) => setLocalPayeeName(e.target.value)}
                    placeholder="Enter payee name"
                  />
                </div>
                <div>
                  <Label htmlFor="amount">Amount</Label>
                  <Input
                    id="amount"
                    value={localAmount}
                    onChange={(e) => setLocalAmount(e.target.value)}
                    placeholder="Enter amount"
                    type="number"
                  />
                </div>
                <div>
                  <Label htmlFor="currency">Currency</Label>
                  <Input
                    id="currency"
                    value={localCurrency}
                    onChange={(e) => setLocalCurrency(e.target.value)}
                    placeholder="Enter currency"
                  />
                </div>
                <div>
                  <Label htmlFor="transaction-ref">Transaction Reference</Label>
                  <Input
                    id="transaction-ref"
                    value={localTransactionRef}
                    onChange={(e) => setLocalTransactionRef(e.target.value)}
                    placeholder="Enter transaction reference"
                  />
                </div>
                <div>
                  <Label htmlFor="transaction-note">Transaction Note</Label>
                  <Input
                    id="transaction-note"
                    value={localTransactionNote}
                    onChange={(e) => setLocalTransactionNote(e.target.value)}
                    placeholder="Enter transaction note"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>QR Code Settings</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowAdvancedSettings(!showAdvancedSettings)}
            >
              <Settings className="h-4 w-4 mr-2" />
              {showAdvancedSettings ? 'Hide' : 'Show'} Advanced Settings
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <Label htmlFor="qr-dot-color">Dot Color</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="qr-dot-color"
                  type="color"
                  value={localQrDotColor}
                  onChange={handleDotColorChange}
                  onBlur={handleDotColorComplete}
                  className="w-12 h-12 p-1"
                />
                <Input
                  value={localQrDotColor}
                  onChange={handleDotColorChange}
                  onBlur={handleDotColorComplete}
                  placeholder="#000000"
                  className="flex-grow"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="qr-background-color">Background Color</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="qr-background-color"
                  type="color"
                  value={localQrBackgroundColor}
                  onChange={handleBackgroundColorChange}
                  onBlur={handleBackgroundColorComplete}
                  className="w-12 h-12 p-1"
                />
                <Input
                  value={localQrBackgroundColor}
                  onChange={handleBackgroundColorChange}
                  onBlur={handleBackgroundColorComplete}
                  placeholder="#ffffff"
                  className="flex-grow"
                />
              </div>
            </div>

            {showAdvancedSettings && (
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <div>
                    <Label htmlFor="qr-type">QR Code Type</Label>
                    <Select value={localQrType} onValueChange={(value: 'canvas' | 'svg') => setLocalQrType(value)}>
                      <SelectTrigger id="qr-type">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="canvas">Canvas</SelectItem>
                        <SelectItem value="svg">SVG</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="qr-dot-type">Dot Type</Label>
                    <Select value={localQrDotType} onValueChange={(value: any) => setLocalQrDotType(value)}>
                      <SelectTrigger id="qr-dot-type">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {['rounded', 'dots', 'classy', 'classy-rounded', 'square', 'extra-rounded'].map((type) => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="qr-image-url">Image URL</Label>
                    <Input
                      id="qr-image-url"
                      value={localQrImageUrl}
                      onChange={(e) => setLocalQrImageUrl(e.target.value)}
                      placeholder="Enter image URL"
                    />
                  </div>
                  <div>
                    <Label htmlFor="qr-corner-square-type">Corner Square Type</Label>
                    <Select value={localQrCornerSquareType} onValueChange={(value: any) => setLocalQrCornerSquareType(value)}>
                      <SelectTrigger id="qr-corner-square-type">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {['dot', 'square', 'extra-rounded'].map((type) => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="qr-corner-dot-type">Corner Dot Type</Label>
                    <Select value={localQrCornerDotType} onValueChange={(value: any) => setLocalQrCornerDotType(value)}>
                      <SelectTrigger id="qr-corner-dot-type">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dot">Dot</SelectItem>
                        <SelectItem value="square">Square</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="qr-error-correction">Error Correction Level</Label>
                    <RadioGroup
                      value={localQrErrorCorrectionLevel}
                      onValueChange={(value: 'L' | 'M' | 'Q' | 'H') => setLocalQrErrorCorrectionLevel(value)}
                      className="flex space-x-4"
                    >
                      {['L', 'M', 'Q', 'H'].map((level) => (
                        <div key={level} className="flex items-center">
                          <RadioGroupItem value={level} id={`ecl-${level}`} />
                          <Label htmlFor={`ecl-${level}`} className="ml-2">{level}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
