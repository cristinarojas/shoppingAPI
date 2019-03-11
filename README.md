# shoppingProject
This project have an API with NodeJs(express framework), React library for handle components and new CSS Grid and Flex box.

# I did this followed steps to created this project from scratch:
Install node and npm in my computer, check if I have it:
```
node -v
```
```
npm -v
```
I need Express framework (provides a robust set of features for web and mobile applications) to handle the API of the shoppingProject, I installed Express:

```
npm install -g express-generator
```

I created the backend folder to save all the API files

```
express backend
```
```
cd backend
```
```
npm install
```
```
npm start
```
As the generate code inside backend folder is ES5 I converted this code to ES6, because I will use ES6 in the project.

* convert app.js to ES6 code.
* Insert new dependencies in package.json (like install nodemon to refresh the page every time we have some change in the app).

I added .gitignore file to the project: Git has been explicitly told to ignore the extensions file inside this file (like node_modules, logs).

I added .babelrc to the project because we have ES6 code and Node need to know the ES5 code, so babel is a transpiler to convert ES6 to ES5 (Any browser know ES5). (Install babel preset and babel core)

Because will not have views like a web site, this is for API I removed the views folder.

I create the Database of the project with MySQL using MySQLWorkbench tool.

I created the config folder to insert the data connection to database.

I created the models folder to handle all the data of the database.

I created the controllers/api file to handle all the REST methods (post, put, delete, get).

I tested the API in browser npm start and open http://localhost:4000/api

I tested the API with http methods:
GET (to get all the products) and GET by slug
POST (to insert a new product)
DELETE (to delete a product by slug)
PUT (to update a product by slug)
