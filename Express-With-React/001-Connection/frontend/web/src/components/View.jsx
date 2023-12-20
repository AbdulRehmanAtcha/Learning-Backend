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
      <h1>All Users</h1>
      <br />
      <table className="table table-dark table-striped">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
          </tr>
        </thead>
        <tbody>
          {data?.data?.map((eachuser,index) => (
            <tr key={index}>
              <th scope="row">{eachuser?.id}</th>
              <td>{eachuser?.name}</td>
              <td>{eachuser?.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default View;
