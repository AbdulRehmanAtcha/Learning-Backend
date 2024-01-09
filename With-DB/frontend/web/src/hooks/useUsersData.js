import axios from "axios";
import { useMutation } from "react-query";

const baseURL = "http://localhost:3000";

const AddUserHandler = async (user) => {
  return await axios.post(`${baseURL}/auth/register-user`, user);
};

export const AddUserMutation = (onSuccess) => {
  return useMutation(AddUserHandler, {
    onSuccess: (data) => {
      if (onSuccess) {
        onSuccess(data?.data.message)
      }
    },
  });
};
