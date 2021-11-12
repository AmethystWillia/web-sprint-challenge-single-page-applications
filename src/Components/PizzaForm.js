// Import dependencies
import React from 'react';

//----------------  PizzaForm Component  ----------------//
const PizzaForm = (props) => {
    // Set values to props
    const {
        values,
        submit,
        change,
        disabled,
        errors,
    } = props;

    //----------------  Setting Change & Submit  ----------------//
    // Submit
    const onSubmit = evt => {
        evt.preventDefault();
        submit();
    }
    // Change
    const onChange = evt => {
        const { name, value, checked, type } = evt.target;
        const valueCheck = type === 'checkbox' ? checked : value;
        change(name, valueCheck);
    }

    // Render component
    return (
        <form id='pizza-form'>
            <div className='form-group inputs'>
            <label className='choice-title'>
                    Name
                    <span className='small-text'>Required.</span>
                </label>
                <input
                    id='name-input'
                    name='name'
                    type='text'
                    value={values.name}
                    onChange={onChange}
                />
                <label className='choice-title'>
                    Choice of Size
                    <span className='small-text'>Required.</span>
                </label>
                <select
                    id='size-dropdown'
                    name='size'
                    value={values.size}
                    onChange={onChange}>
                        <option value=''>Select</option>
                        <option value='Small'>Small</option>
                        <option value='Medium'>Medium</option>
                        <option value='Large'>Large</option>
                    </select>
                

                <label className='choice-title'>
                    Choice of Sauce
                    <span className='small-text'>Required.</span>
                </label>
                <input
                    id='sauce-radio'
                    type='radio'
                    name='sauce'
                    value='Original Red'
                    checked={values.sauce === 'Original Red'}
                    onChange={onChange}/>
                <label>Original Red</label>
                <input
                    id='sauce-radio'
                    type='radio'
                    name='sauce'
                    value='Garlic Ranch'
                    checked={values.sauce === 'Garlic Ranch'}
                    onChange={onChange}/>
                <label>Garlic Ranch</label>
                <input
                    id='sauce-radio'
                    type='radio'
                    name='sauce'
                    value='BBQ Sauce'
                    checked={values.sauce === 'BBQ Sauce'}
                    onChange={onChange}/>
                <label>BBQ Sauce</label>
                <input
                    id='sauce-radio'
                    type='radio'
                    name='sauce'
                    value='Spinach Alfredo'
                    checked={values.sauce === 'Spinach Alfredo'}
                    onChange={onChange}/>
                <label>Spinach Alfredo</label>

                <label className='choice-title'>
                    Add Toppings
                    <span className='small-text'>Choose up to 10.</span>
                </label>
                <input
                    type='checkbox'
                    name='pepperoni'
                    checked={values.pepperoni}
                    onChange={onChange}/>
                <label>Pepperoni</label>
                <input
                    type='checkbox'
                    name='sausage'
                    checked={values.sausage}
                    onChange={onChange}/>
                <label>Sausage</label>
                <input
                    type='checkbox'
                    name='canBacon'
                    checked={values.canBacon}
                    onChange={onChange}/>
                <label>Canadian Bacon</label>
                <input
                    type='checkbox'
                    name='onions'
                    checked={values.onions}
                    onChange={onChange}/>
                <label>Onions</label>
            </div>
        </form>
    )
};

export default PizzaForm;