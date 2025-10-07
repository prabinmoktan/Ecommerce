"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addToCart = void 0;
// const stripe = new Stripe(process.env.STRIPE_API_KEY);
const addToCart = async (req, res) => {
    try {
        const { cart } = req.body;
        // if (!Array.isArray(cart)) {
        //   res.status(400).json({
        //     success: false,
        //     message: " Inavalid formart  ",
        //   });
        //   return;
        // }
        if (cart.length === 0) {
            res.status(400).json({
                success: false,
                message: " cart items are empty",
            });
            return;
        }
        if (cart?.quantity === 0 || cart?.quantity < 1) {
            res.status(400).json({
                success: false,
                message: "0 quantity"
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "server error occured while adding items to product",
        });
        return;
    }
};
exports.addToCart = addToCart;
