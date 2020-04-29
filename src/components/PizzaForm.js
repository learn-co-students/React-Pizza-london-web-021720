import React from "react";

const PizzaForm = ({
  selectedPizza: { id, topping, size, vegetarian },
  handleFormChange,
  handleSubmitButton,
  handleClearButton,
}) => {
  return (
    <div className="form-row">
      <div className="col-5">
        <input
          type="text"
          className="form-control"
          placeholder="Pizza Topping"
          name="topping"
          onChange={handleFormChange}
          value={topping}
        />
      </div>
      <div className="col">
        <select
          value={size}
          className="form-control"
          name="size"
          onChange={handleFormChange}
        >
          <option value="Small">Small</option>
          <option value="Medium">Medium</option>
          <option value="Large">Large</option>
        </select>
      </div>
      <div className="col">
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="vegetarian"
            value="1"
            onChange={handleFormChange}
            checked={vegetarian}
          />
          <label className="form-check-label">Vegetarian</label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="vegetarian"
            value="0"
            onChange={handleFormChange}
            checked={!vegetarian}
          />
          <label className="form-check-label">Not Vegetarian</label>
        </div>
      </div>
      <div className="col">
        <button
          type="submit"
          className="btn btn-success"
          onClick={handleSubmitButton}
        >
          {id ? "Edit" : "Create"}
        </button>
        <button
          type="submit"
          className="btn btn-secondary"
          onClick={handleClearButton}
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default PizzaForm;