import mongoose, { Document, Schema } from "mongoose";

interface categorySchemaTypes extends Document{
    name: string;
}

const categorySchema = new Schema<categorySchemaTypes>({
    name: {
        type: String,
        required: true,
        unique: true
    }
},
{
    timestamps: true
}
)
export const Category = mongoose.model('Category',categorySchema);