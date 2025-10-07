import { Request } from "express";
import multer from "multer";

// Define allowed MIME types
const allowedMimeTypes = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "video/mp4",
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const storage = multer.diskStorage({
  destination: function (req, _file, cb) {
    cb(null, "public/uploads");
  },
  filename(req, file, cb) {
    cb(null, file.originalname);
  },
});
const fileFilter = (
  _req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true); //acceptin files
  } else {
    console.log(new Error("Unsupported File Type"), false);
  }
};
export const upload = multer({ storage, fileFilter });

