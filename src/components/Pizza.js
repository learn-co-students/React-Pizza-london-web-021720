import React from "react";

const Pizza = ({ pizza: { topping, size, vegetarian }, handleEditClick }) => {
  return (
    <tr>
      <td>{topping}</td>
      <td>{size}</td>
      <td>{vegetarian ? "Yes" : "No"}</td>
      <td>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleEditClick}
        >
          Edit Pizza
        </button>
      </td>
    </tr>
  );
};

export default Pizza;