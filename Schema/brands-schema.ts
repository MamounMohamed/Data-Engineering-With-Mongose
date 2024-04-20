import mongoose, { Document, Schema } from 'mongoose';

// Define the interface for the Brand document
export interface BrandDocument extends Document {
    brandName: string;
    yearFounded: number;
    headquarters: string;
    numberOfLocations: number;
}

// Define the schema for the Brand document
const brandSchema = new Schema<BrandDocument>({
    brandName: {
        type: String,
        required: [true, 'Brand name is required'],
        trim: true,
    },
    yearFounded: {
        type: Number,
        required: [true, 'Year founded is required'],
        min: [1600, 'Year founded seems too old'],
        max: [new Date().getFullYear(), 'Year founded cannot be in the future'],
    },
    headquarters: {
        type: String,
        required: [true, 'Headquarters location is required'],
        trim: true,
    },
    numberOfLocations: {
        type: Number,
        required: [true, 'Number of locations is required'],
        min: [1, 'There should be at least one location'],
    },
}, {
    timestamps: true,
});

// Define and export the Brand model
export const Brand = mongoose.model<BrandDocument>('Brand', brandSchema);
