import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'

const API  = "http://localhost:3000/pizzas/"
class App extends Component {
  state = {
    pizzas: [],
    pizzaToEdit: {
      topping:'',
      size: 'small',
      vegetarian: false
    }
  }
  
  getPizzas = () => {
    fetch(API)
    .then(resp => resp.json())
    .then(data => this.setState({
      pizzas: data
    }))
  }

  componentDidMount(){ 
    this.getPizzas()
  }

  editPizza = (id) => {
    console.log(this.state.pizzas.find(pizza => id === pizza.id))
    this.setState({
      pizzaToEdit: {...this.state.pizzas.find(pizza => id === pizza.id)}
    })
  }

  editName = (e) => {
    console.log(e.target.value)
    this.setState({ 
      pizzaToEdit: {...this.state.pizzaToEdit, topping:e.target.value}
    })
  }

  editSize = (e) => {
    console.log(e.target.value)
    this.setState({
      pizzaToEdit: {...this.state.pizzaToEdit, size:e.target.value}
    })
  }

  editVeg = (e) => {
    console.log(e.target.value)
    if (e.target.value === "Not Vegetarian"){
    this.setState({
      pizzaToEdit: {...this.state.pizzaToEdit, vegetarian:false}
    })
    }
    else if(e.target.value === "Vegetarian" ) {
      this.setState({
        pizzaToEdit: {...this.state.pizzaToEdit, vegetarian:true}
      })
    }
  }

  patchApi = () => {
    console.log(this.state.pizzaToEdit)
   
    const {topping, size, vegetarian} = this.state.pizzaToEdit
    fetch(API + this.state.pizzaToEdit.id,  {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        "Accept": "application/json"
      },
      body: JSON.stringify({
        ...this.state.pizzaToEdit
      }
      )
    })
    .then(res => res.json())
    .then(data => {
      const newPizza = this.state.pizzas.map(pizza => data.id === pizza.id ? data:pizza)
      this.setState({
      pizzas:newPizza
    })})
    .catch(error => console.log(error.message))
  }
  
  submitForm = (e) => {
    this.patchApi()
  }
  
  render() {
    return (
      <Fragment>
        <Header/>
        <PizzaForm submitForm = {e => this.submitForm(e)} editVeg = {e => this.editVeg(e)} editSize = {e => this.editSize(e)} pizzaToEdit = {this.state.pizzaToEdit} editName ={e => this.editName(e)} submitForm = {e => this.submitForm(e)}/>
        <PizzaList pizzas = {this.state.pizzas} edit = {id => this.editPizza(id)} />
      </Fragment>
    );
  }
}

export default App;
