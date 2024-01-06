import { NextResponse } from "next/server"

import { auth } from "@clerk/nextjs";
import {connect} from "@/db/connection"
import Store from "@/models/user.model";

connect();
export async function POST(req:Request){
    try {
        const {userId} = auth()

        const body = await req.json();

        const {name} = body;
        if(!userId){
            return new NextResponse("Unauthorized", {status:401});
        }
        if(!name){
            return new NextResponse("Name is required", {status:400});
        }

        const newStore = await Store.create({
            storeName: name,
            userId
        })

        return NextResponse.json(newStore, {status:200})

    } catch (error) {
        console.log(`[STORES_POST]`,error)
        return new NextResponse("Internal Error", {status:500});
    }
}