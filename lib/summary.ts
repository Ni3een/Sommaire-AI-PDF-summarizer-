import { getDBConnection } from "@/lib/db";

//acha userId isliye kyu ki user ke hi hum user ke summaries fetch kar payenge
export async function getSummaries(userId:string){
    const sql=await getDBConnection();

    const summaries=await sql`SELECT * from pdf_summaries where user_id=${userId} ORDER BY created_at DESC`;
    return  summaries;
}
export  async  function getSummaryPageById(id:string){
        try{
            const sql=await getDBConnection();
            const [summary]=await sql`SELECT
    id,
    user_id,
    title,
    original_file_url,
    summary_text,
    created_at,updated_at,
    file_name,LENGTH(summary_text)-LENGTH(REPLACE(summary_text, ' ', ''))+1 as
    word_count from pdf_summaries where id=${id}`;
    return summary;
        }catch(error){
            console.error('Error fetching summary by ID:', error);
            return null;
        }
    
}