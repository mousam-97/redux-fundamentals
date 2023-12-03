const redux = require('redux');
const reduxThunk = require('redux-thunk').default;
const axios = require('axios');
const createStore = redux.legacy_createStore;
const applyMiddleWare = redux.applyMiddleware;


const FETCH_REQUESTED_USERS = 'FETCH_REQUESTED_USERS';
const REQUESTED_USERS_SUCCESS = 'REQUESTED_USERS_SUCCESS';
const REQUESTED_USERS_FAILED = 'REQUESTED_USERS_FAILED';


const fetchRequestedUsers = () => {
    return {
        type: FETCH_REQUESTED_USERS,
    };
};

const requestedUsersSuccess = users => {
    return {
        type: REQUESTED_USERS_SUCCESS,
        payload: users
    };
};

const requestedUsersFailed = error => {
    return {
        type: REQUESTED_USERS_FAILED,
        payload: error
    };
};

const initialState = {
    loading: false,
    users: [],
    error: ''
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_REQUESTED_USERS: return {
            ...state,
            loading: true
        };

        case REQUESTED_USERS_SUCCESS: return {
            ...state,
            loading: false,
            users: action.payload
        };
        case REQUESTED_USERS_FAILED: return {
            ...state,
            loading: false,
            error: action.payload
        };
    }
};

function fetchUsers() {
    return function (dispatch) {
        dispatch(fetchRequestedUsers());
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then(response => {
                dispatch(requestedUsersSuccess(response.data));
            })
            .catch(error => {
                dispatch(requestedUsersFailed(error.message));
            });
    };
}

const store = createStore(reducer, applyMiddleWare(reduxThunk));
console.log('initialState', store.getState());
store.subscribe(() => console.log("currentData", store.getState()));
store.dispatch(fetchUsers());



