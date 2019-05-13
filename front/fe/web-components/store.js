import routes from '../constants/Routes';

let currentRecipe = null;
let subscribers = [];

// export const getRecipe = () => {
//     return currentRecipe;
// }

// const setRecipe = (newRecipe) => {
//     currentRecipe = newRecipe;
//     subscribers.forEach(sub => sub(newRecipe));
// }
//
// export const fetchRecipe = (id) => {
//     fetch(routes.GET_RECIPE(id))
//         .then(res => res.json())
//         .then(res => setRecipe(res));
// }
//
// export const addSubscriber = (subscr) => {
//     if (subscribers.indexOf(subscr) === -1) {
//         subscribers.push(subscr);
//     }
// }
//
// export const removeSubscriber = (subscr) => {
//     if (subscribers.indexOf(subscr) !== -1) {
//         subscribers.splice(subscribers.indexOf(subscr), 1);
//     }
// }

