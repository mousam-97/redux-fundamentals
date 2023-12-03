const redux = require('redux');
const createStore = redux.legacy_createStore;
const produce = require('immer').produce;
const reduxLogger = require('redux-logger');
const applyMiddleware = redux.applyMiddleware;

const logger = reduxLogger.createLogger();

const UPDATE_STREET = 'UPDATE_STREET';

function updateStreet(street) {
    return {
        type: UPDATE_STREET,
        payload: street
    };
}

const initialState = {
    name: 'John',
    address: {
        street: 'LA street',
        state: 'Arizona',
    }
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        // instead of writing this nested logic we can use immer
        case UPDATE_STREET:
            // return {
            //     ...state,
            //     address: {
            //         ...state.address,
            //         street: action.payload
            //     }
            // };
            return produce(state, (draft) => {
                // we can modify it like its mutable but immer will internally make it like above
                draft.address.street = action.payload;
            });
        default: return state;
    }
};

const store = createStore(reducer, applyMiddleware(logger));

console.log('initialState', initialState);
// const unsubscribe = store.subscribe(() => console.log('Updated state', store.getState()));
const unsubscribe = store.subscribe(() => { });

store.dispatch(updateStreet('Bagharbari'));
unsubscribe();