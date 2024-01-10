import axios from "axios";
import { useMutation } from "react-query";

const baseURL = "http://localhost:3000";

const AddUserHandler = async (user) => {
  try {
    const response = await axios.post(`${baseURL}/auth/register-user`, user, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const AddUserMutation = (onSuccess) => {
  return useMutation(AddUserHandler, {
    onSuccess: (data) => {
      if (onSuccess) {
        onSuccess(data?.message);
      }
    },
  });
};
