import { NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { connect } from "@/db/connection";
import Product from "@/models/product.model";
import mongoose from "mongoose";
import Order from "@/models/order.model";
import OrderItem, { OrderItemDocument } from "@/models/orderItem.model";

connect();

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,DELETE,PUT,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS(req: Request, { params }: { params: { storeId: string } }) {
  try {
    // Set CORS headers for OPTIONS request
    return new NextResponse(null, {
      status: 200,
      headers: corsHeaders,
    });
  } catch (error) {
    console.log("[OPTIONS-ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function POST(req: Request, { params }: { params: { storeId: string } }) {
  try {
    const body = await req.json();
    const { productIds } = body;

    if (!productIds || productIds.length === 0) {
      return new NextResponse("Product IDS are required", { status: 400 });
    }

    const formattedIds = productIds.map((id: string | number | mongoose.mongo.BSON.ObjectId | Uint8Array | mongoose.mongo.BSON.ObjectIdLike | undefined) => new mongoose.Types.ObjectId(id));

    const products = await Product.find({
      _id: {
        $in: formattedIds,
      },
    });

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
    const orderItems: OrderItemDocument[] = [];

    products.forEach((p) => {
      line_items.push({
        quantity: 1,
        price_data: {
          currency: "INR",
          product_data: {
            name: p.name,
          },
          unit_amount: Number(p.price) * 100,
        },
      });

      orderItems.push(new OrderItem({
        orderId: new mongoose.Types.ObjectId(),
        productId: p._id,
      }));
    });

    const createdOrderItems = await OrderItem.insertMany(orderItems);

    const order = await Order.create({
      storeId: params.storeId,
      isPaid: false,
      orderItems: createdOrderItems.map((item) => item._id),
    });

    await OrderItem.updateMany(
      { _id: { $in: createdOrderItems.map((item) => item._id) } },
      { orderId: order._id },
    );

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      billing_address_collection: "required",
      phone_number_collection: {
        enabled: true,
      },
      success_url: `${process.env.FRONTEND_URL}/cart?success=1`,
      cancel_url: `${process.env.FRONTEND_URL}/cart?cancel=1`,
      metadata: {
        orderId: order._id.toString(),
      },
    });   

    return NextResponse.json({ url: session.url }, {
      headers: corsHeaders,
    });
  } catch (error) {
    console.log("[CHECKOUT-POST-ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
