import {Button} from "@/components/ui/button";
import {Badge} from "@/components/ui/badge"
import {Sparkles} from "lucide-react";
import {ArrowRight} from "lucide-react";
import Link from "next/link";
import {MotionSection,MotionH1,MotionH2,MotionDiv,MotionSpan} from "@/components/common/motion-wrapper";
import { containerVariants, itemsVariants } from "@/utils/constants";
const buttonVariants={
    scale:1.05,
    transition:{
        type:'spring' as const,
        stiffness:300,
        damping:10,
    }
}
export default function HeroSection(){
    return <MotionSection
    variants={containerVariants}
    initial="hidden"
    animate="visible"
        >
        <div className="relative mx-auto flex flex-col z-0 items-center justify-center py-16 sm:py-20 lg:pb-28 transition-all animate-in lg:px-12 max-w-7xl">
            <div className="flex">
                <MotionSection 
                variants={itemsVariants}

                className="relative p-[1px] overflow-hidden rounded-full bg-linear-to-r from-rose-200 via-rose-500 to-rose-800 animate-gradient-x
                group">
                    <Badge variant={'secondary'} className="relative px-6 py-2 text-base font-medium bg-white rounded-full group-hover:bg-gray-50 transition-colors duration-200">
                        <Sparkles className="h-6 w-6 mr-2 text-rose-600 animate-pulse" />
                        <p className="text-base text-rose-600">Powered By AI</p>
                    </Badge>
                </MotionSection >
            </div>
            <MotionH1 variants={itemsVariants} className="font-bold py-6 text-center">
                TransForm PDFs into 
                <span className="relative inline-block">
                    <span className="relative z-10 px-2">concise</span>
                    <span
                    className="absolute inset-0 bg-rose-200/50 -rotate-2 rounded-lg transform -skew-y-1" aria-hidden="true">
                       </span>
                </span>{' '}
                summaries
            </MotionH1>
            <MotionH2 variants={itemsVariants} className="text-lg sm:text-xl lg:text-2xl text-center px-4 lg:px-0 max-w-4xl text-gray-600">Effortlessly extract key information from your documents</MotionH2>
            <MotionDiv variants={itemsVariants} whileHover={buttonVariants} className="z-10">
            <Button asChild variant={'link'} className="text-white mt-6 text-base sm:text-lg lg:text-xl rounded-full px-8 sm:px-10 lg:px-12 py-6 sm:py-7 lg:py-8 lg:mt-16 bg-linear-to-r from-slate-900 to-rose-500 hover:from-rose-500
            hover:to-slate-900 hover:no-underline font-bold shadow-lg transition-all duration-300">
            <Link href="/" className="flex gap-2 items-center">
            <MotionSpan>Try Sommaire</MotionSpan> <ArrowRight className="animate-pulse"></ArrowRight>
            </Link>
            </Button>
            </MotionDiv>
        </div>
    </MotionSection>
}