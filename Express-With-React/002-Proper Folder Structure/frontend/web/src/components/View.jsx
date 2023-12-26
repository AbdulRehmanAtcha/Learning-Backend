import React from "react";
import { FetchingQuery } from "../hooks/useUserData";

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
      <h1>All Products</h1>
      <br />
      <table className="table table-dark table-striped">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Product Name</th>
            <th scope="col">Product Price</th>
          </tr>
        </thead>
        <tbody>
          {data?.data?.map((eachItem,index) => (
            <tr key={index}>
              <th scope="row">{eachItem?.id}</th>
              <td>{eachItem?.productName}</td>
              <td>{eachItem?.productPrice}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default View;
