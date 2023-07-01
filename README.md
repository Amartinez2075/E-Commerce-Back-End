# E-commerce Back End Starter Code

## Description 
A mysql database and application backend for an e-commerce site. 
Built using MySQL2, Express, Sequelize and dotenv.

## User Story 

AS A manager at an internet retail company
I WANT a back end for my e-commerce website that uses the latest technologies
SO THAT my company can compete with other e-commerce companies

## Acceptance Criteria

GIVEN a functional Express.js API
WHEN I add my database name, MySQL username, and MySQL password to an environment variable file
THEN I am able to connect to a database using Sequelize
WHEN I enter schema and seed commands
THEN a development database is created and is seeded with test data
WHEN I enter the command to invoke the application
THEN my server is started and the Sequelize models are synced to the MySQL database
WHEN I open API GET routes in Insomnia Core for categories, products, or tags
THEN the data for each of these routes is displayed in a formatted JSON
WHEN I test API POST, PUT, and DELETE routes in Insomnia Core
THEN I am able to successfully create, update, and delete data in my database

## Technologies 

1. MySQL12
2. Express
3. Sequelize 
4. Dotnev 
5. Javascript 

## Table of Contents

-[Description](#description)
-[User Story](#User-Story)
-[Acceptance Criteria](#Acceptance-Criteria) 
-[Technologies](#technologies) 
-[Table of Contents](#table-of-contents) 
-[Installation](#installation)
-[Usage](#usage)
-[Routes](#routes)

## Installation  
  
`npm init`

`npm install mysql2`

`npm install sequelize`

`npm install dotenv`
  
## Usage
  
Run the following command at the root of your project and answer the prompted questions:

`mysql -u root -p`

Enter PW when prompted

`source db/schema.sql`

`quit`

`npm run seed`
  
`npm start`

## Routes 

1. Get Category Routes| `localhost:3001/api/categories` -works
2. Get Category BY ID | `localhost:3001/api/categories/1` -works 
3. Put Update Category | `localhost:3001/api/categories/3` -works
4. Del Delete Category | `localhost:3001/api/categories/3` -works
5. Post Create Category|`localhost:3001/api/categories/` -works

1. Get Product Routes| `localhost:3001/api/products` -works
2. Get Product BY ID | `localhost:3001/api/products/3`-works
3. Put Update Product | `localhost:3001/api/products/1` -Kinda Works
4. Del Delete Product | `localhost:3001/api/products/5` -works 
5. Post Create Product |`localhost:3001/api/products/` -Sequelize validation error

1. Get Tag Routes| `localhost:3001/api/tags`-works
2. Get Tag BY ID | `localhost:3001/api/tags/2`-works
3. Put Update Tag | `localhost:3001/api/tags/1`-works
4. Del Delete Tag | `localhost:3001/api/tags/4` -works
5. Post Create Tag | `localhost:3001/api/tags/` -works