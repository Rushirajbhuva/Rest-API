const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
app.use(express.json());

const PORT = 3500;

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

//create Product POST Product OK

const productSchema = mongoose.Schema({
  Name: String,
  Description: String,
  Price: Number,
});

//Read Product OK

app.get('/get/product',async (req, res) => {
  const product = await Product.find();
  
  res.json({ success: true,
    product });
});
const Product = new mongoose.model("products", productSchema);

//POST REQUEST OK

app.post('/post/product', (req, res) => {
  const product = Product.create(req.body);

  res.status(201).json({
    success: true,
    message:"It's postted perfectly"
  });
});


//UpdateProduct Ok

app.put('/update/one/:id',async(req,res)=>{
  
 let product = await Product.findById(req.params.id);

 product = await Product.findByIdAndUpdate(req.params.id,req.body,{new:true,
          useFindAndModify:true,
            runValidators:true
})
  if(!product){
    return res.status(500).json({
      success:false,
      message:"Product not found"
    })
  }

  res.status(200).json({
    success:true,
    product
  })
  product = await Product.findByIdAndUpdate()
})

//deleteApi 

app.delete('/delete/product/:id', async (req, res) => {

  const product = await Product.findById(req.params.id);

  // if(!product){
  //   return res.status(500).json({
  //     success:true,
  //     message:"Product not faound"
  //   })
  // }
    await product.remove();

    res.status(200).json({
      success:true,
      message:"Product is deleted successfully"
   })
});
    //try {
    //const product = Product.deleteMany(req.body);

    //res.status(200).json({
      //DeleteSuccess: true,
   // });
  //} catch (error) {
  //  console.log(error);
 // }
//});

app.listen(PORT, () => {
  console.log(
    "server is running  on perfectely on port number p://localhost:",
    PORT
  );
});
