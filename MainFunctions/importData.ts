import mongoose from 'mongoose';
import { Brand } from '../Schema/brands-schema';
import { transform } from '../Filters/transformer';
import { readFile } from 'fs/promises';

const mongoDB = "mongodb://localhost:27017/brands_database";
const minDate = 1600;
const maxDate = new Date().getFullYear();

export async function importData() {
  try {
    await mongoose.connect(mongoDB);

    // Read the JSON file
    const jsonData = await readFile('./Collections/brandsOriginal.json', 'utf8');
    const brandsData = JSON.parse(jsonData);

    for (const brandData of brandsData) {
      const id: string = brandData._id['$oid'];
      const transformedBrandName: string = brandData.brandName ?? (brandData.brand?.name ?? "Default Name");
      const transformedYear: number = transform(brandData.yearFounded ?? brandData.yearCreated ?? brandData.yearsFounded, minDate, maxDate);
      const transformedNumberOfLocations: number = transform(brandData.numberOfLocations?? 1, 1, Number.MAX_SAFE_INTEGER);
      const transformedHQ: string = brandData.headquarters ?? brandData.hqAddress ?? "Default HQ";

      const brand = new Brand({
        _id: id,
        brandName: transformedBrandName,
        yearFounded: transformedYear,
        headquarters: transformedHQ,
        numberOfLocations: transformedNumberOfLocations
      });

      // Save the Brand instance to the database
      await brand.save();
    }

    console.log('Data is imported');
  } catch (error) {
    console.error('Error importing data:', error);
  }finally{
    mongoose.disconnect();
  }
}
