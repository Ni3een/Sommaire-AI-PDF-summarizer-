import React from "react";
import DeleteCard from "@/components/summaries/delete-Card";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatFileName } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { itemsVariants } from "@/utils/constants";
import {MotionDiv} from "@/components/common/motion-wrapper";
const SummaryHeader=({fileurl,title,createdAt}:
    {fileurl:string,title:string|null,createdAt:string|Date})=>{
        return(
        <MotionDiv variants={itemsVariants}
        initial="hidden"
        animate="visible" whileHover={{scale:1.02,transition:{duration:0.2,ease:'easeOut'}}}
        className="flex items-start gap-2 sm:gap-4">
            <FileText className="w-6 h-6 sm:w-8 sm:h-8
            text-rose-400 mt-1"/>
            <div className="flex flex-col min-w-0 w-full">
            <h3 className="text-base xl:text-lg font-semibold text-gray-900 truncate
            w-4/5">
            {title || formatFileName(fileurl)}
            </h3>
            <p className="text-sm text-gray-500">{formatDistanceToNow(new Date(createdAt), { addSuffix: true })} ago</p>
        </div>
        </MotionDiv>
        )
    }
const StatusBadge=({status}:{status:string})=>{
    return <span className={cn('px-3 py-1 text-xs font-medium rounded-full  capitalize',status==='completed' ? 
        'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800')}>{status}</span>
}
export default function SummaryCard({summary}:{summary:any}){
    return <div>
        <Card className="relative h-full mt-6">
            <div className="absolute top-2 right-2">
                <DeleteCard summaryId={summary.id}/>
            </div>
            <Link href={`summaries/${summary.id}`}
            className="block p-4 sm:p-6">
                <div className="flex flex-col gap-3 sm:gap-4">
               <SummaryHeader fileurl={summary.original_file_url}
               title={summary.title}
               createdAt={summary.created_at}/>
                <p className="text-gray-600 line-clamp-2 text-sm sm:text-base">
                    {summary.summary_text}</p>
                    </div>
                    <div className="flex justify-between items-center mt-2 sm:mt-4">
                        <StatusBadge status={summary.status}/>
                        <span></span>
                    </div>
            </Link>
        </Card>
    </div>
}