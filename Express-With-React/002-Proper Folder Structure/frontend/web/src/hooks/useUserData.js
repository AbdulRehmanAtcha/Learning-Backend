import axios from "axios";
import { useMutation, useQuery } from "react-query";
import uniqid from "uniqid";

const baseURL = "http://localhost:3000";

const FetchData = async () => {
  return await axios.get(`${baseURL}/api/v1/all-products`);
};
// /product/:id
const FetchById = async (id) => {
  return await axios.get(`${baseURL}/api/v1/product/${id}`);
};

const FetchCartItems = async () => {
  return await axios.get(`${baseURL}/api/v1/cartItems`);
};

const AddUser = async (user) => {
  const userId = uniqid();

  return await axios.post(`${baseURL}/admin/add-product`, {
    ...user,
    id: userId,
  });
};

const AddProduct = async (product) => {
  return await axios.post(`${baseURL}/api/v1/addToCart`, {
    product,
  });
};

const EditProduct = async (product) => {
  return await axios.post(`${baseURL}/admin/edit-product`, { product });
};

export const FetchingQuery = () => {
  return useQuery("products", FetchData);
};

export const FetchingQueryById = (id) => {
  return useQuery(["product", id], () => FetchById(id));
};

export const addProductsData = (onSuccess) => {
  return useMutation(AddUser, {
    onSuccess: (data) => {
      if (onSuccess) {
        onSuccess(data?.data?.message);
      }
    },
  });
};

export const editProductData = (onSuccess) => {
  return useMutation(EditProduct, {
    onSuccess: (data) => {
      if (onSuccess) {
        onSuccess(data?.data);
      }
    },
  });
};

export const FetchingQueryCartItems = () => {
  return useQuery("cartItems", FetchCartItems);
};

export const addProductToCart = (onSuccess) => {
  return useMutation(AddProduct, {
    onSuccess: (data) => {
      if (onSuccess) {
        onSuccess(data?.data?.message);
      }
    },
  });
};
