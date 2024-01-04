import { DeleteCartItem, SaveToCart, SendCartItems } from "../models/cart.js";
import {
  DeleteProductHandler,
  EditProductHandler,
  FetchAll,
  Save,
  SingleProduct,
} from "../models/product.js";

const GetAllProducts = async (req, res) => {
  const products = await FetchAll();
  res.json({ result: products });
};

const GetById = async (req, res) => {
  const prodId = req.params.id;
  const result = await SingleProduct(prodId);
  res.send(result);
};

const AddProduct = (req, res) => {
  const body = req.body;
  try {
    Save(body);
    res.json({ message: "Data received successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const AddProductCart = (req, res) => {
  const body = req.body;
  const result = SaveToCart(body);
  try {
    if (result) {
      res.status(200).json(result);
    } else {
      res.json({ message: "Not Added" });
    }
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const GettingCartItems = (req, res) => {
  try {
    const result = SendCartItems();
    res.send(result);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const DeleteCartItemController = (req, res) => {
  const body = req.body;
  const result = DeleteCartItem(body);
  try {
    res.json({ result, message: "Product Deleted" });
  } catch (err) {
    res.json({ message: "Internal Server Error" });
  }
};

const EditProductController = async (req, res) => {
  const body = req.body;
  const result = await EditProductHandler(body);
  if (result === 1) {
    res.status(200).json({ message: "Product Edited Successfully" });
    return;
  } else if (result < 0) {
    res.status(200).json({ message: "No product found" });
  } else {
    res.status(500).json({ error: "Internal Server Error" });
  }
  // try {
  //   if (result === "Edited") {
  //   }
  // } catch (error) {
  // }
};

const DeleteProductController = async (req, res) => {
  const body = req.body;
  const result = await DeleteProductHandler(body);
  if (result === 1) {
    res.status(200).json({ message: "Product Deleted Successfully" });
  } else if (result === 0) {
    res.status(200).json({ message: "No Product Found" });
  } else {
    res.status(500).json({ error: "Internal Server Error" });
  }
  // try {
  //   if (result === "No Product Found") {
  //     res.json({ message: result });
  //     return;
  //   } else {
  //     res.send(result);
  //   }
  // } catch (err) {
  //   res.status(500).json({ message: "Internal Server Error" });
  // }
};

export {
  GetAllProducts,
  AddProduct,
  GetById,
  AddProductCart,
  GettingCartItems,
  EditProductController,
  DeleteProductController,
  DeleteCartItemController,
};
