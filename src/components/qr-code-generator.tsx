'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Eye, Image, Type, Wifi, Info, Upload, MoreHorizontal, ChevronUp, ChevronDown, Download, Settings, Home, QrCode } from 'lucide-react'

export function QrCodeGenerator() {
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
      {/* Left Sidebar - Only visible on large screens */}
      <div className="hidden lg:flex lg:w-20 bg-white lg:rounded-l-3xl p-4 lg:py-6 flex-col items-center justify-between lg:space-y-8 shadow-lg">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center transition-transform hover:scale-110">
                <span className="text-white font-bold text-2xl">G</span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>QR Code Generator</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <div className="flex flex-col space-y-8">
          {[Eye, Image, Type, Wifi, Info].map((Icon, index) => (
            <TooltipProvider key={index}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`transition-colors hover:bg-blue-100 ${index === 2 ? 'bg-blue-600 text-white' : 'text-gray-400'}`}
                  >
                    <Icon className="h-6 w-6" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{Icon.name}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:bg-blue-100 transition-colors">
                <MoreHorizontal className="h-6 w-6" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>More options</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* Main Content */}
      <div className="flex-grow px-4 lg:px-16 py-6 lg:py-12 overflow-y-auto">
        <AnimatePresence mode="wait">
          {activeView === 'home' && (
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
          )}

          {activeView === 'settings' && (
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
          )}
        </AnimatePresence>
      </div>

      {/* Right Panel - Only visible on large screens */}
      <div className="hidden lg:block w-96">
        <Card className="bg-blue-900 text-white lg:rounded-r-3xl overflow-hidden h-full">
          <CardContent className="p-8">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-white w-full aspect-square rounded-xl lg:rounded-2xl mb-6 lg:mb-8 flex items-center justify-center"
            >
              {/* QR Code would be rendered here */}
              <span className="text-blue-900 text-lg font-medium">QR Code Preview</span>
            </motion.div>
            <div className="space-y-4">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="bg-blue-800 rounded-xl lg:rounded-2xl p-4 lg:p-5"
              >
                <div className="flex justify-between items-center mb-4">
                  <span className="font-semibold text-lg">FRAME</span>
                  <Button variant="ghost" size="sm" className="text-white hover:bg-blue-700 transition-colors">
                    <ChevronUp className="h-5 w-5" />
                  </Button>
                </div>
                <div className="flex justify-between">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Button key={i} variant="ghost" size="icon" className="bg-blue-700 p-2 rounded-lg hover:bg-blue-600 transition-colors">
                      <div className="w-6 h-6 lg:w-8 lg:h-8 bg-white rounded-sm"></div>
                    </Button>
                  ))}
                </div>
              </motion.div>
              {['SHAPE & COLOR', 'LOGO'].map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                >
                  <Button variant="ghost" className="w-full justify-between py-4 lg:py-5 text-left font-semibold text-lg hover:bg-blue-800 transition-colors">
                    {item}
                    <ChevronDown className="h-5 w-5" />
                  </Button>
                </motion.div>
              ))}
            </div>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.5 }}
              className="flex space-x-4 mt-6 lg:mt-8"
            >
              {['JPG', 'SVG/EPS'].map((format, index) => (
                <Button
                  key={format}
                  className={`flex-1 ${index === 0 ? 'bg-blue-500 hover:bg-blue-600' : 'bg-orange-500 hover:bg-orange-600'} rounded-full py-3 lg:py-4 text-base lg:text-lg transition-colors`}
                >
                  <Download className="h-5 w-5 mr-2" />
                  {format}
                </Button>
              ))}
            </motion.div>
          </CardContent>
        </Card>
      </div>

      {/* Mobile QR Preview - Only visible on small screens */}
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

      {/* Mobile Bottom Navigation - Only visible on small screens */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="lg:hidden fixed inset-x-0 bottom-0 bg-white shadow-lg"
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
    </div>
  )
}