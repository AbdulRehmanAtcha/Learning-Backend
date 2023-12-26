const registeredProducts = [];

// export const NewProduct = (title, price) => {
//   this.title = title;
//   this.price = price;
// };

export const Save = (product) => {
  console.log(product);
  registeredProducts.push(product);
};

export const FetchAll = () => {
  return registeredProducts;
};
