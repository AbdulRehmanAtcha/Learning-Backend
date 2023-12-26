import { registeredProducts } from "../routes/admin.js";

const GetAllProducts = (req, res) => {
  res.send(registeredProducts);
};

const AddProduct = (req, res) => {
  const body = req.body;
  console.log(body);
  try {
    registeredProducts.push(body);
    res.json({ message: "Data received successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { GetAllProducts, AddProduct };
