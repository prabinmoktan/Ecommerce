// src/types/express/index.d.ts
import { Request } from "express";
import { File } from "multer";

declare global {
  namespace Express {
    interface Request {
      files?: {
        [fieldname: string]: File[]; // For multiple files
      };
      file?: File; // For single file upload
    }
  }
}
