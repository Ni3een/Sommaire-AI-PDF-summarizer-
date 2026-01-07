import BgGradient from "@/components/common/bg-gradient"
import {Sparkles, Crown} from "lucide-react"
import UploadHeader from "@/components/upload/upload-header"
import UploadForm from "@/components/upload/upload-form"
import { redirect } from "next/dist/client/components/navigation"
import { currentUser } from "@clerk/nextjs/server"
import { hasReachedUploadLimit } from "@/lib/user";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MotionDiv, MotionH1, MotionP } from "@/components/common/motion-wrapper";
import { containerVariants, itemsVariants } from "@/utils/constants";

export default async function UploadPage(){
    const user=await currentUser();
    if(!user?.id) return redirect('/sign-in');
    const userId=user.id;
    const {hasReachedLimit, uploadCount, uploadLimit, isPro}=await hasReachedUploadLimit(userId);
    
    if(hasReachedLimit){
        return(
            <section className="min-h-screen">
                <BgGradient/>
                <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
                    <MotionDiv 
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="flex flex-col items-center justify-center gap-6 text-center"
                    >
                        <MotionDiv variants={itemsVariants} className="flex items-center gap-2">
                            <Crown className="h-12 w-12 text-rose-500" />
                        </MotionDiv>
                        <MotionH1 variants={itemsVariants} className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                            Upload Limit Reached
                        </MotionH1>
                        <MotionP variants={itemsVariants} className="text-lg text-gray-600 max-w-md">
                            You've used all <span className="font-semibold">{uploadCount}/{uploadLimit}</span> of your free summaries. 
                            Upgrade to Pro for unlimited uploads!
                        </MotionP>
                        <MotionDiv variants={itemsVariants} className="flex gap-4 mt-4">
                            <Button asChild className="bg-linear-to-r from-rose-500 to-rose-700 hover:from-rose-600 hover:to-rose-800 text-white px-8 py-6 text-lg rounded-full">
                                <Link href="/#pricing">
                                    <Sparkles className="mr-2 h-5 w-5" />
                                    Upgrade to Pro
                                </Link>
                            </Button>
                            <Button asChild variant="outline" className="px-8 py-6 text-lg rounded-full">
                                <Link href="/dashboard">
                                    View Summaries
                                </Link>
                            </Button>
                        </MotionDiv>
                    </MotionDiv>
                </div>
            </section>
        )
    }
    
    return(
        <section className="min-h-screen">
            <BgGradient/>
            <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
                <MotionDiv 
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex flex-col items-center justify-center gap-6 text-center"
                >
                <UploadHeader/>
                <UploadForm/>
                {!isPro && (
                    <MotionP variants={itemsVariants} className="text-sm text-gray-500">
                        {uploadCount}/{uploadLimit} free uploads used
                    </MotionP>
                )}
                </MotionDiv>
            </div>
        </section>
    )
}
               
    