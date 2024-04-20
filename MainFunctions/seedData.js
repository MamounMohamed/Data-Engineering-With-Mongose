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
exports.generateSeedData = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const brands_schema_1 = require("../Schema/brands-schema");
const faker_1 = require("@faker-js/faker");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const mongoDB = process.env.MONGODB_URI || "mongodb://localhost:27017/brands_database";
const maxDate = new Date().getFullYear();
function getRandomNumber(min, max) {
    const random = Math.random();
    return Math.floor(random * (max - min + 1)) + min;
}
function generateSeedData(count) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Connect to MongoDB
            yield mongoose_1.default.connect(mongoDB);
            // Generate seed data and save to database
            for (let i = 0; i < count; i++) {
                const brand = new brands_schema_1.Brand({
                    brandName: faker_1.faker.commerce.productName(),
                    yearFounded: getRandomNumber(1600, maxDate),
                    headquarters: faker_1.faker.location.city(),
                    numberOfLocations: getRandomNumber(1, 10000),
                });
                yield brand.save();
            }
            console.log("Seed data inserted successfully");
            // Disconnect from MongoDB
            yield mongoose_1.default.disconnect();
        }
        catch (error) {
            console.error("Error connecting to MongoDB:", error);
        }
    });
}
exports.generateSeedData = generateSeedData;
