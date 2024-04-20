import mongoose from 'mongoose';
import { Brand } from '../models/brands-schema';
import { faker } from '@faker-js/faker';
import dotenv from 'dotenv';

dotenv.config();

const mongoDB = process.env.MONGODB_URI || "mongodb://localhost:27017/Mamoun_brands_database";
const maxDate = new Date().getFullYear();

function getRandomNumber(min: number, max: number): number {
    const random = Math.random();
    return Math.floor(random * (max - min + 1)) + min;
}

export async function generateSeedData(count: number): Promise<void> {
    try {
        // Connect to MongoDB
        await mongoose.connect(mongoDB);

        // Generate seed data and save to database
        for (let i = 0; i < count; i++) {
            const brand = new Brand({
                brandName: faker.commerce.productName(),
                yearFounded: getRandomNumber(1600, maxDate),
                headquarters: faker.location.city(),
                numberOfLocations: getRandomNumber(1, 10000),
            });
            await brand.save();
        }

        console.log("Seed data inserted successfully");

        // Disconnect from MongoDB
        await mongoose.disconnect();
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}
