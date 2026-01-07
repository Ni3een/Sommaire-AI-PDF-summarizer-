import React from 'react'
import BgGradient from '@/components/common/bg-gradient'
import HeroSection from '@/components/home/HeroSection'
import DemoSection from '@/components/home/DemoSection'
import HowItworkSection from '@/components/home/How-it-Works'
import PricingSection from '@/components/home/PricingSection'
import CTASection from '@/components/home/CTA-Section'
const page = () => {
  return (
    <div className='relative w-full'>
    <BgGradient/> 
    <div className='flex flex-col'>
    <HeroSection/>
    <DemoSection/>
    <HowItworkSection/>
    <PricingSection/>
    <CTASection/> 


     </div>
   </div>
  )
}

export default page