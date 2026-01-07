// instance of upload thing core logic
import { create } from "domain";
import { UploadThingError, type FileRouter } from "uploadthing/server";
import { z } from "zod";
import { currentUser } from "@clerk/nextjs/server";
import { createUploadthing } from "uploadthing/next";
const f=createUploadthing();

export const outFileRouter={
    PdfUploader:f({pdf:{maxFileSize:'32MB'}})
    .middleware(async({req})=>{
            // middleware logic can be added here user getting
        const userId=await currentUser();

        if(!userId)throw new UploadThingError("Unauthorized");
        return {userId:userId.id};
        }
    )
    .onUploadComplete(async({file,metadata})=>{
        console.log("File uploaded for user:",metadata.userId);
        console.log("File url:",file.ufsUrl);
        return {
            userId:metadata.userId,
            file: {
                url: file.url,
                name: file.name,
                size: file.size,
                key: file.key
            }
        };
        // post upload logic can be added here
    })
} satisfies FileRouter;

export type OutFileRouter=typeof outFileRouter
    
