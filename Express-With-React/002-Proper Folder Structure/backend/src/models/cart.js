const cart = [];
let price = 0;
let items = 0;
export const SaveToCart = (product) => {
  price = price + Number(product[0].productPrice);
  let fetchProduct = cart.find((item) => item.id === product[0].id);
  if (fetchProduct) {
    items = items + 1;
  } else {
    items = items + 1;
    cart.unshift(product[0]);
  }
};

export const SendCartItems = () => {
  return { cart, price, items };
};
