'use client'

import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronUp, ChevronDown, Download } from 'lucide-react'

export default function QrPreview() {
  return (
    <div className="hidden lg:block w-96">
      <Card className="bg-blue-900 text-white lg:rounded-r-3xl overflow-hidden h-full">
        <CardContent className="p-8">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white w-full aspect-square rounded-xl lg:rounded-2xl mb-6 lg:mb-8 flex items-center justify-center"
          >
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
  )
}