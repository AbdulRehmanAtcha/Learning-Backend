import React from "react";
import { useParams } from "react-router-dom";
import { FetchingQueryById, addProductToCart } from "../../hooks/useUserData";

const Details = () => {
  const { id } = useParams();

  const onSuccess = (data) => {
    alert(data);
  };

  const {
    mutate,
    isError: useMutationError,
    error: useMutationErrorMsg,
    isLoading: mutationLoading,
  } = addProductToCart(onSuccess);

  const {
    data,
    isError: querError,
    isLoading: querLoading,
    error: queryErrorMsg,
  } = FetchingQueryById(id);

  if (querLoading || mutationLoading) {
    return <h2>Loading</h2>;
  }
  if (querError || useMutationError) {
    return <h1>{queryErrorMsg}</h1>;
  }

  const HandleMutate = (data) => {
    mutate(data);
  };

  return (
    <>
      <br />
      {data?.data.length > 0 ? (
        <>
          <h1>Product# {id}</h1>
          <table className="table table-dark table-striped">
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Product Name</th>
                <th scope="col">Product Price</th>
                <th scope="col">Add Option</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">{data?.data[0].id}</th>
                <td>{data?.data[0].productName}</td>
                <td>{data?.data[0].productPrice}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={() => HandleMutate(data?.data)}
                  >
                    Add To Cart
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </>
      ) : (
        <div
          style={{
            height: "60vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "red",
          }}
        >
          <h1>No Product Found 😞</h1>
        </div>
      )}
    </>
  );
};

export default Details;
