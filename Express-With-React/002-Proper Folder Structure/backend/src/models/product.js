const registeredProducts = [];
const cart = [];

export const NewProduct = (title, price) => {
  this.title = title;
  this.price = price;
};

export const Save = (product) => {
  registeredProducts.unshift(product);
};
export const SaveToCart = (product) => {
  cart.unshift(product[0]);
  console.log(cart)
};

export const FetchAll = () => {
  return registeredProducts;
};

export const SingleProduct = (id) => {
  const FetchProduct = registeredProducts.filter((item) => item.id === id);
  return FetchProduct;
};
