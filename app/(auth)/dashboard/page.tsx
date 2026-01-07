import BgGradient from "@/components/common/bg-gradient";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {Plus} from "lucide-react";
import {ArrowRight} from "lucide-react";
import { getSummaries } from "@/lib/summary";
import { hasReachedUploadLimit } from "@/lib/user";
import { MotionH1, MotionP } from "@/components/common/motion-wrapper";
import EmptySummaryState from "@/components/summaries/empty-summary-state";
import React from "react";
import { itemsVariants } from "@/utils/constants";
import { redirect } from "next/navigation";
import SummaryCard from "@/components/summaries/summaries-card";
import { currentUser } from "@clerk/nextjs/server";

export default async function DashBoardPage(){
    const user=await currentUser();

    if(!user?.id) return redirect('/sign-in');
    const userId=user.id;

    const summaries=await getSummaries(userId);
    const {hasReachedLimit, uploadCount, uploadLimit, isPro} = await hasReachedUploadLimit(userId);
    
    return <main className="min-h-screen">
        <BgGradient className="from-emerald-200 via-teal-200 to-cyan-200
        "/>
        <div className="container mx-auto flex flex-col gap-4">
            <div className="container mx-auto flex flex-col  gap-4">
            <div className="px-2 py-2 sm:py-24">
            <div className="px-2 py-12 sm:py-24">
                <div className="flex gap-4 mb-8 justify-between">
            <div className="flex flex-col gap-2">
            <MotionH1 variants={itemsVariants} initial="hidden" whileInView="visible" viewport={{once:true,margin:'-100px'}}
             className="text-4.5xl font-bold tracking-tight bg-linear-to-r from-gray-600 to-gray-900 bg-clip-text text-transparent">
                Your Summaries
                </MotionH1>
             <MotionP variants={itemsVariants} initial="hidden" animate="visible"  className="text-gray-600">Transform your PDFs into concise, actionable summaries.</MotionP>
           </div>
          <Button asChild variant={'link'} className="bg-gradient-to-r from-rose-500 to-rose-700 hover:from-rose-600 hover:to-rose-800 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl hover:no-underline">
            <Link href="/upload" className="flex items-center gap-2 text-white font-semibold px-4 py-2">
            <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
            <span>New Summary</span>
            </Link>
            </Button>
            </div>
            <div className="mb-6">
                {!isPro && (
                <div className={`border rounded-lg p-4 mb-4 ${hasReachedLimit ? 'bg-rose-50 border-rose-200 text-rose-800' : 'bg-gray-50 border-gray-200 text-gray-700'}`}>
                <MotionP initial={{opacity:0,y:10}} whileInView={{opacity:1,y:0,transition:{duration:0.5}}} viewport={{once:true}}
                className="text-sm">
                    {hasReachedLimit ? (
                        <>
                            You've reached the limit of {uploadLimit} uploads on the basic plan 🙄. For Unlimited Uploads,{' '}
                            <Link href="/#pricing" className="text-rose-800 underline font-medium underline-offset-4 inline-flex items-center">
                                Click here to Upgrade to Pro{' '}
                                <ArrowRight className="w-4 h-4 inline-block ml-1"/>
                            </Link>
                        </>
                    ) : (
                        <>
                            You've used {uploadCount}/{uploadLimit} uploads on the basic plan.{' '}
                            <Link href="/#pricing" className="text-rose-600 underline font-medium underline-offset-4 inline-flex items-center">
                                Upgrade to Pro for unlimited uploads{' '}
                                <ArrowRight className="w-4 h-4 inline-block ml-1"/>
                            </Link>
                        </>
                    )}
                </MotionP>
                </div>
                )}
                {summaries.length===0?( 
                    <EmptySummaryState />):(
            <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 sm:px-0">
                {summaries.map((summary, index) => (
                    <SummaryCard key={index} summary={summary} />
                ))}
            </div>
                    )}
            </div>
            </div>
            </div>
            </div>
        </div>
    </main>
}