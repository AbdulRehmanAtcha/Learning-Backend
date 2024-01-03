import React from "react";
import { FetchingQuery } from "../hooks/useProductData";
import { Link } from "react-router-dom";

const View = () => {
  const {
    data,
    isError: querError,
    isLoading: querLoading,
    error: queryErrorMsg,
  } = FetchingQuery();

  if (querError) {
    return <h1>{queryErrorMsg?.message}</h1>;
  }
  if (querLoading) {
    return <h1>Loadingg....</h1>;
  }

  return (
    <>
      <br />
      {data?.data?.result.length <= 0 ? (
        <div
          style={{
            height: "60vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "red",
          }}
        >
          <h1>No Products 😞</h1>
        </div>
      ) : (
        <>
          <h1>All Products</h1>
          <table className="table table-dark table-striped">
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Product Name</th>
                <th scope="col">Product Price</th>
                <th scope="col">Details</th>
              </tr>
            </thead>
            <tbody>
              {data?.data?.result.map((eachItem, index) => (
                <tr key={index}>
                  <th scope="row">{eachItem?._id}</th>
                  <td>{eachItem?.title}</td>
                  <td>{eachItem?.price}</td>
                  <td>
                    <Link to={`/product-details/${eachItem?._id}`}>
                      <button type="button" className="btn btn-success">
                        Details
                      </button>
                    </Link>
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

export default View;
