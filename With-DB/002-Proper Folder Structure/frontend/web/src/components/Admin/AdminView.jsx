import React from "react";
import { DeleteMutation, FetchingQuery } from "../../hooks/useUserData";
import { Link } from "react-router-dom";

const AdminView = () => {
  const {
    data,
    isError: querError,
    isLoading: querLoading,
    error: queryErrorMsg,
    refetch,
  } = FetchingQuery();

  const onSuccess = () => {
    alert("Delted")
    refetch();
  };

  const {
    mutate,
    isError: mutateError,
    isLoading: mutateLoading,
    error: mutateErrorMsg,
    data: mutateData,
  } = DeleteMutation(onSuccess);

  if (querError) {
    return <h1>{queryErrorMsg?.message}</h1>;
  }
  if (querLoading) {
    return <h1>Loadingg....</h1>;
  }

  const HandleDelete = (data) => {
    mutate(data);
  };
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
                <th scope="col">Edit Option</th>
                <th scope="col">Delete Option</th>
              </tr>
            </thead>
            <tbody>
              {data?.data?.map((eachItem, index) => (
                <tr key={index}>
                  <th scope="row">{eachItem?.id}</th>
                  <td>{eachItem?.productName}</td>
                  <td>{eachItem?.productPrice}</td>
                  <td>
                    <Link to={`/edit-product/${eachItem?.id}`}>
                      <button type="button" className="btn btn-success">
                        Edit
                      </button>
                    </Link>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => HandleDelete(eachItem)}
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

export default AdminView;
