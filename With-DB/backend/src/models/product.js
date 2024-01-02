import mongoose from "mongoose";
import DBConnectionHandler from "../DB/database.js";

const registeredProducts = [];

const productSchema = new mongoose.Schema({
  title: String,
  price: Number,
});

const productModel = mongoose.model("Products", productSchema);

DBConnectionHandler();

// export const NewProduct = (title, price) => {
//   return {
//     title: title,
//     price: price,
//   };
// };

export const Save = async (product) => {
  const toAdd = {
    title: product.productName,
    price: Number(product.productPrice),
  };

  try {
    const newProduct = new productModel(toAdd);
    await newProduct.save();
    console.log("Product saved successfully!");
  } catch (error) {
    console.error("Error saving product:", error);
  }
};

export const FetchAll = async() => {
  try {
    const gettinAllProductsQuery = productModel.find();
    const gettinAllProducts = await gettinAllProductsQuery.exec()
    return gettinAllProducts;
  } catch (err) {
    console.log("Fetching All products Error in user", err);
  }
};

export const SingleProduct = (id) => {
  const FetchProduct = registeredProducts.filter((item) => item.id === id);
  return FetchProduct;
};

export const EditProductHandler = (product) => {
  for (var i = 0; i < registeredProducts.length; i++) {
    if (registeredProducts[i].id === product.product.data[0].id) {
      registeredProducts[i].productName = product.product.data[0].productName;
      registeredProducts[i].productPrice = product.product.data[0].productPrice;
      return "Edited";
    }
  }
};

export const DeleteProductHandler = (product) => {
  const filteringData = registeredProducts.findIndex(
    (item) => item.id === product.id
  );
  if (filteringData === -1) {
    return "No Product Found";
  } else {
    registeredProducts.splice(filteringData, 1);
    return registeredProducts;
  }
};
