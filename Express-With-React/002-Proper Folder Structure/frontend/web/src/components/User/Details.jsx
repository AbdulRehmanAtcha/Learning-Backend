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

  if (querLoading) {
    return <h2>Loading</h2>;
  }
  if (querError) {
    return <h1>{queryErrorMsg}</h1>;
  }

  return (
    <>
      <h1>Product# {id}</h1>
      <br />
      {data?.data.length > 0 ? (
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
                  onClick={() => mutate(data?.data[0])}
                >
                  Add To Cart
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      ) : null}
    </>
  );
};

export default Details;
