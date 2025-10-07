import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    cart: [],
    totalPrice: 0,
    quantity: 0,
    totalItems: 0,
};
//when clicking add to cart, the item should be added to the cart
//if the item already exists in the cart, the quantity should be increased
//if the item does not exist in the cart, it should be added to the cart
//the total and totalItems should be updated
//the quantity should be updated
//when clicking remove from cart, the item should be removed from the cart
//if the item already exists in the cart, the quantity should be decreased
const CartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;
            const existingItem = state.cart.find((i) => i._id === item._id);
            if (existingItem) {
                existingItem.quantity += 1;
                state.totalPrice += existingItem.price;
                state.totalItems += 1;
            }
            else {
                state.cart.push({ ...item, quantity: 1 });
                state.totalPrice += item.price;
                state.totalItems += 1;
                state.quantity += 1;
            }
        },
        // removefromcart:(state, action)=> {
        //     state.cart =[];
        //     state.quantity = 0;
        //     state.totalItems = 0;
        //     state.totalPrice = 0;
        // },
        increaseCart: (state, action) => {
            const item = action.payload;
            const existingItem = state.cart.find((i) => i._id === item._id);
            if (existingItem) {
                existingItem.quantity += 1;
                state.totalPrice += existingItem.price;
                state.totalItems += 1;
            }
        },
        decreaseCart: (state, action) => {
            const item = action.payload;
            const existingItem = state.cart.find((i) => i._id === item._id);
            if (existingItem && existingItem.quantity === 1) {
                state.cart = state.cart.filter((i) => i._id !== item._id);
                state.quantity -= 1;
            }
            if (existingItem) {
                existingItem.quantity -= 1;
                state.totalPrice -= existingItem.price;
                state.totalItems -= 1;
            }
        }
    }
});
export const { addToCart, increaseCart, decreaseCart } = CartSlice.actions;
export default CartSlice.reducer;
export const cartTotal = (state) => state.cart.quantity;
export const cartTotalPrice = (state) => state.cart.totalPrice;
export const cartItems = (state) => state.cart;
