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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Brand = void 0;
const mongoose_1 = __importStar(require("mongoose"));
// Define the schema for the Brand document
const brandSchema = new mongoose_1.Schema({
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
exports.Brand = mongoose_1.default.model('Brand', brandSchema);
