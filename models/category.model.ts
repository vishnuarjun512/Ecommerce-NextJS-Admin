import mongoose, { Document } from "mongoose";

export const categorySchema = new mongoose.Schema({
  name: {
    type: String,
  },
  storeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Store",
  },
  billboardId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Billboard",
  },
}, { timestamps: true });

export type CategoryDocument = Document & {
    name: string;
    storeId: string;
    billboardId: string;
};

// Check if the model is already defined
const existingModel = mongoose.models.Category as mongoose.Model<CategoryDocument>;
// Ensure that the model is registered or get the existing model
const Category = existingModel || mongoose.model<CategoryDocument>("Category", categorySchema);



export default Category;
