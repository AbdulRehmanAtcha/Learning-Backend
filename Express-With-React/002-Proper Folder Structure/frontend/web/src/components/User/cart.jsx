import React from "react";
import { FetchingQueryCartItems } from "../../hooks/useUserData";
import { useNavigate } from "react-router-dom";

const MyCart = () => {
  const navigate = useNavigate();
  const {
    data,
    isError: querError,
    isLoading: querLoading,
    error: queryErrorMsg,
  } = FetchingQueryCartItems();

  if (querLoading) {
    <h1>Loading...</h1>;
  }
  if (querError) {
    <h1>{queryErrorMsg}</h1>;
  }
  console.log(data?.data);
  return (
    <>
      <br />
      {data?.data.length <= 0 ? (
        <div
          style={{
            height: "60vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "red",
          }}
        >
          <h1>Please Add Products first </h1>
        </div>
      ) : (
        <>
          <h1>Your Cart</h1>
          <br />
          <br />
          <br />
          <div
            style={{
              height: "10vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "red",
            }}
          >
            <button
              type="button"
              className="btn btn-success"
              onClick={() => navigate("/all-products")}
            >
              Continue Shopping
            </button>
          </div>

          <table className="table table-dark table-striped">
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Product Name</th>
                <th scope="col">Product Price</th>
              </tr>
            </thead>
            <tbody>
              {data?.data?.map((eachItem, index) => (
                <tr key={index}>
                  <th scope="row">{eachItem?.id}</th>
                  <td>{eachItem?.productName}</td>
                  <td>{eachItem?.productPrice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </>
  );
};

export default MyCart;
