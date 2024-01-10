import { NextResponse } from "next/server"

import { auth } from "@clerk/nextjs";
import {connect} from "@/db/connection"
import Store from "@/models/store.model";
import Billboard from "@/models/billboard.model";
import Category from "@/models/category.model";

connect();
export async function POST(req:Request, {params}: {params: {storeId: string}}){
    try {
        console.log("Creating Category")
        const {userId} = auth() 
        if(!userId){
            return new NextResponse("Unauthenticated", {status:401});
        }

        const body = await req.json();
      
        const {name,billboardId} = body;

        if(!billboardId){
            return new NextResponse("Billboard Id is required", {status:400});
        }

        if(!name){
            return new NextResponse("Name is required", {status:400});
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

        const newCategory = await Category.create({
            name,
            billboardId,
            storeId: params.storeId,
        })

        return NextResponse.json(newCategory, {status:200})

    } catch (error) {
        console.log("[CATEGORY_POST_ERROR]", error)
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
            return new NextResponse("Unauthenticated", {status:401});
        }

        const allCategories = await Category.find({
            storeId: params.storeId,
        })

        return NextResponse.json(allCategories, {status:200})

    } catch (error) {
        console.log("[ALL_CATEGORIES_GET_ERROR]", error)
        return new NextResponse("Internal Error", {status:500});
    }
}