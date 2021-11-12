// Import dependencies
import * as yup from 'yup';

// Set schema
const formSchema = yup.object().shape({
    name: yup
        .string()
        .trim()
        .required('We need to know who the pizza is for!')
        .min(2, "name must be at least 2 characters"),
    size: yup
        .string()
        .required("We can't make you a pizza if you don't give us a size!"),
    sauce: yup
        .string()
        .required("We can't make you a pizza if you don't choose a sauce!"),
    glutenFree: yup
        .boolean(),
    pepperoni: yup
        .boolean(),
    sausage: yup
        .boolean(),
    canBacon: yup
        .boolean(),
    onions: yup
        .boolean(),
    special: yup
        .string()
        .trim(),
});

export default formSchema;