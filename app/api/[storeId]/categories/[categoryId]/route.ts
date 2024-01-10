import Store from "@/models/store.model";
import Billboard from "@/models/billboard.model";
import Category from "@/models/category.model";

import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function GET(req:Request, {params}: {params: {storeId: string, categoryId:string}}){
    try {
        if(!params.categoryId){
            return new NextResponse("Category Id not found in Params", {status:400})
        }        
    
        const category = await Category.findOne({
            _id:params.categoryId,
            storeId: params.storeId,
        })
        return NextResponse.json(category, {status:200})

    } catch (error) {
        console.log("[CATEGORY_GET_ERROR]", error)
        return new NextResponse("Internal Error", {status:500});
    }
}

export async function PATCH(
    req:Request, 
    {params}: {params: {storeId:string, categoryId:string}}
) {
    try {
        const {userId} = auth();
        const body = await req.json();
        const {name, billboardId} = body;
        if(!userId){
            return new NextResponse("Unauthorized", {status:401})
        }
        if(!name){
            return new NextResponse("Name is requied", {status:400})
        }
        if(!billboardId){
            return new NextResponse("billboardId is requied", {status:400})
        }
        if(!params.storeId){
            return new NextResponse("Store Id not found in Params", {status:400})
        }
        if(!params.categoryId){
            return new NextResponse("Billboard Id not found in Params", {status:400})
        }

        const updatedCategory = await Category.findByIdAndUpdate(params.categoryId,{
            name, billboardId
        }, {new:true})
       

        return NextResponse.json({status:200, data:updatedCategory,  message: "Category Updated"})

    } catch (error) {
        console.log("[CATEGORY_PATCH]",error)
        return new NextResponse("Internal Error", {status:500})
    }
}

export async function DELETE(
    req:Request, 
    {params}: {params: {storeId:string, categoryId:string}}
) {
    try {
    
        const {userId} = auth(); 
        if(!userId){
            return new NextResponse("Unauthorized", {status:401})
        }

        if(!params.storeId){
            return new NextResponse("Store Id not found in Params", {status:400})
        }

        if(!params.categoryId){
            return new NextResponse("Category not found in Params", {status:400})
        }

        const deletedCategory= await Category.findByIdAndDelete(params.categoryId)
     

        return NextResponse.json({status:200, data:deletedCategory,  message: "Category Deleted"})

    } catch (error) {
        console.log("[CATEGORY_DELETE]",error)
        return new NextResponse("Internal Error", {status:500})
    }
}