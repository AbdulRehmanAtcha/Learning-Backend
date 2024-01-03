import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FetchingQueryById, editProductData } from "../../hooks/useProductData";

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    data: [
      {
        productName: "",
        productPrice: 0,
        id: id,
        // other properties
      },
    ],
    // other properties
  });

  const HandleChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      data: [
        {
          ...prevUserData.data[0],
          [name]: value,
        },
      ],
    }));
  };

  const onSuccess = (data) => {
    if (data.message) {
      navigate("/admin-products");
    }
  };

  const {
    data,
    isError: querError,
    isLoading: querLoading,
    error: queryErrorMsg,
  } = FetchingQueryById(id);
  const {
    mutate,
    isError: mutateError,
    isLoading: mutateLoading,
    error: mutateErrorMsg,
    data: mutateData,
  } = editProductData(onSuccess);

  if (querLoading || mutateLoading) {
    return <h2>Loading</h2>;
  }
  if (querError || mutateError) {
    return <h1>{querError ? queryErrorMsg : mutateErrorMsg}</h1>;
  }
  const HandleSubmit = (e) => {
    mutate(userData);
    e.preventDefault();
  };
  return (
    <>
      {data?.data.length > 0 ? (
        <div>
          <h1>Edit Product# {id && id}</h1>
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
                placeholder={data?.data[0]?.productName}
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
                placeholder={data?.data[0]?.productPrice}
              />
            </div>
            <button
              type="submit"
              onClick={HandleSubmit}
              className="btn btn-primary"
            >
              Submit
            </button>
          </form>
        </div>
      ) : (
        navigate("/all-products")
      )}
    </>
  );
};

export default Edit;
