import Store from "@/models/store.model";
import Billboard from "@/models/billboard.model";
import Category from "@/models/category.model";

import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"
import Product from "@/models/product.model";

export async function GET(req:Request, {params}: {params: {storeId: string, productId:string}}){
    try {
        if(!params.productId){
            return new NextResponse("Product Id not found in Params", {status:400})
        }        
    
        const product = await Product.findOne({
            _id:params.productId,
            storeId: params.storeId,
        })
        return NextResponse.json(product, {status:200})

    } catch (error) {
        console.log("[PRODUCT_GET_ERROR]", error)
        return new NextResponse("Internal Error", {status:500});
    }
}

export async function PATCH(
    req:Request, 
    {params}: {params: {storeId:string, productId:string}}
) {
    try {
        const {userId} = auth();
        const body = await req.json();
        const {name,images, isFeatured, isArchieved,price, categoryId} = body;

        if(!userId){
            return new NextResponse("Unauthorized", {status:401})
        }
        if(!name){
            return new NextResponse("Name is requied", {status:400})
        }
        if(!categoryId){
            return new NextResponse("categoryId is requied", {status:400})
        }
        if(!params.storeId){
            return new NextResponse("Store Id not found in Params", {status:400})
        }
        if(!params.productId){
            return new NextResponse("Billboard Id not found in Params", {status:400})
        }

        const updatedProduct = await Product.findByIdAndUpdate(params.productId,{
            name, images, isFeatured, isArchieved, price, categoryId,
        }, {new:true})
       

        return NextResponse.json({status:200, data:updatedProduct,  message: "Product Updated"})

    } catch (error) {
        console.log("[PRODUCT_PATCH]",error)
        return new NextResponse("Internal Error", {status:500})
    }
}

export async function DELETE(
    req:Request, 
    {params}: {params: {storeId:string, productId:string}}
) {
    try {
    
        const {userId} = auth(); 
        if(!userId){
            return new NextResponse("Unauthorized", {status:401})
        }

        if(!params.storeId){
            return new NextResponse("Store Id not found in Params", {status:400})
        }

        if(!params.productId){
            return new NextResponse("Category not found in Params", {status:400})
        }

        const deletedProduct= await Product.findByIdAndDelete(params.productId)
     

        return NextResponse.json({status:200, data:deletedProduct,  message: "Category Deleted"})

    } catch (error) {
        console.log("[PRODUCT_DELETE]",error)
        return new NextResponse("Internal Error", {status:500})
    }
}