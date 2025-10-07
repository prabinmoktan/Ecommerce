"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
// Define allowed MIME types
const allowedMimeTypes = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "video/mp4",
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
const storage = multer_1.default.diskStorage({
    destination: function (req, _file, cb) {
        cb(null, "public/uploads");
    },
    filename(req, file, cb) {
        cb(null, file.originalname);
    },
});
const fileFilter = (_req, file, cb) => {
    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true); //acceptin files
    }
    else {
        console.log(new Error("Unsupported File Type"), false);
    }
};
exports.upload = (0, multer_1.default)({ storage, fileFilter });
