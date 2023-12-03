const redux = require('redux');
const reduxLogger = require('redux-logger');

const applyMiddleware = redux.applyMiddleware;
const logger = reduxLogger.createLogger();

const createStore = redux.legacy_createStore;
const bindActionCreators = redux.bindActionCreators;
const combineReducers = redux.combineReducers;

const CAKE_ORDERED = 'CAKE_ORDERED';
const CAKE_RESTOCK = 'CAKE_RESTOCK';
const ICECREAM_ORDERED = 'ICECREAM_ORDERED';
const ICECREAM_RESTOCK = 'ICECREAM_RESTOCK';

function orderCake() {
    return {
        type: CAKE_ORDERED,
    };
}

function restockCake(qty) {
    return {
        type: CAKE_RESTOCK,
        payload: qty,
    };
}

function orderIceCream(qty = 1) {
    return {
        type: ICECREAM_ORDERED,
        payload: qty,
    };
}

function restockIceCream(qty = 1) {
    return {
        type: ICECREAM_RESTOCK,
        payload: qty,
    };
}



const initialCakeState = {
    numOfCakes: 10,
};

const cakeReducer = (state = initialCakeState, action) => {
    switch (action.type) {
        case CAKE_ORDERED:
            return {
                ...state,
                numOfCakes: state.numOfCakes - 1,
            };
        case CAKE_RESTOCK:
            return {
                ...state,
                numOfCakes: state.numOfCakes + action.payload,
            };
        default: return state;
    }
};

const initialIceCreamState = {
    numOfIceCream: 20,
};

const iceCreamReducer = (state = initialIceCreamState, action) => {
    switch (action.type) {
        case ICECREAM_ORDERED:
            return {
                ...state,
                numOfIceCream: state.numOfIceCream - action.payload,
            };
        case ICECREAM_RESTOCK:
            return {
                ...state,
                numOfIceCream: state.numOfIceCream + action.payload,
            };
        default: return state;
    }
};

// to combine multiple reducer, its a convention to name it rootReducer
// we can pass a object with key name and value as the name of reducer
const rootReducer = combineReducers({
    cake: cakeReducer,
    iceCream: iceCreamReducer
});

const store = createStore(rootReducer, applyMiddleware(logger));

console.log('initialState', store.getState());

// const unsubscribe = store.subscribe(() => console.log("updated state:", store.getState()));
const unsubscribe = store.subscribe(() => {});

// these will also work
// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(restockCake(3));

// this function help to wrap all the action with a dispatch with the same keys, 
// so that we dont have to write dispatch everytime
// it is not that necessary now
const actions = bindActionCreators({ orderCake, restockCake, orderIceCream, restockIceCream }, store.dispatch);

actions.orderCake();
actions.orderCake();
actions.orderCake();
actions.restockCake(3);
actions.orderIceCream();
actions.orderIceCream();
actions.orderIceCream();
actions.restockIceCream(3);

unsubscribe();
// This will not work as we have unsubscribed from the store
store.dispatch(orderCake());
store.dispatch(orderCake());

