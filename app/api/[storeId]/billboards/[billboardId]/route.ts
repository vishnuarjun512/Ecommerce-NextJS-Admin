import Store from "@/models/store.model";
import Billboard from "@/models/billboard.model";

import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function GET(req:Request, {params}: {params: {storeId: string, billboardId:string}}){
    try {
    
        if(!params.billboardId){
            return new NextResponse("Billboard Id not found in Params", {status:400})
        }        
    
        const billboard = await Billboard.findOne({
            _id: params.billboardId,
        })
        return NextResponse.json(billboard, {status:200})

    } catch (error) {
        console.log("[BILLBOARD_GET_ERROR]", error)
        return new NextResponse("Internal Error", {status:500});
    }
}

export async function PATCH(
    req:Request, 
    {params}: {params: {storeId:string, billboardId:string}}
) {
    try {
        const {userId} = auth();
        const body = await req.json();
        const {label, imageUrl} = body;
        if(!userId){
            return new NextResponse("Unauthorized", {status:401})
        }
        if(!label){
            return new NextResponse("Label is requied", {status:400})
        }
        if(!imageUrl){
            return new NextResponse("Image URL is requied", {status:400})
        }
        if(!params.storeId){
            return new NextResponse("Store Id not found in Params", {status:400})
        }
        if(!params.billboardId){
            return new NextResponse("Billboard Id not found in Params", {status:400})
        }

        const updatedBillboard = await Billboard.findByIdAndUpdate(params.billboardId,{
            label, imageUrl
        }, {new:true})
        console.log(updatedBillboard)

        return NextResponse.json({status:200, data:updatedBillboard,  message: "Store Updated"})

    } catch (error) {
        console.log("[BILLBOARD_PATCH]",error)
        return new NextResponse("Internal Error", {status:500})
    }
}

export async function DELETE(
    req:Request, 
    {params}: {params: {storeId:string, billboardId:string}}
) {

    try {
        const {userId} = auth(); 
        if(!userId){
            return new NextResponse("Unauthorized", {status:401})
        }

        if(!params.storeId){
            return new NextResponse("Store Id not found in Params", {status:400})
        }

        if(!params.billboardId){
            return new NextResponse("Billboard Id not found in Params", {status:400})
        }

        const deletedBillboard= await Billboard.findByIdAndDelete(params.billboardId)
       

        return NextResponse.json({status:200, data:deletedBillboard,  message: "Billboard Deleted"})

    } catch (error) {
        console.log("[STORE_DELETE]",error)
        return new NextResponse("Internal Error", {status:500})
    }
}