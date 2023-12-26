
import { FetchAll, Save } from "../models/product.js";

const GetAllProducts = (req, res) => {
  const products = FetchAll();
  res.send(products);
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

export { GetAllProducts, AddProduct };
