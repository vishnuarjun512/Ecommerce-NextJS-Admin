import Store from "@/models/store.model";
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function PATCH(
    req:Request, 
    {params}: {params: {storeId:string}}
) {

    try {
        const {userId} = auth();
        const body = await req.json();
        const {storeName} = body;
        if(!userId){
            return new NextResponse("Unauthorized", {status:401})

        }

        if(!storeName){
            return new NextResponse("Store name is requied", {status:400})
        }

        if(!params.storeId){
            return new NextResponse("Store Id not found in Params", {status:400})
        }

        const updatedStore = await Store.findByIdAndUpdate(params.storeId,{
            storeName
        }, {new:true})
        console.log(updatedStore)

        return NextResponse.json({status:200, data:updatedStore,  message: "Store Updated"})

    } catch (error) {
        console.log("[STORE_PATCH]",error)
        return new NextResponse("Internal Error", {status:500})
    }
}

export async function DELETE(
    req:Request, 
    {params}: {params: {storeId:string}}
) {

    try {
        const {userId} = auth();
       
   
        if(!userId){
            return new NextResponse("Unauthorized", {status:401})

        }

     

        if(!params.storeId){
            return new NextResponse("Store Id not found in Params", {status:400})
        }

        const deletedStore= await Store.findByIdAndDelete(params.storeId)
        console.log(deletedStore)

        return NextResponse.json({status:200, data:deletedStore,  message: "Store Deleted"})

    } catch (error) {
        console.log("[STORE_DELETE]",error)
        return new NextResponse("Internal Error", {status:500})
    }
}