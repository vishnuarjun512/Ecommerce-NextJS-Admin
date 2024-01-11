import { NextResponse } from "next/server"

import { auth } from "@clerk/nextjs";
import {connect} from "@/db/connection"
import Store from "@/models/store.model";
import Category from "@/models/category.model";
import Product from "@/models/product.model";

connect();
export async function POST(req:Request, {params}: {params: {storeId: string}}){
    try { 
        const {userId} = auth();

        if(!userId){
            return new NextResponse("Unauthenticated", {status:401});
        }
        const body = await req.json();
  
        const {name,images, isFeatured, isArchieved,price, categoryId} = body;

        if(!images){
            return new NextResponse("Images is required", {status:400});
        }

        if(!name){     
            return new NextResponse("Name is required", {status:400});
        }

        if(!categoryId){     
            return new NextResponse("categoryId is required", {status:400});
        }

        const categoryById = await Category.findById(categoryId)

        if(!categoryById){  
            return new NextResponse("No Such Category", {status:401});
        }

        if(!params.storeId){
            return new NextResponse("Params Store Id is required", {status:400});
        }

        const storeById = await Store.findOne({
            _id: params.storeId,
            userId
        })

        if(!storeById){
            return new NextResponse("Unauthorized", {status:401});
        }

        const newProduct = await Product.create({
            name,
            storeId: params.storeId,
            categoryId,
            images,
            price,
            isFeatured,
            isArchieved,
        })

        return NextResponse.json(newProduct, {status:200})

    } catch (error) {
        console.log("[PRODUCTS_POST_ERROR]", error)
        return new NextResponse("Internal Error", {status:500});
    }
}

export async function GET(req:Request, {params}: {params: {storeId: string}}){
    try {
        if(!params.storeId){
            return new NextResponse("Params Store Id is required", {status:400});
        }

        const storeById = await Store.findOne({
            _id: params.storeId,
        })

        if(!storeById){
            return new NextResponse("Unauthorized", {status:401});
        }

        const allProducts = await Product.find({
            storeId: params.storeId,
        })

        return NextResponse.json(allProducts, {status:200})

    } catch (error) {
        console.log("[ALL_PRODUCTS_GET_ERROR]", error)
        return new NextResponse("Internal Error", {status:500});
    }
}