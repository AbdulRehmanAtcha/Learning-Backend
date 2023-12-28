import {
  FetchAll,
  Save,
  SaveToCart,
  SendCartItems,
  SingleProduct,
} from "../models/product.js";

const GetAllProducts = (req, res) => {
  const products = FetchAll();
  res.send(products);
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

export { GetAllProducts, AddProduct, GetById, AddProductCart,GettingCartItems };
