import React, { useState } from "react";
import { AddUserMutation } from "../../hooks/useUsersData";

const Register = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const HandleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const onSuccess = (data) => {
    setUserData({
      email: "",
      password: "",
    });
  };

  const { mutate, data: mutateData } = AddUserMutation(onSuccess);

  const SubmitHandler = (e) => {
    e.preventDefault();
    mutate(userData);
  };

  return (
    <>
      <h1>Register Here</h1>
      <form onSubmit={SubmitHandler}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            onChange={HandleChange}
            value={userData.email}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            onChange={HandleChange}
            value={userData.password}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
};

export default Register;
