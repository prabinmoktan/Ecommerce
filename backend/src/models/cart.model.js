import mongoose, { Schema } from "mongoose";
const cartSchema = new Schema({
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
}, {
    timestamps: true,
});
export const Cart = mongoose.model("Cart", cartSchema);
