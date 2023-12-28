const cart = [];
export const SaveToCart = (product) => {
  cart.unshift(product[0]);
  console.log(cart);
};

export const SendCartItems = () => {
  return cart;
};
