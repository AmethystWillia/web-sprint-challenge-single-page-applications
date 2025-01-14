// Import dependencies
import React, { useState, useEffect } from "react";
import { Route, Switch, Link } from 'react-router-dom';
import * as yup from 'yup';
import axios from 'axios';

// Imort CSS
import './App.css';

// Import components
import schema from './Validation/formSchema';
import PizzaForm from "./Components/PizzaForm";
import Pizza from "./Components/Pizza";

//----------------  Setting Initial States  ----------------//
// Set initial form values
const initialFormValues = {
  name: '',
  size: '',
  sauce: '',
  glutenFree: false,
  pepperoni: false,
  sausage: false,
  canBacon: false,
  onions: false,
  special: '',
}
// Set initial form values
const initialErrorValues = {
  name: '',
  size: '',
  sauce: '',
}
// Set "Add to Order" to start disabled
const initialDisabled = true;
// Create empty array for initial pizzas
const initialPizzas = [];

// Parent Component
const App = () => {
  //----------------  Setting States  ----------------//
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialErrorValues);
  const [disabled, setDisabled] = useState(initialDisabled);
  const [pizzas, setPizzas] = useState(initialPizzas);
  const [hidden, setHidden] = useState(false);

  //----------------  Creating Helpers  ----------------//
  // Check form to see if inputs are valid
  const validate = (name, value) => {
    yup.reach(schema, name).validate(value)
      .then(() => {
        setFormErrors({ ...formErrors, [name]: '' });
      })
      .catch(err => {
        setFormErrors({ ...formErrors, [name]: err.errors[0] });
      })
  };

    // Post pizzas to API
    const postPizza = newPizza => {
      axios.post('https://reqres.in/api/orders', newPizza)
        .then(res => {
          setPizzas([res.data, ...pizzas]);
        })
        .catch(err => {
          console.log(`Ruh roh! ${err}`);
        })
        .finally(() => {
          setFormValues(initialFormValues);
        })
    };

  //----------------  Event Handlers  ----------------//
  // Toggle hidden
  const toggleHidden = () => {
    setHidden(!hidden);
  };
  const reveal = () => {
    setHidden(false);
  }

  // Input-change event handler
  const inputChange = (name, value) => {
    validate(name, value);
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  // Submit event handler
  const formSubmit = () => {
    const newPizza = {
      name: formValues.name.trim(),
      size: formValues.size,
      sauce: formValues.sauce,
      glutenFree: false,
      pepperoni: formValues.pepperoni,
      sausage: formValues.sausage,
      canBacon: formValues.canBacon,
      onions: formValues.onions,
      special: formValues.special.trim(),
    }

    postPizza(newPizza);
  };

  //----------------  Side Effects  ----------------//

  // Adjust value of `disabled` when `formValues` changes
  useEffect(() => {
    schema.isValid(formValues)
      .then(valid => {
        setDisabled(!valid);
      })
  }, [formValues]);

  //----------------  Render Component  ----------------//
  return (
    <div>
      <header className='header'>
        <div>
          <h1>Lambda Eats</h1>
        </div>
        <nav>
          <Link to='/' className='nav-link' onClick={reveal}>Home</Link>
          <Link to='/' className='nav-link'>Help</Link>
        </nav>
      </header>

      {hidden === true ? '' :
        <section className='to-form'>
        <div className='background-img'>
          <div className='to-form content'>
            <h2>Your favorite food, delivered while coding</h2>
            <Link to='/pizza'>
              <button id='order-pizza' onClick={toggleHidden}>Pizza?</button>
            </Link>
          </div>
        </div>
       </section>
      }

      <Switch>
        <Route path='/pizza/complete'>
            <Pizza />
          </Route>
          <Route path='/pizza'>
            <PizzaForm
              values={formValues}
              change={inputChange}
              submit={formSubmit}
              disabled={disabled}
              errors={formErrors}
            />
          </Route>
      </Switch>
    </div>
  );
};
export default App;
