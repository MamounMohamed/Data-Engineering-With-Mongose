import { importData } from "./MainFunctions/importData";
import { generateSeedData } from "./MainFunctions/seedData";

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
