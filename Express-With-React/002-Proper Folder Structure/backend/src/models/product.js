const registeredProducts = [];

export const NewProduct = (title, price) => {
  this.title = title;
  this.price = price;
};

export const Save = (product) => {
  registeredProducts.unshift(product);
};

export const FetchAll = () => {
  return registeredProducts;
};
