import React, { useState } from "react";
import { addUsersData } from "../hooks/useUserData";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
  });

  const HandleChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const onSuccess = (data) => {
    setUserData({
      name: "",
      email: "",
    });
    alert(data);
  };

  const {
    mutate,
    isError: useMutationError,
    error: useMutationErrorMsg,
    isLoading: mutationLoading,
  } = addUsersData(onSuccess);

  const HandleSubmit = (e) => {
    e.preventDefault();
    mutate(userData);
    setTimeout(() => {
      navigate("/all-users");
    }, 1500);
  };

  if (mutationLoading) {
    return <h1>Loading...</h1>;
  }
  if (useMutationError) {
    return <h1>{useMutationErrorMsg}</h1>;
  }

  return (
    <div>
      <h1>Add Product</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            onChange={HandleChange}
            id="name"
            name="name"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            name="email"
            onChange={HandleChange}
          />
        </div>
        <button onClick={HandleSubmit} className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Add;
