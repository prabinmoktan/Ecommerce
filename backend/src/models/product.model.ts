import mongoose, { Document, Schema } from "mongoose";

interface ProductSchemaTypes extends Document {
  title: string;
  description: string;
  category: Schema.Types.ObjectId;
  price: number;
  stock: number;
  images: string[];
}

const productSchema = new Schema<ProductSchemaTypes>({
  title: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  stock: { type: Number, default: 1 },
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  images: {
    type: [String],
    required: true,
  },
  
},
{
  timestamps: true
}
);

export const Product = mongoose.model("Product", productSchema);
