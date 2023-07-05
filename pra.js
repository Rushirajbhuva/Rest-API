const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
app.use(express.json());

const PORT = 3500;
const { MongoClient, ObjectId } = require("mongodb");

// MongoDB connection string

mongoose
  .connect("mongodb://127.0.0.1:27017/Sample", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected with Mongodb");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(bodyParser.urlencoded({ extended: false }));

//create Product

const productSchema = mongoose.Schema({
  Name: String,
  Description: String,
  Price: Number,
});
// const db = client.db('Sample');
// const collection = db.collection('products');
app.get("/getapi", (req, res) => {
  res.json({ success: true });
});

const Product = new mongoose.model("products", productSchema);

app.post("/postapi", (req, res) => {
  console.log("line-33");
  const product = Product.create(req.body);

  res.status(200).json({
    success: true,
  });
});

app.delete("/deleteapi", (req, res) => {
  //   const filter = { _id: new ObjectId("64a57199e66ac4c034580b58") };
  try {
    const product = Product.deleteMany(req.body);

    res.status(200).json({
      DeleteSuccess: true,
    });
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, () => {
  console.log(
    "server is running  on perfectely on port number p://localhost:",
    PORT
  );
});
