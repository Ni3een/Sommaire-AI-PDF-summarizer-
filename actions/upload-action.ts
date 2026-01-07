'use server'
import { generateSummaryFromGemini } from "@/lib/geminiai";
import { fetchAndExtractPdfText } from "@/lib/langchain";
import { auth } from "@clerk/nextjs/server";
import { getDBConnection } from "@/lib/db";
import { FormatefiLeNameAsTitle } from "@/utils/format-utils";
import { revalidatePath } from "next/cache";
type UploadResponse = Array<{
    serverData: {
        userId: string;
        file: {
            url: string;
            name: string;
        };
    };
}>;

export async function getPDFsummary(uploadResponse: UploadResponse){
    if(!uploadResponse || uploadResponse.length === 0){
        return{
            success:false,
            message:'File upload failed',
            data:null,
        }
    }
    
    const {serverData:{userId,file:{url:pdfUrl,name:fileName}}}=uploadResponse[0];
    
    try{
        console.log('📥 Starting PDF processing for:', fileName);
        console.log('🔗 PDF URL:', pdfUrl);
        // it's in lib/langchain.ts
        const pdfText=await fetchAndExtractPdfText(pdfUrl);
        console.log('✅ Extracted PDF text length:', pdfText?.length || 0, 'characters');
        
        if(!pdfText || pdfText.length === 0){
            console.error('❌ No text extracted from PDF');
            return{
                success:false,
                message:'No text could be extracted from the PDF file',
                data:null,
            }
        }
        
        let summary;
        try{
            // lib/geminiai.ts
            // yaha se summary generate karna hai
            console.log('🤖 Starting Gemini summary generation...');
            summary=await generateSummaryFromGemini(pdfText);
            console.log('✅ Summary generated successfully!');
            console.log('📝 Summary content:', summary);
        }catch(err){
            console.error('❌ Error generating summary from Gemini:', err);
            return{
                success:false,
                message: err instanceof Error ? err.message : 'Failed to generate summary from Gemini',
                data:null,
            }
        }
        
        if(!summary){
            console.error('❌ Summary is empty or null');
            return{
                success:false,
                message:'Failed to generate summary from Gemini',
                data:null,
            }
        }
        
        console.log('💾 Summary ready to save. Summary length:', summary.length);
        
        let summaryId;
        // Save summary to database
        try {
            const sql = await getDBConnection();
            const [insertedSummary] = await sql`
                INSERT INTO pdf_summaries 
                (user_id, original_file_url, summary_text, file_name, title)
                VALUES 
                (${userId}, ${pdfUrl}, ${summary}, ${fileName}, ${FormatefiLeNameAsTitle(fileName)})
                RETURNING id
            `;
            summaryId = insertedSummary.id;
            console.log('✅ Summary saved to database successfully with ID:', summaryId);
        } catch (dbError) {
            console.error('❌ Error saving to database:', dbError);
            // We don't fail the whole request if DB save fails, but we should log it
        }
        
        return {
            success: true,
            message: 'PDF summary generated successfully',
            data: {
                summary,
                fileName,
                userId,
                id: summaryId
            }
        }
        
    }catch(error){
         return {
            success: false,
            message: error instanceof Error ? error.message : 'Failed to process PDF',
            data: null
         }
    }
}
interface SavedPdfSummaryProps{
    userId?:string;
    fileUrl:string;
    summary:string;
    title:string;
    fileName:string;    
}
// sql  inserting summary
async function savedPdfSummary({userId,fileUrl,summary,title,fileName}:SavedPdfSummaryProps){
    try{
        const sql=await getDBConnection();
        const [savedsummary]=await sql`
        INSERT INTO pdf_summaries 
        (user_id, original_file_url, summary_text, title, file_name)
        VALUES (${userId}, ${fileUrl}, ${summary}, ${title}, ${fileName}) 
        RETURNING id, summary_text
        `;
        return savedsummary;
    }catch(error){
        console.error('Error saving summary:', error);
        return null;
    }

}
export async function storedPdfSummary({fileUrl,summary,title,fileName}:SavedPdfSummaryProps){
    // user is loggen In has as userId
    // save PDFSummary
    let savedSummary:any;
    try{
        // we will get userID from auth() always
        const {userId}=await auth();
        // no userid
        if(!userId){
            return{
                success:false,
                message:'User not found', 
            }
        }
        //else save in databse by this function
        savedSummary=await savedPdfSummary({userId,fileUrl,summary,title,fileName});
        if(!savedSummary){
            return{
                success:false,
                message:'Failed to save PDF summary,please try again...',
            }
        }
        
        // revalidate the path to reflect new summary
        revalidatePath(`/dashboard/summaries/${savedSummary.id}`);
        return{
            success:true,
            message:'PDF summary saved successfully',
            title:fileName, 
            data:{
                id:savedSummary.id
            }   
        }
       
    }catch(error){
        return{
            success:false,
            message:error instanceof Error?error.message:'Failed to save PDF summary', 
        }
    }
}
    