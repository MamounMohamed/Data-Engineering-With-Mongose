# Data Engineering Task 

## Description

This project is a data engineering task aimed at transforming and extending a MongoDB database of restaurant brands. The task involves correcting inconsistencies and errors in the existing data, transforming it into a standardized format, and extending the dataset with new seed data.

## Project Structure

- **collections**: Contains exported MongoDB collections.
  - **brandsOriginal.json**: Original MongoDB collection data.
  - **brands_database.brands_transformation.json**: Transformed MongoDB collection data.
  - **brands_database.brands_seeded_and_transfromed.json**: Transformed and seeded MongoDB collection data.

- **transformers**: Contains transformation logic used in the project.
  - **transformer.ts**: Transforming and validating number datatypes into the schema.

- **controllers**: Contains the business logic behind the implementation.
   - **importData.ts**: Responsible for importing the data into the database following the schema rules and apply transformations.
   - **seedData.ts**: Responsible for seeding and generating new data following the database schema
  
- **models**: Contains database schema definitions.
  - **brands-schema.ts**: Define the brand model and brand model schema

- **index.ts** : Main application starting point
  
  ## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/MamounMohamed/Data-Engineering-With-Mongose.git

2. **Navigate to the project directory:**

   ```bash
   cd yourproject
   
3. **Install dependencies:**

   ```bash
   npm install
   
4. **Configure MongoDB connection:**
  - Update the `.env` file in the root directory of the project with your MongoDB connection string.
  -  If left without updates it will create a new database with the name Mamoun_brands_database which will work as expected.

5. **Run the project:**
   - This will Transform , import , and seed the data into the database 
   ```bash
   node index.js
   
## Dependencies

- [mongoose](https://www.npmjs.com/package/mongoose): MongoDB object modeling for Node.js.
- [faker-js](https://www.npmjs.com/package/@faker-js/faker): Generate realistic test data.
- [fs/promises](https://nodejs.org/api/fs.html#fs_promises_example): File system module for reading files using promises.


## Credits

- Author: [Mamoun Mohamed](https://github.com/MamounMohamed)
