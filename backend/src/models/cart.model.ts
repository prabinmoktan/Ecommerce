import mongoose, { Schema } from "mongoose";

interface CartData extends Document {
  user?: Schema.Types.ObjectId;
  cart: Schema.Types.ObjectId;
  totalPrice: Number;
  quantity: Number;
  totalItems: Number;
}

const cartSchema = new Schema<CartData>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    cart: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);
export const Cart = mongoose.model("Cart", cartSchema);
