const redux = require('redux');
const createStore = redux.createStore;

const initState = {
    salary: 1000,
    time: '',
    name: ''
};

const reducer = (state = initState, action) => {
    if (action.type === 'SALARY_RAISE') {
        return {
            ...state,
            salary: state.salary + action.amount,
            time: action.time
        };

    } else if (action.type === 'SALARY_DECREASE') {
        return {
            ...state,
            salary: state.salary - action.amount
        };
    }
    return state;
};

const store = createStore(reducer);

const state = store.getState();

console.log(state);

const SALARY_RAISE = 'SALARY_RAISE';
const SALARY_DECREASE = 'SALARY_DECREASE';

const createSalaryRaise = (amount, time) => {
    return { type: SALARY_RAISE, amount, time }
};
const createSalaryDecrease = (amount) => {
    return { type: SALARY_DECREASE, amount }
};

store.subscribe(() => {
    console.log('state changed!!!  =================================');
    console.log(store.getState());//this.props.salary
});

store.dispatch(createSalaryRaise(500, '2015-07-08'));
store.dispatch(createSalaryRaise(500, '2018-02-01'));
store.dispatch(createSalaryDecrease(300));
