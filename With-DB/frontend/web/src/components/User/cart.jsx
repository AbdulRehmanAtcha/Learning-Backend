import React from "react";
import {
  DeleteCartMutation,
  FetchingQueryCartItems,
} from "../../hooks/useProductData";
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

  const onSuccess = () => {
    refetch();
  };

  const { mutate, isLoading: mutateLoading } = DeleteCartMutation(onSuccess);

  if (querLoading || mutateLoading) {
    return <h1>Loading...</h1>;
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
            flexDirection: "column",
          }}
        >
          <h1>Your Cart Is Empty</h1>
          <button
            type="button"
            className="btn btn-success"
            onClick={() => navigate("/all-products")}
          >
            Go To Products
          </button>
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
                <th scope="col">Product Quantity</th>
                <th scope="col">Delete Product</th>
              </tr>
            </thead>
            <tbody>
              {data?.data?.cart?.map((eachItem, index) => (
                <tr key={index}>
                  <th scope="row">{eachItem?._id}</th>
                  <td>{eachItem?.name}</td>
                  <td>{eachItem?.price}</td>
                  <td>({eachItem?.quantity})</td>
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
