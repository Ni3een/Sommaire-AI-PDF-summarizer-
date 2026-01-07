import {getDBConnection} from "@/lib/db";

const BASIC_UPLOAD_LIMIT = 7;

export async function getUserPlan(email:string){
    const sql=await getDBConnection();
    const query=await sql`SELECT price_id from users WHERE email=${email} AND status='active'`;

    return query[0]?.price_id || null;
}

export async function getUserUploadCount(userId: string) {
    const sql = await getDBConnection();
    const result = await sql`SELECT COUNT(*) as count FROM pdf_summaries WHERE user_id = ${userId}`;
    return parseInt(result[0]?.count || '0', 10);
}

export async function hasReachedUploadLimit(userId: string) {
    const sql = await getDBConnection();
    
    // Get user's upload count
    const uploadCount = await getUserUploadCount(userId);
    
    // Check if user has pro plan
    const userResult = await sql`
        SELECT u.price_id, u.status 
        FROM users u 
        WHERE u.customer_id = ${userId} OR u.email = (
            SELECT email FROM users WHERE customer_id = ${userId}
        )
        AND u.status = 'active'
    `;
    
    const priceId = userResult[0]?.price_id;
    const isPro = priceId && priceId.includes('pro');
    
    // Pro users have no limit
    if (isPro) {
        return { 
            hasReachedLimit: false, 
            uploadCount, 
            uploadLimit: Infinity,
            isPro: true 
        };
    }
    
    // Basic users have a limit of 5 uploads
    const hasReachedLimit = uploadCount >= BASIC_UPLOAD_LIMIT;
    
    return { 
        hasReachedLimit, 
        uploadCount, 
        uploadLimit: BASIC_UPLOAD_LIMIT,
        isPro: false 
    };
}