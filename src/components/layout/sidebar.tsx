'use client'

import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import { Eye, Image, Type, Wifi, Info, MoreHorizontal } from 'lucide-react'

export default function Sidebar() {
  return (
    <div className="hidden sm:flex sm:w-20 bg-white sm:rounded-l-3xl p-4 sm:py-6 flex-col items-center justify-between sm:space-y-8 shadow-lg">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center transition-transform hover:scale-110">
              <span className="text-white font-bold text-2xl">D</span>
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
  )
}
