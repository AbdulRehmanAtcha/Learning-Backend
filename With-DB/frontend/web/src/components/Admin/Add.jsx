import React, { useState } from "react";
import { addProductsData } from "../../hooks/useProductData";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    productName: "",
    productPrice: "",
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
      productName: "",
      productPrice: "",
    });
    alert(data);
  };

  const {
    mutate,
    isError: useMutationError,
    error: useMutationErrorMsg,
    isLoading: mutationLoading,
  } = addProductsData(onSuccess);

  const HandleSubmit = (e) => {
    e.preventDefault();
    mutate(userData);
    setTimeout(() => {
      navigate("/all-products");
    }, 1200);
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
          <label htmlFor="productName" className="form-label">
            Product Name
          </label>
          <input
            type="text"
            className="form-control"
            onChange={HandleChange}
            id="productName"
            name="productName"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="productPrice" className="form-label">
            Product price
          </label>
          <input
            type="number"
            className="form-control"
            onChange={HandleChange}
            id="productPrice"
            name="productPrice"
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
