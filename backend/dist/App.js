"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
exports.app = app;
app.use((0, cors_1.default)({
    origin: [
        'http://localhost:5173',
        'http://localhost:5173/admin',
        'https://ecommerce-y8ix.onrender.com',
        'https://ecommerce-ashen-two-75.vercel.app'
    ],
    credentials: true,
}));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json({ limit: "1mb" }));
app.use(express_1.default.urlencoded({ extended: true, limit: "1mb" }));
app.use(express_1.default.static('public'));
dotenv_1.default.config();
//routes Import
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const category_route_1 = __importDefault(require("./routes/category.route"));
const product_route_1 = __importDefault(require("./routes/product.route"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const cart_route_1 = __importDefault(require("./routes/cart.route"));
//routes declaration 
app.use('/api/v1', category_route_1.default);
app.use('/api/v1', product_route_1.default);
app.use('/api/v1', user_route_1.default);
app.use('/api/v1', cart_route_1.default);
