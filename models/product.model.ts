import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type:String,
        required:[true,"Requires a name"],
        min:3
    },
    price:{
        type:Number,
        required:true
    },
    images: [
        {
            url:{
                type: String,
            }
        },
    ],
    storeId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Store"
    }, 
    categoryId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Category"
    },  
    isFeatured: {
        type:Boolean,
        default:false
    },
    isArchieved: {
        type: Boolean,
        default:false
    },
},{timestamps:true});

export type ProductDocument = Document & {
    _id:string,
    name:string,
    storeId: string,
    categoryId: string,
    price: number,
    isFeatured: boolean,
    isArchieved: boolean,
}

// Check if the model is already defined
const existingModel = mongoose.models.Product as mongoose.Model<ProductDocument>;

const Product = existingModel ||  mongoose.model("Product", productSchema);

export default Product