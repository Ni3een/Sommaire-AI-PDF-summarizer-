import Stripe from "stripe";
import { getDBConnection } from "./db";
export async function handleCheckoutSessionCompleted({session,stripe}:{
    session:Stripe.Checkout.Session
    stripe:Stripe
}){
    console.log('checkout session completed',session);
    const customer=await stripe.customers.retrieve(session.customer as string);
    console.log('customer details',customer);
    const customerId=session.customer as string;
    
    // Retrieve line items to get the priceId
    const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
    const priceId = lineItems.data[0]?.price?.id;

    const email = session.customer_details?.email || (customer as Stripe.Customer).email;
    const name = session.customer_details?.name || (customer as Stripe.Customer).name;

    if(email && priceId){
    await createOrUpdateUser({
        email:email,
        fullName:name || '',
        customerId,
        priceId,
        status:'active'
    });

    await createPayment({
        session,
        priceId:priceId,
        userEmail:email,
    })
}

}


async function createOrUpdateUser({email,fullName,customerId,priceId,status}:{email:string,fullName:string,customerId:string,priceId:string,status:string}){
    try{
        const sql=await getDBConnection();
        const user= await sql `SELECT * FROM users WHERE email = ${email}`
        if(user.length===0){
            await sql`INSERT INTO users(email,full_name,customer_id,price_id,status) VALUES (${email},${fullName},${customerId},${priceId},${status})`
        } else {
            await sql`UPDATE users SET price_id = ${priceId}, status = ${status}, customer_id = ${customerId} WHERE email = ${email}`
        }
    }
    catch(err){
        console.log('Error in createOrUpdateUser',err);
    }
}

async function createPayment({session,priceId,userEmail}:{session:Stripe.Checkout.Session, priceId:string, userEmail:string}){
    try{
        const sql=await getDBConnection();
        const {amount_total,status,id,customer_email}=session;
        await sql  `INSERT INTO payments(amount,status,stripe_payment_id,price_id,user_email) VALUES (${amount_total},${status},${id},${priceId},${userEmail})`
    }catch(err){
        console.log('Error in createPayment',err);
        }
}