"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    gender: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 64,
    },
    role: {
        type: String,
        enum: ['admin', 'user', 'moderator'],
        default: 'user'
    },
    refreshToken: {
        type: String,
    },
}, {
    timestamps: true,
});
userSchema.pre("save", async function (next) {
    if (!this.isModified("password"))
        return next();
    this.password = await bcrypt_1.default.hash(this.password, 10);
    next();
});
userSchema.methods.isPasswordCorrect = async function (password) {
    // @ts-ignore
    return await bcrypt_1.default.compare(password, this.password);
};
userSchema.methods.generateAccessToken = function () {
    return jsonwebtoken_1.default.sign({
        _id: this._id,
        firstName: this.firstName,
        email: this.email,
    }, 
    // @ts-ignore
    process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    });
};
userSchema.methods.generateRefreshToken = function () {
    return jsonwebtoken_1.default.sign({
        _id: this._id,
        email: this.email,
        firstName: this.firstName,
    }, 
    // @ts-ignore
    process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    });
};
exports.User = mongoose_1.default.model("User", userSchema);
