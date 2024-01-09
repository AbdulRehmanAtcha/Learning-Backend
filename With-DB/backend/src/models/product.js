import mongoose from "mongoose";
import DBConnectionHandler from "../DB/database.js";

const registeredProducts = [];

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: String, required: true },
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
  } catch (error) {
    console.error("Error saving product:", error);
  }
};

export const FetchAll = async () => {
  try {
    const gettinAllProductsQuery = productModel.find();
    const gettinAllProducts = await gettinAllProductsQuery.exec();
    return gettinAllProducts;
  } catch (err) {
    console.log("Fetching All products Error in user", err);
  }
};

export const SingleProduct = async (id) => {
  // const FetchProduct = registeredProducts.filter((item) => item.id === id);
  // return FetchProduct;
  try {
    const gettingEachProductQuery = productModel.find({ _id: id });
    const gettingEachProduct = await gettingEachProductQuery.exec();
    return gettingEachProduct;
  } catch (error) {
    console.log(error);
  }
};

export const EditProductHandler = async (product) => {
  const prodId = product.product.data[0].id;
  const prodName = product.product.data[0].productName;
  const prodPrice = product.product.data[0].productPrice;
  try {
    const updateProduct = await productModel.updateOne(
      { _id: prodId },
      { $set: { title: prodName, price: prodPrice } }
    );
    if (updateProduct.modifiedCount > 0) {
      return 1;
    } else {
      return 0;
    }
  } catch (error) {
    console.log(error);
  }
  // for (var i = 0; i < registeredProducts.length; i++) {
  //   if (registeredProducts[i].id === product.product.data[0].id) {
  //     registeredProducts[i].productName = product.product.data[0].productName;
  //     registeredProducts[i].productPrice = product.product.data[0].productPrice;
  //     return "Edited";
  //   }
  // }
};

export const DeleteProductHandler = async (product) => {
  try {
    const DeleteProduct = await productModel.deleteOne({ _id: product._id });
    if (DeleteProduct.deletedCount === 1) {
      return 1;
    } else {
      return 0;
    }
  } catch (err) {
    console.log(err);
  }
  // const filteringData = registeredProducts.findIndex(
  //   (item) => item.id === product.id
  // );
  // if (filteringData === -1) {
  //   return "No Product Found";
  // } else {
  //   registeredProducts.splice(filteringData, 1);
  //   return registeredProducts;
  // }
};
