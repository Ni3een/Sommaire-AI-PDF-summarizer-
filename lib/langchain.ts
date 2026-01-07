import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";

export async function fetchAndExtractPdfText(fileUrl:string){
    console.log('📄 Fetching PDF from URL:', fileUrl);
    const response=await fetch(fileUrl);
    if(!response.ok){
        console.error('❌ Failed to fetch PDF. Status:', response.status);
        throw new Error(`Failed to fetch PDF: ${response.statusText}`);
    }
    const blob=await response.blob();
    console.log('📦 PDF blob size:', blob.size, 'bytes');
    const arrayBuffer=await blob.arrayBuffer();

    console.log('🔄 Loading PDF with PDFLoader...');
    const loader=new PDFLoader(new Blob([arrayBuffer]), {
        splitPages: false
    });
    const docs=await loader.load();
    console.log('✅ PDF loaded. Number of documents:', docs.length);

    const extractedText = docs.map((doc)=>doc.pageContent).join('\n');
    console.log('📝 Extracted text length:', extractedText.length, 'characters');
    return extractedText;
}