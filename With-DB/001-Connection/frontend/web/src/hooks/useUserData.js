import axios from "axios";
import { useMutation, useQuery } from "react-query";
import uniqid from "uniqid";

const baseURL = "http://localhost:3100";

const FetchData = async () => {
  return await axios.get(`${baseURL}/api/v1/all-users`);
};


const AddUser = async (user) => {
  const userId = uniqid();

  return await axios.post(`${baseURL}/admin/add-user`, {
    ...user,
    id: userId,
  });
};

export const FetchingQuery = () => {
  return useQuery("users", FetchData);
};

export const addUsersData = (onSuccess) => {
  return useMutation(AddUser, {
    onSuccess: (data) => {
      if (onSuccess) {
        onSuccess(data?.data?.message);
      }
    },
  });
};
