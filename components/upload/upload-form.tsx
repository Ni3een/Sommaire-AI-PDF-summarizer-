// jo bhi core logic hoga upload form ka wo yaha hoga
'use client'
import {Button} from "@/components/ui/button"
import UploadFormInput from "@/components/upload/upload-form-input"
import {z} from "zod"
import {useUploadThing} from "@/utils/uploadthing"
import { toast } from "sonner"
import {getPDFsummary, storedPdfSummary} from "@/actions/upload-action"
import { Heading1 } from "lucide-react"
import { useRef } from "react"
import React, { useState } from "react"
import { FormatefiLeNameAsTitle } from "@/utils/format-utils"
import { useRouter } from "next/navigation"
import SummarySkeleton from "@/components/summaries/SummarySkeleton"

const schema=z.object({
    file:z.instanceof(File)
    .refine((file)=>file.size<=20*1024*1024,{
        message:"File size should be less than 20MB"
    }).refine((file)=>file.type.startsWith('application/pdf'),'File must be a PDF'),

})
export default function UploadForm(){
    const formRef=useRef<HTMLFormElement>(null)
    const [isLoading,setIsLoading]=useState(false)
    const [isGenerating, setIsGenerating]=useState(false)
    const {startUpload,routeConfig}=useUploadThing('PdfUploader');

    const router=useRouter();
    const handleSubmit=async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        try{
        setIsLoading(true);
        const formData=new FormData(e.currentTarget);
        const file=formData.get('file') as File;

        const validatedFields=schema.safeParse({file})
        if(!validatedFields.success){
        toast.error('Upload failed', {
            description:validatedFields.error.flatten().fieldErrors.file?.[0]??'Invalid File',
        });
        setIsLoading(false);
        return;
    }
        const toastId = toast.loading('Uploading...', {
            description:'Hang Tight! while Our AI is reading your PDF! 😊',
        })
        
        try {
            const response=await startUpload([file])
            if(!response){
                toast.error("Upload failed", {
                    description: "No response from server",
                    id: toastId
                });
                setIsLoading(false);
                return
            }
            
            toast.success("Upload complete!", {
                description: "Processing your PDF summary...",
                id: toastId
            });
            
            setIsGenerating(true);
            
            console.log('📤 Upload response:', response);
            const result=await getPDFsummary(response)
            console.log('📊 Summary result:', result);
            
            setIsLoading(false);
            setIsGenerating(false);
            let storeResult:any;
            const {data=null,message=null,success=false}=result || {}
            if(success && data){
                console.log('✅ Summary generated successfully!');
                console.log('📝 Summary text:', data.summary);
                toast.success("Summary Generated!", {
                    description: "Your PDF summary has been created successfully",
                    id: toastId
                });
                formRef.current?.reset();
                
                if(data.id){
                    console.log('🔗 Redirecting to summary page:', data.id);
                    router.push(`/summaries/${data.id}`);
                }
            } else {
                console.error('❌ Failed to generate summary:', message);
                toast.error("Summary failed", {
                    description: message || "Failed to generate summary",
                    id: toastId
                });
            }
        } catch (error) {
            console.error('❌ Error in upload process:', error);
            setIsLoading(false);
            setIsGenerating(false);
            toast.error("Upload failed", {
                description: error instanceof Error ? error.message : "An error occurred",
                id: toastId
            });
        }
    }catch(err){
            console.log('error occurred during file upload:', err);
            setIsLoading(false);
            setIsGenerating(false);
            formRef.current?.reset();
        }
    }
    
    if(isGenerating) {
        return (
            <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
                <SummarySkeleton />
            </div>
        )
    }
    
    return (
        <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
            <UploadFormInput isLoading={isLoading} ref={formRef} onSubmit={handleSubmit} />
        </div>
    )
}