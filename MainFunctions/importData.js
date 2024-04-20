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
exports.importData = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const brands_schema_1 = require("../Schema/brands-schema");
const transformer_1 = require("../Filters/transformer");
const promises_1 = require("fs/promises");
const mongoDB = "mongodb://localhost:27017/brands_database";
const minDate = 1600;
const maxDate = new Date().getFullYear();
function importData() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        try {
            // Connect to MongoDB
            yield mongoose_1.default.connect(mongoDB);
            // Read the JSON file
            const jsonData = yield (0, promises_1.readFile)('./Collections/brandsOriginal.json', 'utf8');
            const brandsData = JSON.parse(jsonData);
            for (const brandData of brandsData) {
                const id = brandData._id['$oid'];
                const existingBrand = yield brands_schema_1.Brand.findById(id);
                if (existingBrand) {
                    console.log(`Document with ID ${id} already exists`);
                    continue;
                }
                const transformedBrandName = (_a = brandData.brandName) !== null && _a !== void 0 ? _a : ((_c = (_b = brandData.brand) === null || _b === void 0 ? void 0 : _b.name) !== null && _c !== void 0 ? _c : "Default Name");
                const transformedYear = (0, transformer_1.transform)((_e = (_d = brandData.yearFounded) !== null && _d !== void 0 ? _d : brandData.yearCreated) !== null && _e !== void 0 ? _e : brandData.yearsFounded, minDate, maxDate);
                const transformedNumberOfLocations = (0, transformer_1.transform)((_f = brandData.numberOfLocations) !== null && _f !== void 0 ? _f : 1, 1, Number.MAX_SAFE_INTEGER);
                const transformedHQ = (_h = (_g = brandData.headquarters) !== null && _g !== void 0 ? _g : brandData.hqAddress) !== null && _h !== void 0 ? _h : "Default HQ";
                const brand = new brands_schema_1.Brand({
                    _id: id,
                    brandName: transformedBrandName,
                    yearFounded: transformedYear,
                    headquarters: transformedHQ,
                    numberOfLocations: transformedNumberOfLocations
                });
                // Save the Brand instance to the database
                yield brand.save();
            }
            console.log('Data is imported');
        }
        catch (error) {
            console.error('Error importing data:', error);
        }
        finally {
            // Disconnect from MongoDB
            yield mongoose_1.default.disconnect();
        }
    });
}
exports.importData = importData;
