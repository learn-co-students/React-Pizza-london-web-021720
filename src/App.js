import React, { Component, Fragment } from "react";
import Header from "./components/Header";
import PizzaForm from "./components/PizzaForm";
import PizzaList from "./containers/PizzaList";

const PIZZAS_URL = "http://localhost:3000/pizzas/";

class App extends Component {
  state = {
    pizzas: [],
    selectedPizza: {
      topping: "",
      size: "Small",
      vegetarian: false,
    },
  };

  //API Calls

  getPizzas = () => fetch(PIZZAS_URL).then(resp => resp.json());

  patchPizza = pizza =>
    fetch(PIZZAS_URL + pizza.id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pizza),
    }).then(resp => resp.json());

  createPizza = pizza =>
    fetch(PIZZAS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pizza),
    }).then(resp => resp.json());

  componentDidMount() {
    this.getPizzas().then(pizzas => this.setState({ pizzas }));
  }

  //Event Handlers

  handleClearSelected = () =>
    this.setState({
      selectedPizza: {
        topping: "",
        size: "Small",
        vegetarian: false,
      },
    });

  handleSelectPizza = selectedPizza => this.setState({ selectedPizza });

  handleFormChange = e => {
    let value = e.target.value;

    if (e.target.type === "radio") {
      value = e.target.value === "1" ? true : false;
    }

    this.setState({
      selectedPizza: {
        ...this.state.selectedPizza,
        [e.target.name]: value,
      },
    });
  };

  handleSubmitEdit = () => {
    this.patchPizza(this.state.selectedPizza).then(updatedPizza => {
      const pizzas = this.state.pizzas.map(p =>
        p.id === updatedPizza.id ? updatedPizza : p
      );

      this.setState({ pizzas }, this.handleClearSelected);
    });
  };

  handleSubmitCreate = () => {
    this.createPizza(this.state.selectedPizza).then(createdPizza => {
      this.setState(
        { pizzas: [...this.state.pizzas, createdPizza] },
        this.handleClearSelected
      );
    });
  };

  handleSubmitForm = () => {
    this.state.selectedPizza.id
      ? this.handleSubmitEdit()
      : this.handleSubmitCreate();
  };

  render() {
    return (
      <Fragment>
        <Header />
        <PizzaForm
          selectedPizza={this.state.selectedPizza}
          handleFormChange={this.handleFormChange}
          handleSubmitButton={this.handleSubmitForm}
          handleClearButton={this.handleClearSelected}
        />
        <PizzaList
          pizzas={this.state.pizzas}
          handleSelectPizza={this.handleSelectPizza}
        />
      </Fragment>
    );
  }
}

export default App;
