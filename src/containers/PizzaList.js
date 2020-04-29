import React, { Component } from "react";
import Pizza from "../components/Pizza";
class PizzaList extends Component {
  render() {
    const renderPizzas = pizzasArr =>
      pizzasArr.map(pizza => (
        <Pizza
          key={pizza.id}
          pizza={pizza}
          handleEditClick={() => this.props.handleSelectPizza(pizza)}
        />
      ));

    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Topping</th>
            <th scope="col">Size</th>
            <th scope="col">Vegetarian?</th>
            <th scope="col">Edit</th>
          </tr>
        </thead>
        <tbody>{renderPizzas(this.props.pizzas)}</tbody>
      </table>
    );
  }
}

export default PizzaList;