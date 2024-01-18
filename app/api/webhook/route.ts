import Stripe from "stripe";
import {headers} from "next/headers"

import { NextResponse } from "next/server";

import {stripe} from "@/lib/stripe"
import {connect} from "@/db/connection"
import Order, { OrderDocument } from "@/models/order.model";
import Product from "@/models/product.model";


export async function POST(req:Request) {
 try {
    const body = await req.text();
    const signature = headers().get("Stripe-Signature") as string;
    let event: Stripe.Event;

    event = stripe.webhooks.constructEvent(
        body,
        signature,
        process.env.STRIPE_SECRET_KEY!
    )

    const session = event.data.object as Stripe.Checkout.Session;
    const address = session?.customer_details?.address;


    const addressComponents = [
        address?.line1,
        address?.line2,
        address?.city,
        address?.state,
        address?.postal_code,
        address?.country,
    ]
  

    const addressString = addressComponents.filter((c) => c!=null).join(", ");

    if(event.type === "checkout.session.completed"){

        const orderId = session?.metadata?.orderId; 
                if (!orderId) {
                console.log("Order ID is missing in session metadata.");
                return NextResponse.json(null, { status: 400 });
            }

        const customerName = session.customer_details?.name;
        
        const order = await Order.findByIdAndUpdate(
            orderId
        ,{
            address:addressString,
            isPaid:true,
            name: customerName,
            phone: session?.customer_details?.phone,
        },{new:true}).populate("orderItems");

       
        const productIds = order?.orderItems.map((orderItem) => orderItem.productId)
      
        const updatedProduct = await Product.updateMany({_id: {$in:productIds}},
            {
                isArchieved:true
            },{
                new:true
            });
    }

    return NextResponse.json(null, {status:200});

 } catch (error) {
    console.log("WEBHOOK-ERROR ->", error)
    return new NextResponse("WEBHOOK-ERROR",{status:400})
 }   
}