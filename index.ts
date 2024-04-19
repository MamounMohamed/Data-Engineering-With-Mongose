import {transform} from "./Filters/transformer";
import mongoose from 'mongoose';
import {Brand} from './Schema/brands-schema';
const fs = require('fs/promises');;

const mongoDB = "mongodb://localhost:27017/brands_database";

async function transformData() {
  try {
    // Connect to MongoDB
    await mongoose.connect(mongoDB);

    const jsonData = await fs.readFile('./Collections/brandsOriginal.json','utf8');
    const brandsData = JSON.parse(jsonData);

    for (const brandData of brandsData) {

      var transformedYear :number ;
      const minDate  = 1600 , maxDate = new Date().getFullYear();
      if(brandData.yearFounded != null){
        transformedYear = transform(brandData.yearFounded , minDate , maxDate);
      }else if(brandData.yearFounded == null && brandData.yearCreated!=null){
        transformedYear = transform(brandData.yearCreated , minDate , maxDate);
      }else{
        transformedYear = transform(brandData.yearsFounded , minDate , maxDate);
      }
      
      const transformedNumberOfLocations : number = transform(brandData.numberOfLocations , 1 , Number.MAX_SAFE_INTEGER);
      var transformedHQ :string;
      if(brandData.headquarters == null)
        transformedHQ = brandData.hqAddress;
      else 
        transformedHQ = brandData.headquarters;
      const brand = new Brand({
        brandName: brandData.brandName,
        yearFounded: transformedYear,
        headquarters: transformedHQ,
        numberOfLocations: transformedNumberOfLocations
      });
      await brand.save();
    }

    console.log('Data is imported');
  } catch (error) {
    console.error('Error importing data:', error);
  } finally {
    await mongoose.disconnect();
  }
}

transformData();
