import mongoose from 'mongoose';
import { Brand } from '../Schema/brands-schema';
import { faker } from '@faker-js/faker';

const mongoDB = "mongodb://localhost:27017/brands_database";
const maxDate = new Date().getFullYear();

function getRandomNumber(min: number, max: number): number {
    // Generate a random number between 0 and 1
    const random = Math.random();
    
    // Scale the random number to fit the specified range
    return Math.floor(random * (max - min + 1)) + min;
  }
  



// Function to generate seed data for multiple brand documents
export async function generateSeedData(count: number): Promise<void> {
  try{
    await mongoose.connect(mongoDB);
      for (let i = 0; i < count; i++) {
      const brand = new Brand({ 
      brandName : faker.commerce.productName(),
      yearFounded: getRandomNumber(1600,maxDate),
      headquarters: faker.location.city(),
      numberOfLocations: getRandomNumber(1,10000),
  });
    await brand.save();
  }
  console.log("Seed data inserted successfully");
}catch(error){
  console.log("Error Connecting to MongoDB");

}

}

  


