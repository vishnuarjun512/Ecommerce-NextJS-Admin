import { NextResponse } from "next/server"

import { auth } from "@clerk/nextjs";
import {connect} from "@/db/connection"
import Store from "@/models/user.model";
import Billboard from "@/models/billboard.model";

connect();
export async function POST(req:Request, {params}: {params: {storeId: string}}){
    try {
        const {userId} = auth()

        const body = await req.json();

        const {label, imageUrl} = body;
        if(!userId){
            return new NextResponse("Unauthenticated", {status:401});
        }
        if(!label){
            return new NextResponse("Label is required", {status:400});
        }

        if(!imageUrl){
            return new NextResponse("Image URL is required", {status:400});
        }
        if(!params.storeId){
            return new NextResponse("Params Store Id is required", {status:400});
        }

        const storeById = await Store.findOne({
            _id: params.storeId,
            userId
        })

        if(!storeById){
            return new NextResponse("Unauthenticated", {status:401});
        }

        const newBillboard = await Billboard.create({
            label,
            imageUrl,
            storeId: params.storeId,
        })

        return NextResponse.json(newBillboard, {status:200})

    } catch (error) {
        console.log("[BILLBOARD_POST_ERROR]", error)
        return new NextResponse("Internal Error", {status:500});
    }
}

export async function GET(req:Request, {params}: {params: {storeId: string}}){
    try {
        const {userId} = auth()
        if(!userId){
            return new NextResponse("Unauthenticated", {status:401});
        }
        if(!params.storeId){
            return new NextResponse("Params Store Id is required", {status:400});
        }

        const storeById = await Store.findOne({
            _id: params.storeId,
            userId
        })

        if(!storeById){
            return new NextResponse("Unauthenticated", {status:401});
        }

        const allBillboards = await Billboard.find({
            storeId: params.storeId,
        })

        return NextResponse.json(allBillboards, {status:200})

    } catch (error) {
        console.log("[ALL_BILLBOARD_GET_ERROR]", error)
        return new NextResponse("Internal Error", {status:500});
    }
}