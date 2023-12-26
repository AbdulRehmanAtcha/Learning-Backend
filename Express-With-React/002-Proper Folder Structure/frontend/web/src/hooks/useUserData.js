import axios from "axios";
import { useMutation, useQuery } from "react-query";
import uniqid from "uniqid";

const baseURL = "http://localhost:3000";

const FetchData = async () => {
  return await axios.get(`${baseURL}/api/v1/all-products`);
};


const AddUser = async (user) => {
  const userId = uniqid();

  return await axios.post(`${baseURL}/admin/add-product`, {
    ...user,
    id: userId,
  });
};

export const FetchingQuery = () => {
  return useQuery("products", FetchData);
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
