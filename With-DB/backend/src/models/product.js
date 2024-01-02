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
