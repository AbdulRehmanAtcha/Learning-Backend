let cart = [];
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

export const DeleteCartItem = (product) => {
  const filter = cart.findIndex((item) => item.id === product.id);
  if (filter === -1) {
    return "No Product Found";
  } else {
    if (cart.length === 1) {
      items = 0;
      price = 0;
      cart.splice(filter, 1);
      return { cart, price, items };
    } else {
      items--;
      price = price - product.productPrice;
      cart.splice(filter, 1);
      return { cart, price, items };
    }
  }
};
