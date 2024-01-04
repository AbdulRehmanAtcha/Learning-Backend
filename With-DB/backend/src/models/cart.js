let cart = [];
let price = 0;
let items = 0;
export const SaveToCart = (product) => {
  const newCartProduct = {
    _id: product["0"]._id,
    name: product["0"].title,
    price: product["0"].price,
    quantity: product.quantity,
  };
  price = price + newCartProduct.price;
  const FindProduct = cart.findIndex((item) => item._id === newCartProduct._id);
  if (FindProduct !== -1) {
    items++;
    cart[FindProduct].quantity += 1;
    return { message: "Product Addded", cart, items, price };
  } else {
    cart.unshift(newCartProduct);
    items++;
    return { message: "Product Addded", cart, items, price };
  }
};

export const SendCartItems = () => {
  return { cart, price, items };
};

export const DeleteCartItem = (product) => {
  const FindProduct = cart.findIndex((item) => item._id === product._id);
  if (FindProduct !== -1) {
    if (cart[FindProduct]?.quantity === 1) {
      price = price - cart[FindProduct].price;
      items--;
      cart.splice(FindProduct, 1);
      return cart;
    } else {
      price = price - cart[FindProduct].price;
      items--;
      cart[FindProduct].quantity = cart[FindProduct].quantity - 1;
      return cart;
    }
  } else {
    return "Can't Delete";
  }
};

