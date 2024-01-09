import mongoose, { Document } from "mongoose";

export const billboardSchema = new mongoose.Schema({
  label: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  storeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Store",
  },
}, { timestamps: true });

export type BillboardDocument = Document & {
  label: string;
  imageUrl: string;
  storeId: string;
};

// Check if the model is already defined
const existingModel = mongoose.models.Billboard as mongoose.Model<BillboardDocument>;

// Ensure that the model is registered or get the existing model
const Billboard = existingModel || mongoose.model<BillboardDocument>("Billboard", billboardSchema);

export default Billboard;
