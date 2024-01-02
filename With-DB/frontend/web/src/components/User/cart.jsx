import React from "react";
import {
  DeleteCartMutation,
  FetchingQueryCartItems,
} from "../../hooks/useUserData";
import { useNavigate } from "react-router-dom";

const MyCart = () => {
  const navigate = useNavigate();
  const {
    data,
    isError: querError,
    isLoading: querLoading,
    error: queryErrorMsg,
    refetch,
  } = FetchingQueryCartItems();
  console.log(data);

  const onSuccess = () => {
    refetch();
  };

  const { mutate } = DeleteCartMutation(onSuccess);

  if (querLoading) {
    <h1>Loading...</h1>;
  }
  if (querError) {
    <h1>{queryErrorMsg}</h1>;
  }
  return (
    <>
      <br />
      {data?.data?.cart?.length <= 0 ? (
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
          <h1>Price: {data?.data?.price}</h1>
          <h1>Items: {data?.data?.items}</h1>
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

          <h1>Items in Your Cart</h1>
          <table className="table table-dark table-striped">
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Product Name</th>
                <th scope="col">Product Price</th>
                <th scope="col">Delete Product</th>
              </tr>
            </thead>
            <tbody>
              {data?.data?.cart?.map((eachItem, index) => (
                <tr key={index}>
                  <th scope="row">{eachItem?.id}</th>
                  <td>{eachItem?.productName}</td>
                  <td>{eachItem?.productPrice}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => mutate(eachItem)}
                    >
                      Delete
                    </button>
                  </td>
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
