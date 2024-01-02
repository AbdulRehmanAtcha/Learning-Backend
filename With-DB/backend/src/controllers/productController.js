import { DeleteCartItem, SaveToCart, SendCartItems } from "../models/cart.js";
import {
  DeleteProductHandler,
  EditProductHandler,
  FetchAll,
  Save,
  SingleProduct,
} from "../models/product.js";

const GetAllProducts = async(req, res) => {
  const products = await FetchAll();
  res.json({ result: products });
};

const GetById = (req, res) => {
  const prodId = req.params.id;
  const result = SingleProduct(prodId);
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
  try {
    SaveToCart(body.product);
    res.json({ message: "Product Added To Cart" });
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
    res.send(result);
  } catch (err) {
    res.json({ message: "Internal Server Error" });
  }
};

const EditProductController = (req, res) => {
  const body = req.body;
  try {
    const result = EditProductHandler(body);
    if (result === "Edited") {
      res.status(200).json({ message: "Product Edited Successfully" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const DeleteProductController = (req, res) => {
  const body = req.body;
  try {
    const result = DeleteProductHandler(body);
    if (result === "No Product Found") {
      res.json({ message: result });
      return;
    } else {
      res.send(result);
    }
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
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
