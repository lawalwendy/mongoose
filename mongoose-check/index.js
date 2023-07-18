const express = require("express");
require("dotenv").config({ path: "./config/.env" });
const connectMongoDb = require("./config/connectMongoDb");
const data = require("./data");
const person = require("./models/Person");

const app = express();
Port = process.env.Port || 3000;

//Installing and setting up Mongoose
connectMongoDb();


//Create and Save a Record of a Model:

person1 = new person({
  name: "Steve",
  age: 18,
  favoriteFoods: ["Fufu", "Groundnut Soup"],
});
person1.save(function (err, data) {
  if (err) return console.error(err);
  console.log("Data inserted succussfully : ", data);
});


//Create Many Records with model.create()

(async () => {
  try {
    const result = await person.create([
      { name: "Chidima", age: 30, favoriteFoods: ["Chicken and Chips", "Bean and Plantain"] },
      { name: "David", age: 16, favoriteFoods: ["Fufu", "Snail"] },
      { name: "Flora", age: 40, favoriteFoods: ["Custard", "Susage Roll"] },
    ]);
    console.log("Multiple records added successfully");
  } catch (error) {
    console.log(error);
  }
})();


//Use model.find() to Search Your Database 

(async () => {
  try {
    const result = await person.find({ name: "Steve" });
    console.log("Result of search : ", result);
  } catch (error) {
    console.log(error);
  }
})();


//Use model.findOne() to Return a Single Matching Document from Your Database

(async () => {
  try {
    const result = await person.findOne({ name: "Amala" });
    console.log("Result of search with findone : ", result);
  } catch (error) {
    console.log(error);
  }
})();




//Perform New Updates on a Document Using model.findOneAndUpdate()

(async () => {
  try {
    const result = await person.findOneAndUpdate(
      { name: "Peter" },
      { $set: { age: 25 } },
      { new: true }
    );
    console.log("Result of findOneAndUpdate : ", result);
  } catch (error) {
    console.log(error);
  }
})();




//Chain Search Query Helpers to Narrow Search Results

(async () => {
  try {
    await person
      .find({ favoriteFoods: "Oat Meal" })
      .sort({ age: 2})
      .limit(2)
      .select({ age: false })
      .exec()
      .then((data) => console.log("The last result : ", data))
      .catch((err) => console.log(err));
  } catch (error) {
    console.log(error);
  }
})();


//Creation of a listener for the app

app.listen(Port, (err) => {
  if (err) {
    throw err;
  } else {
    console.log(`server is listening on port ${Port}`);
  }
});