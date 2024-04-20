import { importData } from "./controllers/importData";
import { generateSeedData } from "./controllers/seedData";

async function main() {
  try{
    await importData();
    await generateSeedData(10);
  } 
  catch (error) {
    console.error('An error occurred:', error);
  } 
}

main();
