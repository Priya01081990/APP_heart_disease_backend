# paitent-med-backend

## clone the project:
   -make folder on your desktop
   
   -go to Folder path and write cmd (command prompt opens)
   
   -git clone the link
### open the project in editor(eg: Visual Studio Code)
   
### create env file:
-make a file outside of src (.env)

- copy this and paste in .env file
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/patient-med?schema=public"
PORT=3005
SECRET_KEY=sdljvnsv
SWAGGER_UNAME=your name
SWAGGER_PASSWORD=your password

### install some packages in terminal:
-first do **npm i** after cloning the project

I have mentioned some properties under the scripts object in package.json all have different tasks

-**dev**: npm run dev (to start the project under 3005 port, 3005 is mentiioned in .env)

-**run:migrations**: npm run run:migrations (to run available migrations)

-**db:generate**: npm run db:generate {name of the  migration you want give} (after changing the models in schema.prisma file you need to run this command in terminal then the changes in model will reflect in the db)

-**generate**: npm run generate (to generate the prisma)

-**format**: npm run format (to fix the writing format in schema.prisma file)
-npm prisma migration dev


http://localhost:3005/patient-med-docs (swagger documentation/ uname and password are given in the .env)

### install seeders for the first time:
-npm run moduleSeeder

-npm run attributeSeeder

-npm run dynamicAttributeSeeder

### run the project:
-npm run dev

### paitent-med-database:
  -install pgAdmin4 and configure
  
  -configure project
  
