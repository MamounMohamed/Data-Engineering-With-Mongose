import {transform} from "./Filters/transformer";
import mongoose from 'mongoose';
import {Brand} from './Schema/brands-schema';
const fs = require('fs/promises');;

const mongoDB = "mongodb://localhost:27017/brands_database";

const minDate  = 1600 , maxDate = new Date().getFullYear();

async function importData() {
  try {
    // Connect to MongoDB
    await mongoose.connect(mongoDB);

    const jsonData = await fs.readFile('./Collections/brandsOriginal.json','utf8');
    const brandsData = JSON.parse(jsonData);

    for (const brandData of brandsData) {

      const id:string = brandData._id['$oid'];
      
      var transformedBrandName:string;
      if(brandData.brandName == null && brandData.brand.name != null ){
        transformedBrandName = brandData.brand.name;
      }else if(brandData.brandName != null){
        transformedBrandName = brandData.brandName;
      }else{
        transformedBrandName = "Default Name";
      }

      var transformedYear :number ;
      if(brandData.yearFounded != null){
        transformedYear = transform(brandData.yearFounded , minDate , maxDate);
      }else if(brandData.yearCreated!=null){
        transformedYear = transform(brandData.yearCreated , minDate , maxDate);
      }else if (brandData.yearsFounded != null){
        transformedYear = transform(brandData.yearsFounded , minDate , maxDate);
      }else{
        transformedYear = minDate;
      }
      var transformedNumberOfLocations : number = 1 ;
      if(brandData.numberOfLocations !=null)
        transformedNumberOfLocations = transform(brandData.numberOfLocations , 1 , Number.MAX_SAFE_INTEGER);
      

      var transformedHQ :string;
      if(brandData.headquarters == null && brandData.hqAddress!= null )
        transformedHQ = brandData.hqAddress;
      else if (brandData.headquarters != null)
        transformedHQ = brandData.headquarters;
      else 
        transformedHQ = "Default HQ";

      const brand = new Brand({
        _id : id,
        brandName: transformedBrandName,
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

importData();
