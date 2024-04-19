import { importData } from "./MainFunctions/importData";

async function main() {
  try{
    await importData();
  } catch (error) {
    console.error('An error occurred:', error);
  } 
}

main();
