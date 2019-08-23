import { createStore } from 'redux';
import { reducer } from './taxDetails/taxReducer';

export const store = createStore(reducer);