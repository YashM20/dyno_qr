'use client'

import { motion } from 'framer-motion'
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface SettingsViewProps {
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
}

export default function SettingsView({
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
  setQrCornerDotType
}: SettingsViewProps) {
  return (
    <motion.div
      key="settings"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-bold text-blue-900 mb-4">QR Code Settings</h2>
      <div>
        <Label htmlFor="qr-size" className="block mb-2 text-blue-900 font-semibold">QR Code Size</Label>
        <Select defaultValue="medium">
          <SelectTrigger id="qr-size" className="w-full p-4 text-lg">
            <SelectValue placeholder="Select size" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="small">Small</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="large">Large</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="error-correction" className="block mb-2 text-blue-900 font-semibold">Error Correction Level</Label>
        <RadioGroup defaultValue="medium" className="flex flex-wrap gap-4">
          {['low', 'medium', 'high'].map((level) => (
            <div key={level} className="flex items-center space-x-2">
              <RadioGroupItem value={level} id={level} />
              <Label htmlFor={level} className="capitalize">{level}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>
      {/* Add more settings options here */}
    </motion.div>
  )
}
