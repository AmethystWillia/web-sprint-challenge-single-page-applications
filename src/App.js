// Import dependencies
import React, { useState, useEffect } from "react";
import { Route, Switch, Link } from 'react-router-dom';
import * as yup from 'yup';

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

//----------------  Parent Component  ----------------//
const App = () => {
  //----------------  Setting States  ----------------//
  const [formValues, setFormValues] = useState(initialErrorValues);
  const [formErrors, setFormErrors] = useState(initialErrorValues);
  const [disabled, setDisabled] = useState(initialDisabled);

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

  //----------------  Event Handlers  ----------------//
  // Input-chaneg event handler
  const inputChange = (name, value) => {
    validate(name, value);
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  // Submit event handler

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
        <h1>Lambda Eats</h1>
        <nav>
          <a href=''>Home</a>
          <a href=''>Help</a>
        </nav>
      </header>

      <div className='to-form'>
        <div className='background-img'></div>
        <Link to={'/pizza'}>
          <button>Pizza?</button>
        </Link>
      </div>

      <Switch>
        <Route path='/pizza'>
          <PizzaForm
            values={formValues}
            change={inputChange}
            disabled={disabled}
            errors={formErrors}
          />
        </Route>
        <Pizza />
      </Switch>
    </div>
  );
};
export default App;
