import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FetchingQueryById, addProductToCart } from "../../hooks/useProductData";

const Details = () => {
  const { id } = useParams();
  console.log(id);
  const navigate = useNavigate();

  const onSuccess = (data) => {
    // alert(data);
    navigate("/cart");
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

  console.log(data?.data);

  // if (querLoading || mutationLoading) {
  //   return <h2>Loading</h2>;
  // }
  // if (querError || useMutationError) {
  //   return <h1>{queryErrorMsg}</h1>;
  // }

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
                <th scope="row">{data?.data[0]._id}</th>
                <td>{data?.data[0].title}</td>
                <td>{data?.data[0].price}</td>
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
