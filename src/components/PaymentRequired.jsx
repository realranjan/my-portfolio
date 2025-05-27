import React from 'react'
import { DollarSign, Coffee, ArrowUpRight } from 'lucide-react'

const PaymentRequired = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-md">
      <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-[calc(100%-24px)] sm:max-w-md w-full shadow-2xl animate-[fadeIn_0.6s_ease-out_forwards]">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <DollarSign className="w-12 h-12 sm:w-16 sm:h-16 text-orb-red animate-bounce" />
            <Coffee className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400 absolute -bottom-2 -right-2 animate-pulse" />
          </div>
        </div>

        <h2 className="text-xl sm:text-2xl font-instrument text-center mb-3 sm:mb-4 text-orb-red">
          🚨 Payment Required 🚨
        </h2>
        
        <p className="text-sm sm:text-base text-gray-600 text-center mb-4 sm:mb-6">
          Oops! Looks like someone forgot to pay their developer! Until my client remembers that developers can't survive on coffee alone, this portfolio is taking a little nap. 💤
        </p>
        
        <div className="text-xs sm:text-sm text-gray-500 text-center space-y-1.5 sm:space-y-2">
          <p>Site created with ❤️ (and unpaid hours) by</p>
          <a 
            href="https://akchavan.vercel.app/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center gap-1.5 sm:gap-2 text-orb-red hover:text-orb-red/80 transition-colors"
          >
            AK Chavan
            <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </a>
        </div>
        
        <div className="mt-6 sm:mt-8 text-center">
          <a 
            href="https://akchavan.vercel.app/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center gap-1.5 sm:gap-2 bg-orb-red text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-sm sm:text-base font-medium hover:bg-orb-red/90 transition-colors"
          >
            Pay the Developer
            <DollarSign className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </a>
        </div>
        
        <p className="mt-4 sm:mt-6 text-[10px] sm:text-xs text-gray-400 text-center">
          PS: This could be a beautiful portfolio, but someone's wallet is playing hide and seek! 🙈
        </p>
      </div>
    </div>
  )
}

export default PaymentRequired 