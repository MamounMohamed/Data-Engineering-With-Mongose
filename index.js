"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const transformer_1 = require("./Filters/transformer");
const mongoose_1 = __importDefault(require("mongoose"));
const brands_schema_1 = require("./Schema/brands-schema");
const fs = require('fs/promises');
;
const mongoDB = "mongodb://localhost:27017/brands_database";
const minDate = 1600, maxDate = new Date().getFullYear();
function importData() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Connect to MongoDB
            yield mongoose_1.default.connect(mongoDB);
            const jsonData = yield fs.readFile('./Collections/brandsOriginal.json', 'utf8');
            const brandsData = JSON.parse(jsonData);
            for (const brandData of brandsData) {
                const id = brandData._id['$oid'];
                var transformedBrandName;
                if (brandData.brandName == null && brandData.brand.name != null) {
                    transformedBrandName = brandData.brand.name;
                }
                else if (brandData.brandName != null) {
                    transformedBrandName = brandData.brandName;
                }
                else {
                    transformedBrandName = "Default Name";
                }
                var transformedYear;
                if (brandData.yearFounded != null) {
                    transformedYear = (0, transformer_1.transform)(brandData.yearFounded, minDate, maxDate);
                }
                else if (brandData.yearCreated != null) {
                    transformedYear = (0, transformer_1.transform)(brandData.yearCreated, minDate, maxDate);
                }
                else if (brandData.yearsFounded != null) {
                    transformedYear = (0, transformer_1.transform)(brandData.yearsFounded, minDate, maxDate);
                }
                else {
                    transformedYear = minDate;
                }
                var transformedNumberOfLocations = 1;
                if (brandData.numberOfLocations != null)
                    transformedNumberOfLocations = (0, transformer_1.transform)(brandData.numberOfLocations, 1, Number.MAX_SAFE_INTEGER);
                var transformedHQ;
                if (brandData.headquarters == null && brandData.hqAddress != null)
                    transformedHQ = brandData.hqAddress;
                else if (brandData.headquarters != null)
                    transformedHQ = brandData.headquarters;
                else
                    transformedHQ = "Default HQ";
                const brand = new brands_schema_1.Brand({
                    _id: id,
                    brandName: transformedBrandName,
                    yearFounded: transformedYear,
                    headquarters: transformedHQ,
                    numberOfLocations: transformedNumberOfLocations
                });
                yield brand.save();
            }
            console.log('Data is imported');
        }
        catch (error) {
            console.error('Error importing data:', error);
        }
        finally {
            yield mongoose_1.default.disconnect();
        }
    });
}
importData();
